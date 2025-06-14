import { AuthError } from "@supabase/supabase-js";
import type { Client } from "@/lib/types/supabase";

export async function getSessionQuery(client: Client) {
  try {
    const {
      data: { user },
      error,
    } = await client.auth.getUser();

    if (error) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserQuery(client: Client, email: string) {
  const { data: users, error } = await client
    .from("profiles")
    .select()
    .eq("email", email)
    .single();

  if (error) throw error;
  return users;
}

export async function getUserCreditsQuery(client: Client, userId: string) {
  const { data: profile, error } = await client
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return profile?.credits ?? 0;
}

type PostgrestError = {
  code: string;
  message: string;
  details: string | null;
  hint: string | null;
};

export function handleSupabaseError(error: PostgrestError | null) {
  if (!error) return null;
  if (error.code === "PGRST116") return null;
  throw error;
}
