import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group, type MeshBasicMaterial, type MeshStandardMaterial } from "three";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

/** A hexagonal platform with a glowing rim — fades in/out around its owning scene. */
export function FloatingPlatform({
  color,
  sceneIndex,
  position,
  isDark = true,
}: {
  color: string;
  sceneIndex: number;
  position: [number, number, number];
  isDark?: boolean;
}) {
  // A near-black plate reads as a heavy slab on the ice-white light theme.
  const plateColor = isDark ? "#1a1a1f" : "#c8ccd6";
  const group = useRef<Group>(null);
  const ringMaterial = useRef<MeshBasicMaterial>(null);
  const plateMaterial = useRef<MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, 1.1);
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      const scale = MathUtils.lerp(0.5, 1, focus);
      group.current.scale.setScalar(scale);
    }
    if (ringMaterial.current) {
      ringMaterial.current.opacity = MathUtils.lerp(
        ringMaterial.current.opacity,
        focus * 0.9,
        0.08,
      );
    }
    if (plateMaterial.current) {
      plateMaterial.current.opacity = MathUtils.lerp(
        plateMaterial.current.opacity,
        focus * 0.85,
        0.08,
      );
    }
  });

  return (
    <group ref={group} position={position}>
      {/* cylinderGeometry's axis is already Y, so the plate lies flat with no
          rotation — unlike the ringGeometry below, which is authored in the XY
          plane and does need tipping onto the ground. */}
      <mesh>
        <cylinderGeometry args={[1.3, 1.3, 0.06, 6]} />
        <meshStandardMaterial
          ref={plateMaterial}
          color={plateColor}
          metalness={0.85}
          roughness={0.3}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[1.28, 1.36, 6]} />
        <meshBasicMaterial
          ref={ringMaterial}
          color={color}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
