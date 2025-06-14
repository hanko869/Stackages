import { AppInfoCard } from "@/app/(apps)/app-info-card";
import { AnimatedBeamMultipleInputDemo } from "@/components/magicui/animated-beam-multiple";
import { FileText } from "lucide-react";

export default function PdfAppInfo() {
  return (
    <AppInfoCard
      title="Chat with your PDF documents"
      colorScheme={{
        background: "bg-gradient-to-br from-primary/5 to-primary/10",
        border: "border-primary/10",
        text: "text-primary",
        textMuted: "text-primary",
      }}
      overview={{
        icon: <FileText className="w-5 h-5" />,
        title: "PDF Chat Demo App Overview",
        description:
          "This demo app uses OpenAI and LangChain.js to process PDF documents and enable intelligent chat interactions. You can use the building blocks of this app to create your own AI apps. Includes complete source code and",
        docsLink: {
          href: "https://docs.anotherwrapper.com/ai/pdf",
          text: "documentation.",
        },
      }}
      animation={<AnimatedBeamMultipleInputDemo />}
      implementation={{
        frontend: {
          path: "app/(apps)/pdf/*",
          description: "React Components using TailwindCSS & shadcn/ui",
        },
        backend: {
          path: "app/api/(apps)/pdf/*",
          description: "Next.js API Routes, OpenAI Integration, Vector Storage",
        },
        ai: {
          path: "app/(apps)/pdf/*",
          description: "Document Processing, Embeddings, Chat Logic",
        },
      }}
    />
  );
}
