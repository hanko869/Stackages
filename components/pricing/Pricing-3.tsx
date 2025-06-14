export default function Pricing() {
  const pricingInfo = [
    {
      title: "Social Media Guru",
      description:
        "For those who think Likes and Followers are the key to success.",
      price: "$9.99",
      period: "/month",
      features: [
        "AI-generated social media posts",
        "1-click posting to all platforms",
        "Unlimited likes and followers (mostly bots)",
        "Influencer status (in your dreams)",
        "Complimentary selfie stick",
      ],
      special: false,
    },
    {
      title: "Marketing Maverick",
      description: "For those who think outside the box (and often get fired).",
      price: "$49.99",
      period: "/month",
      features: [
        "AI-generated marketing plans",
        "Unlimited creative ideas (mostly stolen from others)",
        "Priority support (we'll pretend to care)",
        "Complimentary marketing jargon dictionary",
        "Guru status (in your own mind)",
      ],
      special: true,
    },
    {
      title: "CEO",
      description: "For those who think they can do it all (but can't).",
      price: "$999.99",
      period: "/lifetime",
      features: [
        "All features from the app",
        "Unlimited access to our coffee machine",
        "Complimentary 'World's Okayest CEO' mug",
        "Priority support (we'll try to tolerate you)",
        "Lifetime supply of buzzwords",
      ],
      special: false,
    },
  ];

  return (
    <>
      <div className="mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-24 flex flex-col">
        <div className="text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl lg:text-5xl font-display">
            Do marketing. Get money.
          </h2>
          <h3 className="text-lg tracking-tight text-stone-700 sm:text-lg mt-5 sm:mt-3">
            There is no price on sales. But there is a price on our services.
          </h3>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3 w-full justify-center items-center gap-8">
          {pricingInfo.map((info, index) => (
            <div
              key={index}
              className={`rounded-xl shadow bg-neutral relative flex flex-col w-full ${
                info.special
                  ? "border border-primary lg:scale-[1.1] lg:z-10"
                  : "border border-base-200"
              }`}
            >
              <div className="flex-1 gap-6 lg:gap-x-8 xl:gap-x-10 flex flex-col sm:p-6 p-6 lg:p-8 xl:p-10">
                <div className="">
                  <div className="flex items-center gap-3">
                    <p className="text-2xl text-base-content sm:text-3xl font-semibold truncate font-display">
                      {info.title}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-base-content/60 mt-2">
                    {info.description}
                  </p>
                </div>
                <div className="flex flex-row items-baseline gap-x-1">
                  <p className="text-base-content text-2xl sm:text-4xl font-semibold">
                    {info.price}
                  </p>
                  <p className="text-base-content/60 text-sm/6 font-medium truncate">
                    {info.period}
                  </p>
                </div>
                <a
                  href="#"
                  className="px-2 py-2 text-sm font-semibold text-neutral rounded-md text-center bg-primary hover:bg-primary/80 "
                >
                  <span className="inline-flex items-center">
                    <span className="inline-flex shrink-0 items-center gap-2">
                      Get started for free{" "}
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
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </span>
                  </span>
                </a>
                <div className="order-last flex-1">
                  <ul className="space-y-3 text-sm">
                    {info.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-x-3 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="text-gray-900 w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <span className="text-base-content/80 truncate">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className=""></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
