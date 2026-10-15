import React from "react";
import { useIntroScroller } from "../hooks/useIntroScroller";
import { HeroContent } from "./HeroContent";
import { ScrollCue } from "./ScrollCue";
import {
  PATHS,
  LOGO_ALT,
  LOGO_FULL_SIZE,
  LOGO_COMPACT_SIZE,
} from "../config/site";

interface IntroScrollerProps {
  scrollerState: ReturnType<typeof useIntroScroller>;
}

export const IntroScroller: React.FC<IntroScrollerProps> = ({
  scrollerState,
}) => {
  const {
    containerRef,
    canvasRef,
    isReady,
    scrollProgress,
    logoOpacity,
    heroOpacity,
    prefersReducedMotion,
  } = scrollerState;

  // Scroll cue visibility: visible during intro before scrolling, and when hero arrives
  const showScrollCue =
    scrollProgress < 0.08 || scrollProgress > 0.85 || prefersReducedMotion;
  const scrollCueOpacity = showScrollCue ? 1 : 0;

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#111113] intro-surface select-none"
      aria-label="The Unspoken Animated Hero Presentation"
    >
      {/* Canvas for smooth WebP frame sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-10"
        aria-hidden="true"
      />

      {/* Loading State Overlay */}
      <div
        className={`absolute inset-0 z-40 flex items-center justify-center bg-[#111113] transition-opacity duration-1000 ${
          prefersReducedMotion ? "hidden" : isReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-busy={!isReady}
        aria-label="Loading animation frames"
      >
        <div className="flex flex-col items-center justify-center px-4">
          <img
            src={PATHS.logoCompact}
            alt={LOGO_ALT}
            width={LOGO_COMPACT_SIZE.width}
            height={LOGO_COMPACT_SIZE.height}
            className="w-[65vw] sm:w-[45vw] max-w-[420px] h-auto object-contain logo-soft-in drop-shadow-xl"
          />
          <div className="mt-8 flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B89598] animate-ping" />
            <span className="font-sans text-xs tracking-[0.2em] text-[#A7A0A0] uppercase">
              Opening Pages...
            </span>
          </div>
        </div>
      </div>

      {/* Intro Logo Lockup (Centered over closed book, fades in, fades out first 10% scroll) */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          logoOpacity <= 0.01 ? "hidden" : "flex"
        }`}
        style={{
          opacity: logoOpacity,
          transform: prefersReducedMotion
            ? "none"
            : `translateY(${(1 - logoOpacity) * -16}px)`,
        }}
      >
        <img
          src={PATHS.logoFull}
          alt={LOGO_ALT}
          width={LOGO_FULL_SIZE.width}
          height={LOGO_FULL_SIZE.height}
          className={`w-[80vw] md:w-[50vw] max-w-[620px] h-auto object-contain drop-shadow-2xl ${
            prefersReducedMotion ? "" : "logo-enter"
          }`}
        />
      </div>

      {/* Hero Content (Appears in last 20% of scroll on the left on desktop, stacked on mobile) */}
      <div className="absolute inset-0 z-20 flex items-center px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center">
          <HeroContent
            opacity={heroOpacity}
            reducedMotion={prefersReducedMotion}
          />
        </div>
      </div>

      {/* Scroll Cue at Bottom Center */}
      <ScrollCue opacity={scrollCueOpacity} />
    </section>
  );
};
