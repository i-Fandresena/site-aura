import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Mesh, Vector3, type Group } from "three";
import { createHologramMaterial } from "./materials/hologram";

export function Avatar({
  url,
  color,
  isDark,
  reducedMotion,
  position = [0, -1.15, 0],
  targetHeight = 2.4,
  holo = true,
  baseRotation = [0, 0, 0],
}: {
  url: string;
  color: string;
  isDark: boolean;
  reducedMotion: boolean;
  position?: [number, number, number];
  targetHeight?: number;
  holo?: boolean;
  baseRotation?: [number, number, number];
}) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF(url);

  const holoMaterial = useMemo(
    () => (holo ? createHologramMaterial({ color, isDark }) : null),
    [color, isDark, holo],
  );

  const fit = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const normScale = size.y > 0 ? targetHeight / size.y : 1;
    return { normScale, groundOffset: -box.min.y * normScale };
  }, [scene, targetHeight]);

  useEffect(() => {
    if (!holo || !holoMaterial) return;
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = holoMaterial.material;
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
    return () => holoMaterial.material.dispose();
  }, [scene, holoMaterial, holo]);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;

    group.current.rotation.x = baseRotation[0];
    group.current.rotation.z = baseRotation[2];

    const targetY = hovered ? 0.15 : baseRotation[1];
    const lerp = Math.min(delta * 2.5, 1);
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetY, lerp);

    group.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.9) * 0.055 + (hovered ? 0.06 : 0);
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      <group scale={fit.normScale} position={[0, fit.groundOffset, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
