import Output from "./output";
import { toolConfig } from "../../toolConfig";
import { Metadata } from "next";
import { getGenerationBySlug } from "@/lib/db/cached-queries";
import { notFound } from "next/navigation";
import { RawGenerationData, ProcessedGenerationData } from "./types";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const generationData = await getGenerationBySlug(params.slug);

  return {
    title: generationData?.title || toolConfig.metadata.title,
    description: generationData?.description || toolConfig.metadata.description,
    openGraph: {
      images: [toolConfig.metadata.og_image || ""],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
  const rawGenerationData = (await getGenerationBySlug(
    params.slug
  )) as unknown as RawGenerationData;

  if (!rawGenerationData) {
    notFound();
  }

  const generationData: ProcessedGenerationData = {
    name: rawGenerationData.title,
    description: rawGenerationData.description,
    parameters: {
      ...rawGenerationData.output_data,
      topComments: rawGenerationData.output_data.topComments.map((comment) => ({
        ...comment,
        reaction: comment.reaction || "No reaction",
      })),
    },
  };

  return <Output generationData={generationData} />;
}
