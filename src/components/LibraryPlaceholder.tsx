import React from "react";
import { useTheme } from "../context/ThemeContext";

export const LibraryPlaceholder: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const poems = [
    {
      id: "1",
      number: "I",
      title: "The Silence Between Words",
      theme: "Love & Grief",
      time: "3 min",
      excerpt:
        "What is left unsaid echoes louder than any confession whispered in the dark.",
    },
    {
      id: "2",
      number: "II",
      title: "Midnight Soliloquy",
      theme: "Solitude",
      time: "4 min",
      excerpt:
        "The clock strikes twelve, and the shadows begin to rehearse our memories.",
    },
    {
      id: "3",
      number: "III",
      title: "Unspoken Longing",
      theme: "Distance",
      time: "2 min",
      excerpt:
        "Between two distant cities, an unwritten letter finds its quiet resting place.",
    },
    {
      id: "4",
      number: "IV",
      title: "Letters to the Rain",
      theme: "Healing",
      time: "5 min",
      excerpt:
        "Wash away the remnants of promises that were never meant to be kept.",
    },
    {
      id: "5",
      number: "V",
      title: "In the Space You Left",
      theme: "Absence",
      time: "3 min",
      excerpt:
        "The room remains unchanged, yet everything inside it has turned into weight.",
    },
    {
      id: "6",
      number: "VI",
      title: "Fragments of Dawn",
      theme: "Hope",
      time: "4 min",
      excerpt:
        "Even the longest night must yield to the gentlest streak of rose and gold.",
    },
  ];

  return (
    <section
      id="library"
      className={`relative z-20 py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 transition-colors duration-500 ${
        isLight ? "bg-[#F0E8E1] text-[#1B1918]" : "bg-[#111113] text-[#F0E8E1]"
      }`}
      aria-label="The Poetry Library"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span
            className={`font-sans text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4 block ${
              isLight ? "text-[#88817F]" : "text-[#A7A0A0]"
            }`}
          >
            Anthologies & Verses
          </span>
          <h2
            className={`font-heading text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 ${
              isLight ? "text-[#1B1918]" : "text-[#F0E8E1]"
            }`}
          >
            The Poetry Library
          </h2>
          <p
            className={`font-sans text-base sm:text-lg leading-relaxed ${
              isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
            }`}
          >
            Words penned in solitude, gathered for those who listen with their
            hearts. Explore the upcoming volumes and quiet verses left unsaid.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24">
          {poems.map((poem) => (
            <article
              key={poem.id}
              className={`group relative p-8 rounded-none border transition-all duration-300 flex flex-col justify-between ${
                isLight
                  ? "bg-white/60 border-[#1B1918]/10 hover:border-[#B89598] hover:shadow-lg hover:shadow-[#B89598]/10"
                  : "bg-[#1B1918]/60 border-white/8 hover:border-[#B89598]/50 hover:bg-[#1B1918]/90 hover:shadow-xl hover:shadow-black/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-xl italic text-[#B89598]">
                    {poem.number}
                  </span>
                  <span
                    className={`font-sans text-xs tracking-wider uppercase px-2.5 py-1 border rounded-xs ${
                      isLight
                        ? "border-[#1B1918]/15 text-[#55504E]"
                        : "border-white/10 text-[#A7A0A0]"
                    }`}
                  >
                    {poem.theme}
                  </span>
                </div>

                <h3
                  className={`font-heading text-2xl sm:text-3xl font-normal mb-4 transition-colors group-hover:text-[#B89598] ${
                    isLight ? "text-[#1B1918]" : "text-[#F0E8E1]"
                  }`}
                >
                  {poem.title}
                </h3>

                <p
                  className={`font-sans text-sm sm:text-base leading-relaxed italic mb-8 ${
                    isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
                  }`}
                >
                  &ldquo;{poem.excerpt}&rdquo;
                </p>
              </div>

              <div
                className={`pt-6 border-t flex items-center justify-between text-xs tracking-wider uppercase font-sans ${
                  isLight ? "border-[#1B1918]/10 text-[#88817F]" : "border-white/5 text-[#A7A0A0]"
                }`}
              >
                <span>{poem.time}</span>
                <span className="inline-flex items-center text-[#B89598] font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Read Poem &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Footer (Matching design board) */}
        <footer
          id="about"
          className={`pt-16 border-t transition-colors duration-500 ${
            isLight ? "border-[#1B1918]/10" : "border-white/10"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
            {/* Wordmark and Tagline */}
            <div className="text-center md:text-left">
              <span
                className={`font-heading text-2xl sm:text-3xl font-medium tracking-[0.18em] uppercase block mb-3 ${
                  isLight ? "text-[#1B1918]" : "text-[#F0E8E1]"
                }`}
              >
                The Unspoken
              </span>
              <p
                className={`font-sans text-xs sm:text-sm tracking-wide max-w-sm ${
                  isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
                }`}
              >
                Some feelings only make sense in words.
              </p>
              <p
                className={`font-sans text-xs tracking-wider uppercase mt-2 text-[#B89598]`}
              >
                By Calvin Selassie
              </p>
            </div>

            {/* Navigation & Legal Links */}
            <div className="flex flex-wrap justify-center gap-8 text-xs sm:text-sm tracking-widest uppercase font-sans">
              <a
                href="#top"
                className={`transition-colors hover:text-[#B89598] focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs ${
                  isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
                }`}
              >
                Home
              </a>
              <a
                href="#library"
                className={`transition-colors hover:text-[#B89598] focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs ${
                  isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
                }`}
              >
                Poems
              </a>
              <a
                href="#about"
                className={`transition-colors hover:text-[#B89598] focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs ${
                  isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
                }`}
              >
                About
              </a>
              <a
                href="#privacy"
                className={`transition-colors hover:text-[#B89598] focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs ${
                  isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
                }`}
              >
                Privacy
              </a>
              <a
                href="#guidelines"
                className={`transition-colors hover:text-[#B89598] focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs ${
                  isLight ? "text-[#55504E]" : "text-[#A7A0A0]"
                }`}
              >
                Community Guidelines
              </a>
            </div>
          </div>

          {/* Copyright notice */}
          <div
            className={`text-center py-6 border-t text-xs tracking-wider font-sans ${
              isLight
                ? "border-[#1B1918]/10 text-[#88817F]"
                : "border-white/5 text-[#A7A0A0]/70"
            }`}
          >
            &copy; {new Date().getFullYear()} The Unspoken. All rights reserved.
          </div>
        </footer>
      </div>
    </section>
  );
};
