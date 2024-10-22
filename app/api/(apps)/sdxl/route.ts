import { replicate } from "@/lib/replicate";
import { NextResponse, NextRequest } from "next/server";
import { reduceUserCredits } from "@/lib/hooks/reduceUserCredits";
import { companyConfig } from "@/config";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { createClient } from "@/lib/utils/supabase/server";

export async function POST(request: NextRequest) {
  // Check if the user is authenticated
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  try {
    const requestBody = await request.json();
    const toolPath = decodeURIComponent(requestBody.toolPath);

    // Dynamically import the toolConfig, prompt and functionCall based on the tool name
    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);

    const prompt = requestBody.prompt;
    const negativePrompt = requestBody.negativePrompt;

    // Generate response from Replicate
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
    const imageUrl = responseData;

    // Prepare the data for upload
    const uploadData = {
      imageUrl,
      uploadPath: toolConfig.upload.path,
    };

    // Get the base URL
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

    // Upload to Supabase
    const supabase = createClient();

    const insertData: any = {
      email: requestBody.email,
      input_data: requestBody,
      output_data: uploadedImageUrl,
      type: toolConfig.toolPath,
      model: toolConfig.aiModel,
    };

    const { data: supabaseData, error: supabaseError } = await supabase
      .from("generations")
      .insert([insertData])
      .select();

    if (supabaseError) throw new Error(supabaseError.message);

    // If paywall is enabled, reduce user credits after successful generation
    if (toolConfig.paywall === true) {
      await reduceUserCredits(requestBody.email, toolConfig.credits);
    }

    // Return the ID of the stored data, so the client can redirect to the result page
    return new NextResponse(
      JSON.stringify({
        id: supabaseData[0].id,
        imageUrl: uploadedImageUrl,
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
