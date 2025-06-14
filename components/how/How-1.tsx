export default function How() {
  const steps = [
    {
      title: "step 1:",
      description: "Upload your image & choose your desired output format",
    },
    {
      title: "step 2:",
      description:
        "Our AI analyzes your image and generates an image description",
    },
    {
      title: "step 3:",
      description: "Get your image description. Wohooooo! $100k MRR incoming",
    },
  ];

  return (
    <>
      <div className="mt-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto bg-base-100 max-md:px-8 max-w-3xl">
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
            <span className="bg-accent text-white px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
              Accurate image descriptions
            </span>
            in 3 steps
          </h2>
          <p className="mt-4 md:mt-8 text-base-content max-w-[600px] mx-auto">
            Our AI will carefully analyze your image and generate a good image
            description. Bla bla bla. It's amazing!
          </p>
        </div>
        <div className="max-w-5xl mx-auto py-8 mb-20">
          <div className="mx-auto max-w-7xl ">
            <div className="md:flex items-center justify-between border bg-primary rounded-xl py-8 px-6 gap-x-1">
              {steps.map((step, index) => (
                <>
                  <div className="flex items-center mb-8 md:mb-0">
                    <div className="mr-2 flex justify-center sm:justify-start">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-xl font-semibold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-primary-content capitalize">
                        {step.title}
                      </h3>
                      <h3 className="text-base tracking-tight text-gray-600 ">
                        {step.description}
                      </h3>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block text-base font-semibold leading-6 text-primary-content">
                      →
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
