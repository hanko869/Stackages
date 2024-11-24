import { NextResponse } from "next/server";
import s3 from "@/lib/clients/cloudflare";
import { createClient } from "@/lib/utils/supabase/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

/**
 * API Route: Handles deletion of audio recordings and associated data.
 *
 * **Process:**
 * 1. Authenticates the user.
 * 2. Retrieves the recording details from the database.
 * 3. Deletes the audio file from cloud storage.
 * 4. Removes the recording entry from the database.
 *
 * **Note:**
 * - Deletes both the physical file and database records.
 * - Cascading deletes should handle associated transcripts and summaries.
 *
 * @param {Request} request - The incoming request containing the recordingId.
 * @returns {Promise<NextResponse>} JSON response indicating success or failure.
 */
export async function POST(request: any) {
  const { recordingId } = await request.json();
  const supabase = createClient();

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({
      error: "You must be logged in to delete audio",
    });
  }

  // Retrieve recording details
  const { data: recording, error } = await supabase
    .from("recordings")
    .select("file_url")
    .eq("id", recordingId)
    .single();

  if (error || !recording) {
    return NextResponse.json({ error: "Recording not found" }, { status: 404 });
  }

  // Prepare delete command for cloud storage
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.STORAGE_BUCKET,
    Key: recording.file_url.split(`${process.env.STORAGE_PUBLIC_URL}/`)[1],
  });

  try {
    // Delete file from cloud storage and database record
    await s3.send(deleteCommand);
    await supabase.from("recordings").delete().eq("id", recordingId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recording:", error);
    return NextResponse.json(
      { error: "Failed to delete recording" },
      { status: 500 }
    );
  }
}
