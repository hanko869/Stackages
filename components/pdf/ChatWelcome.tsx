import Info from "@/components/alerts/Info";

export default function WelcomeMessage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Info>
        <div className="text-md font-bold">Hi there! 👋🏼</div>
        <div>
          Start the conversation by sending a message below. Have fun with it!
        </div>
      </Info>
    </div>
  );
}
