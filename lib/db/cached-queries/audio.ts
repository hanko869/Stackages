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
  try {
    const result = await unstable_cache(
      async () => getRecordingByIdQuery(supabase, id),
      ["recording", id],
      {
        tags: [`recording_${id}`],
        revalidate: 10,
      }
    )();
    return result;
  } catch (error) {
    console.error("Error fetching recording:", error);
    return null;
  }
};

export const getTranscriptByRecordingId = async (recordingId: string) => {
  const supabase = await getSupabase();
  try {
    const result = await unstable_cache(
      async () => getTranscriptByRecordingIdQuery(supabase, recordingId),
      ["transcript", recordingId],
      {
        tags: [`transcript_${recordingId}`],
        revalidate: 10,
      }
    )();
    return result;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return null;
  }
};

export const getSummaryByRecordingId = async (recordingId: string) => {
  const supabase = await getSupabase();
  try {
    const result = await unstable_cache(
      async () => getSummaryByRecordingIdQuery(supabase, recordingId),
      ["summary", recordingId],
      {
        tags: [`summary_${recordingId}`],
        revalidate: 10,
      }
    )();
    return result;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return null;
  }
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
