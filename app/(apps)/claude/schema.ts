export const functionSchema = [
  {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      parameters: {
        type: "object",
        properties: {
          seoMetadata: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description:
                  "SEO-optimized title for the business plan (50-60 characters)",
              },
              subtitle: {
                type: "string",
                description:
                  "SEO-optimized subtitle for the business plan (50-100 characters)",
              },
              description: {
                type: "string",
                description:
                  "SEO-optimized description summarizing the business plan (150-160 characters)",
              },
            },
            required: ["title", "subtitle", "description"],
            additionalProperties: false,
            description: "SEO metadata for the business plan",
          },
          businessIdea: {
            type: "object",
            properties: {
              description: {
                type: "string",
                description: "The business idea description.",
              },
              uniqueAspect: {
                type: "string",
                description: "What makes the business idea unique.",
              },
            },
            required: ["description", "uniqueAspect"],
            additionalProperties: false,
            description: "Business idea details",
          },
          targetMarket: {
            type: "object",
            properties: {
              demographics: {
                type: "string",
                description: "Key demographics of the target market.",
              },
              marketNeeds: {
                type: "string",
                description: "Needs and pain points of the target market.",
              },
            },
            required: ["demographics", "marketNeeds"],
            additionalProperties: false,
            description: "Target market details",
          },
          revenueStreams: {
            type: "object",
            properties: {
              streams: {
                type: "array",
                items: {
                  type: "string",
                  description: "Revenue streams.",
                },
              },
              profitability: {
                type: "string",
                description: "Explanation of potential profitability.",
              },
            },
            required: ["streams", "profitability"],
            additionalProperties: false,
            description: "Revenue streams details",
          },
          marketingStrategies: {
            type: "object",
            properties: {
              onlineTactics: {
                type: "array",
                items: {
                  type: "string",
                  description: "Online marketing tactics.",
                },
              },
              offlineTactics: {
                type: "array",
                items: {
                  type: "string",
                  description: "Offline marketing tactics.",
                },
              },
            },
            required: ["onlineTactics", "offlineTactics"],
            additionalProperties: false,
            description: "Marketing strategies details",
          },
          operationalPlan: {
            type: "object",
            properties: {
              dailyOperations: {
                type: "string",
                description: "Day-to-day operations.",
              },
              requiredResources: {
                type: "string",
                description: "Resources needed for operations.",
              },
            },
            required: ["dailyOperations", "requiredResources"],
            additionalProperties: false,
            description: "Operational plan details",
          },
          financialPlan: {
            type: "object",
            properties: {
              projections: {
                type: "string",
                description: "Revenue, expense, and profitability projections.",
              },
            },
            required: ["projections"],
            additionalProperties: false,
            description: "Financial plan details",
          },
          growthGoals: {
            type: "object",
            properties: {
              shortTermGoals: {
                type: "string",
                description: "Short-term growth goals.",
              },
              longTermGoals: {
                type: "string",
                description: "Long-term growth goals.",
              },
              scalingStrategies: {
                type: "string",
                description: "Strategies for scaling the business.",
              },
            },
            required: ["shortTermGoals", "longTermGoals", "scalingStrategies"],
            additionalProperties: false,
            description: "Growth goals and strategies",
          },
        },
        required: [
          "seoMetadata",
          "businessIdea",
          "targetMarket",
          "revenueStreams",
          "marketingStrategies",
          "operationalPlan",
          "financialPlan",
          "growthGoals",
        ],
        additionalProperties: false,
        description: "Parameters for generating a business plan",
      },
    },
    required: ["name", "description", "parameters"],
  },
];
