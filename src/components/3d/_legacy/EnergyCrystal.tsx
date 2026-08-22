import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group, type Mesh, type MeshPhysicalMaterial } from "three";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

/** A small glass/energy octahedron with an emissive inner core — scene-bound. */
export function EnergyCrystal({
  color,
  sceneIndex,
  position,
}: {
  color: string;
  sceneIndex: number;
  position: [number, number, number];
}) {
  const group = useRef<Group>(null);
  const glass = useRef<Mesh>(null);
  const glassMaterial = useRef<MeshPhysicalMaterial>(null);

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, 1.1);
    if (group.current) {
      group.current.scale.setScalar(MathUtils.lerp(0.3, 1, focus));
    }
    if (glass.current) {
      glass.current.rotation.x += delta * 0.3;
      glass.current.rotation.y += delta * 0.22;
    }
    if (glassMaterial.current) {
      glassMaterial.current.opacity = MathUtils.lerp(
        glassMaterial.current.opacity,
        focus * 0.85,
        0.08,
      );
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={glass}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshPhysicalMaterial
          ref={glassMaterial}
          color={color}
          transmission={0.85}
          roughness={0.08}
          thickness={0.4}
          ior={1.5}
          transparent
          opacity={0}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
