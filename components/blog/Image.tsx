import React from "react";

interface ImageProps {
  src: string;
  alt?: string;
  text: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, text }) => {
  return (
    <div className="mt-4 p-2 relative bg-base-200 rounded-xl overflow-hidden">
      <div className="relative rounded-lg overflow-hidden flex justify-center">
        <span>
          <img src={src} alt={alt} className="h-96" />
        </span>
      </div>
      <div className="relative rounded-xl flex justify-center mt-3 pt-0 px-8 pb-2 text-sm text-base-content">
        {text}
      </div>
    </div>
  );
};

export default Image;
