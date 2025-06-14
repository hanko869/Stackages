import React from "react";

export default function LandingBest({
  color = "text-base-content",
  text = "Trusted by 200+ founders",
}) {
  const avatars = [
    "https://randomuser.me/api/portraits/men/43.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
    "https://randomuser.me/api/portraits/men/94.jpg",
    "https://randomuser.me/api/portraits/men/59.jpg",
    "https://randomuser.me/api/portraits/men/17.jpg",
  ];

  return (
    <div className="flex items-center text-center space-x-4 pb-3">
      <div className="avatar-group -space-x-5">
        {avatars.map((avatar, index) => (
          <div className="avatar" key={index}>
            <div className="w-8">
              <img src={avatar} alt={`Avatar ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-yellow-400"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
        <p className="mt-1 text-xs text-neutral">
          <span
            className="text-primary-content font-bold px-2 bg-primary"
            style={{
              display: "inline-block",
              transform: "rotate(-1deg)",
            }}
          >
            🎁 EARLY BIRD DEAL - $100 off
          </span>{" "}
          <br />
          for the next 10 customers!
        </p>
      </div>
    </div>
  );
}
