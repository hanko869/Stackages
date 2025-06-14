import AuthButton from "@/components/auth/AuthButton";
import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import SignOutButton from "@/components/auth/SignOut";

interface NavbarConfig {
  bgColor: string;
  textColor: string;
  buttonColor: string;
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

export default async function Navbar({
  navbarConfig,
  companyConfig,
}: {
  navbarConfig: NavbarConfig;
  companyConfig: CompanyConfig;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className={`navbar bg-${navbarConfig.bgColor} px-12`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`text-${navbarConfig.textColor} h-5 w-5`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`text-${navbarConfig.textColor} menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52`}
          >
            {companyConfig.navbarLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-base-content">
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li className="text-base-content">
                <SignOutButton />
              </li>
            )}
          </ul>
        </div>
        <a className="flex text-xl" href={companyConfig.homeUrl}>
          {" "}
          <img src={companyConfig.logo} alt="Logo" className="h-8 w-8" />
          <span
            className={`text-lg text-${navbarConfig.textColor} font-bold ml-2`}
          >
            {companyConfig.name}
          </span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul
          className={`text-${navbarConfig.textColor} menu menu-horizontal px-1`}
        >
          {companyConfig.navbarLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <li className="sm:mr-10 ml-auto inline-flex items-center">
          {supabase && (
            <AuthButton
              classProps={{
                bgColor: navbarConfig.buttonColor,
                primaryTextColor: navbarConfig.textColor,
              }}
            />
          )}
        </li>
      </div>
    </div>
  );
}
