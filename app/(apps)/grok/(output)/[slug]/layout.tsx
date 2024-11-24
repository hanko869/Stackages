import { DashboardLayout } from "@/components/dashboard/Layout";
import { toolConfig } from "@/app/(apps)/grok/toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  openGraph: {
    images: [toolConfig.metadata.og_image],
  },
  alternates: {
    canonical: toolConfig.metadata.canonical,
  },
};

export default function NoGreetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout toolConfig={toolConfig} showGreeting={false}>
      {children}
    </DashboardLayout>
  );
}
