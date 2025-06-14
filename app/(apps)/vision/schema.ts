export const functionSchema = {
  name: "generate_image_description",
  description:
    "This function generates a detailed and engaging description for a provided image.",
  parameters: {
    type: "object",
    properties: {
      seoMetadata: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description:
              "SEO-optimized title for the image description (50-60 characters)",
          },
          subtitle: {
            type: "string",
            description:
              "SEO-optimized subtitle for the image description (50-100 characters)",
          },
          description: {
            type: "string",
            description:
              "SEO-optimized description summarizing the image (150-160 characters)",
          },
        },
        required: ["title", "subtitle", "description"],
      },
      imageDescription: {
        type: "object",
        properties: {
          description: {
            type: "string",
            description: "A concise and engaging description of the image.",
          },
          visualElements: {
            type: "array",
            items: {
              type: "string",
            },
            description:
              "An array of visual elements in the image (e.g., colors, textures, shapes).",
          },
          objectsScenes: {
            type: "array",
            items: {
              type: "string",
            },
            description: "An array of notable objects or scenery in the image.",
          },
        },
        required: ["description", "visualElements", "objectsScenes"],
      },
    },
    required: ["seoMetadata", "imageDescription"],
  },
};
