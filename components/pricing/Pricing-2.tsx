export default function Pricing() {
  return (
    <>
      <div className="mb-12 flex items-center justify-center">
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="hover:shadow-alternate flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow">
              <div className="mx-auto max-w-2xl lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto lg:w-4/6">
                  <h3 className="text-xl font-bold tracking-tight text-base-content sm:text-2xl">
                    Generate accurate image descriptions
                  </h3>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex aspect-1 h-6 w-6 items-center justify-center rounded-full border bg-base-200/50 text-sm font-medium text-stone-600">
                        1
                      </span>
                      <div className="font-medium">Upload your image</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex aspect-1 h-6 w-6 items-center justify-center rounded-full border bg-base-200/50 text-sm font-medium text-stone-600">
                        2
                      </span>
                      <div className="font-medium">
                        Our AI analyzes it{" "}
                        <span className="text-sm font-normal">
                          - it takes around 1 minute
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex aspect-1 h-6 w-6 items-center justify-center rounded-full border bg-base-200/50 text-sm font-medium text-stone-600">
                        3
                      </span>
                      <div className="font-medium">
                        Get your description{" "}
                        <span className="text-sm font-normal">
                          - includes good stuff{" "}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex aspect-1 h-6 w-6 items-center justify-center rounded-full border bg-base-200/50 text-sm font-medium text-stone-600">
                        4
                      </span>
                      <div className="font-medium">$100k MRR</div>
                    </div>
                  </div>
                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-gradient-cold">
                      What's included?
                    </h4>
                    <div className="h-px flex-auto bg-gray-100"></div>
                  </div>
                  <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                    <li className="flex gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Analysis
                    </li>
                    <li className="flex gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Stuff
                    </li>
                    <li className="flex gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Description{" "}
                    </li>
                    <li className="flex gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Pizza
                    </li>
                  </ul>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-2/6 lg:max-w-md lg:flex-shrink-0">
                  <div className="h-full rounded-2xl bg-base-200/50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-base-content">
                          $420
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                          USD
                        </span>
                      </p>
                      <div className="mt-10 h-12 flex items-center justify-center gap-2">
                        <a
                          href="/demos/vision/app"
                          className="btn btn-accent text-neutral"
                        >
                          <span className="group inline-flex items-center">
                            <span className="inline-flex h-6 items-center overflow-hidden"></span>
                            <span className="inline-flex items-center gap-2">
                              Get description now
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
                            </span>
                          </span>
                        </a>
                      </div>
                      <p className="mt-6 text-xs leading-5 text-gray-600">
                        No refunds are possible because our AI consumes GPU and
                        stuff like that
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
