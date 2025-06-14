"use client";

import React, { useState } from "react";
import Check from "@/components/alerts/Check";

const Upload: React.FC<{
  currentFile: string | null;
  setFileDetails: (url: string | null, id: string | null) => void;
}> = ({ currentFile = null, setFileDetails }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [src, setSrc] = useState<string | null>(currentFile);

  const uploadFile = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files ? evt.target.files[0] : null;
    if (!file) {
      alert("You must select a PDF to upload.");
      return;
    }

    const uploadConfig = {
      path: "pdf",
      apiEndpoint: "/api/pdf/upload",
    };

    if (!uploadConfig || !uploadConfig.path) {
      alert("Upload configuration is missing.");
      return;
    }

    try {
      setUploading(true);

      let formData = new FormData();
      formData.append("file", file);
      formData.append("uploadPath", uploadConfig.path);

      const response = await fetch(uploadConfig.apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload PDF: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);
      if (data.error) {
        throw new Error(data.error);
      }
      setSrc(data.url);
      setFileDetails(data.url, data.documentId); // Set the file URL and document ID in the parent component
    } catch (error) {
      console.error("Upload error:", error);
      alert((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {src ? (
        <Check>Your PDF has been uploaded successfully.</Check>
      ) : uploading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <div className="mb-4">
          <div className="w-[350px] rounded-full">
            <label
              htmlFor="single"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                id="single"
                accept="application/pdf"
                onChange={uploadFile}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
