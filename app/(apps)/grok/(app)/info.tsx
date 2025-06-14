import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { Rocket } from "lucide-react";

export default function InfoCard() {
  return (
    <AppInfoCard
      title="Product Hunt Launch Day Simulator"
      colorScheme={{
        background: "bg-gradient-to-br from-orange-50 to-amber-50",
        border: "border-orange-200",
        text: "text-orange-600",
        textMuted: "text-orange-600",
      }}
      overview={{
        icon: <Rocket className="w-5 h-5" />,
        title: "Product Hunt Demo App Overview",
        description:
          "This demo app uses xAI's Grok to simulate Product Hunt launches with metrics and community interactions. You can use the building blocks of this app to create your own AI apps. Includes complete source code and documentation.",
        docsLink: {
          href: "https://docs.anotherwrapper.com/apps/producthunt",
          text: "documentation",
        },
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/grok/(app)/*",
          description: "React Components using TailwindCSS & shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/grok/route.ts",
          description: "Next.js API Routes, Grok Integration, Supabase",
        },
        ai: {
          path: "app/(apps)/grok/*",
          description: "Prompts, JSON Schema, Launch Simulation Logic",
        },
      }}
    />
  );
}
