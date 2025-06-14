// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "TextToSpeech",
    theme: "anotherwrapper",
    homeUrl: "/apps/voice",
    appUrl: "/apps/voice",
    description:
      "Build your own text-to-speech app using ElevenLabsIO! Convert text to speech in 26+ languages and choose over 1000 voices!",
    logo: "https://cdn2.iconfinder.com/data/icons/music-colored-outlined-pixel-perfect/64/music-35-512.png",
    navbarLinks: [
      { label: "App", href: `/apps/voice` },
      { label: "Home", href: "/" },
      { label: "Other apps", href: "/apps" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// SEO stuff
  metadata: {
    title: "Text to speech AI wrapper demo app | AnotherWrapper",
    description:
      "Build your own text-to-speech app using ElevenLabsIO! Convert text to speech in 26+ languages and choose over 1000 voices!",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/apps/voice",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "voice",

  ////// AI model
  aiModel: "eleven_multilingual_v2",

  ////// UI config
  navbarApp: {
    bgColor: "white",
    textColor: "base-content",
    buttonColor: "primary",
  },

  footerApp: {
    bgColor: "primary/80",
    textColor: "white",
  },
};
