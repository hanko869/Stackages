// Part 1: Setup and initial rendering
import React from "react";
import SocialProof from "@/components/socialproof/SocialProof";

export default function Pricing() {
  const pricing = [
    {
      duration: "😅 The 'I Guess This Will Do' Plan",
      displayPrice: true,
      highlight: "Meh",
      action: false,
      previousPrice: "10",
      price: "420",
      benefits: [
        "Our stuff, but like, not as good",
        "One (1) half-hearted 'good job' from our CEO",
        "Unlimited use of our mediocre customer support",
        "Access to our library of mildly entertaining memes",
        "A free e-book: 'How to Be Kind of Okay at Things'",
      ],
      notIncluded: [
        "Guaranteed success (or even moderate success)",
        "Personalized coaching (unless you're really annoying)",
        "Free pizza (unless you're gluten-free, then it's on you)",
      ],
      link: "#",
      buttonText: "I guess I'll take this one",
      subscriptionInfo:
        "It's fine, I guess. 30-day money-back guarantee (no questions asked, unless you're just trolling us)",
    },

    {
      duration: "🏀 The 'I'm a Baller' Plan",
      displayPrice: true,
      highlight: " Baller",
      action: false,
      previousPrice: "100",
      price: "42000",
      benefits: [
        "Everything from the 'VIP' plan, but on steroids",
        "A personalized 'Hello, [Name]' from our CEO, in person, with a hug",
        "Dedicated customer support (24/7, even on holidays)",
        "Access to our exclusive 'How to Make a Fortune in 30 Days or Less' webinar",
        "A complimentary private jet consultation to discuss your brand strategy",
        "A personalized meet-and-greet with Elon Musk (or someone who looks like him)",
        "One (1) free unicorn (actual, magical unicorn not guaranteed)",
      ],
      notIncluded: [
        "A guaranteed Nobel Prize in Physics",
        "A personalized invitation to the Met Gala",
        "A side hustle as a professional superhero",
      ],
      link: "#",
      buttonText: "Make it rain (money, that is)",
      subscriptionInfo:
        "The whole shebang. 30-day money-back guarantee (but let's be real, you're not going to need it)",
    },
  ];

  return (
    <section id="pricing" className="bg-accent text-accent-content pt-10 pb-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="max-md:px-8 max-w-3xl">
            <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
              We have prices.{" "}
              <p className="italic text-md font-light ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
                (good prices, the best prices)
              </p>
            </h2>{" "}
            <p className="mt-4 md:mt-8 text-accent-content max-w-[600px] mx-auto">
              Our prices are so good, you'll wonder why you ever paid for
              anything else. You'd be crazy not to buy it.{" "}
            </p>
          </div>
        </div>{" "}
        <div className="mt-10 flex justify-center">
          <div className="mt-10 flex flex-col md:flex-row justify-center items-center">
            {pricing.map((plan) => (
              <div
                key={plan.duration}
                className={`bg-white border-base-200 mx-auto md:mx-2 mb-5 rounded-xl w-80 p-8 border ${
                  plan.action ? "border-base-200 shadow" : ""
                }`}
              >
                <h3
                  id={`tier-${plan.duration}`}
                  className="text-gray-900 text-lg font-semibold leading-8"
                >
                  {plan.duration}
                  {plan.action && (
                    <div className="ml-2 badge badge-base-300 gap-2 text-gray-900 text-sm">
                      {plan.highlight}
                    </div>
                  )}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-900">
                  {plan.subscriptionInfo}
                </p>
                {plan.displayPrice && (
                  <div className="flex gap-2 mt-5 text-gray-900">
                    <div className="flex flex-col justify-end mb-[4px] text-lg">
                      <p className="relative">
                        <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                        <span className="text-gray-900/80">
                          ${plan.previousPrice}
                        </span>
                      </p>
                    </div>
                    <p className="text-4xl tracking-tight font-extrabold">
                      ${plan.price}
                    </p>
                    <div className="flex flex-col justify-end mb-[4px]">
                      <p className="text-xs opacity-60 uppercase font-semibold">
                        USD
                      </p>
                    </div>
                  </div>
                )}
                <a
                  href={plan.link}
                  className="font-semibold text-primary-content rounded-xl bg-primary hover:bg-primary/80 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg no-underline text-center transition ease-in-out duration-150 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none active:ring active:ring-offset-2 inline-flex items-center justify-center py-2 px-4 text-sm mt-6 w-full !rounded-md group/button-link"
                >
                  <span className="inline-flex items-center">
                    <span className="inline-flex shrink-0 items-center gap-2">
                      {plan.buttonText}
                    </span>
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
                      className="ml-1 w-4"
                    >
                      <path d="M22 6 L30 16 22 26 M30 16 L2 16"></path>
                    </svg>
                  </span>
                </a>

                <ul className="mt-8 space-y-1 text-sm leading-6 text-gray-900">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-x-3">
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
                      {benefit}
                    </li>
                  ))}
                  {plan.notIncluded &&
                    plan.notIncluded.map((item) => (
                      <li key={item} className="flex gap-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="text-red-500 flex-none w-5 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>

                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 pb-10 flex justify-center">
          <div className="flex flex-col">
            <SocialProof text={"Trusted by Elon Musk"} color={"text-white"} />
          </div>
        </div>
      </div>
    </section>
  );
}
