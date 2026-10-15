import React from "react";

interface ScrollCueProps {
  opacity?: number;
}

export const ScrollCue: React.FC<ScrollCueProps> = ({ opacity = 1 }) => {
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Mouse Icon Outline */}
      <div className="w-5 h-8 border border-[#F0E8E1]/40 rounded-full flex justify-center pt-1.5 mb-2">
        <div className="w-1 h-2 bg-[#B89598] rounded-full animate-bounce" />
      </div>
      {/* Chevron */}
      <svg
        className="w-3.5 h-3.5 text-[#F0E8E1]/60 -mt-1 mb-1 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      {/* Text Label */}
      <span className="font-sans text-[10px] tracking-[0.25em] text-[#A7A0A0] uppercase">
        Scroll
      </span>
    </div>
  );
};
