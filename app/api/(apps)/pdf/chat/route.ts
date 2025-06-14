import { NextRequest, NextResponse } from "next/server";
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";
import { createClient } from "@/lib/utils/supabase/server";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { Document } from "@langchain/core/documents";
import { RunnableSequence } from "@langchain/core/runnables";
import {
  BytesOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import { toolConfig } from "@/app/(apps)/pdf/toolConfig";

export const runtime = "edge";
/**
 * API Route: Handles PDF chat interactions using LangChain and OpenAI.
 *
 * **Features:**
 * - Streaming responses for real-time chat interaction
 * - Semantic search in PDF content using vector embeddings
 * - Conversation history management
 * - Context-aware responses based on PDF content
 * - Source tracking for responses
 *
 * **Process:**
 * 1. Authenticates user and manages conversation state
 * 2. Performs semantic search in PDF content
 * 3. Generates context-aware responses
 * 4. Streams response to client
 * 5. Updates conversation history
 *
 * **Technical Details:**
 * - Uses edge runtime for optimal performance
 * - Implements RAG (Retrieval Augmented Generation)
 * - Maintains conversation context
 * - Handles streaming responses with TransformStream
 *
 * @param {NextRequest} request - Contains messages and documentId
 * @returns {Promise<StreamingTextResponse>} Streaming AI response with metadata
 */

/**
 * Combines multiple document chunks into a single context string
 */
const combineDocumentsFn = (docs: Document[]) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join("\n\n");
};

/**
 * Formats chat history into a standardized string format
 */
const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

/**
 * Template for condensing follow-up questions into standalone queries
 */
const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

<chat_history>
  {chat_history}
</chat_history>

Follow Up Input: {question}
Standalone question:`;
const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE
);

/**
 * Template for generating answers based on context and chat history
 */
const ANSWER_TEMPLATE = `You are a smart AI assistant.

Answer the question based only on the following context and chat history:
<context>
  {context}
</context>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}
`;
const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

export async function POST(req: NextRequest) {
  try {
    // Extract request data and prepare message context
    const body = await req.json();
    const { messages, documentId } = body;
    const previousMessages = messages.slice(
      -toolConfig.messagesToInclude! - 1,
      -1
    );
    // const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    // Initialize Supabase client and verify user

    const client = createClient();
    const {
      data: { user },
    } = await client.auth.getUser();

    const userId = user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if the document has an existing conversation
    const { data: document, error: documentError } = await client
      .from("pdf_documents")
      .select("conversation_id")
      .eq("id", documentId)
      .single();

    if (documentError) throw documentError;

    let chatId = document.conversation_id;

    // Create a new conversation if one does not exist
    if (!chatId) {
      const { data: newConversation, error: conversationError } = await client
        .from("conversations")
        .insert({
          conversation: [],
          model_used: toolConfig.aiModel,
          user_id: userId,
          type: "pdf",
        })
        .select()
        .single();

      if (conversationError) throw conversationError;

      chatId = newConversation.id;

      await client
        .from("pdf_documents")
        .update({ conversation_id: chatId })
        .eq("id", documentId);
    }

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      modelName: toolConfig.aiModel,
      temperature: 0,
      streaming: true,
      verbose: true,
    });

    //Use the match_documents query to search through our Vector Embeddings
    const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: "embeddings",
      queryName: "match_documents",
    });

    const standaloneQuestionChain = RunnableSequence.from([
      condenseQuestionPrompt,
      model,
      new StringOutputParser(),
    ]);

    let resolveWithDocuments: (value: Document[]) => void;
    const documentPromise = new Promise<Document[]>((resolve) => {
      resolveWithDocuments = resolve;
    });

    const retriever = vectorstore.asRetriever({
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            resolveWithDocuments(documents);
          },
        },
      ],
      filter: { document_id: documentId },
    });

    const retrievalChain = retriever.pipe(combineDocumentsFn);

    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([
          (input) => input.question,
          retrievalChain,
        ]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      model,
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      {
        question: standaloneQuestionChain,
        chat_history: (input) => input.chat_history,
      },
      answerChain,
      new BytesOutputParser(),
    ]);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: formatVercelMessages(previousMessages),
    });

    const documents = await documentPromise;
    const serializedSources = Buffer.from(
      JSON.stringify(
        documents.map((doc) => {
          return {
            pageContent: doc.pageContent.slice(0, 50) + "...",
            metadata: doc.metadata,
          };
        })
      )
    ).toString("base64");

    // Create a TransformStream to collect AI response while streaming
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let aiResponse = "";

    reader.read().then(function processText({ done, value }): any {
      if (done) {
        writer.close();
        return;
      }
      aiResponse += decoder.decode(value);
      writer.write(value);
      return reader.read().then(processText);
    });

    // Stream the response to the user
    const responseStream = readable.pipeThrough(createStreamDataTransformer());
    const response = new StreamingTextResponse(responseStream, {
      headers: {
        "x-message-index": (previousMessages.length + 1).toString(),
        "x-sources": serializedSources,
      },
    });

    // Wait for the stream to complete
    writer.closed.then(async () => {
      // Add AI response to messages
      messages.push({
        role: "assistant",
        content: aiResponse,
      });

      // Update the database after streaming
      await client
        .from("conversations")
        .update({
          conversation: messages,
          updated_at: new Date().toISOString(),
        })
        .eq("id", chatId)
        .select();
    });

    return response;
  } catch (e: any) {
    console.error("Error in API:", e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
