// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "VoiceToNotes",
    theme: "whisper",
    homeUrl: "/apps/audio",
    appUrl: "/apps/audio/app",
    description:
      "Build an AI wrapper that generates transcripts from your voice recordings using Whisper on Replicate and summarize them using Llama 3 from Groq.",
    logo: "https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-3/256/microphone-1024.png",
    navbarLinks: [
      { label: "App", href: `/apps/audio/app` },
      { label: "Home", href: "/" },
      { label: "Other apps", href: "/apps" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// SEO stuff
  metadata: {
    title: "Voice to notes AI wrapper | AnotherWrapper",
    description:
      "Build an AI wrapper that generates transcripts from your voice recordings using Whisper on Replicate and summarize them using Llama 3 from Groq.",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/apps/audio",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "(apps)/audio",

  ////// AI config
  aiModel: "llama-3.1-70b-versatile", // model to use for generating summaries of transcript
  systemMessage:
    "The following is a transcript of a voice message. Extract a title, summary, and action items from it and answer in JSON in this format: {title: string, summary: string, actionItems: [string, string, ...]}. Never return an empty title! Only reply with the JSON, do not return anything else.",

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
