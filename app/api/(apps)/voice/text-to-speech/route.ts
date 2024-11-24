import { NextResponse, NextRequest } from "next/server";
import { toolConfig } from "@/app/(apps)/voice/toolConfig";
import { uploadToSupabase, reduceUserCredits } from "@/lib/db/mutations";
import { createClient } from "@/lib/utils/supabase/server";
import { uploadFile } from "@/lib/hooks/useFileUpload";

/**
 * API Route: Handles text-to-speech conversion using ElevenLabs API.
 *
 * **Features:**
 * - Converts text to natural-sounding speech using ElevenLabs
 * - Supports multiple voices and customizable voice settings
 * - Handles audio file storage in Cloudflare R2
 * - Stores generation metadata in Supabase
 * - Integrates with credit system for paywall management
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Generates audio using ElevenLabs API
 * 3. Uploads generated audio to cloud storage
 * 4. Stores metadata in database
 * 5. Manages user credits if paywall is enabled
 *
 * **Voice Settings:**
 * - stability: Voice stability factor
 * - similarity_boost: Voice similarity enhancement
 * - style_exaggeration: Style emphasis level
 * - speaker_boost: Speaker clarity boost
 *
 * @param {NextRequest} request - The incoming request with text and voice settings
 * @returns {Promise<NextResponse>} JSON response containing the audio URL and generation ID
 */
export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const email = user?.email;

  if (!userId) {
    console.log("User not logged in");
    return NextResponse.json(
      {
        error: "You must be logged in to use text-to-speech",
      },
      { status: 401 }
    );
  }

  try {
    // 1. Generate audio using ElevenLabs API
    const { text, voice, settings } = await request.json();

    // Validate voice ID
    if (!voice) {
      throw new Error("Voice ID is required");
    }

    // Prepare API request
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}`;
    const headers = {
      Accept: "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": process.env.ELEVENLABS_API_TOKEN!,
    };
    const data = {
      text,
      model_id: settings.model,
      voice_settings: {
        stability: settings.stability,
        similarity_boost: settings.similarity,
        style_exaggeration: settings.styleExaggeration,
        use_speaker_boost: settings.speakerBoost,
      },
    };

    // Make request to ElevenLabs
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", errorText);
      throw new Error(
        `Failed to generate audio: ${response.status} ${response.statusText}`
      );
    }

    // Get audio buffer from response
    const audioBuffer = await response.arrayBuffer();

    // 2. Upload audio file to cloud storage with unique filename
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
    const { url: uploadedAudioUrl } = await uploadFile({
      file: new Blob([audioBuffer], { type: "audio/mpeg" }),
      uploadPath: "voice/tts", // Changed path to be more specific
      contentType: "audio/mpeg",
      fileName: `audio-${uniqueId}.mp3`, // Generate unique filename with proper extension
      userId: user.id, // Add user ID for tracking
    });

    // 3. Store metadata in database
    const supabaseResponse = await uploadToSupabase(
      { email, text, voice, settings },
      uploadedAudioUrl,
      toolConfig.toolPath,
      settings.model
    );

    // 4. Handle paywall credits
    if (toolConfig.paywall === true && email) {
      await reduceUserCredits(email, toolConfig.credits);
    }

    // 5. Return audio URL and generation ID
    return NextResponse.json(
      {
        url: uploadedAudioUrl,
        id: supabaseResponse[0].id,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in text-to-speech API route:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
