import { GlassPanel, SectionLabel } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

export function Vision() {
  const { t } = useLanguage();

  return (
    <section
      id="vision"
      data-scene="vision"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-between py-28"
    >
      {/* Headline sits top-left, deliberately narrow — the alien horizon fills
          the rest of the frame instead of hiding behind the text block. */}
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionLabel index={t.vision.index} title={t.vision.label} />
        <h2 className="mt-6 max-w-md font-display text-3xl leading-tight font-bold sm:text-4xl">
          {t.vision.heading}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t.vision.body}
        </p>
      </div>

      {/* The three pillars land along the bottom edge, split toward the
          corners so the horizon stays visible through the middle. */}
      <div className="pointer-events-auto relative z-10 mx-auto grid w-full max-w-[1400px] gap-4 px-5 sm:grid-cols-3 lg:px-10">
        {t.vision.pillars.map((pillar, i) => (
          <GlassPanel
            key={pillar.title}
            interactive
            className={`p-6 ${i === 1 ? "sm:translate-y-4" : ""}`}
          >
            <h3 className="font-display text-lg font-bold tracking-wide text-signal">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
