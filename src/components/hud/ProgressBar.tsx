import { useSceneProgress } from "@/hooks/useSceneProgress";

/**
 * Thin full-width progress rail directly under the header — the mobile/
 * tablet fallback for "how far into the Odyssey am I" now that the OrbitNav
 * dial (desktop-only) carries that role visually.
 */
export function ProgressBar() {
  const { progress } = useSceneProgress();

  return (
    <div className="fixed top-16 right-0 left-0 z-40 h-[2px] bg-hairline">
      <div
        className="h-full bg-signal shadow-[0_0_8px_var(--signal)] transition-[width]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
