import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function authMiddleware(req: NextRequest) {
  // Create a Supabase client for server-side operations
  const supabase = createClient();

  // Attempt to get the current user from the session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is found, return a 401 Unauthorized response
  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  // Attach the user object to the request for use in subsequent middleware or route handlers
  // Note: TypeScript doesn't know about this custom property, so we use type assertion
  (req as any).user = user;

  // Allow the request to proceed to the next middleware or route handler
  return NextResponse.next();
}
