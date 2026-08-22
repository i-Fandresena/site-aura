import { SectionLabel } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

export function Universe() {
  const { t } = useLanguage();
  const [left, right] = [
    t.universe.metrics.filter((_, i) => i % 2 === 0),
    t.universe.metrics.filter((_, i) => i % 2 === 1),
  ];

  return (
    <section
      id="universe"
      data-scene="universe"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-between py-28"
    >
      {/* Headline top-left, narrow — the planet holds the center of the frame. */}
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionLabel index={t.universe.index} title={t.universe.label} />
        <h2 className="mt-6 max-w-md font-display text-3xl leading-tight font-bold sm:text-4xl">
          {t.universe.heading}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t.universe.body}
        </p>
      </div>

      {/* Metrics split to the bottom corners, orbiting the planet rather than
          sitting on top of it. */}
      <div className="pointer-events-auto relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-between gap-4 px-5 sm:flex-row lg:px-10">
        <div className="flex gap-4">
          {left.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-hairline bg-glass px-5 py-5 backdrop-blur-md"
            >
              <p className="font-display text-2xl font-bold tracking-wide neon-text">{m.value}</p>
              <p className="mt-1 max-w-[10rem] font-mono text-[10px] leading-relaxed tracking-[0.18em] text-muted-foreground uppercase">
                {m.label}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 sm:self-end">
          {right.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-hairline bg-glass px-5 py-5 backdrop-blur-md"
            >
              <p className="font-display text-2xl font-bold tracking-wide neon-text">{m.value}</p>
              <p className="mt-1 max-w-[10rem] font-mono text-[10px] leading-relaxed tracking-[0.18em] text-muted-foreground uppercase">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
