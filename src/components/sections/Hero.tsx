import { useEffect, useRef, type RefObject } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import type Lenis from "lenis";
import { scrollToScene } from "@/hooks/useSmoothScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { StatusTag } from "@/components/aura/primitives";

export function Hero({ lenisRef }: { lenisRef: RefObject<Lenis | null> }) {
  const introRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" },
      );
    }, introRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      data-scene="hero"
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden pt-24 pb-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <div ref={introRef} className="pointer-events-auto max-w-2xl">
          <div data-reveal>
            <StatusTag label={t.hero.eyebrow} tone="signal" />
          </div>

          <h1
            data-reveal
            className="mt-6 font-display text-[2.6rem] leading-[0.97] font-bold tracking-tight sm:text-6xl lg:text-[4.4rem]"
          >
            {t.hero.titlePre}
            <br />
            <span className="neon-text">{t.hero.titleHighlight}</span> {t.hero.titlePost}
          </h1>

          <p
            data-reveal
            className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {t.hero.subtitle}
          </p>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToScene(lenisRef, "vision")}
              className="inline-flex items-center gap-3 rounded-full border border-signal/50 bg-signal px-7 py-3.5 font-mono text-[11px] tracking-[0.2em] text-primary-foreground uppercase shadow-[0_8px_30px_-10px_var(--signal)] transition-all hover:shadow-[0_8px_36px_-6px_var(--signal)]"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              onClick={() => scrollToScene(lenisRef, "contact")}
              className="inline-flex items-center gap-3 rounded-full border border-hairline bg-glass px-7 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase backdrop-blur-md transition-all hover:border-cyan/50 hover:text-cyan"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          <div
            data-reveal
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan-soft px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-cyan"
          >
            <span className="size-1.5 rounded-full bg-cyan animate-pulse-glow" />
            {t.hero.guideIntro}
          </div>

          <div
            data-reveal
            className="mt-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-muted-foreground"
          >
            <span>{t.hero.scroll}</span>
            <ChevronDown className="size-4 animate-bounce text-signal" />
          </div>
        </div>
      </div>
    </section>
  );
}
