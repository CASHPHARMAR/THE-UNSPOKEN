export const FRAME_COUNT = 75;
export const SCROLL_LENGTH_VH = 400;
export const MOBILE_BREAKPOINT = 768;
export const SCRUB = 0.5;
export const READY_FRAME_COUNT = 15;
export const LOGO_FADE_OUT_END = 0.15;
export const CANVAS_FADE_IN_END = 0.15;
export const HERO_FADE_IN_START = 0.8;
export const DESKTOP_FRAME_WIDTH_RATIO = 0.55;
export const LOGO_INTRO_MS = 1500;

export const PATHS = {
  desktopFrames: "/frames/desktop",
  mobileFrames: "/frames/mobile",
  heroFirst: "/frames/hero-first.webp",
  heroFinal: "/frames/hero-final.webp",
  logoFull: "/brand/unspoken-logo-full.png",
  logoCompact: "/brand/unspoken-logo-compact.png",
} as const;

export const LOGO_ALT =
  "The Unspoken — some feelings only make sense in words";

export const LOGO_FULL_SIZE = { width: 940, height: 635 } as const;
export const LOGO_COMPACT_SIZE = { width: 940, height: 385 } as const;

export function frameSrc(kind: "desktop" | "mobile", index: number): string {
  const dir = kind === "desktop" ? PATHS.desktopFrames : PATHS.mobileFrames;
  return `${dir}/frame_${String(index).padStart(3, "0")}.webp`;
}

export function easeHero(progress: number): number {
  if (progress <= HERO_FADE_IN_START) return 0;
  return Math.min(1, (progress - HERO_FADE_IN_START) / (1 - HERO_FADE_IN_START));
}

export function easeLogo(progress: number): number {
  if (progress >= LOGO_FADE_OUT_END) return 0;
  return 1 - progress / LOGO_FADE_OUT_END;
}

export function easeCanvas(progress: number): number {
  if (progress <= 0) return 0;
  if (progress >= CANVAS_FADE_IN_END) return 1;
  return progress / CANVAS_FADE_IN_END;
}
