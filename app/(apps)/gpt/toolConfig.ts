// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "MarketingPlanor",
    theme: "marketing",
    homeUrl: "/apps/gpt",
    appUrl: "/apps/gpt/app",
    description:
      "Build your own GPT-4o Mini AI wrapper in minutes with this demo app that uses OpenAI, LangChain & Supabase.",
    logo: "https://cdn2.iconfinder.com/data/icons/custom-ios-14-1/60/Camera-512.png",
    navbarLinks: [
      { label: "App", href: `/apps/gpt/app` },
      { label: "Home", href: "/" },
      { label: "Other apps", href: "/apps" },
      { label: "Blog", href: "/blog" },
    ],
  },
  ////// SEO stuff
  metadata: {
    title: "GPT-4o mini AI wrapper demo app | AnotherWrapper",
    description:
      "Build your own GPT-4o Mini AI wrapper in minutes with this demo app that uses OpenAI, LangChain & Supabase.",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/apps/gpt",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "(apps)/gpt",

  ////// AI config
  aiModel: "gpt-4o-mini",
  systemMessage:
    "You are a talented personal coach. You are helping a client build his marketing plan. Only reply with the JSON, do not return anything else.",

  ////// Form input
  type: "gpt",
  fields: [
    {
      label: "🎯 Your business idea",
      name: "ideaDescription",
      type: "textarea",
      placeholder:
        "Explain your idea clearly. The more details you provide, the better the results.",
      required: true,
    },
    {
      label: "✅ Target market",
      name: "targetMarket",
      type: "input",
      placeholder: "What is your target market?",
      required: true,
    },
    {
      label: "📊 Current user base",
      name: "currentUserBase",
      type: "select",
      options: [
        "No users",
        "Under 100 users",
        "100-500 users",
        "501-1000 users",
        "1001-5000 users",
        "5001-10000 users",
        "10001 or more users",
      ],
      required: true,
    },
    {
      label: "💰 Monthly marketing budget",
      name: "monthlyMarketingBudget",
      type: "select",
      options: [
        "$0 (No Budget)",
        "$1 - $500",
        "$501 - $1,000",
        "$1,001 - $5,000",
        "$5,001 - $10,000",
        "$10,001 or more",
      ],
      required: true,
    },
  ],
  submitText: "Generate marketing plan 🚀",
  submitTextGenerating: "Generating marketing ideas...",

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "neutral",
    buttonColor: "accent",
  },

  navbarApp: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "primary",
  },

  footerLanding: {
    bgColor: "primary",
    textColor: "neutral",
  },

  footerApp: {
    bgColor: "primary",
    textColor: "white",
  },
};
