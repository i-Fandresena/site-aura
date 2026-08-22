import { useMemo } from "react";
import { Box3, Vector3, type Object3D } from "three";

/**
 * Measures a loaded model's actual bind-pose bounds and returns a scale
 * factor to normalize it to `targetSize` along the given axis. Downloaded
 * GLBs rarely share a common unit scale (one Sketchfab export might be in
 * centimeters, another in meters with a x100 armature) — measuring beats
 * hardcoding a scale constant per asset.
 */
export function useModelFit(
  object: Object3D,
  targetSize: number,
  axis: "height" | "width" | "diagonal" = "height",
) {
  return useMemo(() => {
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const dim =
      axis === "height" ? size.y : axis === "width" ? Math.max(size.x, size.z) : size.length();
    const scale = dim > 0 ? targetSize / dim : 1;
    return { scale, groundOffset: -box.min.y * scale, size };
  }, [object, targetSize, axis]);
}
