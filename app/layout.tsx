import { GeistSans } from "geist/font/sans";
import Providers from "./providers";
import "./globals.css";
import {
  defaultTitle,
  defaultDescription,
  companyConfig,
  defaultOgImage,
  favicon,
  defaultKeywords,
} from "@/config";

// SEO Optimization
export const metadata = {
  title: `${defaultTitle}`,
  description: defaultDescription,
  keywords: defaultKeywords,
  icons: [{ rel: "icon", url: `${companyConfig.company.homeUrl}${favicon}` }],
  openGraph: {
    url: companyConfig.company.homeUrl,
    title: `${defaultTitle} | ${companyConfig.company.name}`,
    description: defaultDescription,
    images: [
      {
        url: `${companyConfig.company.homeUrl}${defaultOgImage}`,
        width: 800,
        height: 600,
        alt: `${companyConfig.company.name} logo`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main
        className={GeistSans.className + " text-base-content"}
        data-theme={companyConfig.company.theme}
      >
        {children}
      </main>
    </Providers>
  );
}
