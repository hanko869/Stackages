const CTA: React.FC = () => {
  return (
    <div className="relative w-full pt-8 pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl bg-accent/90 shadow-lg">
          <div className="relative flex flex-col items-center lg:flex-row lg:items-center">
            <div className="px-6 py-12 text-center sm:p-12 lg:py-16 lg:text-left xl:p-20">
              <h5 className="text-3xl font-bold text-white sm:text-3xl lg:text-3xl">
                You should buy our product.{" "}
                <p className="italic text-md font-light ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
                  (please, so I can pay rent)
                </p>
              </h5>
              <p className="mt-5 text-base font-normal text-white">
                If you buy our product, and every other person buys it too, then
                I would be set for life. So please, do, otherwise, I have to
                work a 9-5.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6 lg:justify-start">
                <a
                  href="#"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-white px-4 py-2 text-base font-semibold leading-6 text-black shadow-sm transition-all duration-150 hover:bg-base-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:w-auto"
                >
                  <span>Buy our product!</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-4 shrink-0 lg:mt-0 lg:px-8 xl:px-16">
              <div className="flex justify-center items-center w-96">
                <img
                  src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Image of something"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
