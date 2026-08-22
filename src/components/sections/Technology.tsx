import { Boxes, Cpu, GitBranch, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlassPanel, SectionLabel, TechBadge } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS: LucideIcon[] = [Boxes, Server, GitBranch, Cpu];

export function Technology() {
  const { t } = useLanguage();

  return (
    <section
      id="technology"
      data-scene="technology"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-between py-28"
    >
      {/* Headline top-left, out of the way of the bookstack sitting low and
          center. */}
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionLabel index={t.technology.index} title={t.technology.label} />
        <h2 className="mt-6 max-w-md font-display text-3xl leading-tight font-bold sm:text-4xl">
          {t.technology.heading}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t.technology.body}
        </p>
      </div>

      {/* The four stacks split to the far corners, framing the grimoire
          instead of stacking on top of it. */}
      <div className="pointer-events-auto relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-4 px-5 sm:grid-cols-4 lg:px-10">
        {t.technology.stacks.map((stack, i) => {
          const Icon = ICONS[i % ICONS.length]!;
          return (
            <GlassPanel
              key={stack.title}
              interactive
              className={`p-5 ${i === 1 || i === 2 ? "sm:translate-y-6" : ""}`}
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-signal/30 bg-signal-soft text-signal">
                <Icon className="size-4" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold tracking-wide">{stack.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {stack.items.map((item) => (
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </section>
  );
}
