import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/utils/supabase/server";
import { getGenerationBySlugQuery, getUserGenerationsQuery } from "../queries";

const getSupabase = cache(() => createClient());

export const getGenerationBySlug = async (slug: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getGenerationBySlugQuery(supabase, slug),
    ["generation", slug],
    {
      tags: [`generation_${slug}`],
      revalidate: 10, // Cache for 10 seconds
    }
  )();
};

export const getUserGenerations = async (
  email: string,
  type?: string,
  limit?: number
) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getUserGenerationsQuery(supabase, { email, type, limit }),
    [
      "user_generations",
      email,
      ...(type ? [type] : []),
      ...(limit ? [limit.toString()] : []),
    ] as string[],
    {
      tags: [`user_${email}_generations`],
      revalidate: 10,
    }
  )();
};
