import { FormEvent } from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { LoaderCircle, Send } from "lucide-react";

interface ChatInputFieldProps {
  input: string;
  placeholder?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInputField({
  input,
  placeholder,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputFieldProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full px-4 sm:pt-10 pt-2"
    >
      <div className="bg-gray-100 relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-xl border border-1 px-2 sm:px-4">
        <input
          className="min-h-[60px] resize-none text-base-content bg-transparent pl-0 pr-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          value={input}
          placeholder={placeholder ?? "Send a message here."}
          onChange={handleInputChange}
        />
        <div className="absolute right-0 top-[13px] sm:right-4 px-2 md:px-0">
          <ShimmerButton
            className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-primary-foreground shadow hover:bg-black/90 h-9 w-9"
            type="submit"
          >
            <div
              role="status"
              className={`${isLoading ? "" : "hidden"} flex justify-center`}
            >
              <LoaderCircle className="w-6 h-6 text-white animate-spin dark:text-white" />
              <span className="sr-only">Loading...</span>
            </div>
            <span className={isLoading ? "hidden" : ""}>
              <Send className="size-4 text-white" />
            </span>
          </ShimmerButton>
        </div>
      </div>
    </form>
  );
}
