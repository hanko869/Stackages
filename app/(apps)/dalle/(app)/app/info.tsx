import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { IconOpenAI } from "@/components/icons";

export default function InfoCard() {
  return (
    <AppInfoCard
      title="Generate a logo using DALL-E"
      colorScheme={{
        background: "bg-gradient-to-br from-primary/10 to-primary/20",
        border: "border-primary/40",
        text: "text-primary-600",
        textMuted: "text-primary-600",
      }}
      overview={{
        icon: <IconOpenAI className="w-5 h-5" />,
        title: "DALL-E Demo App Overview",
        description:
          "This demo app uses OpenAI's DALL-E to create unique and creative logos from text descriptions. You can use the building blocks of this app to create your own AI apps. Includes complete source code and documentation.",
        docsLink: {
          href: "https://docs.anotherwrapper.com/ai/dalle",
          text: "documentation",
        },
      }}
      animation={<AnimatedBeamOpenAI />}
      implementation={{
        frontend: {
          path: "app/(apps)/dalle/*",
          description: "React Components using TailwindCSS & shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/dalle/route.ts",
          description: "Next.js API Routes, DALL-E Integration, R2 Storage",
        },
        ai: {
          path: "app/(apps)/dalle/*",
          description: "Prompts, Image Generation, Storage Logic",
        },
      }}
    />
  );
}
