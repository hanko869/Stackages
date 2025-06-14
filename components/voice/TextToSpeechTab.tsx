"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SettingsModal } from "./SettingsModal";
import { AudioPlayer } from "./AudioPlayer";
import { AudioWaveformIcon, SettingsIcon } from "lucide-react";

export const TextToSpeechTab: React.FC = () => {
  const [model, setModel] = useState("");
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({});
  const [voices, setVoices] = useState<{ voice_id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch("/api/voice/voices");
        if (!response.ok) {
          throw new Error("Failed to fetch voices");
        }
        const data = await response.json();
        const voicesData = data.voices.map((v: any) => ({
          voice_id: v.voice_id,
          name: v.name,
        }));
        setVoices(voicesData);

        // Set the first voice as default
        if (voicesData.length > 0) {
          setVoice(voicesData[0].voice_id);
        }
      } catch (error) {
        console.error("Error fetching voices:", error);
      }
    };

    fetchVoices();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/voice/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, settings }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const data = await response.json();
      setAudioUrl(data.url);
    } catch (error) {
      console.error("Error generating audio:", error);
      alert("Failed to generate audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech"
          className="min-h-[100px]"
        />
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Select onValueChange={setVoice} value={voice}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.voice_id} value={voice.voice_id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              className="rounded-xl btn btn-md btn-ghost text-primary"
              type="button"
              onClick={() => setIsSettingsOpen(true)}
            >
              <SettingsIcon className="w-4" />
            </button>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !voice || !model || !text.trim()}
            className="text-primary-content"
          >
            <AudioWaveformIcon className="w-4 mr-2" />
            {isLoading ? "Generating..." : "Generate audio"}
          </Button>
        </div>
      </form>
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChange={setSettings}
        model={model}
        setModel={setModel}
      />
    </div>
  );
};
