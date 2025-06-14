import { ChatOpenAI } from "@langchain/openai";
import { NextResponse, NextRequest } from "next/server";
import { uploadToSupabase, reduceUserCredits } from "@/lib/db/mutations";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

/**
 * API Route: Handles AI interactions using OpenAI's GPT models.
 *
 * **Features:**
 * - Leverages OpenAI's GPT for advanced language processing
 * - Supports structured output based on function schemas
 * - Handles dynamic tool configurations and prompts
 * - Stores generation history in Supabase
 * - Integrates with credit system for paywall management
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Loads dynamic tool configurations
 * 3. Generates structured response using GPT
 * 4. Stores the response in database
 * 5. Manages user credits if paywall is enabled
 *
 * @param {NextRequest} request - The incoming request with toolPath and parameters
 * @returns {Promise<NextResponse>} JSON response containing the generation ID
 */
export async function POST(request: NextRequest) {
  // Authenticate user
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  try {
    // Extract and decode tool path
    const requestBody = await request.json();
    const toolPath = decodeURIComponent(requestBody.toolPath);

    // Dynamically import tool configurations
    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);
    const { generatePrompt } = await import(`@/app/${toolPath}/prompt`);
    const { functionSchema } = await import(`@/app/${toolPath}/schema`);

    // Prepare prompt and function call
    const prompt = generatePrompt(requestBody);
    const functionCall = functionSchema[0];

    // Initialize OpenAI with configuration
    const openAI = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: toolConfig.aiModel,
    });

    // Setup structured output handling
    const chatWithStructuredOutput = openAI.withStructuredOutput(functionCall);

    // Generate response from GPT
    const responseData = await chatWithStructuredOutput.invoke([
      ["system", String(toolConfig.systemMessage)],
      ["human", String(prompt)],
    ]);

    console.log("Response from GPT:", responseData);

    // Store generation in database
    const supabaseResponse = await uploadToSupabase(
      requestBody,
      responseData,
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // Handle paywall credits
    if (toolConfig.paywall === true) {
      await reduceUserCredits(requestBody.email, toolConfig.credits);
    }

    return new NextResponse(
      JSON.stringify({
        slug: supabaseResponse[0].slug,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GPT route:", error);
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
