export default function CTA() {
  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="max-md:px-8 max-w-3xl">
              <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
                You should buy our product.{" "}
                <p className="italic text-md font-light ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
                  (please, so I can pay rent)
                </p>
              </h2>{" "}
              <p className="mt-4 md:mt-8 text-base-content max-w-[600px] mx-auto">
                If you buy our product, and every other person buys it too, then
                I would be set for life. So please, do, otherwise, I have to
                work a 9-5.
              </p>
            </div>

            <div className="flex flex-row mt-8 space-y-4 items-center justify-center sm:space-y-0 sm:space-x-4 sm:mt-10">
              <div className="z-[0] flex flex-row relative group scale-[.8] mb-4">
                <a
                  href="#"
                  className="btn bg-accent text-white hover:bg-accent/80 border border-primary"
                >
                  <span>Buy our product!</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
