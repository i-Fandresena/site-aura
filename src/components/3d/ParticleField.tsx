import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as PointsImpl } from "three";

/**
 * Floating particle field spanning the full scene corridor.
 *
 * Particles are distributed across the whole -Z travel path rather than
 * clustered at the origin, so they parallax past the camera as it dollies
 * between scenes. Scene fog fades the far ones out, which is what gives the
 * corridor its sense of depth.
 */
export function ParticleField({
  color,
  reducedMotion,
  count = 900,
  depth = 84,
  spread = 13,
}: {
  color: string;
  reducedMotion: boolean;
  count?: number;
  depth?: number;
  spread?: number;
}) {
  const pointsRef = useRef<PointsImpl>(null);
  const speed = reducedMotion ? 0.15 : 1;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread * 2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.2;
      // Corridor runs from just behind the camera's start to past the last scene.
      arr[i * 3 + 2] = 8 - Math.random() * depth;
    }
    return arr;
  }, [count, depth, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.z += delta * 0.008 * speed;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        color={color}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        toneMapped={false}
      />
    </Points>
  );
}
