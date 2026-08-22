import { useEffect, useState, type ComponentType } from "react";

type CanvasComponent = ComponentType<Record<string, never>>;

/**
 * Public entry point for the persistent scroll-driven 3D scene. Keeps
 * three.js / @react-three/* out of the SSR bundle and the initial client
 * bundle: the heavy canvas is only dynamically imported after this wrapper
 * mounts in the browser.
 */
export function Scene3D({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState<{ Comp: CanvasComponent } | null>(null);

  useEffect(() => {
    let active = true;
    import("@/scenes/SceneManager").then((mod) => {
      if (active) setLoaded({ Comp: mod.SceneManager });
    });
    return () => {
      active = false;
    };
  }, []);

  if (!loaded) return null;
  const { Comp } = loaded;
  // R3F's <Canvas> sets position/width/height via inline style, which would
  // win over Tailwind classes for those properties — so the fixed/absolute
  // positioning lives on this wrapper div instead, and Canvas just fills it.
  return (
    <div className={className}>
      <Comp />
    </div>
  );
}
