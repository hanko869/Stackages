"use client";
import React from "react";

export const ContentFooter = () => {
  return (
    <div className="p-4 text-center justify-center text-xs text-neutral-500 border-t border-neutral-100">
      <span className="font-semibold">{new Date().getFullYear()} </span>
      &#8212; built with 🤍 by{" "}
      <a
        href="https://twitter.com/fekdaoui"
        target="_blank"
        className="font-bold"
      >
        Fekri
      </a>
    </div>
  );
};
