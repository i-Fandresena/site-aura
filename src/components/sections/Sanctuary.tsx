import { Coffee, Sparkles, Shuffle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlassPanel, SectionLabel } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS: LucideIcon[] = [Sparkles, Coffee, Shuffle];

export function Sanctuary() {
  const { t } = useLanguage();

  return (
    <section
      id="sanctuary"
      data-scene="sanctuary"
      className="relative flex min-h-screen scroll-mt-24 items-center py-24"
    >
      <div className="pointer-events-auto relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-5 lg:grid-cols-[1fr_320px] lg:px-10">
        {/* The island sits low in the frame, so the headline stays up top and
            the ritual cards stack down the right edge instead of crossing it. */}
        <div className="max-w-md">
          <SectionLabel index={t.sanctuary.index} title={t.sanctuary.label} />
          <h2 className="mt-6 font-display text-3xl leading-tight font-bold sm:text-4xl">
            {t.sanctuary.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.sanctuary.body}</p>
        </div>

        <div className="flex flex-col gap-4 lg:mt-2">
          {t.sanctuary.rituals.map((ritual, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <GlassPanel key={ritual.title} interactive className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-cyan/30 bg-cyan-soft text-cyan">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-display text-base font-bold tracking-wide">{ritual.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ritual.copy}</p>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
