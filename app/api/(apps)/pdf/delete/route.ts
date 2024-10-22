import { NextRequest, NextResponse } from "next/server";
import s3 from "@/lib/cloudflare";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@/lib/utils/supabase/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

export async function POST(request: NextRequest) {
  // Check if the user is authenticated
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  const { documentId } = await request.json();
  const supabase = createClient();

  const { data: document, error } = await supabase
    .from("documents")
    .select("file_url")
    .eq("id", documentId)
    .single();

  if (error || !document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.STORAGE_BUCKET,
    Key: document.file_url.split(`${process.env.STORAGE_PUBLIC_URL}/`)[1],
  });

  try {
    await s3.send(deleteCommand);
    await supabase.from("documents").delete().eq("id", documentId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
