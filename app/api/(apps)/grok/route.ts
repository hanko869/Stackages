import { xai } from "@ai-sdk/xai";
import { generateObject } from "ai";
import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { generatePrompt } from "@/app/(apps)/grok/prompt";
import { launchSimulatorSchema } from "@/app/(apps)/grok/schema";
import { toolConfig } from "@/app/(apps)/grok/toolConfig";
import { uploadToSupabase, reduceUserCredits } from "@/lib/db/mutations";

/**
 * API Route: Handles AI interactions using xAI's Grok model.
 *
 * **Features:**
 * - Uses Vercel AI SDK's generateObject for structured output generation
 * - Validates responses against Zod schema for type safety
 * - Converts natural language into structured JSON data
 * - Stores generation history in Supabase
 * - Integrates with credit system for paywall management
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Uses generateObject to create structured data from text prompt
 * 3. Validates response against Zod schema
 * 4. Stores the structured response in database
 * 5. Manages user credits if paywall is enabled
 *
 *
 * @param {NextRequest} request - The incoming request with parameters
 * @returns {Promise<NextResponse>} JSON response containing the generation slug
 */

export async function POST(request: NextRequest) {
  // Authenticate user
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  // Get user from the middleware-enhanced request
  const user = (request as any).user;

  try {
    const requestBody = await request.json();

    // Generate response using Grok through Vercel AI SDK
    const { object: responseData } = await generateObject({
      model: xai(toolConfig.aiModel),
      schema: launchSimulatorSchema,
      system: toolConfig.systemMessage,
      prompt: generatePrompt(requestBody),
    });

    // Store generation in database
    const supabaseResponse = await uploadToSupabase(
      requestBody,
      responseData,
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // Handle paywall credits
    if (toolConfig.paywall) {
      await reduceUserCredits(user.email, toolConfig.credits);
    }

    // Return the slug
    return new NextResponse(
      JSON.stringify({
        slug: supabaseResponse[0].slug,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Grok route:", error);
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
