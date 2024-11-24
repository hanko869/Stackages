import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { MessageSquare } from "lucide-react";

export default function InfoCard() {
  return (
    <AppInfoCard
      title="Claude 3.5 Sonnet text generator"
      colorScheme={{
        background: "bg-gradient-to-br from-blue-50/50 to-slate-50/50",
        border: "border-blue-100/50",
        text: "text-blue-600/80",
        textMuted: "text-blue-500/80",
      }}
      overview={{
        icon: <MessageSquare className="w-4 h-4" />,
        title: "Text Generation Demo App Overview",
        description:
          "This demo app uses Claude 3.5 Sonnet and LangChain to generate structured JSON output. You can use the building blocks of this app to create your own AI apps. Includes complete source code and documentation.",
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/claude/(app)/*",
          description: "React Components using TailwindCSS & shadcn/ui.",
        },
        backend: {
          path: "app/api/(apps)/claude/route.ts",
          description:
            "Next.js API Routes, Claude & LangChain Integration, Supabase",
        },
        ai: {
          path: "app/(apps)/claude/*",
          description: "Prompts, JSON Schema, Text Processing Logic",
        },
      }}
    />
  );
}
