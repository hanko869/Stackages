///////// VERY IMPORTANT
// This is the main configuration file for your AI tool.
// Make sure you read the comments and follow the instructions carefully.
// Each model has different requirements and configurations (some use storage, some generate forms, ...), so make sure you read the documentation.

export type AIModelType =
  | "vision"
  | "dalle"
  | "sdxl"
  | "groq"
  | "claude"
  | "llama"
  | "grok"
  | "gpt";

export type GenerationModelType =
  | "vision"
  | "dalle"
  | "sdxl"
  | "groq"
  | "claude"
  | "llama"
  | "grok"
  | "gpt";

export interface ToolConfig {
  ////// Base config of your site
  // This information will be used to populate the information in your Navbar & Footer + to select the theme.
  company: {
    name: string;
    theme: string;
    homeUrl: string;
    appUrl: string;
    description: string;
    logo: string;
    navbarLinks: { label: string; href: string }[];
  };

  ////// Metadata for SEO
  // This information will be used to populate the metadata tags of your app.
  metadata: {
    title: string;
    description: string;
    og_image?: string;
    canonical?: string;
  };

  ////// Paywall
  // Set variable to true if you want to use the already implemented credit system
  // Each generation will consume the number of credits defined in 'credits'
  paywall: boolean;
  credits: number;

  ////// Location
  // Location of the demo app within the /app directory.
  // For GPT, DALLE, LLAMA & SDXL apps this will be used by the API endpoint to locate prompt and schema files.
  // Do not use "/" at the begging or the end. 'path' is good, '/path/' is bad. thx. u're crushing it.
  toolPath: string;

  ////// AI model configuration
  // Here you'll pass the model you want to use and also give the AI a role.
  aiModel: string;
  systemMessage?: string; // System message to give the AI. You can define it's role here.
  messagesToInclude?: number; // Number of chat messages to include in history (all messages are stored in the database - but considering max tokens, we only include a subset in the prompt)

  ////// Storage
  // 'path' is in which directory the files will be stored in the storage bucket
  upload?: {
    path?: string;
  };

  ////// Form input
  // This is used to automatically generate a form that captures user input & sends it to the AI
  // Inputs should match inputs captured in prompt.ts

  // These inputs will also be read by:
  //// components/output/OutputLayout.tsx
  //// components/output/OutputSidebar.tsx
  //// components/output/OutputHero.tsx

  // Have a look at the following demo app examples to see how this is used:
  //// openai/gpt, openai/vision, openai/dalle, openai/sdxl and groq/llama

  type?: AIModelType; // type of app - based on this it knows what to include in the form + which API to call.
  // type options: 'vision' for GPT-4o, 'dalle', 'sdxl', 'groq', 'claude' & 'gpt'.
  fields?: FormFields[]; // Array of form fields
  submitText?: string; // Text for the submit button
  submitTextGenerating?: string; // Text for the submit button when generating
  responseTitle?: string; // Title for the response page
  responseSubTitle?: string; // Subtitle for the response page

  ////// UI config
  // Here you can define the colors of your navbar, footer and navbar button for the landing page
  // You can also define the colors of your navbar, footer and navbar button for the app, in case they are different

  ////// Navbar
  navbarLanding?: {
    bgColor: string;
    textColor: string;
    buttonColor: string;
  };

  navbarApp?: {
    bgColor: string;
    textColor: string;
    buttonColor: string;
  };

  ////// Footer

  footerLanding?: {
    bgColor: string;
    textColor: string;
  };

  footerApp?: {
    bgColor: string;
    textColor: string;
  };
}

export interface FormFields {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  initialValue?: string;
}
