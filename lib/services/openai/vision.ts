import { openai } from "@/lib/clients/openai";

export async function generateVisionResponse(
  prompt: any,
  image_url: any,
  aiModel: string,
  systemMessage?: string
) {
  try {
    console.log("GPT Vision request received for image: ", image_url);
    const response = await openai.chat.completions.create({
      model: aiModel,
      messages: [
        {
          role: "system",
          content: systemMessage || "You are a helpful assistant. ",
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: image_url,
              },
            },
          ],
        },
      ],
    });
    return response;
  } catch (error) {
    console.error("Error with OpenAI request: ", error);
    throw error;
  }
}
