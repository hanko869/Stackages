import React from "react";

const Check: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="my-4 px-5 py-4 overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-50/50">
      <div className="flex h-full items-center">
        <div className="mt-0.5 w-4 mr-2">
          <svg
            className="text-green-600 w-3.5 h-auto"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            aria-label="Check"
          >
            <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"></path>
          </svg>
        </div>
        <div className="flex-1 text-sm prose overflow-x-auto text-emerald-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Check;
