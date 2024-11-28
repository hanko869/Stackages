"use client";

import { useState, Suspense } from "react";
import { formatTimestamp } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function RecordingDesktop({ data }: { data: any }) {
  const { recording, summary, transcript } = data;
  const [note, setNote] = useState(summary);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    setIsOpen(true);

    // Call your API to generate summary
    const response = await fetch("/api/audio/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recordingId: recording.id,
        transcript: transcript.transcript,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setNote({
        ...note,
        summary: result.summary,
        action_items: result.action_items,
      });
      router.refresh();
      setIsOpen(false); // Close the modal after summary is generated
    } else {
      console.error("Error generating summary:", result.error);
    }

    setIsGeneratingSummary(false);
  };

  const { created_at: _creationTime } = recording;
  const { generatingTitle, title } = summary ?? {};

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/audio/app")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to recordings
        </Button>
        <h1
          className={`text-2xl font-semibold mb-2 ${
            generatingTitle && "animate-pulse"
          }`}
        >
          {generatingTitle ? "Generating Title..." : title ?? "Untitled Note"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatTimestamp(new Date(_creationTime).getTime())}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Transcript */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Transcript</h2>
          <div className="prose prose-sm max-w-none">
            {transcript.transcript}
          </div>
        </div>

        {/* Right Column - Summary & Action Items */}
        <div className="space-y-6">
          {/* Summary Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-lg font-medium mb-4">Summary</h2>
            {summary?.summary ? (
              <div className="prose prose-sm max-w-none">{summary.summary}</div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  No summary available.
                </p>
                <Button
                  className="w-full"
                  onClick={generateSummary}
                  disabled={isGeneratingSummary}
                >
                  {isGeneratingSummary
                    ? "Generating summary..."
                    : "Generate summary"}
                </Button>
              </div>
            )}
          </div>

          {/* Action Items Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-lg font-medium mb-4">Action Items</h2>
            {summary?.action_items ? (
              <ul className="space-y-2">
                {(Array.isArray(summary.action_items)
                  ? summary.action_items
                  : JSON.parse(summary.action_items)
                ).map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary/10 text-primary rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No action items available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Loading Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generating Summary</DialogTitle>
            <DialogDescription>
              Please wait while we generate the summary for your recording.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="mt-4 text-sm text-muted-foreground">
              Processing, please wait...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
