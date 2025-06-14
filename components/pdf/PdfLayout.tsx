"use client";

import React, { useState } from "react";
import PdfAppInfo from "@/components/pdf/PdfAppInfo";
import UploadDialog from "./UploadDialog";
import YourFiles from "./YourFiles";
import { useRouter } from "next/navigation";
import Login from "@/components/input/login";

interface InputCaptureProps {
  userEmail?: string;
  documents?: any;
  credits?: any;
}

export default function PdfLayout({
  userEmail,
  documents,
  credits,
}: InputCaptureProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<string>("Idle");
  const router = useRouter();

  const handleUpload = async (url: string | null, id: string | null) => {
    setStatus("Adding document...");
    setFileUrl(url);
    setDocumentId(id);
    if (url) {
      setStatus("Generating embeddings...");

      const res = await fetch("/api/pdf/vectorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileUrl: url,
          documentId: id,
        }),
      });

      const data = await res.json();
      setResponse(data);

      if (data?.id) {
        router.push(`/pdf/document/${data.id}`);
      } else {
        setStatus("Failed to generate embeddings.");
      }

      setStatus("Idle");
    } else {
      setFileName(null);
    }
  };

  const handleUrlSubmit = async () => {
    if (!fileUrl || !fileName) {
      alert("File URL and name are required.");
      return;
    }

    setStatus("Adding document...");

    const addDocumentResponse = await fetch("/api/pdf/externaldoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: fileUrl, fileName }),
    });

    const addDocumentData = await addDocumentResponse.json();

    if (addDocumentData.error) {
      setStatus("Failed to add document.");
      setResponse(addDocumentData);
      return;
    }

    setDocumentId(addDocumentData.documentId);
    setFileUrl(addDocumentData.url);
    setStatus("Generating embeddings...");

    const res = await fetch("/api/pdf/vectorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileUrl: addDocumentData.url,
        fileName,
        documentId: addDocumentData.documentId,
      }),
    });

    const data = await res.json();
    setResponse(data);

    if (data?.id) {
      router.push(`/pdf/document/${data.id}`);
    } else {
      setStatus("Failed to generate embeddings.");
    }

    setStatus("Idle");
  };

  return (
    <section className="relative min-h-screen">
      <div className="flex flex-col md:flex-row items-start no-scrollbar">
        <div className="w-full md:w-1/2 no-scrollbar">
          <PdfAppInfo />
        </div>
        <div className="w-full px-8 md:w-1/2">
          {userEmail ? (
            <>
              <div className="mt-4 flex justify-center">
                <UploadDialog
                  fileUrl={fileUrl}
                  fileName={fileName}
                  setFileUrl={setFileUrl}
                  setFileName={setFileName}
                  handleUpload={handleUpload}
                  handleUrlSubmit={handleUrlSubmit}
                  status={status}
                  response={response}
                />
              </div>
              {documents && documents.length > 0 && (
                <YourFiles documents={documents} />
              )}
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </section>
  );
}
