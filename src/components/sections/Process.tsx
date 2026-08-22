import { ClipboardList, Hammer, Search, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlassPanel, SectionLabel } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS: LucideIcon[] = [ClipboardList, Hammer, Search, Rocket];

export function Process() {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      data-scene="process"
      className="relative flex min-h-screen scroll-mt-24 flex-col pt-32 pb-24"
    >
      {/* Everything pinned to the top half — the skyline owns the lower
          two-thirds of the frame uncontested. */}
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionLabel index={t.process.index} title={t.process.label} />
        <h2 className="mt-6 max-w-lg font-display text-3xl leading-tight font-bold sm:text-4xl">
          {t.process.heading}
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {t.process.body}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <GlassPanel key={step.title} interactive className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-cyan/30 bg-cyan-soft text-cyan">
                    <Icon className="size-4" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
