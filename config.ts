/// Core Website config
export const companyConfig = {
  ////// Base config used mainly for layout (@/components/navbar/Navbar-1.tsx and @/components/footer/Footer-1.tsx)
  company: {
    name: "AnotherWrapper",
    theme: "anotherwrapper",
    homeUrl: "https://anotherwrapper.com",
    appUrl: "/",
    description: "Build your AI startup in hours using our demo apps!",
    logo: "/logo.png",
    navbarLinks: [
      { label: "Home", href: "https://anotherwrapper.com" },
      { label: "Other apps", href: "https://anotherwrapper.com" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// UI config
  navbarLanding: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "primary",
  },

  footerLanding: {
    bgColor: "base-200",
    textColor: "base-content",
  },
};

/// Core Website config
export const companyName = "Holding Company Name";
export const defaultTitle =
  "Build your AI startup in hours using our customizable demo apps";
export const defaultDescription =
  "Use one of our 8 customizable AI demo apps to build your AI SaaS quickly. A Next.js starter kit with AI integrations, Supabase, payments, emails & more! ";
export const defaultKeywords =
  "openai, gpt-3, llama, replicate, groq, mixtral, ai app, boilerplate, api endpoint, next.js, react, starter kit, boilerplate, ai, artificial intelligence, node.js, express, stripe";
export const defaultOgImage = "/og.png";
export const favicon = "/favicon.ico";

// LEGAL STUFF
export const privacyPolicyUrl = "https://anotherwrapper.com/privacy";
export const tosUrl = "https://anotherwrapper.com/terms";

// Auth
export const authImage = "/hero.webp";

// Inside routing
export const homePage = "/home";
const getRedirectUrl = () => {
  const baseUrl = process.env.PRODUCTION_URL || "http://localhost:3000";
  return `${baseUrl}/auth/confirm?next=/home`;
};

export const redirectTo = getRedirectUrl();
