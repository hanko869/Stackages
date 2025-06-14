import DisplayOutput from "./response";
import { toolConfig } from "../../toolConfig";
import { Metadata } from "next";
import { getGenerationBySlug } from "@/lib/db/cached-queries";
import { notFound } from "next/navigation";

// This defines what information we need from the URL
type Props = {
  params: { slug: string }; // slug is the unique ID in the URL
};

// This function generates the page's metadata (title, description, etc.)
// It runs before the page loads and helps with SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Try to find the saved generation using its unique ID (slug)
  const generationData = await getGenerationBySlug(params.slug);

  // If we can't find the generation, use default metadata
  if (!generationData) {
    return {
      title: toolConfig.metadata.title,
      description: toolConfig.metadata.description,
      openGraph: {
        images: [toolConfig.metadata.og_image || ""], // Image shown when sharing on social media
      },
    };
  }

  // If we found the generation, use its data for the metadata
  return {
    title: generationData.title || toolConfig.metadata.title,
    description: generationData.description || toolConfig.metadata.description,
    openGraph: {
      images: [toolConfig.metadata.og_image || ""],
    },
  };
}

// Tell Next.js to not cache this page - always get fresh data
export const dynamic = "force-dynamic";

// The main page component that shows the generation result
export default async function Page({ params }: Props) {
  // Try to find the saved generation
  const generationData = await getGenerationBySlug(params.slug);

  // If we can't find it, show the 404 page
  if (!generationData) {
    notFound();
  }

  // Show the generation result using our DisplayOutput component
  return (
    <DisplayOutput toolConfig={toolConfig} generationData={generationData} />
  );
}
