import React from "react";

interface CardProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  subtext: string;
}

const Card: React.FC<CardProps> = ({ href, icon, text, subtext }) => {
  return (
    <div className="relative mt-8 prose prose-gray">
      <a
        className="card block text-base-content not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-xl bg-white hover:bg-white/80 border border-base-200 shadow-md shadow-gray-300/10 overflow-hidden w-full cursor-pointer hover:!border-primary"
        href={href}
      >
        <div className="px-6 py-5">
          <div className="h-6 w-6 fill-gray-800 text-base-content">{icon}</div>
          <h2 className="font-semibold text-base text-base-content mt-4">
            {text}
          </h2>
          <span className="mt-1 font-normal text-base-content">{subtext} </span>
        </div>
      </a>
    </div>
  );
};

export default Card;
