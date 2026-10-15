import React from "react";

interface HeroContentProps {
  opacity: number;
  reducedMotion?: boolean;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  opacity,
  reducedMotion = false,
}) => {
  const currentOpacity = reducedMotion ? 1 : opacity;
  const isInteractive = currentOpacity > 0.05;

  return (
    <div
      className={`relative z-20 flex flex-col justify-center max-w-[40vw] transition-opacity duration-300 pt-[calc(5rem+1.5rem)] ${
        isInteractive ? "pointer-events-auto" : "pointer-events-none select-none"
      }`}
      style={{
        opacity: currentOpacity,
        transform: reducedMotion
          ? "none"
          : `translateY(${(1 - currentOpacity) * 20}px)`,
      }}
      aria-hidden={!isInteractive}
    >
      {/* Category / Eyebrow Label */}
      <span className="font-sans text-xs sm:text-sm font-medium tracking-[0.25em] text-[#A7A0A0] uppercase mb-4 sm:mb-6 block">
        A PERSONAL POETRY COLLECTION
      </span>

      {/* Main Heading */}
      <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light text-[#F0E8E1] tracking-normal leading-[1.12] mb-6">
        Some feelings only make sense in words.
      </h1>

      {/* Sub-paragraph */}
      <p className="font-sans text-base sm:text-lg text-[#A7A0A0] leading-relaxed max-w-lg mb-8 sm:mb-10 font-normal">
        A collection of words left unsaid — about love, loneliness, heartbreak,
        hope, and the things we struggle to explain.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-wrap items-center gap-6 sm:gap-8">
        <a
          href="#library"
          className="inline-flex items-center justify-center bg-[#B89598] hover:bg-[#c9a7aa] text-[#111113] font-sans font-medium text-sm sm:text-base px-7 py-3.5 tracking-wider uppercase transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Explore the Poems &rarr;
        </a>
        <a
          href="#about"
          className="font-sans text-sm sm:text-base tracking-wider uppercase text-[#F0E8E1] hover:text-[#B89598] transition-colors duration-300 underline underline-offset-8 decoration-[#B89598]/50 hover:decoration-[#B89598] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs"
        >
          About the Author
        </a>
      </div>
    </div>
  );
};
