import {
  IconMicrophone,
  IconFileText,
  IconMessage,
  IconPhoto,
  IconEye,
  IconBolt,
  IconMessage2,
  IconRobot,
  IconCurrencyDollar,
  IconPencil,
  IconHome,
} from "@tabler/icons-react";

type NavLink = {
  href: string;
  label: string;
  icon: any;
  isExternal?: boolean;
  isNew?: boolean;
};

export const freeTools = [
  {
    href: "https://anotherwrapper.com/tools/llm-pricing",
    label: "LLM Pricing Comparison",
    icon: IconCurrencyDollar,
  },
  {
    href: "https://anotherwrapper.com/tools/ai-app-generator",
    label: "AI App Generator",
    icon: IconRobot,
  },
];

export const navlinks: NavLink[] = [
  { href: "/apps/audio/app", label: "Audio AI", icon: IconMicrophone },
  { href: "/apps/llama/app", label: "Llama 3", icon: IconBolt },
  { href: "/apps/gpt/app", label: "OpenAI GPT", icon: IconMessage },
  { href: "/apps/dalle/app", label: "DALL-E", icon: IconPhoto },
  { href: "/apps/vision/app", label: "Vision AI", icon: IconEye },
  {
    href: "/apps/sdxl/app",
    label: "Stable Diffusion XL",
    icon: IconPhoto,
  },
  {
    href: "/apps/chat",
    label: "Chat AI",
    icon: IconMessage2,
    isExternal: false,
    isNew: true,
  },
  {
    href: "/apps/claude",
    label: "Claude 3.5 Sonnet",
    icon: IconRobot,
  },
  { href: "/apps/grok", label: "xAI Grok", icon: IconBolt, isNew: true },
  { href: "/apps/pdf", label: "PDF AI", icon: IconFileText },
  { href: "/apps/voice", label: "Voice AI", icon: IconMicrophone },
];

export const landingPages = [
  { href: "/apps/audio", label: "Audio AI", icon: IconMicrophone },
  { href: "/apps/llama", label: "Llama 3", icon: IconBolt },
  { href: "/apps/gpt", label: "OpenAI GPT", icon: IconMessage },
  { href: "/apps/dalle", label: "DALL-E", icon: IconPhoto },
  { href: "/apps/vision", label: "Vision AI", icon: IconEye },
  { href: "/apps/sdxl", label: "Stable Diffusion XL", icon: IconPhoto },
];

export const otherLinks = [
  { href: "/", label: "Home", icon: IconHome },
  {
    href: "https://docs.anotherwrapper.com",
    label: "Documentation",
    icon: IconFileText,
  },
  {
    href: "https://anotherwrapper.lemonsqueezy.com/affiliates",
    label: "Affiliates Program",
    icon: IconCurrencyDollar,
  },
  {
    href: "https://anotherwrapper.com/blog",
    label: "Blog",
    icon: IconPencil,
  },
];
