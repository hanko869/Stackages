import SocialProof from "@/components/socialproof/SocialProof";

export default function CTA() {
  return (
    <>
      <section className="py-12 bg-primary sm:py-16 lg:py-20 xl:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="mt-6 text-3xl font-medium tracking-tight text-gray-900 sm:text-3xl lg:mt-8 lg:text-4xl">
                  This is an amazing {""}
                  <span className="font-bold bg-clip-text text-primary-content">
                    call to action section
                  </span>{" "}
                  that will get you sales.
                </h2>
                <p className="mt-4 text-base font-normal leading-7 text-base-content lg:text-lg lg:mt-6 lg:leading-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            <div className="flex flex-row mt-8 space-y-4 items-center justify-center sm:space-y-0 sm:space-x-4 sm:mt-10">
              <div className="z-[0] flex flex-row relative group scale-[.8] mb-4">
                <a href="#">
                  <button
                    aria-label="Primary Button"
                    type="button"
                    className="btn bg-accent hover:bg-accent/80 text-white"
                  >
                    <span>Do action A</span>
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
                  </button>
                </a>
                <a href="#" className="ml-5">
                  <button
                    aria-label="Primary Button"
                    type="button"
                    className="btn bg-white hover:bg-gray-300 shadow text-black"
                  >
                    <span>Do action B</span>
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
                  </button>
                </a>
              </div>
            </div>

            <div className="flex flex-row mt-8 space-y-4 items-center justify-center sm:space-y-0 sm:space-x-4 sm:mt-10">
              <SocialProof text="Many know. Few do." />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
