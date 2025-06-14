import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { groq } from "@ai-sdk/groq";
import { xai } from "@ai-sdk/xai";
import { Experimental_LanguageModelV1Middleware } from "ai";

export const customMiddleware: Experimental_LanguageModelV1Middleware = {};

type ModelProvider = "openai" | "anthropic" | "groq" | "xai";

// Helper to determine provider from model ID
function getProviderFromModelId(modelId: string): ModelProvider {
  if (modelId.startsWith("gpt")) return "openai";
  if (modelId.startsWith("claude")) return "anthropic";
  if (modelId.startsWith("llama")) return "groq";
  if (modelId.startsWith("grok")) return "xai";
  return "openai"; // fallback
}

/**
 * Get model instance based on provider and model name
 */
function getModelInstance(provider: ModelProvider, modelName: string) {
  switch (provider) {
    case "openai":
      return openai(modelName);
    case "anthropic":
      return anthropic(modelName);
    case "groq":
      return groq(modelName);
    case "xai":
      return xai(modelName);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

/**
 * Creates a customized AI model instance with specific settings
 */
export function customModel(modelId: string) {
  const provider = getProviderFromModelId(modelId);
  console.log(
    `Creating model instance for ${modelId} using ${provider} provider`
  );

  return wrapLanguageModel({
    model: getModelInstance(provider, modelId),
    middleware: customMiddleware,
  });
}
