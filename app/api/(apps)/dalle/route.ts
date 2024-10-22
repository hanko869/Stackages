import { generateImageResponse } from "@/lib/services/openai/dalle";
import { NextResponse, NextRequest } from "next/server";
import { uploadToSupabase } from "@/lib/hooks/uploadToSupabase";
import { companyConfig } from "@/config";
import { reduceUserCredits } from "@/lib/hooks/reduceUserCredits";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

export async function POST(request: NextRequest) {
  // Check if the user is authenticated
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  try {
    const requestBody = await request.json();
    const toolPath = decodeURIComponent(requestBody.toolPath); // get tool path from request body

    // Dynamically import the toolConfig and prompt based on the tool name
    const { generatePrompt } = await import(`@/app/${toolPath}/prompt`);
    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);

    // Generate prompt and function call
    const prompt = generatePrompt(requestBody);

    // Generate response from OpenAI
    const responseData = await generateImageResponse(
      prompt,
      toolConfig.aiModel
    );

    // Get the image URL from the OpenAI response
    const imageUrl = responseData.data[0].url;

    // Prepare the data for upload
    const uploadData = {
      imageUrl,
      uploadPath: toolConfig.upload.path,
    };

    // Get the base upload API URL
    const apiUrl = `${companyConfig.company.homeUrl}/api/upload/image`;

    // Upload the image to Cloudflare
    const uploadResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const uploadResult = await uploadResponse.json();

    // Extract the URL from the upload result
    const uploadedImageUrl = uploadResult.url;

    // Alternatively, if you dont want to upload image to Cloudflare, you can directly use the image URL from OpenAI response and delete the above code

    // Store the response in Supabase
    const supabaseResponse = await uploadToSupabase(
      requestBody,
      uploadedImageUrl,
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // If paywall is enabled, reduce user credits
    if (toolConfig.paywall === true) {
      await reduceUserCredits(requestBody.email, toolConfig.credits);
    }

    // Return the ID of the stored data, so the client can redirect to the result page
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
