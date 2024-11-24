import { unstable_cache } from "next/cache";
import { getSupabase } from "./general";
import {
  getRecordingByIdQuery,
  getTranscriptByRecordingIdQuery,
  getSummaryByRecordingIdQuery,
  getUserRecordingsQuery,
} from "../queries";

export const getRecordingById = async (id: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getRecordingByIdQuery(supabase, id),
    ["recording", id],
    {
      tags: [`recording_${id}`],
      revalidate: 10,
    }
  )();
};

export const getTranscriptByRecordingId = async (recordingId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getTranscriptByRecordingIdQuery(supabase, recordingId),
    ["transcript", recordingId],
    {
      tags: [`transcript_${recordingId}`],
      revalidate: 10,
    }
  )();
};

export const getSummaryByRecordingId = async (recordingId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getSummaryByRecordingIdQuery(supabase, recordingId),
    ["summary", recordingId],
    {
      tags: [`summary_${recordingId}`],
      revalidate: 10,
    }
  )();
};

export const getUserRecordings = async (userId: string) => {
  const supabase = await getSupabase();
  return unstable_cache(
    async () => getUserRecordingsQuery(supabase, userId),
    ["user_recordings", userId],
    {
      tags: [`user_${userId}_recordings`],
      revalidate: 10,
    }
  )();
};
