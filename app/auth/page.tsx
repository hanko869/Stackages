import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import AuthComponent from "@/components/auth/AuthLayout";
import { homePage } from "@/config";

export default async function AuthPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect(homePage);
  }

  return <AuthComponent />;
}
