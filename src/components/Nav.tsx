import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

interface NavProps {
  isPastIntro?: boolean;
}

export const Nav: React.FC<NavProps> = ({ isPastIntro = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine colors based on theme and section
  // Over the intro section, it is always on dark Midnight background
  const isLight = theme === "light" && isPastIntro;

  const textColor = isLight ? "text-[#1B1918]" : "text-[#F0E8E1]";
  const mutedTextColor = isLight ? "text-[#55504E]" : "text-[#A7A0A0]";
  const hoverColor = "hover:text-[#B89598]";
  const navBg = scrolled
    ? isLight
      ? "bg-[#F0E8E1]/85 backdrop-blur-md shadow-xs border-b border-[#1B1918]/10"
      : "bg-[#111113]/80 backdrop-blur-md border-b border-white/5"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${navBg}`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* Left: Text Wordmark in Cormorant Garamond */}
        <a
          href="#top"
          className={`font-heading text-2xl sm:text-3xl font-medium tracking-[0.16em] uppercase transition-colors duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs ${textColor}`}
          aria-label="The Unspoken - Home"
        >
          The Unspoken
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <a
            href="#top"
            className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${mutedTextColor} ${hoverColor} focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs`}
          >
            Home
          </a>
          <a
            href="#library"
            className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${mutedTextColor} ${hoverColor} focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs`}
          >
            Poems
          </a>
          <a
            href="#about"
            className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${mutedTextColor} ${hoverColor} focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598] rounded-xs`}
          >
            About
          </a>
        </div>

        {/* Right: Theme Toggle & Account / Mobile Menu */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            className={`p-2 rounded-full transition-colors duration-300 ${textColor} ${hoverColor} focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598]`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              // Sun icon for switching to light
              <svg
                className="w-5 h-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              // Moon icon for switching to dark
              <svg
                className="w-5 h-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Account Icon */}
          <button
            type="button"
            className={`p-2 rounded-full transition-colors duration-300 ${textColor} ${hoverColor} focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598]`}
            aria-label="Account profile"
            title="Account profile"
          >
            <svg
              className="w-5 h-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6" />
            </svg>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`md:hidden p-2 rounded-sm transition-colors duration-300 ${textColor} ${hoverColor} focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B89598]`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 pt-4 pb-8 space-y-4 border-b transition-colors duration-300 ${
            isLight
              ? "bg-[#F0E8E1] border-[#1B1918]/10 text-[#1B1918]"
              : "bg-[#111113] border-white/10 text-[#F0E8E1]"
          }`}
        >
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-sans tracking-widest uppercase transition-colors ${mutedTextColor} ${hoverColor} focus-visible:ring-2 focus-visible:ring-[#B89598]`}
          >
            Home
          </a>
          <a
            href="#library"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-sans tracking-widest uppercase transition-colors ${mutedTextColor} ${hoverColor} focus-visible:ring-2 focus-visible:ring-[#B89598]`}
          >
            Poems
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-sans tracking-widest uppercase transition-colors ${mutedTextColor} ${hoverColor} focus-visible:ring-2 focus-visible:ring-[#B89598]`}
          >
            About
          </a>
        </div>
      )}
    </header>
  );
};
