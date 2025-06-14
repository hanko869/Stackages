import SocialProof from "@/components/socialproof/SocialProof";

export default function Hero() {
  return (
    <div className="bg-primary text-white">
      {" "}
      <section className="pb-24 p-4 text-center items-center flex flex-col">
        <h2 className="max-w-5xl mt-16 md:mt-18 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
          Generate accurate image descriptions
          <span className="bg-base-100 text-base-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            with AI
          </span>{" "}
        </h2>{" "}
        <h1 className="mt-4 md:mt-6 max-w-[600px]">
          Build your own GPT-4o vision app in minutes with this demo app that
          uses OpenAI, Cloudflare R2 & Supabase.
        </h1>
        <div className="mt-8">
          <div className="flex md:flex-row flex-col items-center space-x-4">
            <a
              className="btn btn-base-100 hover:bg-base-200 w-64 text-base-content"
              href="/apps/vision/app"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Generate descriptions
            </a>
            <a className="btn btn-ghost text-content" href="/apps">
              See other demo apps
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="18"
                height="18"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <path d="M22 6 L30 16 22 26 M30 16 L2 16"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-center lg:justify-start">
          {" "}
          <SocialProof text="Enjoyed by many." color={"text-base-content"} />
        </div>
        <div className="pt-10 lg:w-full flex flex-col items-center justify-center gap-10">
          <div className="bg-base-100 rounded-xl p-6 flex flex-row">
            <img
              src="https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?q=80&w=2792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-xl w-full sm:w-[400px] md:w-[600px] lg:w-[800px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
