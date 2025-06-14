import { AIModel } from "@/lib/ai/models";

// Simple tier system: Free vs Premium
export const FREE_MODELS = [
  "gpt-4o-mini",
  "claude-3-5-haiku-latest",
  "llama-3.1-70b-versatile",
] as const;

export function canUseConfiguration(
  credits: number,
  config: {
    modelId?: AIModel;
    isBrowseEnabled: boolean;
  }
) {
  // Always allow free models without web browsing
  if (
    !config.isBrowseEnabled &&
    (!config.modelId || FREE_MODELS.includes(config.modelId as any))
  ) {
    return { canUse: true, requiredCredits: 0 };
  }

  // Premium features require credits
  const requiredCredits = 1; // Simplified: 1 credit per premium action

  if (credits < requiredCredits) {
    return {
      canUse: false,
      reason: `This requires credits. You have ${credits} credits remaining. Free models are always available!`,
      requiredCredits,
    };
  }

  return { canUse: true, requiredCredits };
}
