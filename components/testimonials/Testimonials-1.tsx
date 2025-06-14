import React from "react";

interface Testimonial {
  text: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    text: "This is a great service, I highly recommend it!",
    author: "John Doe",
    role: "CEO, ABC Inc.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    text: "I was blown away by the quality of the work delivered.",
    author: "Jane Smith",
    role: "CTO, DEF Inc.",
    image: "https://randomuser.me/api/portraits/men/94.jpg",
  },
  {
    text: "This is by far the best solution I have ever used.",
    author: "Bob Johnson",
    role: "Founder, GHI Inc.",
    image: "https://randomuser.me/api/portraits/men/59.jpg",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="mt-12 relative">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="max-md:px-8 max-w-3xl">
              <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
                We also have testimonials.{" "}
                <p className="italic text-md font-light ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
                  (real ones)
                </p>
              </h2>{" "}
              <p className="mt-4 md:mt-8 text-base-content max-w-[600px] mx-auto">
                Yes, what these people say is true. We are awesome. And you will
                be too.
              </p>
            </div>
          </div>{" "}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-stone-900 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-stone-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
              <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-stone-700 sm:p-12 sm:text-xl sm:leading-8">
                <p>{testimonials[0].text}</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-stone-900/10 px-6 py-4 sm:flex-nowrap">
                <img
                  className="h-10 w-10 flex-none rounded-full bg-stone-50 object-cover object-top"
                  src={testimonials[0].image}
                  alt=""
                />
                <div className="flex-auto">
                  <div className="font-semibold">{testimonials[0].author}</div>
                  <div className="text-stone-600">{testimonials[0].role}</div>
                </div>
              </figcaption>
            </figure>
            <div className="space-y-8 xl:contents xl:space-y-0">
              <div className="xl:row-span-2 space-y-8">
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-stone-900/5">
                  <blockquote className="text-stone-900">
                    <p>{testimonials[1].text}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 flex-none rounded-full bg-stone-50 object-cover object-top"
                      src={testimonials[1].image}
                      alt=""
                    />
                    <div>
                      <div className="font-semibold">
                        {testimonials[1].author}
                      </div>
                      <div className="text-stone-600">
                        {testimonials[1].role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="space-y-8 xl:contents xl:space-y-0">
              <div className="xl:row-span-2 space-y-8">
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-stone-900/5">
                  <blockquote className="text-stone-900">
                    <p>{testimonials[2].text}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 flex-none rounded-full bg-stone-50 object-cover object-top"
                      src={testimonials[2].image}
                      alt=""
                    />
                    <div>
                      <div className="font-semibold">
                        {testimonials[2].author}
                      </div>
                      <div className="text-stone-600">
                        {testimonials[2].role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
