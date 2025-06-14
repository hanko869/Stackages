import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import { toolConfig } from "@/app/(apps)/audio/toolConfig";
import { z } from "zod";
/**
 * Schema for structured output from the AI model.
 * Defines the expected format of the summary, including:
 * - title: A descriptive title for the voice message
 * - summary: A third-person perspective summary
 * - actionItems: A list of explicit action items
 */
const SummarizeSchema = z.object({
  title: z
    .string()
    .min(5)
    .describe(
      "A short descriptive title summarizing the main topic of the voice message"
    ),
  summary: z
    .string()
    .describe(
      "A summary from a third-party perspective describing what is discussed in the voice message."
    ),
  actionItems: z
    .array(z.string())
    .nonempty()
    .describe(
      "A clear and concise list of action items derived from the voice note. Ensure all action items are explicitly stated and resolved if nested"
    ),
});

/**
 * API Route: Generates a structured summary of transcribed audio using Groq AI.
 *
 * **Process:**
 * 1. Authenticates the user.
 * 2. Processes the transcript using Groq AI to generate:
 *    - A descriptive title
 *    - A comprehensive summary
 *    - A list of action items
 * 3. Stores the summary in the database.
 * 4. Updates the recording title.
 * 5. Returns the summary ID.
 *
 * @param {NextRequest} request - The incoming request containing the transcript and recordingId.
 * @returns {Promise<NextResponse>} JSON response containing the summary ID.
 */
export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({
      error: "You must be logged in to ingest data",
    });
  }

  try {
    const requestBody = await request.json();
    const { transcript, recordingId } = requestBody;

    if (!recordingId) {
      return NextResponse.json({
        error: "Document ID is required",
      });
    }

    // Generate structured summary using ai-sdk
    const { object: responseData } = await generateObject({
      model: groq(toolConfig.aiModel),
      schema: SummarizeSchema,
      system: toolConfig.systemMessage,
      prompt: transcript,
    });

    console.log("Response from Groq:", responseData);

    const { title, summary, actionItems } = responseData;

    // Keep the same database operations
    const { data: summaryData, error: summaryError } = await supabase
      .from("summaries")
      .insert({
        recording_id: recordingId,
        summary: summary,
        action_items: actionItems,
        title: title,
        model: toolConfig.aiModel,
      })
      .select();

    if (summaryError) {
      throw new Error(summaryError.message);
    }

    console.log("Summary inserted successfully:", summaryData);

    const { data: recordingData, error: recordingError } = await supabase
      .from("recordings")
      .update({ title: title })
      .eq("id", recordingId)
      .select();

    if (recordingError) {
      throw new Error(recordingError.message);
    }

    console.log("Recording updated successfully:", recordingData);

    return new NextResponse(
      JSON.stringify({
        id: summaryData[0].id,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ status: "Error", message: error.message }),
        { status: 500 }
      );
    } else {
      console.error(error);
      return new NextResponse(
        JSON.stringify({
          status: "Error",
          message: "An unknown error occurred",
        }),
        { status: 500 }
      );
    }
  }
}
