import Section from "@/components/Section";
import Navbar from "@/components/navbars/Navbar-1";
import Hero from "@/components/heros/HeroSDXL";
import Features from "@/components/features/Features-1";
import Pricing from "@/components/pricing/Pricing-1";
import CTA from "@/components/ctas/CTA-1";
import FAQ from "@/components/faqs/FAQ-1";
import Footer from "@/components/footers/Footer-1";
import Testimonials from "@/components/testimonials/Testimonials-1";

import { toolConfig } from "./toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  openGraph: {
    images: [toolConfig.metadata.og_image],
  },
  alternates: {
    canonical: toolConfig.metadata.canonical,
  },
};

export default function Page() {
  return (
    <>
      <div data-theme={toolConfig.company.theme}>
        <Navbar
          companyConfig={toolConfig.company!}
          navbarConfig={toolConfig.navbarLanding!}
        />
        <Hero />
        <Section>
          <Features />
          <Testimonials />
        </Section>
        <Pricing />
        <CTA />
        <FAQ />
        <Footer
          companyConfig={toolConfig.company!}
          footerConfig={toolConfig.footerLanding!}
        />
      </div>
    </>
  );
}
