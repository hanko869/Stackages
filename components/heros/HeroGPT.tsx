"use client";
import SocialProof from "@/components/socialproof/SocialProof";

export default function Hero() {
  return (
    <>
      {" "}
      <div className="relative text-neutral bg-primary">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <p className="lg:block font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4 leading-tight">
              Generate a marketing strategy
              <span className="bg-base-100 text-base-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap transform rotate-3">
                that works
              </span>
            </p>

            <h1 className="mt-6 mb-6 text-base text-lg font-bold leading-relaxed md:text-lg">
              Build your own marketing strategy generator using GPT-4o mini in
              minutes with this demo app that uses OpenAI, LangChain & Supabase.
            </h1>

            <div className="flex justify-center flex-row gap-2 flex-wrap ">
              <a
                className="btn btn-accent text-black w-64 "
                href="/apps/gpt/app"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Generate marketing plan
              </a>
              <a className="btn btn-ghost text-content" href="/apps">
                Other demo apps
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

            <div className="mt-5 flex justify-center ">
              <SocialProof text={"Trusted by Elon Musk"} color={"text-white"} />
            </div>
            <p className="max-w-md mb-10 text-xs font-thin tracking-wide sm:text-sm sm:mx-auto md:mb-16">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
            <a
              href="#form"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#faq")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Scroll down"
              className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-white rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
