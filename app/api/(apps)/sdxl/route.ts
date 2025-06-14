import { replicate } from "@/lib/clients/replicate";
import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { uploadFile } from "@/lib/hooks/useFileUpload";
import { uploadToSupabase, reduceUserCredits } from "@/lib/db/mutations";

/**
 * API Route: Generates images using the SDXL model via Replicate and handles the response.
 *
 * **Process:**
 * 1. Authenticates the user.
 * 2. Parses the request body to extract prompts and parameters.
 * 3. Runs the SDXL model on Replicate to generate an image.
 * 4. Uploads the generated image to cloud storage using `uploadFile`.
 * 5. Stores metadata in Supabase.
 * 6. Reduces user credits if paywall is enabled.
 * 7. Returns the image URL and database record ID to the client.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} JSON response containing the image URL and ID.
 */
export async function POST(request: NextRequest) {
  // Authenticate the user and get user data
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  // Get user from the middleware-enhanced request
  const user = (request as any).user;

  try {
    const requestBody = await request.json();
    const toolPath = decodeURIComponent(requestBody.toolPath);

    // Dynamically import the toolConfig based on the tool name
    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);

    const prompt = requestBody.prompt;
    const negativePrompt = requestBody.negativePrompt;

    // Generate image using Replicate's SDXL model
    const responseData = await replicate.run(toolConfig.aiModel, {
      input: {
        width: 768,
        height: 768,
        prompt: prompt,
        refine: "expert_ensemble_refiner",
        scheduler: "K_EULER",
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: negativePrompt,
        prompt_strength: 0.8,
        num_inference_steps: 25,
      },
    });

    // Get the image URL from the Replicate response
    const imageUrl = Array.isArray(responseData)
      ? responseData[0]
      : responseData;

    if (typeof imageUrl !== "string") {
      throw new Error("Invalid image URL received from Replicate");
    }

    // Upload the image to cloud storage using `uploadFile`
    const { url: uploadedImageUrl } = await uploadFile({
      imageUrl,
      uploadPath: toolConfig.upload.path,
      skipMetadata: false,
      userId: user.id,
    });

    // Store the response in Supabase
    const supabaseResponse = await uploadToSupabase(
      requestBody,
      uploadedImageUrl,
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // Reduce user credits if paywall is enabled
    if (toolConfig.paywall === true) {
      await reduceUserCredits(user.email, toolConfig.credits);
    }

    // Return the ID and image URL to the client
    return NextResponse.json(
      {
        id: supabaseResponse[0].id,
        imageUrl: uploadedImageUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in SDXL route:", error);
    return NextResponse.json(
      {
        status: "Error",
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
