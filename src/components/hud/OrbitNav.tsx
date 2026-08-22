import { useMemo, type RefObject } from "react";
import type Lenis from "lenis";
import { cn } from "@/lib/utils";
import { SCENES, SCENE_COUNT } from "@/config/scenes";
import { useSceneProgress } from "@/hooks/useSceneProgress";
import { scrollToScene } from "@/hooks/useSmoothScroll";
import { useLanguage } from "@/i18n/LanguageContext";

const DIAL_SIZE = 176;
const RADIUS = 72;

/**
 * A radar-style orbital dial replacing the flat navbar list — every world is
 * a node on the ring, the filled arc is how far into the Odyssey the visitor
 * has traveled, and the center names the world currently in view. Desktop
 * only; the header's hamburger menu covers small screens.
 */
export function OrbitNav({ lenisRef }: { lenisRef: RefObject<Lenis | null> }) {
  const { sceneIndex, sceneBlend, progress } = useSceneProgress();
  const { t } = useLanguage();
  const activeIndex = Math.round(sceneIndex + sceneBlend);
  const activeScene = SCENES[activeIndex] ?? SCENES[0]!;

  const nodes = useMemo(
    () =>
      SCENES.map((scene, i) => {
        const angle = (i / SCENE_COUNT) * Math.PI * 2 - Math.PI / 2;
        return {
          scene,
          x: DIAL_SIZE / 2 + Math.cos(angle) * RADIUS,
          y: DIAL_SIZE / 2 + Math.sin(angle) * RADIUS,
        };
      }),
    [],
  );

  const sweepDeg = progress * 360;

  return (
    <div
      className="pointer-events-none fixed right-6 bottom-6 z-40 hidden lg:block"
      style={{ width: DIAL_SIZE, height: DIAL_SIZE }}
    >
      <div
        className="pointer-events-auto relative size-full rounded-full border border-hairline bg-glass backdrop-blur-md"
        style={{
          background: `conic-gradient(from -90deg, var(--signal) ${sweepDeg}deg, transparent ${sweepDeg}deg)`,
        }}
      >
        <div className="absolute inset-[6px] flex flex-col items-center justify-center rounded-full border border-hairline bg-background/90 text-center">
          <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(SCENE_COUNT).padStart(2, "0")}
          </span>
          <span className="mt-1 max-w-[92px] font-display text-[13px] leading-tight font-bold text-signal">
            {t.nav[activeScene.id]}
          </span>
          <span className="mt-1 font-mono text-[9px] tracking-[0.15em] text-muted-foreground">
            {String(Math.round(progress * 100)).padStart(2, "0")}%
          </span>
        </div>

        {nodes.map(({ scene, x, y }) => (
          <button
            key={scene.id}
            onClick={() => scrollToScene(lenisRef, scene.id)}
            aria-label={t.nav[scene.id]}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            <span
              className={cn(
                "block rounded-full border transition-all",
                scene.index === activeIndex
                  ? "size-3 border-signal bg-signal shadow-[0_0_10px_var(--signal)]"
                  : "size-2 border-hairline bg-background group-hover:border-signal/60",
              )}
            />
            <span className="pointer-events-none absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded-full border border-hairline bg-background px-2 py-1 font-mono text-[9px] whitespace-nowrap text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              {t.nav[scene.id]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
