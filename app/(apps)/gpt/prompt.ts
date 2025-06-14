// This file contains the prompt for the OpenAI API call
// The prompt is generated based on the user's input
// I like to always have the following structure in my prompts:
// 1. User inputs
// 2. Instructions
// 3. Output structure
// 4. Guidelines to tell it to only reply in JSON format
// Even though we are using a function schema, I like to include the output structure in the prompt as well.
// Usually, this yields better results and helps the model understand the expected output better.

export function generatePrompt(body: any) {
  const {
    ideaDescription,
    targetMarket,
    monthlyMarketingBudget,
    currentUserBase,
  } = body;

  return (
    "Craft a multi-faceted growth plan for a startup, encompassing both proven traditional growth approaches and inventive growth hacking strategies. Analyze the startup's specific situation, including its market niche, product stage, and current user base, to provide customized, detailed advice for each growth method. Explain why each tactic is relevant and how it can lead to sustained growth. Combine this with creative engagement ideas aimed at generating viral growth and community-building.\n" +
    "INPUTS:\n" +
    `Idea Description: ${ideaDescription}\n` +
    `Target Customer Base: ${targetMarket}\n` +
    `Monthly Marketing Budget: ${monthlyMarketingBudget} USD\n` +
    `Current User Base: ${currentUserBase}\n` +
    "INSTRUCTIONS:\n" +
    "- Tailor the strategy for each traditional growth method: SEO, content marketing, social media, email marketing, and partnerships, including specific, actionable advice. Go beyond basic, common knowledge to provide detailed, advanced insights that are not universally known.\n" +
    "- For SEO, provide specific keyword ideas, advanced optimization strategies for meta tags and URLs, tips for improving website speed, and innovative backlink acquisition strategies. Always provide at least 10 possible keywords the user can target & explain how the user can validate which keywords to target (volume, competitiveness, ..).\n" +
    "- In content marketing, detail unique content angles and formats that cater to the startup's niche, strategies for leveraging multimedia content to enhance engagement, and advanced techniques for content distribution and amplification.\n" +
    "- For social media marketing, suggest specific platforms and content types based on the target audience, outline creative engagement tactics to foster community building, and introduce novel approaches for leveraging influencer partnerships.\n" +
    "- In email marketing, provide strategies for segmenting the email list for targeted campaigns, crafting personalized email content that drives higher open rates, and using automation tools to create dynamic content triggers based on user behavior.\n" +
    "- For partnerships, suggest unconventional partnership opportunities that align with the startup's goals, strategies for co-branding efforts that can amplify reach, and methods for measuring the success of partnership initiatives.\n" +
    "- Ensure each piece of advice is detailed and actionable, providing specific strategies, tool recommendations, and execution plans.\n" +
    "- Develop unique and interactive growth hacking strategies that include novel campaign ideas, creative engagement tactics, and unconventional marketing channels.\n" +
    "- Offer a clear, actionable plan with steps, expected results, and metrics for tracking success. Each suggestion should be directly applicable and include tools, platforms, or methodologies not widely recognized.\n" +
    "- All suggestions must be feasible within the startup's current budget and resources.\n" +
    "Please ensure that the output strictly follows the structure described below:\n" +
    "1. `seoMetadata` (Object): SEO-optimized metadata for the growth plan.\n" +
    "  - `title` (String): An engaging, SEO-optimized title for the growth plan (50-60 characters).\n" +
    "  - `subtitle` (String): A compelling, SEO-optimized subtitle for the growth plan (50-100 characters).\n" +
    "  - `description` (String): A concise, SEO-optimized description summarizing the growth plan (150-160 characters).\n" +
    "2. `traditionalGrowthTactics` (Object): Detailed plans for each traditional growth method.\n" +
    "  - Each key within this object represents a growth tactic, mapping to an object that includes:\n" +
    "    - `tacticName` (String): The name of the tactic.\n" +
    "    - `specificActions` (Array): An array of strings, each detailing a highly specific and actionable step for implementing this tactic, with suggestions for advanced strategies and tools.\n" +
    "    - `toolsRecommended` (Array): An array of strings, listing advanced or less commonly known tools recommended for the tactic.\n" +
    "    - `keywords` (Array): (ONLY FOR SEO) An array of strings, listing at least 10 possible keywords the user can target & explain how the user can validate which keywords to target (volume, competitiveness, ..).\n" +
    "    - `expectedImpact` (String): A detailed analysis of the potential impact, including quantitative or qualitative forecasts.\n" +
    "3. `creativeGrowthHacks` (Array): An array of innovative campaigns and activities.\n" +
    "  - Each element in the array is an object that must include:\n" +
    "    - `campaignName` (String): The name of the campaign.\n" +
    "    - `description` (String): A detailed description of the campaign, offering innovative and unorthodox strategies not commonly utilized.\n" +
    "    - `expectedResults` (String): Specific, measurable outcomes anticipated from the campaign, including potential reach, engagement rates, or conversion improvements.\n" +
    "    - `trackingMetrics` (String): Precise metrics for gauging the campaign's success, highlighting tools or methods for accurate measurement.\n" +
    "- The output must be in valid JSON format and adhere strictly to the function schema. Any deviation is unacceptable.\n" +
    "- Reply in JSON format.\n" +
    "- DO NOT REPLY WITH EMPTY FIELDS. Every field must be filled with detailed, actionable, and innovative information. An empty field is unacceptable.\n" +
    "- Ensure the output is directly usable by a frontend without requiring additional processing.\n"
  );
}
