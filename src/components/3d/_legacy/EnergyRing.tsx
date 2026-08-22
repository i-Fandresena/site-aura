import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Mesh, type MeshBasicMaterial } from "three";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

/** A pulsing orbital ring that fades in around its owning scene. */
export function EnergyRing({
  color,
  sceneIndex,
  position,
  radius = 1.8,
  tilt = 0.4,
}: {
  color: string;
  sceneIndex: number;
  position: [number, number, number];
  radius?: number;
  tilt?: number;
}) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    const focus = computeSceneFocus(sceneIndex, 1.1);
    if (mesh.current) {
      mesh.current.rotation.z += delta * 0.15;
      mesh.current.scale.setScalar(MathUtils.lerp(0.6, 1, focus));
    }
    if (material.current) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 1.4) * 0.15;
      material.current.opacity = MathUtils.lerp(material.current.opacity, focus * pulse, 0.08);
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[Math.PI / 2.4, tilt, 0]}>
      <torusGeometry args={[radius, 0.018, 8, 96]} />
      <meshBasicMaterial ref={material} color={color} transparent opacity={0} toneMapped={false} />
    </mesh>
  );
}
