import { tools } from "@/lib/apps";

export default function Apps() {
  const getGridClass = () => {
    const itemCount = tools.length;
    if (itemCount >= 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center items-stretch content-center";
    } else if (itemCount === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-stretch content-center";
    } else {
      return "grid grid-cols-1 gap-8 justify-center items-stretch content-center";
    }
  };

  return (
    <section id="demos">
      <div className="bg-base-100">
        <div className="p-2 sm:p-6 xl:max-w-7xl xl:mx-auto relative isolate overflow-hidden pb-0 flex flex-col justify-center items-center">
          <div className="py-10 w-full flex justify-center">
            <div className={getGridClass()}>
              {tools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.href}
                  className="w-full flex justify-center"
                >
                  <div
                    className="
                  w-full h-full transition-all duration-500 ease-in-out bg-white border border-base-200 rounded-xl hover:-translate-y-1 p-4 flex flex-col items-center justify-center text-center"
                  >
                    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                      {tool.title}
                    </h3>
                    {tool.image && (
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-auto border border-base-200 rounded-md mt-4 mb-4"
                      />
                    )}
                    <p className="max-w-lg text-sm text-neutral-400">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex gap-y-1 flex-wrap justify-center space-x-2 overflow-auto scrollbar-hide ">
                      {tool.tags.map((tag, index) => (
                        <span
                          key={tag}
                          className={`border bg-base-100 text-base-content py-1 px-4 text-sm rounded-xl ${
                            tool.tags.length === 1
                              ? "w-full text-center"
                              : " md:w-auto"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
