import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Nav } from "./components/Nav";
import { IntroScroller } from "./components/IntroScroller";
import { LibraryPlaceholder } from "./components/LibraryPlaceholder";
import { useIntroScroller } from "./hooks/useIntroScroller";

const AppContent: React.FC = () => {
  const scrollerState = useIntroScroller();

  return (
    <div className="relative min-h-screen bg-[#111113] selection:bg-[#B89598]/30 selection:text-[#F0E8E1]">
      {/* Fixed Navigation Header */}
      <Nav isPastIntro={scrollerState.isPastIntro} />

      {/* Main Content */}
      <main>
        {/* Pinned Scroll-driven Intro Animation */}
        <IntroScroller scrollerState={scrollerState} />

        {/* Poetry Library Section */}
        <LibraryPlaceholder />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
