import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const SATELLITE_COUNT = 7;

/** 7 glowing satellite nodes orbiting the core — one per AURA++ operator. */
export function OrbitNodes({
  color,
  accent,
  reducedMotion,
}: {
  color: string;
  accent: string;
  reducedMotion: boolean;
}) {
  const groupRefs = useRef<Array<Group | null>>([]);
  const speedFactor = reducedMotion ? 0.12 : 1;

  const satellites = useMemo(
    () =>
      Array.from({ length: SATELLITE_COUNT }, (_, i) => ({
        tiltX: ((i * 47) % 360) * (Math.PI / 180),
        tiltZ: ((i * 83) % 360) * (Math.PI / 180),
        radius: 2.0 + (i % 3) * 0.42,
        speed: (i % 2 === 0 ? 1 : -1) * (0.18 + (i % 4) * 0.05),
        size: 0.075 + (i % 3) * 0.014,
      })),
    [],
  );

  useFrame((_, delta) => {
    satellites.forEach((sat, i) => {
      const group = groupRefs.current[i];
      if (group) group.rotation.y += delta * sat.speed * speedFactor;
    });
  });

  return (
    <>
      {satellites.map((sat, i) => (
        <group
          key={i}
          rotation={[sat.tiltX, 0, sat.tiltZ]}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
        >
          <mesh position={[sat.radius, 0, 0]}>
            <sphereGeometry args={[sat.size, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? color : accent} toneMapped={false} />
          </mesh>
          <mesh position={[sat.radius, 0, 0]} scale={2.4}>
            <sphereGeometry args={[sat.size, 12, 12]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? color : accent}
              transparent
              opacity={0.22}
              toneMapped={false}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}
