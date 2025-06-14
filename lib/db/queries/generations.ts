import type { Client } from "@/lib/types/supabase";

export async function getGenerationBySlugQuery(client: Client, slug: string) {
  const { data, error } = await client
    .from("generations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getUserGenerationsQuery(
  client: Client,
  {
    email,
    type,
    limit = 50,
  }: {
    email: string;
    type?: string;
    limit?: number;
  }
) {
  const baseQuery = client
    .from("generations")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });

  // Add type filter if provided - now matches any string containing the type
  const query = type
    ? baseQuery.ilike("type", `%${type}%`) // This will match "(apps)/llama" when type is "llama"
    : baseQuery;

  const { data, error } = await query.limit(limit);

  if (error) throw error;
  return data ?? [];
}
