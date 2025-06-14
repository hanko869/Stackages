export default function GoogleSignInButton() {
  const signInWithGoogle = async () => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      if (data.url) {
        // Redirect the user to the Supabase-provided URL
        window.location.href = data.url;
      } else {
        throw new Error("No URL returned from the server");
      }
    } catch (error) {
      console.error("Error initiating Google Sign-In:", error);
    }
  };

  return (
    <div className="w-full w-full">
      <button
        onClick={signInWithGoogle}
        className="rounded-xl w-full h-30 flex flex-shrink-0 content-center items-center justify-center border border-base-200 bg-white px-6 py-3 text-center font-medium text-black shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-2"
      >
        <div className="mr-1.5 flex h-6 w-6 items-center justify-center rounded-sm">
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#4285F4"
                d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
              ></path>
              <path
                fill="#34A853"
                d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
              ></path>
              <path
                fill="#FBBC04"
                d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
              ></path>
              <path
                fill="#EA4335"
                d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
              ></path>
            </g>
          </svg>
        </div>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
