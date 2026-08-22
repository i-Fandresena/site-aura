import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial, MathUtils, type Group, type PointLight } from "three";
import { useModelFit } from "./useModelFit";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

const MODEL_URL = "/3D/little_planet_earth.glb";

useGLTF.preload(MODEL_URL);

/**
 * A stylized modeled planet (replaces the earlier NASA-texture procedural
 * globe) for the Universe scene. It has no day/night texture pair, so the
 * theme instead drives a colored rim light — signal blue in light mode,
 * signal crimson in dark — rather than swapping the surface map.
 * Model: BlockedGravity ("Little Planet Earth"), Sketchfab, CC-BY-4.0.
 */
export function LittlePlanet({
  color,
  isDark,
  sceneIndex,
  position,
  reducedMotion,
}: {
  color: string;
  isDark: boolean;
  sceneIndex: number;
  position: [number, number, number];
  reducedMotion: boolean;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<Group>(null);
  const rim = useRef<PointLight>(null);

  const fit = useModelFit(scene, 2.2, "diagonal");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m instanceof MeshStandardMaterial) m.envMapIntensity = isDark ? 0.6 : 0.25;
        }
      }
    });
  }, [scene, isDark]);

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, 1.25);
    const spin = reducedMotion ? 0.08 : 1;

    if (group.current) {
      group.current.rotation.y += delta * 0.06 * spin;
      group.current.scale.setScalar(MathUtils.lerp(0.5, 1, focus) * fit.scale);
      group.current.visible = focus > 0.015;
    }
    if (rim.current) {
      rim.current.intensity = MathUtils.lerp(rim.current.intensity, focus * 6, 0.08);
    }
  });

  return (
    <group position={position}>
      <pointLight ref={rim} position={[1.4, 0.8, 1.6]} color={color} distance={8} intensity={0} />
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
