import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { DoubleSide, Mesh, MeshStandardMaterial, type Group } from "three";
import { useModelFit } from "./useModelFit";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

const MODEL_URL = "/3D/landscape_of_an_alien_planet_skybox.glb";

useGLTF.preload(MODEL_URL);

/**
 * A 360° desert/sky panorama sphere, baked fully emissive so it reads as its
 * own lighting regardless of the scene rig. Originally attempted as a true
 * skybox (camera placed inside a giant inverted sphere), but that never drew
 * — MeshStandardMaterial + doubleSided from inside a sphere this large is
 * apparently unreliable in this renderer path. Rendered as a large distant
 * "horizon" object viewed from outside instead, same architecture as
 * CityBackdrop, which is verified working.
 * Model: Jungle Jim, Sketchfab, CC-BY-4.0.
 */
export function AlienSkybox({
  sceneIndex,
  position,
  targetWidth = 11,
  maxOpacity = 0.9,
}: {
  sceneIndex: number;
  position: [number, number, number];
  targetWidth?: number;
  maxOpacity?: number;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<Group>(null);
  const fit = useModelFit(scene, targetWidth, "width");

  const materials = useMemo(() => {
    const found: MeshStandardMaterial[] = [];
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m instanceof MeshStandardMaterial) {
            m.side = DoubleSide;
            m.transparent = true;
            m.opacity = 0;
            found.push(m);
          }
        }
      }
    });
    return found;
  }, [scene]);

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, 1.4);
    if (group.current) {
      group.current.rotation.y += delta * 0.01;
      group.current.visible = focus > 0.01;
    }
    for (const m of materials) {
      m.opacity += (focus * maxOpacity - m.opacity) * 0.05;
    }
  });

  return (
    <group ref={group} position={position}>
      <group scale={fit.scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
