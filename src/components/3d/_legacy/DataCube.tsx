import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

const CUBE_COUNT = 6;

/** A small cluster of holographic wireframe cubes, scene-bound like the other decorative objects. */
export function DataCube({
  color,
  accent,
  sceneIndex,
  position,
}: {
  color: string;
  accent: string;
  sceneIndex: number;
  position: [number, number, number];
}) {
  const group = useRef<Group>(null);

  const cubes = useMemo(
    () =>
      Array.from({ length: CUBE_COUNT }, (_, i) => ({
        offset: [
          Math.cos((i / CUBE_COUNT) * Math.PI * 2) * 1.1,
          Math.sin(i * 1.7) * 0.6,
          Math.sin((i / CUBE_COUNT) * Math.PI * 2) * 1.1,
        ] as [number, number, number],
        size: 0.14 + (i % 3) * 0.05,
        speed: 0.2 + (i % 4) * 0.06,
      })),
    [],
  );

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, 1.1);
    if (!group.current) return;
    group.current.rotation.y += delta * 0.1;
    group.current.scale.setScalar(MathUtils.lerp(0.4, 1, focus));
    group.current.visible = focus > 0.02;
  });

  return (
    <group ref={group} position={position}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.offset} rotation={[i, i * 0.6, 0]}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? color : accent}
            wireframe
            toneMapped={false}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}
