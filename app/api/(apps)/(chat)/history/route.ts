import { getSession } from "@/lib/db/cached-queries";
import { createClient } from "@/lib/utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  const user = await getSession();

  if (!user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const { data: chats, error } = await supabase
    .from("chats")
    .select()
    .eq("user_id", user.id!)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return Response.json(chats);
}
