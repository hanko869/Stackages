import { unstable_cache } from "next/cache";
import { getSupabase } from "./general";
import {
  getPdfDocumentByIdQuery,
  getUserPdfDocumentsQuery,
  getPdfConversationByIdQuery,
} from "../queries";

export const getPdfDocumentById = async (id: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getPdfDocumentByIdQuery(supabase, id),
    ["pdf_document", id],
    {
      tags: [`pdf_document_${id}`],
      revalidate: 10,
    }
  )();
};

export const getUserPdfDocuments = async (userId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getUserPdfDocumentsQuery(supabase, userId),
    ["user_pdf_documents", userId],
    {
      tags: [`user_${userId}_pdf_documents`],
      revalidate: 10,
    }
  )();
};

export const getPdfConversationById = async (conversationId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getPdfConversationByIdQuery(supabase, conversationId),
    ["pdf_conversation", conversationId],
    {
      tags: [`pdf_conversation_${conversationId}`],
      revalidate: 10,
    }
  )();
};
