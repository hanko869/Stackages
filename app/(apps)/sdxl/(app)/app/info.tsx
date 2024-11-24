import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { ImageIcon } from "lucide-react";

export default function InfoCard() {
  return (
    <AppInfoCard
      title="Generate images using SDXL"
      colorScheme={{
        background: "bg-gradient-to-br from-primary/5 to-primary/10",
        border: "border-primary/20",
        text: "text-primary-600",
        textMuted: "text-primary-600",
      }}
      overview={{
        icon: <ImageIcon className="w-5 h-5" />,
        title: "SDXL Demo App Overview",
        description:
          "This demo app uses Stable Diffusion XL and Replicate to generate high-quality images from text descriptions. You can use the building blocks of this app to create your own AI apps. Includes complete source code and documentation.",
        docsLink: {
          href: "https://docs.anotherwrapper.com/ai/sdxl",
          text: "documentation",
        },
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/sdxl/*",
          description: "React Components using TailwindCSS & shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/sdxl/route.ts",
          description:
            "Next.js API Routes, SDXL & Replicate Integration, R2 Storage",
        },
        ai: {
          path: "app/(apps)/sdxl/*",
          description: "Prompts, Image Generation, Storage Logic",
        },
      }}
    />
  );
}
