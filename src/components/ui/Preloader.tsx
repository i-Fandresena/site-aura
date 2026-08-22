import { useEffect, useState } from "react";

export function Preloader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onReady = () => setReady(true);
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  if (ready) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-2 border-hairline" />
          <div className="absolute inset-0 rounded-full border-2 border-signal border-t-transparent animate-spin" />
        </div>
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Loading AURA++
        </p>
      </div>
    </div>
  );
}
