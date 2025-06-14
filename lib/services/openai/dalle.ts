import { openai } from "@/lib/clients/openai";

export async function generateImageResponse(prompt: string, aiModel: string) {
  try {
    const image = await openai.images.generate({
      model: aiModel,
      prompt: prompt,
    });

    return image;
  } catch (error) {
    console.error("Error with OpenAI request: ", error);
    throw error;
  }
}
