import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { redirectTo } from "@/config";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  console.log("Supabase client created.");

  const { email } = await request.json();
  console.log(`Received email: ${email}`);

  try {
    console.log(`Attempting to send magic link to: ${email}`);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      console.error("Error from Supabase:", error);
      throw new Error(error.message);
    }

    console.log("Magic link sent successfully.");
    return NextResponse.json({
      status: "Success",
      message: "Magic link sent successfully. Check your email.",
    });
  } catch (error) {
    console.error("Caught error:", error);
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({ status: "Error", message: error.message }),
        { status: 500 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          status: "Error",
          message: "An unknown error occurred",
        }),
        { status: 500 }
      );
    }
  }
}
