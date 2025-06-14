import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import fetch from "node-fetch";
import { replicate } from "@/lib/clients/replicate";

/**
 * API Route: Transcribes audio files using Replicate's Whisper model.
 *
 * **Process:**
 * 1. Authenticates the user.
 * 2. Fetches the audio file from the provided URL.
 * 3. Transcribes the audio using Replicate's Whisper model.
 * 4. Stores the transcription data in Supabase.
 * 5. Returns the transcription ID and text.
 *
 * The transcription includes:
 * - Full text transcription
 * - Timestamped chunks for precise audio segment mapping
 *
 * @param {Request} request - The incoming request object containing recordingId and audioUrl.
 * @returns {Promise<NextResponse>} JSON response containing the transcription details.
 */
export async function POST(request: any) {
  try {
    const supabase = createClient();

    // Authenticate user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({
        error: "You must be logged in to transcribe audio",
      });
    }

    // Extract request parameters
    const requestBody = await request.json();
    const { recordingId, audioUrl } = requestBody;

    console.log("Transcribing audio for recording ID:", recordingId);
    console.log("Audio URL:", audioUrl);

    // Verify audio file accessibility
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      console.error("Failed to fetch audio file from URL:", audioUrl);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to fetch audio file.",
        }),
        { status: 500 }
      );
    }

    // Transcribe audio using Replicate's Whisper model
    const output = (await replicate.run(
      "vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
      {
        input: {
          task: "transcribe",
          audio: audioUrl,
          timestamp: "chunk",
          batch_size: 64,
        },
      }
    )) as { text: string; chunks: any[] };

    const modelUsed = "incredibly-fast-whisper";

    // Store transcription in database
    const { data, error } = await supabase
      .from("transcripts")
      .insert([
        {
          recording_id: recordingId,
          transcript: output.text,
          model: modelUsed,
          chunks: output.chunks,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting transcription:", error);
      return new NextResponse(
        JSON.stringify({
          error: "An error occurred while saving transcription data.",
        }),
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        transcriptId: data[0].id,
        transcription: output.text,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing transcription:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          (error as Error).message ||
          "An error occurred during the transcription process.",
      }),
      { status: 500 }
    );
  }
}
