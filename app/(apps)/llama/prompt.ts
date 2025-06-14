export function generatePrompt(body: any) {
  const {
    personalBrandStatement,
    targetAudience,
    currentOnlinePresence,
    desiredPersonalBrandImage,
  } = body;

  return (
    "Craft a comprehensive personal brand building strategy, tailored to an individual's unique strengths, goals, and target audience. Provide actionable advice on establishing a strong online presence, creating engaging content, and fostering meaningful connections with the target audience.\n" +
    "INPUTS:\n" +
    `Personal Brand Statement: ${personalBrandStatement}\n` +
    `Target Audience: ${targetAudience}\n` +
    `Current Online Presence: ${currentOnlinePresence}\n` +
    `Desired Personal Brand Image: ${desiredPersonalBrandImage}\n` +
    "INSTRUCTIONS:\n" +
    "- Develop a personalized brand positioning statement that highlights the individual's unique value proposition.\n" +
    "- Create a content strategy that showcases the individual's expertise and resonates with the target audience.\n" +
    "- Provide guidance on building a strong online presence through social media, blogging, or other digital platforms.\n" +
    "- Offer tips on networking and collaboration to expand the individual's professional network.\n" +
    "- Include strategies for maintaining a consistent personal brand image across all online platforms.\n" +
    "- Generate SEO-friendly metadata for the personal branding strategy.\n" +
    "Please ensure that the output strictly follows the structure described below:\n" +
    "1. `seoMetadata` (Object): SEO-friendly metadata for the personal branding strategy.\n" +
    "  - `title` (String): SEO-optimized title for the personal branding strategy (50-60 characters).\n" +
    "  - `subtitle` (String): SEO-optimized subtitle for the personal branding strategy (50-100 characters).\n" +
    "  - `description` (String): SEO-optimized description summarizing the personal branding strategy (150-160 characters).\n" +
    "2. `personalBrandPositioning` (Object): A detailed personal brand positioning statement.\n" +
    "  - `statement` (String): The personalized brand positioning statement.\n" +
    "  - `uniqueValueProposition` (String): The individual's unique value proposition.\n" +
    "3. `contentStrategy` (Object): A content strategy tailored to the individual's expertise and target audience.\n" +
    "  - `contentTypes` (Array): An array of content types (e.g., blog posts, videos, podcasts) recommended for the individual.\n" +
    "  - `contentCalendar` (String): A suggested content calendar to maintain consistency and engagement.\n" +
    "4. `onlinePresence` (Object): Guidance on building a strong online presence.\n" +
    "  - `socialMediaPlatforms` (Array): An array of social media platforms recommended for the individual.\n" +
    "  - `profileOptimizationTips` (String): Tips for optimizing online profiles to maintain a consistent personal brand image.\n" +
    "5. `networkingAndCollaboration` (Object): Strategies for expanding the individual's professional network.\n" +
    "  - `networkingEvents` (Array): An array of networking events or conferences recommended for the individual.\n" +
    "  - `collaborationIdeas` (String): Ideas for collaborating with other professionals in the industry.\n" +
    "- The output must be in valid JSON format and adhere strictly to the function schema. Any deviation is unacceptable.\n" +
    "- Reply in JSON format.\n" +
    "- DO NOT REPLY WITH EMPTY FIELDS. Every field must be filled with detailed, actionable, and innovative information. An empty field is unacceptable.\n"
  );
}
