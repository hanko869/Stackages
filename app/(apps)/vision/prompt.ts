// Important when using GPT-4 Vision
// It does not support function calling as of the time of me writing the code so as a workaround, specifying the function in the prompt is the best way to go about it.
// It's really important to always keep the last sentence (do not include ``json ...) otherwise response is not in correct JSON.

export function generatePrompt(body: any) {
  const { descriptionType } = body;

  return `Generate a detailed and engaging description for the provided image. The description should be informative, concise, and tailored to the specified type: ${descriptionType}. Ensure the output adheres strictly to the function schema.

INSTRUCTIONS:
- Provide a brief overview of the image, including its main subjects, objects, or scenes.
- Describe the image's visual elements, such as colors, textures, and shapes.
- Identify any notable objects, people, or scenery in the image.
- Ensure the description is concise, clear, and engaging for the target audience.
- Generate SEO-friendly metadata for the image description.

OUTPUT STRUCTURE:
1. seoMetadata (Object):
   - title (String): SEO-optimized title for the image description (50-60 characters)
   - subtitle (String): SEO-optimized subtitle for the image description (50-100 characters)
   - description (String): SEO-optimized description summarizing the image (150-160 characters)

2. imageDescription (Object):
   - description (String): A concise and engaging description of the image.
   - visualElements (Array of Strings): Each describing a visual element in the image (e.g., colors, textures, shapes).
   - objectsScenes (Array of Strings): Each describing a notable object or scenery in the image.

Ensure every field is filled with detailed and descriptive information. Empty fields are unacceptable.
The output must adhere strictly to the function schema. Any deviation is unacceptable.`;
}
