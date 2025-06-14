"use client";

import { Button } from "@/components/ui/button";
import { BookIcon, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const mainAction = () => {
    // Facebook Pixel
    window.fbq("track", "InitiateCheckout");

    // TikTok Pixel
    window.ttq.track("ViewContent", {
      contents: [
        {
          content_id: "anotherwrapper-boilerplate-small", // string. ID of the product. Example: "1077218".
          content_name: "anotherwrapper-small", // string. The name of the page or product. Example: "shirt".
        },
      ],
      value: "137", // number. Value of the order or items sold. Example: 100.
      currency: "USD", // string. The 4217 currency code. Example: "USD".
    });

    // Scroll to Pricing
    window.location.href = "https://anotherwrapper.com/#pricing";
  };

  return (
    <section className="bg-base-100 p-4 text-center pt-16 md:pt-18 items-center flex flex-col">
      <div className="max-w-3xl mx-auto">
        <div className="max-md:px-8 max-w-3xl">
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2">
            Build{" "}
            <span className="bg-primary text-primary-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
              your app 10x faster
            </span>{" "}
            using our demo apps
          </h2>
          <p className="mt-4 md:mt-8 text-neutral-600 max-w-[600px] mx-auto">
            You don't have to start from scratch. Choose any of the demo
            applications below and have it up and running within minutes!
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-col md:flex-row mt-4 gap-x-2">
        <Button
          className={cn(
            "z-10 btn btn-primary hover:bg-primary/90 w-64 text-primary-content rounded-lg",
            "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
          )}
          onClick={mainAction}
        >
          <BrainCircuit className="w-4 h-4 mr-2" />
          Build your AI startup
        </Button>
        <a
          className="btn btn-ghost text-content"
          href="https://docs.anotherwrapper.com"
          target="_blank"
        >
          <BookIcon className="w-4 h-4 mr-2" />
          Documentation
        </a>
      </div>
    </section>
  );
}
