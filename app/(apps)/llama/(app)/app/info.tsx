import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { Cpu } from "lucide-react";

export default function InfoCard() {
  return (
    <AppInfoCard
      title="Return structured output using LLaMA"
      colorScheme={{
        background: "bg-gradient-to-br from-primary/40 to-primary/50",
        border: "border-primary/20",
        text: "text-primary-600",
        textMuted: "text-primary-600",
      }}
      overview={{
        icon: <Cpu className="w-5 h-5" />,
        title: "LLaMA Demo App Overview",
        description:
          "This demo app uses Groq & LLaMA 3 to generate structured JSON output from text input. You can use the building blocks of this app to create your own AI apps. Includes complete source code and documentation.",
        docsLink: {
          href: "https://docs.anotherwrapper.com/ai/llama",
          text: "documentation",
        },
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/llama/*",
          description: "React Components using TailwindCSS & shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/llama/route.ts",
          description: "Next.js API Routes, Groq & LLaMA Integration, Supabase",
        },
        ai: {
          path: "app/(apps)/llama/*",
          description: "Prompts, JSON Schema, Text Processing Logic",
        },
      }}
    />
  );
}
