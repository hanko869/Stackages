import React from "react";

export default function Features() {
  const featuresList = [
    {
      feature_id: 1,
      username: "AI_Savvy",
      feature_name: "AI-Powered Personal Branding",
      feature_description:
        "Let AI create a personal brand so good, you'll forget you didn't come up with it yourself",
      feature_logo: null,
      emoji: "🤖",
    },
    {
      feature_id: 2,
      username: "BrandBFF",
      feature_name: "Instant Influencer Status",
      feature_description:
        "Become an Instagram influencer overnight (no talent required)",
      feature_logo: null,
      emoji: "📸",
    },
    {
      feature_id: 3,
      username: "AI_Assistant",
      feature_name: "AI-Driven Content Generation",
      feature_description:
        "Let AI write your social media posts, so you don't have to",
      feature_logo: null,
      emoji: "💻",
    },
    {
      feature_id: 4,
      username: "PersonalPro",
      feature_name: "Professional Bio Generation",
      feature_description:
        "Get a bio so good, it'll make you sound like a TED Talk speaker",
      feature_logo: null,
      emoji: "📄",
    },
    {
      feature_id: 5,
      username: "ImageMagician",
      feature_name: "AI-Generated Profile Pictures",
      feature_description:
        "Get a profile picture so good, you'll want to use it as your real photo",
      feature_logo: null,
      emoji: "📸",
    },
    {
      feature_id: 6,
      username: "ToneTinkerer",
      feature_name: "Tone and Voice Analysis",
      feature_description:
        "Find your unique tone and voice, so you can sound cool on the internet",
      feature_logo: null,
      emoji: "💬",
    },
    {
      feature_id: 7,
      username: "ConsistencyKing",
      feature_name: "AI-Driven Content Calendar",
      feature_description:
        "Get a content calendar so organized, you'll never run out of ideas",
      feature_logo: null,
      emoji: "📅",
    },
    {
      feature_id: 8,
      username: "AnalyticsAce",
      feature_name: "AI-Powered Analytics",
      feature_description:
        "Get insights so deep, you'll know exactly what to post to go viral",
      feature_logo: null,
      emoji: "📈",
    },
  ];

  return (
    <>
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="max-md:px-8 max-w-3xl">
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
            We have features.{" "}
            <p className="italic text-md font-light ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
              (a lot of them)
            </p>
          </h2>{" "}
          <p className="mt-4 md:mt-8 text-base-content max-w-[600px] mx-auto">
            Yes, all these features below are ours. Really. And they're cool.
            And they will change your life, so please, please, buy.
          </p>
        </div>
      </div>{" "}
      <div
        className="mt-8 mb-32 grid grid-cols-1 gap-x-2 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
      >
        {featuresList.map((feature) => (
          <div key={feature.feature_id}>
            <div className="h-24 bg-white mt-2 mb-2 w-full flex items-center lg:p-3 shadow rounded-box duration-200 p-4 group hover:scale-[1.02]">
              <div className="p-1 flex-grow flex flex-col justify-between pr-2">
                <h3 className="font-bold line-clamp-1 text-gray-800  overflow-hidden">
                  {feature.feature_name}
                </h3>
                <p className="text-sm lg:text-xs text-gray-600 line-clamp-2">
                  {feature.feature_description}
                </p>
              </div>

              <div className="p-1 flex-none flex flex-col items-center justify-center">
                {feature.feature_logo ? (
                  <img
                    src={feature.feature_logo}
                    alt={`Logo of ${feature.feature_name}`}
                    className="w-7 h-7 lg:w-8 lg:h-8 mb-2 rounded-full duration-200 drop-shadow-sm object-cover group-hover:scale-[1.15] delay-100"
                  />
                ) : (
                  <span className="text-2xl">{feature.emoji}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
