import { useEffect, useState } from "react";
import { useSceneProgress } from "./useSceneProgress";

/**
 * Defers mounting (and therefore fetching/parsing) a heavy world prop until
 * the scroll timeline is within `margin` scenes of `targetIndex`, then keeps
 * it mounted permanently — the corridor now carries ~60MB of real GLB
 * models, so downloading all of them on first paint regardless of scroll
 * position would tax the initial load for no benefit. Once loaded, a prop
 * stays loaded rather than unmounting again when scrolled away, so revisiting
 * a world never re-fetches.
 */
export function useLazyMount(targetIndex: number, margin = 2) {
  const { sceneIndex } = useSceneProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted && Math.abs(sceneIndex - targetIndex) <= margin) setMounted(true);
  }, [sceneIndex, targetIndex, margin, mounted]);

  return mounted;
}
