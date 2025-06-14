"use client";
import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import Check from "@/components/alerts/Check";

export default function Newsletter() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubscription = async () => {
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email!");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("newsletter").insert([{ email }]);
    if (error) {
      if (error.code === "23505") {
        setMessage("You're already subscribed to the newsletter!");
      } else {
        console.error("Error inserting email: ", error);
      }
    } else {
      setMessage("You have subscribed!");
      setSubscribed(true);
    }
    setLoading(false);
  };

  return (
    <>
      {!subscribed ? (
        <div className="flex justify-center mx-auto mt-4 mb-4 max-w-md flex rounded-lg overflow-hidden">
          <form className="flex-grow bg-white flex-shrink flex items-center">
            <div className="flex-grow bg-white flex-shrink flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="tupac.shakur@biggie.com"
                className="w-full px-4 p-1 bg-white text-base-content text-sm font-light focus:outline-none focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-sm h-10 -ml-5 rounded-r-lg bg-accent text-base-100 hover:bg-accent/90 px-4 py-1 flex items-center"
              onClick={handleSubscription}
              disabled={loading}
            >
              {loading ? "Loading..." : "Subscribe to newsletter"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden sm:flex h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <Check>{message}</Check>
      )}
    </>
  );
}
