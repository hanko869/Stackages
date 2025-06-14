export function generatePrompt(body: any) {
  const { ideaDescription } = body;

  return (
    `Design a modern, sleek, and scalable logo for a SaaS application that embodies the essence of ${ideaDescription}. The logo should be versatile, distinctive, and memorable, while conveying the brand's values and personality.\n` +
    "INPUTS:\n" +
    `Business Description: ${ideaDescription}\n` +
    "Industry: SaaS\n" +
    "Target Audience: Modern tech-savvy users\n" +
    "INSTRUCTIONS:\n" +
    "- Create a custom, handcrafted logo that is original and unique.\n" +
    "- Ensure the logo is simple, yet distinctive and memorable.\n" +
    "- Use a clean, minimalist aesthetic with bold lines, shapes, and typography.\n" +
    "- Incorporate abstract or geometric elements to create a modern, futuristic feel.\n" +
    "- Design multiple variants, including:\n" +
    "  - Color schemes: 2-3 options, including a primary color and 1-2 secondary colors.\n" +
    "  - Typography: 2-3 options, including sans-serif and serif fonts.\n" +
    "  - Layouts: 2-3 options, including horizontal, vertical, and stacked layouts.\n" +
    "- Ensure the logo is scalable and legible in various sizes, from favicon to billboard dimensions.\n" +
    "- Provide a black and white version of the logo to ensure versatility.\n" +
    "- Design with digital platforms in mind, considering how the logo will appear on websites, mobile apps, and social media."
  );
}
