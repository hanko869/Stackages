export const functionSchema = [
  {
    name: "generate_comprehensive_growth_plan",
    description:
      "This function generates a detailed growth plan for a startup, combining traditional growth tactics with creative growth hacking strategies, tailored to the startup's specific needs and goals. The output is structured in JSON.",
    parameters: {
      type: "object",
      properties: {
        seoMetadata: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description:
                "SEO-optimized title for the growth plan (50-60 characters)",
            },
            subtitle: {
              type: "string",
              description:
                "SEO-optimized subtitle for the growth plan (50-100 characters)",
            },
            description: {
              type: "string",
              description:
                "SEO-optimized description summarizing the growth plan (150-160 characters)",
            },
          },
          required: ["title", "subtitle", "description"],
        },
        traditionalGrowthTactics: {
          type: "array",
          items: {
            type: "object",
            properties: {
              tacticName: {
                type: "string",
                description: "Name of the traditional growth method.",
              },
              specificActions: {
                type: "array",
                items: {
                  type: "string",
                  description:
                    "Concrete steps the startup should take to implement this tactic.",
                },
                description: "A detailed action plan for the tactic.",
              },
              toolsRecommended: {
                type: "array",
                items: {
                  type: "string",
                  description:
                    "Recommended tools or services that can aid in executing the tactic.",
                },
                description: "Tools and services recommended for the tactic.",
              },
              keywords: {
                type: "string",
                description:
                  "An array of strings, listing at least 10 possible keywords the user can target & explain how the user can validate which keywords to target (volume, competitiveness, ..).",
              },
              expectedImpact: {
                type: "string",
                description:
                  "The potential impact of the tactic on the startup's growth.",
              },
            },
            required: [
              "tacticName",
              "specificActions",
              "toolsRecommended",
              "expectedImpact",
            ],
          },
          description: "Detailed plans for traditional growth tactics.",
        },
        creativeGrowthHacks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              campaignName: {
                type: "string",
                description: "A catchy name for the creative growth campaign.",
              },
              description: {
                type: "string",
                description: "A detailed description of the creative campaign.",
              },
              expectedResults: {
                type: "string",
                description: "The anticipated outcomes of the campaign.",
              },
              trackingMetrics: {
                type: "string",
                description:
                  "Specific metrics to measure the success of the campaign.",
              },
            },
            required: [
              "campaignName",
              "description",
              "expectedResults",
              "trackingMetrics",
            ],
          },
          description: "An array of creative growth hacking campaigns.",
        },
      },
      required: [
        "seoMetadata",
        "traditionalGrowthTactics",
        "creativeGrowthHacks",
      ],
    },
  },
];
