import Section from "@/components/Section";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";

export default function PaymentModal() {
  const pricing = [
    {
      duration: "50 credits",
      highlight: false,
      previousPrice: 20,
      price: 10,
      benefits: [
        "Structured LLM Generator (GPT)",
        "Structured LLM Generator (LlaMA)",
        "SDXL Studio",
        "DALL-E Studio",
        "GPT-4o Vision App",
        "Voice to text (Whisper)",
        "Chat",
        "Chat with PDF",
      ],
      link: "https://anotherwrapper.lemonsqueezy.com/buy/98070e65-52b1-4208-88a2-176c4ee8688d",
      buttonText: "Buy credits",
      subscriptionInfo:
        "Each generation costs 5 credits, regardless of the model. Good for 10 tests.",
    },

    {
      duration: "100 credits",
      highlight: true,
      previousPrice: 40,
      price: 15,
      benefits: [
        "Structured LLM Generator (GPT)",
        "Structured LLM Generator (LlaMA)",
        "SDXL Studio",
        "DALL-E Studio",
        "GPT-4o Vision App",
        "Voice to text (Whisper)",
        "Chat",
        "Chat with PDF",
      ],
      link: "https://anotherwrapper.lemonsqueezy.com/buy/d69ee93a-1070-4820-bec8-cce8b7d6de7d",
      buttonText: "Buy credits",
      subscriptionInfo:
        "Each generation costs 5 credits, regardless of the model. Good for 20 tests.",
    },
  ];

  return (
    <Section>
      <div>
        <div className="max-w-3xl mx-auto">
          <div className="max-md:px-8 max-w-3xl">
            <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2">
              Your
              <span className="bg-primary text-primary-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
                free trial credits
              </span>{" "}
              have run out
            </h2>
            <p className="mt-4 md:mt-8 text-base-content max-w-[600px] mx-auto">
              If you want to test other demo apps, please consider purchasing
              some credits below or have a look at the landing page + docs for
              more info.
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 flex justify-center">
            <div className="flex flex-col md:flex-row justify-center items-center">
              {pricing.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white mx-auto md:mx-2 mb-5 rounded-xl w-80 p-8 border border-base-200 ${
                    plan.highlight ? "shadow" : ""
                  }`}
                >
                  <h3
                    id={`tier-${plan.duration}`}
                    className="text-accent text-lg font-semibold leading-8"
                  >
                    {plan.duration}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {plan.subscriptionInfo}
                  </p>

                  <div className="flex gap-2 mt-5">
                    <div className="flex flex-col justify-end mb-[4px] text-lg">
                      <p className="relative">
                        <span className="absolute bg-gray-600 h-[1.5px] inset-x-0 top-[53%]"></span>
                        <span className="text-gray-600">
                          €{plan.previousPrice}
                        </span>
                      </p>
                    </div>
                    <p className="text-4xl text-gray-900 tracking-tight font-extrabold">
                      €{plan.price}
                    </p>
                    <div className="flex flex-col justify-end mb-[4px]">
                      <p className="text-xs text-gray-900 opacity-60 uppercase font-semibold">
                        EUR
                      </p>
                    </div>
                  </div>

                  <a
                    href={plan.link}
                    className="font-semibold text-primary-content rounded-xl bg-primary hover:bg-primary/80 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg no-underline text-center transition ease-in-out duration-150 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none active:ring active:ring-offset-2 inline-flex items-center justify-center py-2 px-4 text-sm mt-6 w-full !rounded-md group/button-link"
                  >
                    <span className="inline-flex items-center">
                      <span className="inline-flex shrink-0 items-center gap-2">
                        {plan.buttonText}
                        <ArrowRightIcon className="w-5 h-5" />
                      </span>
                    </span>
                  </a>

                  <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-x-3">
                        <CheckIcon className="w-5 h-6 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-base-content/60">
            Please make sure to make the purchase{" "}
            <span className="underline">with the same email</span> as the one
            you're using for this account. When making a purchase, you agree to
            the{" "}
            <a href="/terms" className="underline" target="_blank">
              terms of service.
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
