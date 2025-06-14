import { z } from "zod";

export const launchSimulatorSchema = z.object({
  seoMetadata: z.object({
    title: z.string().describe("Catchy title for the launch day simulation"),
    subtitle: z.string().describe("Funny subtitle about the product launch"),
    description: z
      .string()
      .describe("Brief description of the launch day drama"),
  }),
  launchStats: z.object({
    upvotes: z.number(),
    comments: z.number(),
    ranking: z.number(),
    collections: z.number(),
    launchScore: z.number(),
    featured: z.boolean(),
    rejectionReason: z.string().optional(),
  }),
  timeline: z
    .array(
      z.object({
        time: z.string(),
        event: z.string(),
        impact: z.string(),
        upvoteCount: z.number(),
      })
    )
    .length(8),
  topComments: z
    .array(
      z.object({
        author: z.string(),
        comment: z.string(),
        reaction: z.string(),
        impact: z.number(),
      })
    )
    .length(3),
  makerMistakes: z.array(z.string()).length(6),
  competitorDrama: z
    .array(
      z.object({
        competitor: z.string(),
        comment: z.string(),
        drama: z.string(),
      })
    )
    .length(2),
  plotTwists: z
    .array(
      z.object({
        moment: z.string(),
        reaction: z.string(),
      })
    )
    .length(3),
  bingoCard: z
    .array(
      z.object({
        text: z.string(),
        isChecked: z.boolean(),
        timestamp: z.string().optional(),
      })
    )
    .length(16),
  founderProfile: z.object({
    name: z.string(),
    archetype: z.string(),
    catchphrase: z.string(),
    typicalTweet: z.string(),
    quirks: z.array(z.string()).length(3),
    reputation: z.number(),
  }),
});
