import type { Client } from "@/lib/types/supabase";

export async function getRecordingByIdQuery(client: Client, id: string) {
  const { data, error } = await client
    .from("recordings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getTranscriptByRecordingIdQuery(
  client: Client,
  recordingId: string
) {
  const { data, error } = await client
    .from("transcripts")
    .select("*")
    .eq("recording_id", recordingId)
    .single();

  if (error) throw error;
  return data;
}

export async function getSummaryByRecordingIdQuery(
  client: Client,
  recordingId: string
) {
  const { data, error } = await client
    .from("summaries")
    .select("*")
    .eq("recording_id", recordingId)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserRecordingsQuery(client: Client, userId: string) {
  const { data, error } = await client
    .from("recordings")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}
