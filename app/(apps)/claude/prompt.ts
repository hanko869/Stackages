export function generatePrompt(body: any) {
  const { businessIdea, targetMarket, revenueStreams } = body;

  return (
    "Create a comprehensive business plan for a solopreneur, focusing on the unique aspects of their business idea, target market, and revenue streams.\n" +
    "INPUTS:\n" +
    `Business Idea: ${businessIdea}\n` +
    `Target Market: ${targetMarket}\n` +
    `Revenue Streams: ${revenueStreams}\n` +
    "INSTRUCTIONS:\n" +
    "- Develop a detailed business idea explanation including its uniqueness and potential impact.\n" +
    "- Identify and analyze the target market, including key demographics and needs.\n" +
    "- Outline multiple revenue streams and explain their potential profitability.\n" +
    "Please ensure that the output strictly follows the structure described below:\n" +
    "1. `businessIdea` (Object): Detailed explanation of the business idea.\n" +
    "  - `description` (String): The business idea description.\n" +
    "  - `uniqueAspect` (String): What makes the business idea unique.\n" +
    "2. `targetMarket` (Object): Analysis of the target market.\n" +
    "  - `demographics` (String): Key demographics of the target market.\n" +
    "  - `marketNeeds` (String): Needs and pain points of the target market.\n" +
    "3. `revenueStreams` (Object): Outline of revenue streams.\n" +
    "  - `streams` (Array): An array of revenue streams.\n" +
    "  - `profitability` (String): Explanation of potential profitability.\n" +
    "- The output must be in valid JSON format and adhere strictly to the function schema. Any deviation is unacceptable.\n" +
    "- Reply in JSON format.\n" +
    "- DO NOT REPLY WITH EMPTY FIELDS. Every field must be filled with detailed, actionable, and innovative information. An empty field is unacceptable.\n"
  );
}
