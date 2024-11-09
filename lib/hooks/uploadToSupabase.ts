import { createClient } from "@/lib/utils/supabase/server";
import { generateUniqueSlug } from "@/lib/hooks/generateSlug";

export async function uploadToSupabase(
  input: any,
  output: any,
  toolPath: string,
  model: string
) {
  const supabase = createClient();

  // Function to get SEO metadata from output or output.parameters
  const getSeoMetadata = () => {
    if (output.seoMetadata) {
      return output.seoMetadata;
    } else if (output.parameters && output.parameters.seoMetadata) {
      return output.parameters.seoMetadata;
    }
    return null;
  };

  const seoMetadata = getSeoMetadata();

  const insertData: Record<string, any> = {
    email: input.email,
    input_data: input,
    output_data: output,
    type: toolPath,
    model: model,
  };

  // Only add SEO fields if they exist in the output
  if (seoMetadata) {
    if (seoMetadata.title) {
      insertData.title = seoMetadata.title;
      // Only generate slug if there's a title
      insertData.slug = await generateUniqueSlug(seoMetadata.title, toolPath);
    }
    if (seoMetadata.subtitle) {
      insertData.subtitle = seoMetadata.subtitle;
    }
    if (seoMetadata.description) {
      insertData.description = seoMetadata.description;
    }
  }

  const { data, error } = await supabase
    .from("generations")
    .insert([insertData])
    .select();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No data returned from insert");

  console.log("Successfully stored in database");
  return data;
}
