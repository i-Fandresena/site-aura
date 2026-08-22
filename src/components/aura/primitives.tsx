import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Monospace section index label, e.g. "// 02. OUR ECOSYSTEM" */
export function SectionLabel({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs tracking-[0.3em]", className)}>
      <span className="text-signal">//</span>
      <span className="text-muted-foreground">{index}.</span>
      <span className="text-foreground/80">{title}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-hairline to-transparent" />
    </div>
  );
}

/**
 * Glassmorphic panel — softly rounded by default. `clipped` opts back into
 * the original hex-cut HUD corner as a rare accent (used sparingly now that
 * the site has moved away from the sharp cyberpunk chrome).
 */
export function GlassPanel({
  children,
  className,
  clipped = false,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  clipped?: boolean;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass-panel relative rounded-2xl",
        clipped && "clip-hud rounded-none",
        interactive &&
          "transition-all duration-300 hover:border-signal/40 hover:shadow-[0_0_36px_-10px_var(--signal)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small monospace tech-stack pill. */
export function TechBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "cyan" | "signal";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase",
        tone === "neutral" && "border-hairline bg-glass text-muted-foreground",
        tone === "cyan" && "border-cyan/30 bg-cyan-soft text-cyan",
        tone === "signal" && "border-signal/30 bg-signal-soft text-signal",
      )}
    >
      {label}
    </span>
  );
}

/** Pulsing status dot + label. */
export function StatusTag({
  label,
  tone = "cyan",
  className,
}: {
  label: string;
  tone?: "cyan" | "signal";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase",
        tone === "cyan" ? "text-cyan" : "text-signal",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full animate-pulse-glow",
          tone === "cyan" ? "bg-cyan" : "bg-signal",
        )}
      />
      {label}
    </span>
  );
}

/**
 * Empty layer for ambient CSS glow blobs behind section content — the
 * persistent 3D canvas handles the actual scene now, this is just a soft
 * color wash layered above it.
 */
export function CanvasSlot({
  children,
  className,
  id,
}: {
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      data-canvas-slot={id ?? true}
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
    >
      {children}
    </div>
  );
}
