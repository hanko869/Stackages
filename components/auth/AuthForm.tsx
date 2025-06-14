import React, { useState } from "react";

interface AuthFormProps {
  onEmailSubmit: (email: string) => void;
  isLoading: boolean;
}

export default function AuthForm({ onEmailSubmit, isLoading }: AuthFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 w-full">
        <label className="text-left block font-semibold mb-2"> ✉️ Email </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="tupac@shakur.com"
          required
          className="input w-full p-3 rounded-xl shadow-sm focus:outline-none border-base-300 bg-base-200 text-base-content-content"
        />
      </div>

      <button
        disabled={isLoading}
        title="Send magic link"
        type="submit"
        className={`btn bg-primary hover:bg-primary/70 rounded-xl text-white w-full p-3 font-medium ${
          isLoading ? "bg-primary/80" : ""
        }`}
        role="button"
      >
        {!isLoading && (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 mr-2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g id="style=linear">
                <g id="email">
                  <path
                    id="vector"
                    d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    id="vector_2"
                    d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        )}
        {isLoading ? "Loading..." : "Send Magic Link"}
      </button>
    </form>
  );
}
