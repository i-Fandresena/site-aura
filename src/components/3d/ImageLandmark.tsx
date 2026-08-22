import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { MeshBasicMaterial, PlaneGeometry, type Group } from "three";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

export function ImageLandmark({
  url,
  sceneIndex,
  position,
  targetWidth = 12,
  maxOpacity = 0.9,
  falloff = 1.5,
  spinSpeed = 0,
}: {
  url: string;
  sceneIndex: number;
  position: [number, number, number];
  targetWidth?: number;
  maxOpacity?: number;
  falloff?: number;
  spinSpeed?: number;
}) {
  const texture = useTexture(url);
  const group = useRef<Group>(null);

  const geometry = useMemo(
    () =>
      new PlaneGeometry(targetWidth, targetWidth * (texture.image.height / texture.image.width)),
    [texture, targetWidth],
  );

  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    [texture],
  );

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, falloff);
    if (group.current) {
      group.current.visible = focus > 0.01;
      group.current.rotation.y += spinSpeed * delta * 60;
    }
    material.opacity += (focus * maxOpacity - material.opacity) * 0.05;
  });

  return (
    <group ref={group} position={[position[0], position[1], position[2]]}>
      <mesh geometry={geometry} material={material} />
    </group>
  );
}
