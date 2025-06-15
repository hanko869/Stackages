import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import { openai } from "@ai-sdk/openai";
import { Experimental_LanguageModelV1Middleware } from "ai";

export const customMiddleware: Experimental_LanguageModelV1Middleware = {};

/**
 * Creates a customized AI model instance with specific settings
 * Currently only supports OpenAI models
 */
export function customModel(modelId: string) {
  console.log(`Creating model instance for ${modelId} using openai provider`);

  // For now, we only support OpenAI models
  // Other providers can be added back when needed
  return wrapLanguageModel({
    model: openai(modelId),
    middleware: customMiddleware,
  });
}
