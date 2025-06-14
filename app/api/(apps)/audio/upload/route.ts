import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { toolConfig } from "@/app/(apps)/audio/toolConfig";
import { uploadFile } from "@/lib/hooks/useFileUpload";
import { reduceUserCredits } from "@/lib/db/mutations";

/**
 * API Route: Handles audio file uploads for the Audio app.
 *
 * **Process:**
 * 1. Authenticates the user.
 * 2. Extracts the audio file from the request.
 * 3. Generates a unique file name using UUID.
 * 4. Calls `uploadFile` to handle the upload.
 * 5. Stores metadata in the database.
 * 6. Reduces user credits if paywall is enabled.
 * 7. Returns the public URL, file path, and recording ID.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} JSON response containing the uploaded audio details.
 */
export async function POST(request: Request) {
  const supabase = createClient();

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userId) {
    return NextResponse.json(
      { error: "You must be logged in to upload audio." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const uploadPath = "audio"; // Fixed upload path for audio files

    if (!file) {
      throw new Error("No audio file uploaded.");
    }

    const uuid = uuidv4(); // Generate a UUID for file naming
    const fileName = `audio-${uuid}`; // Unique file name without extension

    // Call uploadFile to handle the upload
    const { url: publicUrl, path: filePath } = await uploadFile({
      file,
      uploadPath,
      fileName,
      contentType: file.type, // Use the original content type
      userId: user.id,
    });

    // Insert audio metadata into Supabase
    const { data, error: insertError } = await supabase
      .from("recordings")
      .insert([
        {
          file_url: publicUrl,
          user_id: userId,
        },
      ])
      .select();

    if (insertError) {
      console.error("Error inserting audio metadata:", insertError);
      return NextResponse.json(
        {
          error: "An error occurred while saving audio metadata.",
        },
        { status: 500 }
      );
    }

    // Reduce user credits if paywall is enabled
    if (toolConfig.paywall === true && userEmail) {
      await reduceUserCredits(userEmail, toolConfig.credits);
    }

    const recordingId = data[0].id;

    return NextResponse.json(
      {
        url: publicUrl,
        path: filePath,
        recordingId: recordingId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in audio upload:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "An error occurred during the audio upload process.",
      },
      { status: 500 }
    );
  }
}
