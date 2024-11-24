import { unstable_cache } from "next/cache";
import { getSupabase } from "./general";
import {
  getChatByIdQuery,
  getMessagesByChatIdQuery,
  getDocumentByIdQuery,
} from "../queries";

export const getChatById = async (chatId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getChatByIdQuery(supabase, { id: chatId }),
    ["chat", chatId],
    {
      tags: [`chat_${chatId}`],
      revalidate: 10,
    }
  )();
};

export const getMessagesByChatId = async (chatId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getMessagesByChatIdQuery(supabase, { id: chatId }),
    ["messages", chatId],
    {
      tags: [`chat_${chatId}_messages`],
      revalidate: 10,
    }
  )();
};

export const getDocumentById = async (documentId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getDocumentByIdQuery(supabase, { id: documentId }),
    ["document", documentId],
    {
      tags: [`document_${documentId}`],
      revalidate: 10,
    }
  )();
};
