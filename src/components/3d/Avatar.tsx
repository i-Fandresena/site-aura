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
}: {
  url: string;
  color: string;
  isDark: boolean;
  reducedMotion: boolean;
  position?: [number, number, number];
  targetHeight?: number;
}) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(url);

  const holo = useMemo(() => createHologramMaterial({ color, isDark }), [color, isDark]);

  const fit = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const normScale = size.y > 0 ? targetHeight / size.y : 1;
    return { normScale, groundOffset: -box.min.y * normScale };
  }, [scene, targetHeight]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = holo.material;
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
    return () => holo.material.dispose();
  }, [scene, holo]);

  useFrame((state, delta) => {
    holo.uniforms.uHoloTime.value = state.clock.elapsedTime;

    if (!group.current || reducedMotion) return;

    const targetY = hovered ? 0.15 : 0;
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
