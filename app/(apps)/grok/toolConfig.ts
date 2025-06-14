// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "Launch Day Simulator",
    theme: "anotherwrapper",
    homeUrl: "/apps/grok",
    appUrl: "/apps/grok",
    description:
      "Powered by xAI's Grok, this AI wrapper generates hilarious brand Twitter personality analysis. Experience how your brand would tweet using advanced AI.",
    logo: "https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-05-512.png",
    navbarLinks: [
      { label: "App", href: `/apps/grok` },
      { label: "Home", href: "/" },
      { label: "Other apps", href: "/apps" },
      { label: "Blog", href: "/blog" },
    ],
  },
  ////// SEO stuff
  metadata: {
    title: "Brand Twitter AI | Grok xAI Wrapper | AnotherWrapper",
    description:
      "Generate hilarious brand Twitter personalities using xAI's Grok model. Our AI wrapper analyzes your brand's Twitter potential with tone scores, predicted tweets, and PR disaster scenarios.",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/apps/grok",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "(apps)/grok",

  ////// AI config
  aiModel: "grok-beta",
  systemMessage:
    "You are a witty Product Hunt launch day simulator. Create entertaining but insightful predictions about product launches, complete with drama, memes, and realistic scenarios. Only reply with the JSON, do not return anything else.",

  ////// Form input
  type: "grok",
  fields: [
    {
      label: "🚀 Product Name",
      name: "productName",
      type: "input",
      placeholder: "What's your groundbreaking product called?",
      required: true,
    },
    {
      label: "💡 Product Category",
      name: "category",
      type: "select",
      options: [
        // AI & ML
        "AI but actually regex",
        "ChatGPT Wrapper #4269",
        "Midjourney but for X",
        "AI-powered Excel formulas",

        // No-Code & Tools
        "No-Code Builder (we promise)",
        "Notion Template Empire",
        "Airtable Alternative #847",
        "Another Webflow Clone",

        // Developer Tools
        "React Boilerplate Generator",
        "TypeScript Type Generator",
        "CSS Framework (revolutionary)",
        "Git Client (but beautiful)",

        // Productivity
        "Todo App (but different)",
        "Pomodoro Timer Pro Max",
        "Note-Taking App 3.0",
        "Calendar but for Devs",

        // Content & Social
        "Twitter Analytics Pro",
        "LinkedIn Post Generator",
        "Newsletter Platform 2.0",
        "Community Platform (web3)",

        // Business Tools
        "Analytics Dashboard Builder",
        "SaaS Boilerplate Pro",
        "Stripe Integration Helper",
        "Marketing Automation Tool",
      ],
      required: true,
    },
    {
      label: "💰 Launch Price",
      name: "pricing",
      type: "select",
      options: [
        "Free Forever (until Series A)",
        "Freemium (95% features locked)",
        "$9/mo (billed annually at $297)",
        "$29/mo (enterprise is your kidney)",
        "$49 Lifetime Deal (48h only!!!)",
        "Pay What You Want (min $199)",
        "Early Bird Special (ending soon)",
        "Contact for Custom Pricing 🤑",
        "Web3 Tokens Only",
        "Enterprise Only (if you have to ask...)",
      ],
      required: true,
    },
    {
      label: "🌟 Launch Strategy",
      name: "strategy",
      type: "select",
      options: [
        "Spam All Discord Communities",
        "Twitter Thread Masterplan",
        "LinkedIn Viral Post",
        "Reddit Guerrilla Marketing",
        "Email List of 3 People",
        "Hope for Organic Traffic",
        "Influencer DM Campaign",
        "Hacker News Revival",
        "Wait for TechCrunch",
        "Build in Public",
      ],
      required: true,
    },
    {
      label: "📝 Extra Context",
      name: "context",
      type: "textarea",
      placeholder:
        "Any special features, drama, or context we should know about? Previous launches? Competitor beef? (Optional but makes it spicier 🌶️)",
      required: false,
    },
  ],
  submitText: "Simulate Launch Day 🚀",
  submitTextGenerating: "Preparing your launch drama...",

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "text-neutral",
    buttonColor: "accent",
  },

  navbarApp: {
    bgColor: "base-100",
    textColor: "text-base-content",
    buttonColor: "accent",
  },

  footerLanding: {
    bgColor: "accent",
    textColor: "white",
  },

  footerApp: {
    bgColor: "accent",
    textColor: "white",
  },
};
