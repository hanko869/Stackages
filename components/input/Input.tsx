"use client";

import { useState, ReactElement } from "react";
import Upload from "@/components//input/ImageUpload";
import { useFormData } from "@/lib/hooks/useFormData";
import { generateAIResponse } from "@/lib/hooks/generateAIResponse";
import { RenderFields } from "@/components/input/FormFields";
import { type ToolConfig } from "@/lib/types/toolconfig";
import AppInfo from "@/components/input/AppInfo";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Login from "@/components/input/login";

interface InputCaptureProps {
  emptyStateComponent: ReactElement;
  toolConfig: ToolConfig;
  userEmail?: string;
  credits?: number;
}

export default function InputCapture({
  toolConfig,
  emptyStateComponent,
  userEmail,
  credits: initialCredits,
}: InputCaptureProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [credits, setCredits] = useState(initialCredits ?? undefined);

  const [formData, handleChange] = useFormData(toolConfig.fields!);
  const [generateResponse, loading] = generateAIResponse(
    toolConfig,
    userEmail || "",
    imageUrl,
    setGeneratedImage
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (credits !== undefined && toolConfig.credits !== undefined) {
      if (credits < toolConfig.credits || credits < 1) {
        window.location.reload();
        return;
      }
    }
    await generateResponse(formData, event);
    if (credits !== undefined && toolConfig.credits !== undefined) {
      setCredits((prevCredits) => {
        const updatedCredits = prevCredits
          ? prevCredits - toolConfig.credits
          : undefined;
        return updatedCredits;
      });
    }
  };

  return (
    <section className="pb-20 w-full mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 relative">
        <div className="w-full md:w-1/2">
          {toolConfig.type === "gpt" ||
          toolConfig.type === "grok" ||
          toolConfig.type === "groq" ||
          toolConfig.type === "claude" ||
          toolConfig.type === "vision" ? (
            emptyStateComponent
          ) : (toolConfig.type === "sdxl" || toolConfig.type === "dalle") &&
            !generatedImage ? (
            emptyStateComponent
          ) : (toolConfig.type === "sdxl" || toolConfig.type === "dalle") &&
            generatedImage ? (
            <AppInfo title="Your image has been generated.">
              <img
                src={generatedImage}
                className="mt-10 w-full group-hover:scale-105 duration-300 transition rounded-xl"
              />
              <p className="text-sm mt-4">
                Fill in the form on the right to generate a different image.
              </p>
            </AppInfo>
          ) : null}
        </div>
        <div className="w-full md:w-1/2">
          {!userEmail ? (
            <div className="w-full">
              <Login />
            </div>
          ) : (
            <div className="mt-5 w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col">
                  <div className="w-full mb-5">
                    {toolConfig.type === "vision" && (
                      <Upload
                        uploadConfig={toolConfig.upload}
                        setImageUrl={setImageUrl}
                      />
                    )}
                    <RenderFields
                      fields={toolConfig.fields!}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <Button
                    disabled={
                      (!imageUrl && toolConfig.type === "vision") || loading
                    }
                    type="submit"
                    className="bg-accent hover:bg-accent/80 text-white w-full"
                  >
                    {!loading ? (
                      toolConfig.submitText
                    ) : (
                      <span className="flex items-center justify-center">
                        <LoaderCircle className="w-4 h-4 mr-2 text-green-500 animate-spin" />
                        {toolConfig.submitTextGenerating}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
