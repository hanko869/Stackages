import SocialProof from "@/components/socialproof/SocialProof";

export default function Hero() {
  return (
    <>
      {" "}
      <section className="text-white bg-primary">
        <div className="grid lg:grid-cols-2 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-12 py-10 lg:py-24">
          <div className="lg:hidden items-center justify-center text-center gap-10">
            <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4 leading-tight">
              Turn voice recordings into
              <span
                className="bg-base-100 text-base-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap"
                style={{ display: "inline-block", transform: "rotate(-1deg)" }}
              >
                structured notes
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
            <h1 className="hidden lg:block font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4 leading-tight">
              Turn voice recordings into
              <span
                className="bg-base-100 text-base-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap"
                style={{ display: "inline-block", transform: "rotate(-1deg)" }}
              >
                structured notes
              </span>
            </h1>
            <p className="text-lg font-bold leading-relaxed">
              Getting started is easy. Record your voice, and we'll turn it into
              structured notes.
            </p>

            <div className="flex justify-center flex-row gap-2 flex-wrap ">
              <a
                className="btn btn-base-300 hover:btn-accent/80 w-64 "
                href="/audio/app"
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
                Record your voice
              </a>
              <a className="btn btn-ghost text-content" href="/home">
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

            <div className="flex flex-col justify-center lg:justify-start">
              <SocialProof
                text={"Justin Bieber likes this"}
                color={"text-white"}
              />
            </div>
          </div>
          <div className="lg:w-full flex flex-col align-center items-center justify-center gap-10">
            <div className="bg-base-100 rounded-xl p-4 lg:p-8 flex flex-row">
              <img
                src="https://images.unsplash.com/photo-1488376986648-2512dfc6f736?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="rounded-xl w-full sm:w-[400px] md:w-[600px] lg:w-[800px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
