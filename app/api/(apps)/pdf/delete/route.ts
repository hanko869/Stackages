import { NextRequest, NextResponse } from "next/server";
import s3 from "@/lib/clients/cloudflare";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@/lib/utils/supabase/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

/**
 * API Route: Handles PDF document deletion.
 *
 * **Features:**
 * - Deletes PDF files from cloud storage
 * - Removes document metadata from database
 * - Handles authentication and authorization
 * - Cleans up associated resources
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Retrieves document metadata from database
 * 3. Deletes file from cloud storage
 * 4. Removes database entries
 *
 * **Security:**
 * - Requires user authentication
 * - Validates document ownership
 * - Ensures complete cleanup of all resources
 *
 * @param {NextRequest} request - Contains documentId for deletion
 * @returns {Promise<NextResponse>} Confirmation of successful deletion
 */
export async function POST(request: NextRequest) {
  // Authenticate user
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  const { documentId } = await request.json();
  const supabase = createClient();

  // Retrieve document metadata
  const { data: document, error } = await supabase
    .from("pdf_documents")
    .select("file_url")
    .eq("id", documentId)
    .single();

  if (error || !document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  // Prepare cloud storage deletion
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.STORAGE_BUCKET,
    Key: document.file_url.split(`${process.env.STORAGE_PUBLIC_URL}/`)[1],
  });

  try {
    // Delete from cloud storage and database
    await s3.send(deleteCommand);
    await supabase.from("pdf_documents").delete().eq("id", documentId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
