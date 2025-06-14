import React from "react";

interface StepDetails {
  title: string;
  subtitle: string;
  image?: string;
}

const stepOne: StepDetails = {
  title: "Fill in business information",
  subtitle:
    "Fill in some information about your business to get started. Please.",
  image:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const stepTwo: StepDetails = {
  title: "Our AI takes action",
  subtitle:
    "We use cutting-edge AI technology, developed by leading AI research labs. Yes, we are an OpenAI wrapper.",
  image:
    "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const stepThree: StepDetails = {
  title: "Get your marketing plan",
  subtitle:
    "Your AI marketing plan will be generated in seconds. And you'll become instantly rich.",
  image:
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function How() {
  return (
    <div className="mt-20 relative isolate overflow-hidden pb-0">
      <svg
        className="absolute inset-0 h-screen w-full stroke-gray-900/10 opacity-50 sm:opacity-100 sm:[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] -z-10"
        aria-hidden={true}
      >
        <defs>
          <pattern
            id="background-pattern"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#background-pattern)"
        />
      </svg>

      <div className="px-12">
        <div className="text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl lg:text-5xl font-display">
            A marketing plan in minutes.
          </h2>
          <h3 className="text-lg tracking-tight text-stone-700 sm:text-lg mt-5 sm:mt-3">
            Our AI-powered marketing plan generator helps you create a
            customized plan tailored to your business needs.
          </h3>
        </div>

        <div className="mx-auto max-w-7xl">
          {/* STEP 1 */}
          {renderStep(stepOne, 1)}
          {/* STEP 2 */}
          {renderStep(stepTwo, 2)}
          {/* STEP 3 */}
          {renderStep(stepThree, 3)}
        </div>
      </div>
    </div>
  );
}

function renderStep(step: StepDetails, stepNumber: number) {
  return (
    <div
      className={`py-12 flex flex-col sm:flex-row justify-center ${
        stepNumber % 2 === 0 ? "sm:flex-row-reverse" : ""
      }`}
    >
      <div className="flex items-center sm:w-1/2">
        <div className="flex flex-col">
          <div className="flex justify-center sm:justify-start mb-2 mt-8">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xl font-semibold text-white">
              {stepNumber}
            </span>
          </div>
          <div className="flex text-center flex-col justify-center sm:text-left">
            <h2 className="font-bold leading-tight tracking-tight text-primary-content text-2xl sm:text-2xl">
              {step.title}
            </h2>
            <h3 className="text-lg tracking-tight text-primary-content/60 sm:text-lg mx-auto mt-2 max-w-md">
              {step.subtitle}
            </h3>
          </div>
        </div>
      </div>
      {step.image && (
        <div className="sm:w-1/2">
          <img
            src={step.image}
            alt="Step image"
            className="max-w-md mx-auto rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
