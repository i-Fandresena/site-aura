import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial, type Group } from "three";
import { useModelFit } from "./useModelFit";
import { desaturateObject } from "./desaturate";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

/**
 * A downloaded GLB placed as one world's landmark set-piece — normalized to
 * `targetWidth`, grounded so its base rests at `position`, faded in with
 * scene focus, and optionally muted toward grayscale. Generic across every
 * "real model" world in the AURA++ Odyssey (city skylines, the Sanctuary
 * island, the Codex bookstacks) — the narrative role comes entirely from
 * which `url` and copy surround it, not from a dedicated component per asset.
 */
export function WorldProp({
  url,
  sceneIndex,
  position,
  targetWidth,
  desaturate = 0,
  maxOpacity = 0.85,
  falloff = 1.3,
  spinSpeed = 0.003,
  envMapIntensity = 1,
}: {
  url: string;
  sceneIndex: number;
  position: [number, number, number];
  targetWidth: number;
  /** 0 = original colors, 1 = full grayscale. */
  desaturate?: number;
  maxOpacity?: number;
  falloff?: number;
  spinSpeed?: number;
  /** Dial the scene's IBL contribution down on the light theme — the ice-white
   * background otherwise blows out a model's own texture/color entirely. */
  envMapIntensity?: number;
}) {
  const { scene } = useGLTF(url);
  const group = useRef<Group>(null);
  const fit = useModelFit(scene, targetWidth, "width");

  const materials = useMemo(() => {
    if (desaturate > 0) desaturateObject(scene, desaturate);

    const found: MeshStandardMaterial[] = [];
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m instanceof MeshStandardMaterial) {
            m.transparent = true;
            m.opacity = 0;
            m.envMapIntensity = envMapIntensity;
            found.push(m);
          }
        }
      }
    });
    return found;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- desaturateObject mutates `scene` once; re-running per render would re-mute an already-muted material.
  }, [scene]);

  useEffect(() => {
    return () => {
      materials.forEach((m) => m.dispose());
    };
  }, [materials]);

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, falloff);
    if (group.current) {
      group.current.visible = focus > 0.01;
      group.current.rotation.y += spinSpeed * delta * 60;
    }
    for (const m of materials) {
      m.opacity += (focus * maxOpacity - m.opacity) * 0.05;
    }
  });

  return (
    <group ref={group} position={[position[0], position[1] + fit.groundOffset, position[2]]}>
      <group scale={fit.scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
