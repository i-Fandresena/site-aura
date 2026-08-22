import { Color, Mesh, MeshStandardMaterial, type Object3D } from "three";

/**
 * Mutes a loaded model's materials toward grayscale in place. Used for
 * background set-dressing (a distant city skyline) that needs to read as a
 * soft, low-key silhouette rather than compete with the scene's own signal
 * color — cheaper than a custom desaturation shader for a one-off backdrop.
 */
export function desaturateObject(root: Object3D, strength: number, dim = 0.6) {
  const luminance = (c: Color) => c.r * 0.299 + c.g * 0.587 + c.b * 0.114;

  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (!(material instanceof MeshStandardMaterial)) continue;
      const gray = luminance(material.color);
      material.color.lerp(new Color(gray, gray, gray), strength).multiplyScalar(dim);
      if (material.emissive) {
        const emissiveGray = luminance(material.emissive);
        material.emissive
          .lerp(new Color(emissiveGray, emissiveGray, emissiveGray), strength)
          .multiplyScalar(dim);
      }
    }
  });
}
