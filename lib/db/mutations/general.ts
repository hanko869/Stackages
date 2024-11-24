import { createClient } from "@/lib/utils/supabase/server";
import { generateUniqueSlug } from "@/lib/hooks/generateSlug";
import { revalidateTag } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";
import { Client, handleDatabaseError } from "@/lib/types/supabase";
import { Database } from "@/lib/types/supabase";

// Add type for the insert data
type GenerationInsert = Database["public"]["Tables"]["generations"]["Insert"];

// Define getSupabase here instead of importing
const getSupabase = async () => createClient();

// Reuse the mutateQuery helper from chat.ts
async function mutateQuery<T extends any[]>(
  queryFn: (client: Client, ...args: T) => Promise<void>,
  args: T,
  tags: string[]
) {
  const supabase = await getSupabase();
  try {
    await queryFn(supabase, ...args);
    tags.forEach((tag) => revalidateTag(tag));
  } catch (error) {
    handleDatabaseError(error as PostgrestError);
  }
}

export async function reduceUserCredits(email: string, credits: number) {
  if (credits <= 0) throw new Error("Credits must be positive");

  let result: any[] | null = null;
  await mutateQuery(
    async (client, email, credits: number) => {
      const { data: userData, error: userError } = await client
        .from("profiles")
        .select("credits")
        .eq("email", email)
        .single();

      if (userError) throw userError;
      if (!userData) throw new Error("User not found");
      if (userData.credits === null)
        throw new Error("User credits not initialized");

      const currentCredits: number = Number(userData.credits);
      const creditsToReduce: number = Number(credits);
      const updatedCredits = currentCredits - creditsToReduce;

      const { data, error } = await client
        .from("profiles")
        .update({ credits: updatedCredits })
        .eq("email", email)
        .select();

      if (error) throw error;
      if (!data || data.length === 0)
        throw new Error("No data returned from update");
      result = data;
    },
    [email, credits],
    [`user_${email}_credits`, "profiles"]
  );

  if (!result) throw new Error("Operation failed");
  return result;
}

export async function uploadToSupabase(
  input: any,
  output: any,
  toolPath: string,
  model: string
): Promise<any[]> {
  let result: any[] | null = null;
  await mutateQuery(
    async (client, input, output, toolPath, model) => {
      const seoMetadata = getSeoMetadata(output);
      const insertData = await buildInsertData(
        input,
        output,
        toolPath,
        model,
        seoMetadata
      );

      const { data, error } = await client
        .from("generations")
        .insert(insertData)
        .select("*");

      if (error) throw error;
      if (!data || data.length === 0)
        throw new Error("No data returned from insert");
      result = data;
    },
    [input, output, toolPath, model],
    [`generations_${toolPath}`, "generations"]
  );

  if (!result) throw new Error("Operation failed");
  return result;
}

// Helper functions
function getSeoMetadata(output: any) {
  if (output.seoMetadata) return output.seoMetadata;
  if (output.parameters?.seoMetadata) return output.parameters.seoMetadata;
  return null;
}

async function buildInsertData(
  input: any,
  output: any,
  toolPath: string,
  model: string,
  seoMetadata: any
): Promise<GenerationInsert> {
  const insertData: GenerationInsert = {
    email: input.email,
    input_data: input,
    output_data: output,
    type: toolPath,
    model: model,
  };

  if (seoMetadata) {
    if (seoMetadata.title) {
      insertData.title = seoMetadata.title;
      insertData.slug = await generateUniqueSlug(seoMetadata.title, toolPath);
    }
    if (seoMetadata.subtitle) insertData.subtitle = seoMetadata.subtitle;
    if (seoMetadata.description)
      insertData.description = seoMetadata.description;
  }

  return insertData;
}
