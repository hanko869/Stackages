export default function OutputHero({
  title = "Response generated",
  subtitle = "Here comes your subtitle",
  textColor = "text-primary-content",
}: {
  title?: string;
  subtitle?: string;
  textColor?: string;
}) {
  return (
    <>
      {" "}
      <div className={`relative ${textColor} bg-primary`}>
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-base-100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h1 className="lg:block font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4 leading-tight">
              {title}
            </h1>

            <p className="mt-6 mb-6 text-base text-lg font-bold leading-relaxed md:text-lg">
              {subtitle}
            </p>

            <div className="flex justify-center flex-row gap-2 flex-wrap ">
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
          </div>
        </div>
      </div>
    </>
  );
}
