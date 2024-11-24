import { redirect } from "next/navigation";
import RecordingLayout from "@/components/audio/RecordingLayout";
import Section from "@/components/Section";
import {
  getSession,
  getRecordingById,
  getTranscriptByRecordingId,
  getSummaryByRecordingId,
} from "@/lib/db/cached-queries";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getSession();

  if (!user) {
    return redirect("/auth");
  }

  const recording = await getRecordingById(params.id);
  if (!recording) {
    console.error("No recording found");
    return <div>No data found</div>;
  }

  const transcript = await getTranscriptByRecordingId(params.id);
  if (!transcript) {
    console.error("No transcript found");
    return <div>No data found</div>;
  }

  const summary = await getSummaryByRecordingId(params.id);

  const data = { recording, transcript, summary };

  return (
    <Section>
      <RecordingLayout data={data} />
    </Section>
  );
}
