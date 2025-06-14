export const AI_MODEL_DISPLAY = {
  "gpt-4o-mini": {
    name: "GPT-4o mini",
    logo: "/providers/openai.webp",
    vision: true,
  },
  "gpt-4o": {
    name: "GPT-4o",
    logo: "/providers/openai.webp",
    vision: true,
  },
  "claude-3-5-sonnet-latest": {
    name: "Claude 3.5 Sonnet",
    logo: "/providers/anthropic.jpeg",
    vision: true,
  },
  "claude-3-5-haiku-latest": {
    name: "Claude 3.5 Haiku",
    logo: "/providers/anthropic.jpeg",
    vision: false,
  },
  "llama-3.2-90b-vision-preview": {
    name: "Llama 3.2 Vision",
    logo: "/providers/meta.jpeg",
    vision: false,
  },
  "llama-3.1-70b-versatile": {
    name: "Llama 3.1 (Pro)",
    logo: "/providers/meta.jpeg",
    vision: false,
  },
  "grok-beta": {
    name: "Grok",
    logo: "/providers/xai.png",
    vision: false,
  },
  // "grok-vision-beta": {
  //   name: "Grok Vision",
  //   logo: "/providers/xai.png",
  //   vision: true,
  // },
} as const;

// Get model IDs from the display object
export const AI_MODELS = Object.keys(AI_MODEL_DISPLAY) as Array<
  keyof typeof AI_MODEL_DISPLAY
>;

// Type for model IDs
export type AIModel = keyof typeof AI_MODEL_DISPLAY;

// Type for model display info
export type AIModelDisplayInfo = {
  id: AIModel;
  name: string;
  logo: string;
};

// List of models with their display info
export const availableModels: AIModelDisplayInfo[] = AI_MODELS.map((model) => ({
  id: model,
  name: AI_MODEL_DISPLAY[model].name,
  logo: AI_MODEL_DISPLAY[model].logo,
}));
