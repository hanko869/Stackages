import AppInfo from "@/components/input/AppInfo";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { IconOpenAI } from "@/components/icons";
import {
  GearIcon,
  Link1Icon,
  PaddingIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Info from "@/components/alerts/Info";

const InfoCard = () => (
  <AppInfo title="A simple chatbot using GPT">
    <div className="py-8 flex justify-center">
      <AnimatedBeamOpenAI />
    </div>
    <Info>
      Have a look{" "}
      <a
        href="https://docs.anotherwrapper.com/ai/chat"
        target="_blank"
        className="font-semibold underline"
      >
        at the documentation
      </a>{" "}
      for more information on setting up the app.
    </Info>

    <ul className="mt-4 ml-4 space-y-2 flex flex-col mb-4 relative xs:leading-7">
      <li className="text-l flex">
        <span className="w-4 h-4">
          <IconOpenAI className="w-4 h-4" />
        </span>
        <span className="ml-2">
          This demo application uses OpenAI, LangChain.js and Supabase to create
          an intelligent chatbot with history.
        </span>
      </li>
      <li className="text-l flex">
        <span className="w-4 h-4">
          <PaddingIcon className="w-4 h-4" />
        </span>
        <span className="ml-2">
          The main frontend logic is found in the <code>app/(apps)/chat</code>{" "}
          folder.
        </span>
      </li>
      <li className="text-l flex">
        <span className="w-4 h-4">
          <GearIcon className="w-4 h-4" />
        </span>
        <span className="ml-2">
          The main configuration file can be found in{" "}
          <code>app/(apps)/chat/toolConfig.ts</code>. You can specify the GPT
          model used & number messages included in the history.
        </span>
      </li>
      <li className="text-l flex">
        <span className="w-4 h-4">
          <Link1Icon className="w-4 h-4" />
        </span>
        <span className="ml-2">
          The API endpoint and logic can be found in{" "}
          <code>app/api/(apps)/chat/route.ts</code>.
        </span>
      </li>
      <li className="text-l flex">
        <span className="w-4 h-4">
          <RocketIcon className="w-4 h-4" />
        </span>
        <span className="ml-2">Try it out - say hi! 👋</span>
      </li>
    </ul>
  </AppInfo>
);

export default InfoCard;
