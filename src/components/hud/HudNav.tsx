import { useState, type RefObject } from "react";
import { Menu, X } from "lucide-react";
import type Lenis from "lenis";
import { cn } from "@/lib/utils";
import { SCENES } from "@/config/scenes";
import { useSceneProgress } from "@/hooks/useSceneProgress";
import { scrollToScene } from "@/hooks/useSmoothScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuraTheme } from "@/hooks/useAuraTheme";
import { StatusTag } from "@/components/aura/primitives";
import { ThemeToggle } from "@/components/aura/ThemeToggle";
import { LanguageToggle } from "@/components/aura/LanguageToggle";

/**
 * Minimal top bar — branding, the day/night status line, and a "mission log"
 * menu. The main way to travel between worlds is the OrbitNav dial; this
 * menu exists so the full list is still one click away, and is the only
 * navigation surface on screens too small for the dial.
 */
export function HudNav({ lenisRef }: { lenisRef: RefObject<Lenis | null> }) {
  const [open, setOpen] = useState(false);
  const { sceneIndex, sceneBlend } = useSceneProgress();
  const { t } = useLanguage();
  const isDark = useAuraTheme();
  const activeIndex = Math.round(sceneIndex + sceneBlend);

  const goTo = (id: string) => {
    setOpen(false);
    scrollToScene(lenisRef, id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass-panel rounded-none border-x-0 border-t-0">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-10">
          <button onClick={() => goTo("hero")} className="group flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AURA++"
              className="size-9 rounded-full border border-signal/40 object-cover transition-shadow group-hover:shadow-[0_0_18px_-2px_var(--signal)]"
            />
            <span className="font-display text-lg font-bold tracking-[0.18em] neon-text">
              AURA<span className="text-foreground">++</span>
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <StatusTag
              label={isDark ? t.nav.nightJourney : t.nav.dayJourney}
              className="hidden rounded-full border border-hairline bg-glass px-3 py-2 backdrop-blur-md md:inline-flex"
            />
            <LanguageToggle className="hidden sm:inline-flex" />
            <ThemeToggle />
            <button
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-signal active:scale-95"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="glass-panel rounded-none border-x-0">
          <nav className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 px-5 py-6 sm:grid-cols-3 lg:grid-cols-5">
            {SCENES.map((scene) => (
              <button
                key={scene.id}
                onClick={() => goTo(scene.id)}
                className={cn(
                  "text-left font-mono text-sm tracking-[0.18em] py-3 px-4 rounded-xl border border-hairline bg-background/50 backdrop-blur-sm transition-all active:scale-95",
                  activeIndex === scene.index
                    ? "text-signal border-signal/30 bg-signal-soft"
                    : "text-muted-foreground hover:text-foreground hover:border-signal/20",
                )}
              >
                {`0${scene.index + 1} · ${t.nav[scene.id]}`}
              </button>
            ))}
            <LanguageToggle className="mt-2 w-fit sm:hidden" />
          </nav>
        </div>
      )}
    </header>
  );
}
