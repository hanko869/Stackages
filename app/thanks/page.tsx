export default function Hero() {
  return (
    <>
      <section className="bg-base-100 min-h-screen p-4 text-center pt-16 md:pt-18 items-center flex flex-col">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
          Thank you
          <span
            className="bg-primary text-primary-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap"
            style={{ display: "inline-block", transform: "rotate(-1deg)" }}
          >
            for your purchase 🎉
          </span>
        </h1>
        <h2 className="mt-4 md:mt-6 text-neutral max-w-[600px]">
          Use this section to do whatever you want your users to do after they
          have made a purchase.
        </h2>
      </section>
    </>
  );
}
