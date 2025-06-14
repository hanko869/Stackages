import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { uploadToSupabase, reduceUserCredits } from "@/lib/db/mutations";
import { functionSchema } from "@/app/(apps)/vision/schema";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

/**
 * API Route: Handles image analysis using OpenAI's GPT-4 Vision model.
 *
 * **Features:**
 * - Processes images using GPT-4 Vision capabilities
 * - Supports structured output based on function schemas
 * - Handles dynamic tool configurations and prompts
 * - Stores analysis results in Supabase
 * - Integrates with credit system for paywall management
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Loads dynamic tool configurations
 * 3. Processes image using GPT-4 Vision
 * 4. Generates structured analysis response
 * 5. Stores results in database
 * 6. Manages user credits if paywall is enabled
 *
 * @param {NextRequest} request - The incoming request with imageUrl and parameters
 * @returns {Promise<NextResponse>} JSON response containing the analysis ID
 */
export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userId) {
    return NextResponse.json({
      error: "You must be logged in to use this service!",
    });
  }

  try {
    // Extract request parameters
    const requestBody = await request.json();
    const { imageUrl } = requestBody;
    const toolPath = decodeURIComponent(requestBody.toolPath);

    // Dynamically import tool configurations
    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);
    const { generatePrompt } = await import(`@/app/${toolPath}/prompt`);

    // Generate prompt for image analysis
    const prompt = generatePrompt(requestBody);

    // Initialize GPT-4 Vision
    const chat = new ChatOpenAI({
      modelName: toolConfig.aiModel,
      temperature: 0,
    });

    // Setup structured output handling
    const chatWithStructuredOutput = chat.withStructuredOutput(
      functionSchema.parameters
    );

    // Process image and generate analysis
    console.log("GPT Vision request received for image:", imageUrl);
    const response = await chatWithStructuredOutput.invoke([
      new SystemMessage(
        toolConfig.systemMessage || "You are a helpful assistant."
      ),
      new HumanMessage({
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      }),
    ]);

    console.log("Parsed OpenAI Response:", response);

    // Store analysis results in database
    const supabaseResponse = await uploadToSupabase(
      requestBody,
      response, // Direct structured response
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // Handle paywall credits
    if (toolConfig.paywall === true && userEmail) {
      await reduceUserCredits(userEmail, toolConfig.credits);
    }

    // Return analysis ID for client redirect
    return new NextResponse(
      JSON.stringify({
        slug: supabaseResponse[0].slug,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Vision route:", error);
    return new NextResponse(
      JSON.stringify({
        status: "Error",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      }),
      { status: 500 }
    );
  }
}
