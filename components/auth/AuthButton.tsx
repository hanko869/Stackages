import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AuthButtonProps {
  classProps?: {
    primaryTextColor?: string;
    bgColor?: string;
    buttonClassName?: string;
    svgClassName?: string;
  };
}

export default async function AuthButton({ classProps }: AuthButtonProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/auth");
  };

  const primaryTextColor = classProps?.primaryTextColor || "primary-content";
  const bgColor = classProps?.bgColor || "primary";
  const buttonClassName =
    classProps?.buttonClassName || "hidden sm:flex relative group scale-[.9]";
  const svgClassName = classProps?.svgClassName || "";

  return user ? (
    <div className="flex items-center gap-4">
      <span
        className={`hidden sm:block text-${primaryTextColor} menu menu-horizontal px-1`}
      >
        👋🏼 Hey, {user.email}!
      </span>
      <form action={signOut} className={buttonClassName}>
        <button
          className={`py-2 px-4 text-${bgColor}-content rounded-md no-underline bg-${bgColor} hover:bg-${bgColor}/80`}
        >
          Logout
        </button>
      </form>
    </div>
  ) : (
    <div className="hidden sm:flex relative group scale-[.7]">
      <Link
        href="/auth"
        className={`btn bg-${bgColor} hover:bg-${bgColor}/80 rounded-xl text-${bgColor}-content`}
      >
        Login
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className={`h-3 w-3 ${primaryTextColor} ${svgClassName}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
