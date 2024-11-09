import { createClient } from "@/lib/utils/supabase/server";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function generateUniqueSlug(
  title: string,
  type: string
): Promise<string> {
  const supabase = createClient();

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 0;
  let isUnique = false;

  while (!isUnique) {
    const { data, error } = await supabase
      .from("generations")
      .select("slug")
      .eq("slug", counter === 0 ? slug : `${slug}-${counter}`)
      .eq("type", type)
      .single();

    if (error?.code === "PGRST116") {
      // No results found, slug is unique
      isUnique = true;
      if (counter > 0) {
        slug = `${slug}-${counter}`;
      }
    } else if (error) {
      throw error;
    } else {
      // Slug exists, increment counter
      counter++;
    }
  }

  return slug;
}
