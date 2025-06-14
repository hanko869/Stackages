import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { IconOpenAI } from "@/components/icons";

export default function InfoCard() {
  return (
    <AppInfoCard
      title="Return structured output using GPT"
      colorScheme={{
        background: "bg-gradient-to-br from-primary/5 to-primary/10",
        border: "border-primary/10",
        text: "text-gray-900",
        textMuted: "text-gray-900",
      }}
      overview={{
        icon: <IconOpenAI className="w-5 h-5" />,
        title: "GPT Demo App Overview",
        description:
          "This demo app uses OpenAI's GPT-4o mini to generate structured JSON output from text input. You can use the building blocks of this app to create your own AI apps. Includes complete source code and documentation.",
        docsLink: {
          href: "https://docs.anotherwrapper.com/ai/gpt",
          text: "documentation",
        },
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/gpt/*",
          description: "React Components using TailwindCSS & shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/gpt/route.ts",
          description: "Next.js API Routes, OpenAI GPT Integration, Supabase",
        },
        ai: {
          path: "app/(apps)/gpt/*",
          description: "Prompts, JSON Schema, Text Processing Logic",
        },
      }}
    />
  );
}
