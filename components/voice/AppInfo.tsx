import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { Mic } from "lucide-react";

export default function VoiceAppInfo() {
  return (
    <AppInfoCard
      title="Text to Speech Conversion"
      colorScheme={{
        background: "bg-gradient-to-br from-primary/5 to-primary/10",
        border: "border-primary/10",
        text: "text-primary",
        textMuted: "text-primary",
      }}
      overview={{
        icon: <Mic className="w-5 h-5" />,
        title: "Voice Generation Demo App Overview",
        description:
          "This demo app uses ElevenLabs' advanced AI technology to convert text into natural-sounding speech with customizable voices. You can use the building blocks of this app to create your own AI apps. Includes complete source code and",
        docsLink: {
          href: "https://docs.anotherwrapper.com/ai/voice",
          text: "documentation.",
        },
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/voice/*",
          description: "React Components using TailwindCSS & shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/voice/*",
          description: "Next.js API Routes, ElevenLabs Integration, R2 Storage",
        },
        ai: {
          path: "app/(apps)/voice/*",
          description: "Voice Generation, Audio Processing Logic",
        },
      }}
    />
  );
}
