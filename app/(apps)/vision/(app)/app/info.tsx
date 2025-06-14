import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { Eye } from "lucide-react";

export default function InfoCard() {
  return (
    <AppInfoCard
      title="Vision AI Image Analysis"
      colorScheme={{
        background: "bg-gradient-to-br from-primary/10 to-primary/20",
        border: "border-primary/20",
        text: "text-primary",
        textMuted: "text-primary",
      }}
      overview={{
        icon: <Eye className="w-5 h-5" />,
        title: "GPT-4o Vision Demo App Overview",
        description:
          "This demo app uses GPT-4o's vision capabilities to analyze images and generate detailed descriptions. You can use the building blocks of this app to create your own AI apps. Includes complete source code and documentation.",
        docsLink: {
          href: "https://docs.anotherwrapper.com/ai/vision",
          text: "documentation",
        },
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/vision/(app)/*",
          description: "React Components, TailwindCSS, shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/vision/*",
          description: "Next.js API Routes, R2 & Supabase Integration",
        },
        ai: {
          path: "app/(apps)/vision/*",
          description: "Prompts, JSON Schema, Image Processing",
        },
      }}
    />
  );
}
