"use client";

import { useState } from "react";
import { ChatWindow } from "@/components/pdf/ChatWindow";
import ChatWelcome from "@/components/pdf/ChatWelcome";
import { Switch } from "@/components/ui/switch";

export default function DocumentClient({
  currentDoc,
  initialMessages,
}: {
  currentDoc: any;
  initialMessages: any[];
}) {
  const documentId = currentDoc.id;
  const pdfUrl = currentDoc.file_url;

  const [showPdf, setShowPdf] = useState(true);

  return (
    <div className="bg-white">
      <div className="mb-4 flex justify-center items-center space-x-2 hidden md:flex">
        <Switch
          id="show_pdf"
          checked={showPdf}
          onCheckedChange={(checked) => setShowPdf(checked === true)}
        />
        <label
          htmlFor="show_pdf"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show PDF
        </label>
      </div>

      <div
        className={`no-scrollbar grid w-full gap-4 ${
          showPdf ? "lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        <div className="h-[90vh] no-scrollbar pb-4">
          <ChatWindow
            endpoint="/api/pdf/chat"
            placeholder="Ask me anything about the document..."
            emptyStateComponent={<ChatWelcome />}
            chatId={currentDoc.conversation_id}
            initialMessages={initialMessages}
            documentId={documentId}
          />
        </div>
        {showPdf && (
          <div className="h-[90vh] text-white flex flex-col no-scrollbar hidden md:flex">
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              style={{ border: "none" }}
              title="PDF Viewer"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
