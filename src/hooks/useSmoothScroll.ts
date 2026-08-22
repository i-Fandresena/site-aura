import { useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { setSceneProgress } from "./useSceneProgress";

/**
 * Drives Lenis smooth-scroll and feeds the normalized scroll fraction into
 * the scene progress store every frame. Mount once, near the app root.
 * Lenis's `respectReducedMotion` (on by default) disables easing for users
 * who prefer reduced motion without breaking scroll-driven navigation.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.1 });
    lenisRef.current = lenis;

    lenis.on("scroll", (instance) => setSceneProgress(instance.progress));

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

/** Smoothly scrolls to a DOM node registered via `data-scene`. */
export function scrollToScene(lenisRef: RefObject<Lenis | null>, sceneId: string) {
  const target = document.querySelector<HTMLElement>(`[data-scene="${sceneId}"]`);
  if (!target) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
