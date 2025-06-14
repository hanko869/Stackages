import React from "react";

interface MessageDisplayProps {
  message: string;
  messageType: string;
}

export default function MessageDisplay({
  message,
  messageType,
}: MessageDisplayProps) {
  const isSuccess = messageType === "success";

  return (
    <div
      className={`mt-10 flex justify-center w-full ${
        isSuccess ? "text-green-500" : "text-red-500"
      }`}
    >
      <div className="flex flex-col justify-center items-center">
        {isSuccess ? (
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <div className={`text-sm font-medium mt-2`}>{message}</div>
      </div>
    </div>
  );
}
