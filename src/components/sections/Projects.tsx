import { ArrowUpRight } from "lucide-react";
import { GlassPanel, SectionLabel, TechBadge } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

const STACKS: Record<string, string[]> = {
  PRJ_001: ["Rust", "Docker", "gRPC"],
  PRJ_002: ["Python", "PyTorch", "Kafka"],
  PRJ_003: ["React", "Node", "Postgres"],
  PRJ_004: ["Go", "Redis", "OpenAPI"],
  PRJ_005: ["TypeScript", "GitHub Actions", "Docker"],
  PRJ_006: ["Python", "OpenAI API", "Vector DB"],
};

const SNIPPETS: Record<string, string[]> = {
  PRJ_001: ["$ nexus deploy --cluster edge-7", "> nodes: 128 online", "> latency: 14ms avg"],
  PRJ_002: ["model.fit(stream, epochs=12)", "> f1_score: 0.947", "> drift: nominal"],
  PRJ_003: ["const squad = useSquad('helix')", "> members: 9", "> commits/wk: 214"],
  PRJ_004: ["GET /v1/relay/query", "> vectors: 4.2M", "> p99: 38ms"],
  PRJ_005: ["$ orbit ci run --repo aura-labs", "> steps detected: 6", "> cache hit: 91%"],
  PRJ_006: ["lumen.ask('how does auth work?')", "> sources: 14 files", "> confidence: 0.92"],
};

export function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      data-scene="projects"
      className="relative flex min-h-screen scroll-mt-24 items-center py-24"
    >
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionLabel index={t.projects.index} title={t.projects.label} />

        <h2 className="mt-8 max-w-2xl font-display text-3xl leading-tight font-bold sm:text-5xl">
          {t.projects.heading}
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {t.projects.items.map((p) => (
            <GlassPanel key={p.id} interactive className="group overflow-hidden p-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-signal">{p.id}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-wide transition-colors group-hover:text-signal">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
                    {p.category}
                  </p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>

              <div className="mt-6 rounded-xl border border-hairline bg-background/70 p-4 font-mono text-[11px] leading-relaxed">
                {(SNIPPETS[p.id] ?? []).map((line, i) => (
                  <p key={line} className={i === 0 ? "text-cyan" : "text-muted-foreground"}>
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {(STACKS[p.id] ?? []).map((s) => (
                  <TechBadge key={s} label={s} tone="signal" />
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
