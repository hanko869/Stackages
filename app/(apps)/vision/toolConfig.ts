// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "ImageVision",
    theme: "vision",
    homeUrl: "/apps/vision",
    appUrl: "/apps/vision/app",
    description:
      "Build your own GPT-4o vision AI wrapper in minutes with this demo app that uses OpenAI, Cloudflare R2 & Supabase.",
    logo: "https://cdn2.iconfinder.com/data/icons/custom-ios-14-1/60/Camera-512.png",
    navbarLinks: [
      { label: "App", href: `/apps/vision/app` },
      { label: "Home", href: "/" },
      { label: "Other apps", href: "/apps" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// SEO stuff
  metadata: {
    title: "GPT-4o vision AI wrapper demo application | AnotherWrapper",
    description:
      "Build your own GPT-4o vision AI wrapper in minutes with this demo app that uses OpenAI, Cloudflare R2 & Supabase.",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/apps/vision",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "(apps)/vision",

  ////// AI config
  aiModel: "gpt-4o",

  ////// Storage config
  upload: {
    path: "vision",
  },

  ////// Form input
  type: "vision",
  fields: [
    {
      label: "📝 Description Type",
      name: "descriptionType",
      type: "select",
      options: [
        "Short and concise",
        "Detailed and descriptive",
        "Humorous and creative",
      ],
      required: true,
    },
  ],
  submitText: "Generate image description 🌄",
  submitTextGenerating: "Analyzing your image...",
  responseTitle: "Your image description has been generated",
  responseSubTitle:
    "The output below has been automatically rendered based on the JSON schema used by the AI model. You can use this to quickly prototype your application.",

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "neutral",
    buttonColor: "accent",
  },

  navbarApp: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "accent",
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
