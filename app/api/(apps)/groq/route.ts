import { ChatGroq } from "@langchain/groq";
import { NextResponse, NextRequest } from "next/server";
import { uploadToSupabase } from "@/lib/hooks/uploadToSupabase";
import { reduceUserCredits } from "@/lib/hooks/reduceUserCredits";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

export async function POST(request: NextRequest) {
  // Check if the user is authenticated
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  try {
    const requestBody = await request.json();
    const toolPath = decodeURIComponent(requestBody.toolPath);

    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);
    const { functionSchema } = await import(`@/app/${toolPath}/schema`);
    const { generatePrompt } = await import(`@/app/${toolPath}/prompt`);

    const functionCall = functionSchema[0];
    const prompt = generatePrompt(requestBody);

    const chat = new ChatGroq({
      model: toolConfig.aiModel,
      maxTokens: 2000,
    });

    const chatWithStructuredOutput = chat.withStructuredOutput(functionCall);

    const responseData = await chatWithStructuredOutput.invoke([
      ["system", String(toolConfig.systemMessage)],
      ["human", String(prompt)],
    ]);

    console.log("Response from Groq:", responseData);

    // Store the response in generations table
    const supabaseResponse = await uploadToSupabase(
      requestBody,
      responseData,
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // If paywall is enabled, reduce user credits
    if (toolConfig.paywall === true) {
      await reduceUserCredits(requestBody.email, toolConfig.credits);
    }

    return new NextResponse(
      JSON.stringify({
        id: supabaseResponse[0].id,
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
