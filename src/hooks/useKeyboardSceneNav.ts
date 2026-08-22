import { useEffect, type RefObject } from "react";
import type Lenis from "lenis";
import { SCENES, SCENE_COUNT } from "@/config/scenes";
import { getSceneProgressSnapshot } from "./useSceneProgress";
import { scrollToScene } from "./useSmoothScroll";

const EDITABLE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

/**
 * Arrow-key / Page-key travel between worlds — the "this is a place you
 * explore, not a page you read" cue for the Odyssey. Ignored while typing in
 * a form field so it never fights the Contact section's email input.
 */
export function useKeyboardSceneNav(lenisRef: RefObject<Lenis | null>) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (EDITABLE_TAGS.has(target.tagName) || target.isContentEditable)) return;

      let direction = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown") direction = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") direction = -1;
      else return;

      e.preventDefault();
      const { sceneIndex, sceneBlend } = getSceneProgressSnapshot();
      const current = Math.round(sceneIndex + sceneBlend);
      const next = Math.min(Math.max(current + direction, 0), SCENE_COUNT - 1);
      const target_ = SCENES[next];
      if (target_) scrollToScene(lenisRef, target_.id);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lenisRef]);
}
