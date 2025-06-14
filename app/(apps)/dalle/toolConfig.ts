// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "DALLEStudio",
    theme: "logo",
    homeUrl: "/apps/dalle",
    appUrl: "/apps/dalle/app",
    description:
      "Build your own Dalle 3 AI wrapper logo generator in minutes with this demo app that uses OpenAI, Cloudflare R2 & Supabase.",
    logo: "https://cdn0.iconfinder.com/data/icons/lifestyle-entertainment-vol-2/512/museum_art_painting_artist-512.png",
    navbarLinks: [
      { label: "App", href: `/apps/dalle/app` },
      { label: "Home", href: "/" },
      { label: "Other apps", href: "/apps" },
      { label: "Blog", href: "/blog" },
    ],
  },
  ////// Location
  toolPath: "(apps)/dalle",

  ////// SEO stuff
  metadata: {
    title: "DALL-E logo generator AI wrapper | AnotherWrapper",
    description:
      "Build your own Dalle 3 AI wrapper logo generator in minutes with this demo app that uses OpenAI, Cloudflare R2 & Supabase.",
    og_image: "https://indielogs.com/og-image.png",
    canonical: "https://anotherwrapper.com/apps/dalle",
  },

  ////// Payments
  paywall: true,
  credits: 5,

  ////// AI config
  aiModel: "dall-e-3",

  ////// Storage config
  upload: {
    path: "/logos",
  },

  ////// Form input
  type: "dalle",
  fields: [
    {
      label: "🎯 Keywords",
      name: "ideaDescription",
      type: "input",
      placeholder: "Enter a couple of keywords related to your business.",
      required: true,
    },
  ],
  submitText: "Generate logo 👩🏼‍🎨",
  submitTextGenerating: "Generating your logo...",

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "primary-content",
    buttonColor: "accent",
  },

  navbarApp: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "accent",
  },

  footerLanding: {
    bgColor: "primary",
    textColor: "primary-content",
  },

  footerApp: {
    bgColor: "accent/90",
    textColor: "white",
  },
};
