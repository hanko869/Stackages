import type { Client } from "@/lib/types/supabase";

export async function getPdfDocumentByIdQuery(client: Client, id: string) {
  const { data, error } = await client
    .from("pdf_documents")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserPdfDocumentsQuery(client: Client, userId: string) {
  const { data, error } = await client
    .from("pdf_documents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPdfConversationByIdQuery(
  client: Client,
  conversationId: string
) {
  const { data, error } = await client
    .from("conversations")
    .select("conversation")
    .eq("id", conversationId)
    .single();

  if (error) throw error;
  return data;
}
