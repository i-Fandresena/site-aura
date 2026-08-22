import { GraduationCap, Server, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlassPanel, SectionLabel, StatusTag, TechBadge } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS: LucideIcon[] = [GraduationCap, Server, Sparkles];

export function Team() {
  const { t } = useLanguage();

  return (
    <section
      id="team"
      data-scene="team"
      className="relative flex min-h-screen scroll-mt-24 items-center py-24"
    >
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionLabel index={t.team.index} title={t.team.label} />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-3xl leading-tight font-bold sm:text-5xl">
            {t.team.heading}
          </h2>
          <p className="max-w-sm font-mono text-xs leading-relaxed tracking-wide text-muted-foreground">
            {t.team.body}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.team.tiers.map((tier, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <GlassPanel key={tier.id} interactive className="group p-7">
                <div className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-signal/30 bg-signal-soft text-signal transition-shadow group-hover:shadow-[0_0_20px_-4px_var(--signal)]">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                    {tier.id}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-wide">{tier.title}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
                  {tier.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tier.copy}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {tier.stack.map((s) => (
                    <TechBadge key={s} label={s} />
                  ))}
                </div>

                <div className="mt-7 flex items-end justify-between border-t border-hairline pt-5">
                  <div>
                    <p className="font-display text-2xl font-bold neon-text">{tier.stat}</p>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {tier.statLabel}
                    </p>
                  </div>
                  <StatusTag label={tier.status} />
                </div>
              </GlassPanel>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 divide-hairline overflow-hidden rounded-2xl border border-hairline bg-glass backdrop-blur-md lg:grid-cols-4 lg:divide-x">
          {t.team.stats.map((s) => (
            <div key={s.label} className="px-6 py-7">
              <p className="font-display text-3xl font-bold">{s.value}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
