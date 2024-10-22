import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

type DocumentMetadata = {
  document_id: any;
  page: number;
};

function sanitizeText(text: string): string {
  return text
    .replace(/\u0000/g, "") // Remove null characters
    .replace(/[^\x20-\x7E\n\r\t]/g, "") // Remove non-printable ASCII characters except common whitespace
    .trim();
}

export async function POST(request: NextRequest) {
  // Check if the user is authenticated
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  const supabase = createClient();
  const { fileUrl, documentId } = await request.json();

  if (!fileUrl || typeof fileUrl !== "string") {
    return NextResponse.json(
      { error: "A valid file URL is required" },
      { status: 400 }
    );
  }

  if (!documentId) {
    return NextResponse.json(
      { error: "Document ID is required" },
      { status: 400 }
    );
  }

  async function fetchDocumentsFromUrl(url: string) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      const loader = new PDFLoader(new Blob([buffer]));
      const rawDocs = await loader.load();

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const splitDocs = await textSplitter.splitDocuments(rawDocs);

      const pages = rawDocs.map((doc) => doc.pageContent);

      const documentsWithPages = splitDocs.map((splitDoc) => {
        const pageIndex = pages.findIndex((page) =>
          page.includes(splitDoc.pageContent)
        );
        return new Document<DocumentMetadata>({
          pageContent: sanitizeText(splitDoc.pageContent),
          metadata: {
            document_id: documentId,
            page: pageIndex + 1,
          },
        });
      });

      return documentsWithPages;
    } catch (error) {
      console.error("Error fetching documents from URL:", error);
      throw error;
    }
  }

  try {
    const documents = await fetchDocumentsFromUrl(fileUrl);

    const embeddings = new OpenAIEmbeddings();

    // Extract page contents for embedding
    const texts = documents.map((doc) => doc.pageContent);

    // Batch embed all texts in a single request
    const embeddingsArray = await embeddings.embedDocuments(texts);

    const embeddingsData = documents.map((doc, index) => ({
      document_id: documentId,
      content: doc.pageContent,
      embedding: embeddingsArray[index],
      metadata: doc.metadata,
    }));

    const { error: supabaseError } = await supabase
      .from("embeddings")
      .insert(embeddingsData);

    if (supabaseError) {
      console.error("Supabase insertion error:", supabaseError);
      throw supabaseError;
    }

    return NextResponse.json({
      text: "Successfully embedded PDF",
      id: documentId,
    });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { error: "Failed to ingest your data" },
      { status: 500 }
    );
  }
}
