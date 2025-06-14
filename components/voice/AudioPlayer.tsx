import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Auto-play failed:", error);
        // Autoplay was prevented. You might want to show a play button here.
      });
    }
  }, [audioUrl]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "generated_audio.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-4">
      <h2 className="text-md font-semibold mb-2">Generated audio:</h2>
      <audio ref={audioRef} controls src={audioUrl} className="w-full mb-2">
        Your browser does not support the audio element.
      </audio>
      <div className="flex justify-center">
        <Button onClick={handleDownload} className="text-primary-content">
          <DownloadIcon className="w-4 mr-2" />
          Download MP3
        </Button>
      </div>
    </div>
  );
};
