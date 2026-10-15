import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FRAME_COUNT,
  SCROLL_LENGTH_VH,
  MOBILE_BREAKPOINT,
  SCRUB,
  READY_FRAME_COUNT,
  DESKTOP_FRAME_HEIGHT_RATIO,
  PATHS,
  frameSrc,
  easeHero,
  easeLogo,
} from "../config/site";

gsap.registerPlugin(ScrollTrigger);

export interface UseIntroScrollerReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isReady: boolean;
  scrollProgress: number;
  logoOpacity: number;
  heroOpacity: number;
  isPastIntro: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

export function useIntroScroller(): UseIntroScrollerReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const isHeroPreview = urlParams.get("view") === "hero";
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      return mq.matches || isHeroPreview;
    }
    return false;
  });
  const [isReady, setIsReady] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const isHeroPreview = urlParams.get("view") === "hero";
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      return mq.matches || isHeroPreview;
    }
    return false;
  });
  const [scrollProgress, setScrollProgress] = useState(() => (prefersReducedMotion ? 1 : 0));
  const [logoOpacity, setLogoOpacity] = useState(() => (prefersReducedMotion ? 0 : 1));
  const [heroOpacity, setHeroOpacity] = useState(() => (prefersReducedMotion ? 1 : 0));
  const [isPastIntro, setIsPastIntro] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });

  // Cached preloaded images for current viewport kind
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef(1);
  const frameKindRef = useRef<"desktop" | "mobile">("desktop");
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const staticImgRef = useRef<HTMLImageElement | null>(null);

  // Check prefers-reduced-motion (or explicit ?view=hero preview parameter)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const urlParams = new URLSearchParams(window.location.search);
    const isHeroPreview = urlParams.get("view") === "hero";

    setPrefersReducedMotion(mq.matches || isHeroPreview);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches || isHeroPreview);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      frameKindRef.current = mobile ? "mobile" : "desktop";
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Frame drawing function
  const drawFrame = useCallback(
    (frameIndex: number, staticImg?: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width === 0 || height === 0) return;

      // Adjust buffer size if needed
      if (
        canvas.width !== Math.round(width * dpr) ||
        canvas.height !== Math.round(height * dpr)
      ) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Fill dark Midnight background
      ctx.fillStyle = "#111113";
      ctx.fillRect(0, 0, width, height);

      // Find image to draw
      let img: HTMLImageElement | undefined =
        staticImg || (prefersReducedMotion ? staticImgRef.current || undefined : undefined);
      if (!img) {
        img = imagesRef.current.get(frameIndex);
        // Fallback to nearest loaded frame if current isn't ready
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let offset = 1; offset < FRAME_COUNT; offset++) {
            const down = imagesRef.current.get(frameIndex - offset);
            if (down && down.complete && down.naturalWidth > 0) {
              img = down;
              break;
            }
            const up = imagesRef.current.get(frameIndex + offset);
            if (up && up.complete && up.naturalWidth > 0) {
              img = up;
              break;
            }
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        const isMobileScreen = width < MOBILE_BREAKPOINT;

        if (isMobileScreen) {
          // Mobile: draw frame full width, vertically centered on dark background
          const aspect = img.naturalWidth / img.naturalHeight;
          const destWidth = width;
          const destHeight = width / aspect;
          const destX = 0;
          const destY = (height - destHeight) / 2;

          ctx.drawImage(img, destX, destY, destWidth, destHeight);
        } else {
          // Desktop layout: anchor frame toward the right, scaled to about 90% height,
          // so the left side stays dark for the headline.
          const aspect = img.naturalWidth / img.naturalHeight;
          let destHeight = height * DESKTOP_FRAME_HEIGHT_RATIO;
          let destWidth = destHeight * aspect;

          // If on narrower screens, ensure width doesn't overpower the container
          if (destWidth > width * 0.72) {
            destWidth = width * 0.72;
            destHeight = destWidth / aspect;
          }

          // Anchor toward the right
          const destX = width - destWidth - width * 0.02;
          const destY = (height - destHeight) / 2;

          ctx.drawImage(img, destX, destY, destWidth, destHeight);
        }
      }

      ctx.restore();
    },
    []
  );

  // Preloading frames
  useEffect(() => {
    if (prefersReducedMotion) {
      // Reduced motion: load hero-final static image directly
      const staticImg = new Image();
      staticImg.src = PATHS.heroFinal;
      staticImg.onload = () => {
        staticImgRef.current = staticImg;
        setIsReady(true);
        drawFrame(FRAME_COUNT, staticImg);
      };
      return;
    }

    const kind = isMobile ? "mobile" : "desktop";
    imagesRef.current.clear();
    setIsReady(false);

    let isMounted = true;
    let loadedCount = 0;

    const checkReady = () => {
      if (!isMounted) return;
      loadedCount++;
      if (loadedCount >= READY_FRAME_COUNT) {
        setIsReady(true);
      }
    };

    // 1. Load first and last frames first
    const frame1 = new Image();
    frame1.src = frameSrc(kind, 1);
    frame1.onload = () => {
      imagesRef.current.set(1, frame1);
      checkReady();
      // Draw first frame immediately
      if (currentFrameRef.current === 1) {
        drawFrame(1);
      }
    };

    const frameLast = new Image();
    frameLast.src = frameSrc(kind, FRAME_COUNT);
    frameLast.onload = () => {
      imagesRef.current.set(FRAME_COUNT, frameLast);
      checkReady();
    };

    // 2. Load the remaining frames in order
    for (let i = 2; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(kind, i);
      const frameNum = i;
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current.set(frameNum, img);
        checkReady();
        if (currentFrameRef.current === frameNum) {
          drawFrame(frameNum);
        }
      };
    }

    return () => {
      isMounted = false;
    };
  }, [isMobile, prefersReducedMotion, drawFrame]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(currentFrameRef.current);
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.refresh();
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // ScrollTrigger Setup
  useEffect(() => {
    if (prefersReducedMotion) {
      setLogoOpacity(0);
      setHeroOpacity(1);
      setScrollProgress(1);
      setIsPastIntro(false);
      return;
    }

    if (!containerRef.current) return;

    // Pin the intro section for SCROLL_LENGTH_VH
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${SCROLL_LENGTH_VH}vh`,
      pin: true,
      scrub: SCRUB,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Logo fade: 1.0 down to 0 during the first 10%
        setLogoOpacity(easeLogo(progress));

        // Hero fade: 0 up to 1.0 during the last 20%
        setHeroOpacity(easeHero(progress));

        // Track when scroll leaves intro
        setIsPastIntro(progress >= 1);

        // Interpolate frame index 1 to 75
        const targetFrame = Math.min(
          FRAME_COUNT,
          Math.max(1, Math.round(1 + progress * (FRAME_COUNT - 1)))
        );

        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          drawFrame(targetFrame);
        }
      },
    });

    scrollTriggerRef.current = trigger;

    // Support ?progress=... or #hero for quick inspection / deep linking
    const urlParams = new URLSearchParams(window.location.search);
    const progressParam = urlParams.get("progress") || (window.location.hash === "#hero" ? "1" : null);
    if (progressParam !== null) {
      const p = Math.max(0, Math.min(1, parseFloat(progressParam)));
      if (!isNaN(p)) {
        setScrollProgress(p);
        setLogoOpacity(easeLogo(p));
        setHeroOpacity(easeHero(p));
        const initialFrame = Math.min(
          FRAME_COUNT,
          Math.max(1, Math.round(1 + p * (FRAME_COUNT - 1)))
        );
        currentFrameRef.current = initialFrame;
        setTimeout(() => {
          drawFrame(initialFrame);
          window.scrollTo(0, trigger.start + p * (trigger.end - trigger.start));
        }, 150);
      }
    }

    if (urlParams.get("view") === "library") {
      setTimeout(() => {
        document.getElementById("library")?.scrollIntoView();
      }, 250);
    }

    return () => {
      trigger.kill();
      scrollTriggerRef.current = null;
    };
  }, [prefersReducedMotion, drawFrame]);

  return {
    containerRef,
    canvasRef,
    isReady,
    scrollProgress,
    logoOpacity,
    heroOpacity,
    isPastIntro,
    prefersReducedMotion,
    isMobile,
  };
}
