import { TextToSpeechTab } from "@/components/voice/TextToSpeechTab";
import AppInfo from "@/components/voice/AppInfo";
import Login from "@/components/input/login";

interface InputCaptureProps {
  userEmail?: string;
}

export default function VoiceLayout({ userEmail }: InputCaptureProps) {
  return (
    <section className="relative min-h-screen">
      <div className="flex flex-col md:flex-row items-start no-scrollbar">
        <div className="w-full md:w-1/2 no-scrollbar">
          <AppInfo />
        </div>
        <div className="w-full px-8 md:w-1/2">
          {userEmail ? (
            <div className="mt-5 flex justify-center mb-6 mx-auto p-4">
              <TextToSpeechTab />
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </section>
  );
}
