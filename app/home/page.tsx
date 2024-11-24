import { companyConfig } from "@/config";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { loops } from "@/lib/clients/loops";
import HeroDemos from "@/components/heros/HeroDemos";
import Navbar from "@/components/navbars/Navbar-1";
import Footer from "@/components/footers/Footer-1";
import Apps from "@/components/anotherwrapper/Apps";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  /// Once you have set up your Loops API key, you can uncomment the code below to create a contact in Loops when a user logs in
  // If contact already exists, it will simply return an error
  // const userMetadata = user.user_metadata;
  // const userEmail = user.email;
  // const userName = userMetadata.full_name || userMetadata.name;

  // if (userEmail) {
  //   const contactProperties = {
  //     purchased: false,
  //     ...(userName && { firstName: userName }),
  //   };

  //   await loops.createContact(userEmail, contactProperties);
  // }

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
