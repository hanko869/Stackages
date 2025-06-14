"use client";

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";

const ImageUpload: React.FC<any> = ({
  currentImg = null,
  uploadConfig,
  setImageUrl,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [src, setSrc] = useState<string | null>(currentImg);

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) {
      alert("You must select an image to upload.");
      return;
    }

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    try {
      setUploading(true);

      let formData = new FormData();
      formData.append("image", file);
      formData.append("uploadPath", uploadConfig.path);

      const response = await fetch("/api/vision/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);
      setSrc(data.url);
      setImageUrl(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setSrc(null);
    setImageUrl(null);
  };

  return (
    <div className="mb-4 w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg relative overflow-hidden">
      {src ? (
        <div className="relative">
          <img
            src={src}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <FileUpload onChange={handleFileUpload} />
      )}
      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
