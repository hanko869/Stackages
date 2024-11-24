export function generatePrompt(body: any) {
  const { productName, category, pricing, strategy, context } = body;

  return (
    "Create an absolutely hilarious Product Hunt launch day simulation that people will want to screenshot and share. " +
    "Channel the energy of Tech Twitter drama meets startup meme culture. Make it feel like a Netflix mini-series of startup chaos.\n" +
    "INPUTS:\n" +
    `Product Name: ${productName}\n` +
    `Category: ${category}\n` +
    `Pricing: ${pricing}\n` +
    `Launch Strategy: ${strategy}\n` +
    `Additional Context: ${context || "None provided"}\n` +
    "\nTONE GUIDELINES:\n" +
    "- Write like a tech insider who's seen every startup trope and Product Hunt cliché.\n" +
    "- Mix peak startup delusion with brutal reality checks\n" +
    "- Channel authentic tech founder energy and common personality types\n" +
    "- Capture the essence of tech Twitter's most unhinged moments\n" +
    "- Blend chaotic energy with moments of wholesomeness and dramatic irony.\n" +
    "- Reference trending tech memes, famous dramas, and founder archetypes.\n" +
    "- Include jokes that make tech Twitter scream 'TOO REAL.'\n\n" +
    "\nHUMOR GUIDELINES:\n" +
    "- Draw from common Product Hunt launch tropes and traditions\n" +
    "- Include typical VC misunderstandings about technical products\n" +
    "- Include absurd yet relatable launch day blunders.\n" +
    "- Add engineering-specific humor about deployment failures and API issues\n" +
    "- Reference contemporary developer tools and infrastructure problems\n" +
    "- Include realistic but amusing startup pivots and feature requests\n" +
    "- Create escalating plot twists that make readers shout 'NO WAY.'\n\n" +
    "STRUCTURE & REQUIREMENTS:\n" +
    "\nThe output should follow this structure:\n" +
    "1. `seoMetadata` (Object): SEO-optimized metadata.\n" +
    "  - `title` (String): Catchy title for the launch simulation (50-60 chars)\n" +
    "  - `subtitle` (String): Funny subtitle about the launch (50-100 chars)\n" +
    "  - `description` (String): Brief, witty description (150-160 chars)\n" +
    "\n2. `launchStats` (Object):\n" +
    "  - `upvotes` (Number): Realistic upvote count between 0 and 600\n" +
    "  - `comments` (Number): Comment count\n" +
    "  - `ranking` (Number): Daily ranking achieved\n" +
    "  - `collections` (Number): Times added to collections\n" +
    "  - `launchScore` (Number): Overall success rating (0-100)\n" +
    "  - `featured` (Boolean): Whether the product got featured\n" +
    "  - `rejectionReason` (String): Hilarious reason why not featured\n" +
    "\n3. `timeline` (Array): 8 chronological events from launch day\n" +
    "  Each event contains:\n" +
    "  - `time` (String): Timestamp (e.g., '6:00 AM PST')\n" +
    "  - `event` (String): What happened\n" +
    "  - `impact` (String): Effect on the launch\n" +
    "  - `upvoteCount` (Number): Cumulative upvotes at this point\n" +
    "\n4. `topComments` (Array): 3 memorable comments\n" +
    "  Each comment contains:\n" +
    "  - `author` (String): Commenter name/type\n" +
    "  - `comment` (String): The actual comment\n" +
    "  - `reaction` (String): Maker's potential response\n" +
    "  - `impact` (Number): Sentiment score (-1 to 1)\n" +
    "\n5. `makerMistakes` (Array): 6 classic launch day mistakes\n" +
    "  Examples:\n" +
    "  - Accidentally tweeting from wrong account\n" +
    "  - Pushing to production during launch\n" +
    "  - Forgetting to enable sign-ups\n" +
    "  - Responding to trolls at 3 AM\n" +
    "  - Setting pricing to $0 by mistake\n" +
    "  - Posting launch tweet with typo\n" +
    "\n6. `competitorDrama` (Array): 3 competitor interactions\n" +
    "  Each contains:\n" +
    "  - `competitor` (String): Competitor name\n" +
    "  - `comment` (String): Their comment\n" +
    "  - `drama` (String): Drama description\n" +
    "\n7. `founderProfile` (Object):\n" +
    "  - `name` (String): Founder's name\n" +
    "  - `archetype` (String): Type of founder (e.g., 'The `Built in a Weekend` Guy')\n" +
    "  - `catchphrase` (String): Their most overused phrase\n" +
    "  - `typicalTweet` (String): Example of their typical tweet style\n" +
    "  - `quirks` (Array): 3 funny characteristics\n" +
    "  - `reputation` (Number): Influence score (0-100)\n" +
    "\n8. `plotTwists` (Array): 3 unexpected dramatic moments\n" +
    "  Each twist contains:\n" +
    "  - `moment` (String): The unexpected event\n" +
    "  - `reaction` (String): Community's reaction\n" +
    "\n9. `bingoCard` (Array): 16 launch day bingo squares\n" +
    "  Each square contains:\n" +
    "  - `text` (String): The bingo square text\n" +
    "  - `isChecked` (Boolean): Whether it happened\n" +
    "  - `timestamp` (String): When it happened (if applicable)\n" +
    "\nREQUIREMENTS:\n" +
    "- DO NOT wrap the response in ```json or any other markdown formatting\n" +
    "- The output must be in valid JSON format and adhere strictly to the schema\n" +
    "- All arrays must contain exactly the specified number of items\n" +
    "- All numerical scores must be between 0 and 100\n" +
    "- Make all content entertaining but somewhat plausible\n" +
    "- Include realistic metrics based on the product type\n" +
    "- Reference Product Hunt culture and inside jokes\n" +
    "- Create shareable, meme-worthy moments\n" +
    "- Match the tone to the product category\n" +
    "- Create moments that are so relatable they're screenshot-worthy\n" +
    "- Include at least one 'you had to be there' tech community reference\n" +
    "- Make the drama escalate in an entertaining way\n" +
    "- Add unexpected wholesome moments between the chaos\n"
  );
}
