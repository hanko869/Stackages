import Link from "next/link";

interface FooterStyle {
  bgColor: string;
  textColor: string;
}
interface CompanyConfig {
  name: string;
  theme: string;
  homeUrl: string;
  appUrl: string;
  description: string;
  logo: string;
  navbarLinks: { label: string; href: string }[];
}

export default function Footer({
  footerConfig,
  companyConfig,
}: {
  footerConfig: FooterStyle;
  companyConfig: CompanyConfig;
}) {
  return (
    <>
      <div
        className={`p-10 bg-${footerConfig.bgColor} text-${footerConfig.textColor}`}
      >
        <footer className={`md:ml-12 footer`}>
          <aside>
            <Link href="#" className="flex items-center">
              <img src={companyConfig.logo} alt="Logo" className="h-8 w-8" />
              <span className="text-lg font-bold ml-2">
                {companyConfig.name}
              </span>
            </Link>

            <p className="max-w-sm text-sm">{companyConfig.description} </p>
          </aside>
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
        <div className="md:ml-12 text-xs mt-12 flex justify-between flex-col md:flex-row gap-y-2 items-center">
          <div>
            Copyright © {new Date().getFullYear()} - All Rights Reserved by{" "}
            {companyConfig.name}.
          </div>
        </div>
      </div>
    </>
  );
}
