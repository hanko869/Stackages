"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RecordVoicePage = (user: any) => {
  const [title, setTitle] = useState("Record new voice note");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const router = useRouter();

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let audioChunks: any = [];

      recorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob);
        formData.append("uploadPath", "audio");

        const response = await fetch("/api/audio/upload", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (result.error) {
          console.error("Error uploading audio:", result.error);
          return;
        }

        const transcriptionResponse = await fetch("/api/audio/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recordingId: result.recordingId,
            audioUrl: result.url,
          }),
        });

        const transcriptionResult = await transcriptionResponse.json();

        if (transcriptionResponse.status !== 200) {
          console.error("Error in transcription:", transcriptionResult.error);
          return;
        }

        if (user) {
          router.push(`/audio/${result.recordingId}`);
        }
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRunning(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow access to the microphone and try again.");
      setTitle("Record new voice note");
    }
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setIsRunning(false);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  const handleRecordClick = () => {
    if (title === "Record new voice note") {
      setTitle("Recording...");
      startRecording();
    } else if (title === "Recording...") {
      setTitle("Processing...");
      stopRecording();
    }
  };

  return (
    <>
      <div className="px-4">
        <div className="space-y-1 mb-4 mt-4">
          <h4 className="text-sm font-medium leading-none"> {title}</h4>
          <p className="text-sm text-muted-foreground">
            You can record a new voice note below to generate a transcript.
          </p>
        </div>
        <div className="w-full h-16 flex z-10 justify-center">
          <div className="w-full flex rounded-3xl shadow z-100 bg-white relative justify-center items-center px-3 py-2">
            <div className="px-6">
              <div className="relative group z-50">
                <div className="font-inter-medium text-black text-sm flex justify-center items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>{" "}
                  {formatTime(Math.floor(totalSeconds / 60))}:
                  {formatTime(totalSeconds % 60)}
                </div>
              </div>
            </div>
            <div className="px-6">
              <button
                onClick={handleRecordClick}
                disabled={title === "Processing..."}
                className={`w-40 btn flex flex-col bg-black rounded-xl text-white text-sm transition-all relative flex justify-center items-center outline-none focus:outline-none ring-transparent cursor-pointer tw-dark-btn-rounded-2xl ${
                  isRunning
                    ? "bg-red-500 hover:bg-red-400"
                    : "hover:bg-black/80"
                } text-base-100 px-4 py-1 flex items-center`}
              >
                {isRunning ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                    />
                  </svg>
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center mr-1">
                    <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  </span>
                )}
                <span className="mr-1">
                  {isRunning ? "Stop recording" : "Start recording"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordVoicePage;
