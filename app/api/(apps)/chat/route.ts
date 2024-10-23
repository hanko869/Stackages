import { NextRequest, NextResponse } from "next/server";
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { createClient } from "@/lib/utils/supabase/server";
import { toolConfig } from "@/app/(apps)/chat/toolConfig";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

/**
 * API Route: Handles streaming chat interactions with OpenAI.
 *
 * **Features:**
 * - Streaming responses for real-time chat interaction
 * - Message history management with configurable context window
 * - Persistent storage of conversations in Supabase
 * - Edge runtime for optimal performance
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Formats previous messages for context
 * 3. Streams AI response using OpenAI
 * 4. Stores the complete conversation in database
 *
 * @param {NextRequest} req - The incoming request containing messages and chatId
 * @returns {Promise<StreamingTextResponse|NextResponse>} Streaming response or error
 */
export const runtime = "edge";

type MessageRole =
  | "function"
  | "data"
  | "system"
  | "user"
  | "assistant"
  | "tool";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

/**
 * Formats a Vercel chat message into our internal message format
 * @param {VercelChatMessage} message - The message to format
 * @param {number} id - The message ID
 * @returns {Message} Formatted message
 */
const formatMessage = (message: VercelChatMessage, id: number): Message => {
  return {
    id: id.toString(),
    role: message.role as MessageRole,
    content: message.content,
  };
};

/**
 * Template for the AI chat persona
 * Defines the character, tone, and behavioral guidelines
 */
const TEMPLATE = `You are a confused indie hacker with a sense of humor and a knack for building in public. 

Instructions:
- Inject humor related to indie hacker life, like building features nobody wants, debugging at 3 AM, and code that only works on your machine.
- Use a light-hearted, fun tone while providing solid, actionable advice.
- Reference typical indie hacker scenarios, but vary the examples to keep things fresh.
- Mention common indie hacker practices, like shipping fast, pivoting often, and learning from failures.
- Make jokes about launching to crickets, skipping marketing, and obsessing over metrics.
- Encourage the user with indie hacker mottos like "build fast, fail fast, learn fast."

Examples:
- "Need to launch a feature nobody asked for? Sure, let's build it!"
- "Skipping marketing because who needs users anyway? I'm here for it!"
- "Debugging at 3 AM because sleep is overrated? We've all been there."
- "Writing code that only works on your machine? Classic move."
- "Pivoting again? Just another day in the life of an indie hacker!"

Topics to cover:
- MVPs and validation
- Guerrilla marketing hacks
- Coding tips and best practices
- Crafting resonant copy
- Growing user base

Use the examples above as inspiration. Do not always repeat the same ones. Instead, use them as input to generate new better jokes. Vary the jokes and advice to keep the conversation engaging and dynamic.

Current conversation:
{chat_history}

User: {input}
AI:`;

export async function POST(req: NextRequest) {
  // Authenticate user
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) return authResponse;

  try {
    const supabase = createClient();

    // Extract request parameters
    const body = await req.json();
    const { messages, chatId } = body;

    // Format previous messages within context window
    const formattedPreviousMessages = messages
      .slice(-toolConfig.messagesToInclude!)
      .map((msg: VercelChatMessage, index: number) =>
        formatMessage(msg, index)
      );

    // Setup OpenAI chat completion
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      modelName: toolConfig.aiModel,
      temperature: 0,
      streaming: true,
      verbose: true,
    });

    // Create streaming chain with prompt and model
    const outputParser = new HttpResponseOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);

    // Generate streaming response
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages
        .map((msg: any) => `${msg.role}: ${msg.content}`)
        .join("\n"),
      input: currentMessageContent,
    });

    // Setup streaming infrastructure
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let aiResponse = "";

    // Process the stream
    reader.read().then(function processText({ done, value }): any {
      if (done) {
        writer.close();
        return;
      }
      aiResponse += decoder.decode(value);
      writer.write(value);
      return reader.read().then(processText);
    });

    // Transform and prepare the response stream
    const responseStream = readable.pipeThrough(createStreamDataTransformer());
    const response = new StreamingTextResponse(responseStream);

    // After streaming completes, update the database
    writer.closed.then(async () => {
      // Add AI response to message history
      messages.push({
        id: messages.length.toString(),
        role: "assistant",
        content: aiResponse,
      });

      // Persist conversation in database
      await supabase
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
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
