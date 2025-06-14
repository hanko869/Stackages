import { companyConfig } from "@/config";
import Navbar from "@/components/navbars/Navbar-1";
import Footer from "@/components/footers/Footer-1";
import Apps from "@/components/anotherwrapper/Apps";
import HeroDemos from "@/components/heros/HeroDemos";

export default function Home() {
  return (
    <div className="bg-base-100">
      <Navbar
        companyConfig={companyConfig.company!}
        navbarConfig={companyConfig.navbarLanding!}
      />
      <HeroDemos />
      <Apps />
      <Footer
        companyConfig={companyConfig.company!}
        footerConfig={companyConfig.footerLanding!}
      />
    </div>
  );
}
