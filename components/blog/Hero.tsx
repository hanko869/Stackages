import { format, parseISO } from "date-fns";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  date: string;
}

export default function Hero({ title, subtitle, image, date }: HeroProps) {
  return (
    <>
      {" "}
      <section className="text-primary-content bg-primary">
        <div className="grid lg:grid-cols-2 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-12 py-10">
          <div className="lg:hidden items-center justify-center text-center gap-10">
            <h1 className="font-extrabold text-4xl tracking-tight md:-mb-4 leading-tight">
              {title}
            </h1>
          </div>

          <div className="lg:w-full flex flex-col align-center items-center justify-center gap-10">
            <div className="bg-base-100 rounded-xl p-2 flex flex-row">
              <img
                src={image}
                className="rounded-xl w-full sm:w-[400px] md:w-[600px] lg:w-[800px]"
              />
            </div>
          </div>
          <div className="flex flex-col  items-center justify-center text-center lg:text-left lg:items-start">
            <time
              dateTime={date}
              className="mb-1 text-xs text-primary-content/80"
            >
              {format(parseISO(date), "LLLL d, yyyy")}
            </time>
            <h1 className="hidden lg:block font-extrabold text-4xl tracking-tight leading-tight">
              {title}
            </h1>
            <h2 className="text-md text-primary-content/80 mb-10 mt-5">
              {subtitle}
            </h2>
            <div className="flex justify-center flex-row gap-2 flex-wrap ">
              <a className="btn btn-ghost text-content" href="/blog">
                Other blog articles
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
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
