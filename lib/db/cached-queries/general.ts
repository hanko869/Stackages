import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/utils/supabase/server";
import { getSessionQuery, getUserQuery, getUserCreditsQuery } from "../queries";

export const getSupabase = cache(() => createClient());

export const getSession = async () => {
  const supabase = await getSupabase();

  // First check if we have a current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, return null immediately
  if (!session) return null;

  // Only use cache if we have an active session
  return unstable_cache(
    async () => {
      try {
        const user = await getSessionQuery(supabase);
        if (!user) return null;
        return user;
      } catch (error) {
        return null;
      }
    },
    ["session", session.access_token.slice(-10)],
    {
      tags: [`session_${session.access_token.slice(-10)}`],
      revalidate: 10,
    }
  )();
};

export const getUser = async (email: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getUserQuery(supabase, email),
    ["user", email],
    {
      tags: [`user_${email}`],
      revalidate: 3600,
    }
  )();
};

export const getUserCredits = async (userId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getUserCreditsQuery(supabase, userId),
    ["user_credits", userId],
    {
      tags: [`user_${userId}_credits`],
      revalidate: 10,
    }
  )();
};
