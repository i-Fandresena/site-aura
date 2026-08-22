import { SectionLabel } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section
      id="timeline"
      data-scene="timeline"
      className="relative flex min-h-screen scroll-mt-24 items-center py-24"
    >
      {/* Kept to the left third on purpose — the skyline runs the full width
          of the frame, and a full-bleed timeline column would cover it. */}
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <div className="max-w-sm">
          <SectionLabel index={t.timeline.index} title={t.timeline.label} />
          <h2 className="mt-6 font-display text-3xl leading-tight font-bold sm:text-4xl">
            {t.timeline.heading}
          </h2>

          <div className="relative mt-12 border-l border-hairline pl-6">
            {t.timeline.milestones.map((m, i) => (
              <div
                key={`${m.date}-${m.title}`}
                className={cn("relative pb-10 last:pb-0", i === 0 && "pt-0")}
              >
                <span className="absolute top-1 -left-[calc(1.5rem+5px)] size-2.5 rounded-full border border-signal bg-signal shadow-[0_0_10px_var(--signal)]" />
                <p className="font-mono text-xs tracking-[0.25em] text-signal">{m.date}</p>
                <h3 className="mt-2 font-display text-lg font-bold tracking-wide">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
