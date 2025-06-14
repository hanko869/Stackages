import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { IconOpenAI } from "@/components/icons";
import {
  GearIcon,
  Link1Icon,
  PaddingIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { DatabaseIcon, RouteIcon, TrashIcon } from "lucide-react";
import { IconVector } from "@tabler/icons-react";
import AppInfo from "@/components/input/AppInfo";
import Info from "@/components/alerts/Info";

export default function AudioInfo() {
  return (
    <AppInfo title="Turn your thoughts into notes" background="bg-primary/5">
      <div className="py-8 flex justify-center">
        <AnimatedBeamOpenAI />
      </div>
      <Info>
        Have a look{" "}
        <a
          href="https://docs.anotherwrapper.com/ai/audio"
          target="_blank"
          className="font-semibold underline"
        >
          at the documentation
        </a>{" "}
        for more information on setting up the app.
      </Info>

      <ul className="mt-4 ml-4 text-sm space-y-2 flex flex-col mb-4 relative xs:leading-7">
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <IconOpenAI className="w-4 h-4" />
          </span>
          <span className="ml-2">
            This demo application uses the `incredibly-fast-whisper` (Replicate)
            to transcribe audio, LLaMA 3 (Groq) to summarize, Supabase database
            to store data and Cloudflare R2 to upload audio files.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <DatabaseIcon className="w-4 h-4" />
          </span>
          <span className="ml-2">
            Audio is uploaded into Cloudflare R2, then transcribed and the data
            is stored in your Supabase PostgRES database.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <PaddingIcon className="w-4 h-4" />
          </span>
          <span className="ml-2">
            The main frontend logic is found in the{" "}
            <code>app/(apps)/audio</code> folder.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <GearIcon className="w-4 h-4" />
          </span>
          <span className="ml-2">
            The main configuration file can be found in{" "}
            <code>app/(apps)/audio/toolConfig.ts</code> file.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <RouteIcon className="w-4 h-4" />
          </span>
          <span className="ml-2">
            The API transcription endpoint and logic can be found in{" "}
            <code>app/api/(apps)/audio/transcribe/route.ts</code>.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <IconVector className="w-4 h-4" />
          </span>
          <span className="ml-2">
            The API to summarize the transcript be found in{" "}
            <code>app/api/(apps)/audio/summarize/route.ts</code>.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <Link1Icon className="w-4 h-4" />
          </span>
          <span className="ml-2">
            The API to upload audio can be found in{" "}
            <code>app/api/(apps)/audio/upload/route.ts</code>.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <TrashIcon className="w-4 h-4" />
          </span>
          <span className="ml-2">
            The API to delete audio & Supabase entries can be found in{" "}
            <code>app/api/(apps)/audio/delete/route.ts</code>.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <RocketIcon className="w-4 h-4" />
          </span>
          <span className="ml-2">Hope you like it - give it a try!</span>
        </li>
      </ul>
    </AppInfo>
  );
}
