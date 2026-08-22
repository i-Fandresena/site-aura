import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

/** Central rotating icosahedron — the AURA++ core node: dark metal + glass + wireframe energy lines. */
export function AuraCore({ color, reducedMotion }: { color: string; reducedMotion: boolean }) {
  const metalRef = useRef<Mesh>(null);
  const glassRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const speed = reducedMotion ? 0.15 : 1;

  useFrame((_, delta) => {
    if (metalRef.current) {
      metalRef.current.rotation.x += delta * 0.09 * speed;
      metalRef.current.rotation.y += delta * 0.13 * speed;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x += delta * 0.12 * speed;
      wireRef.current.rotation.y += delta * 0.18 * speed;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x -= delta * 0.06 * speed;
      shellRef.current.rotation.y -= delta * 0.09 * speed;
    }
    if (glassRef.current) {
      glassRef.current.rotation.y -= delta * 0.05 * speed;
    }
  });

  return (
    <group>
      {/* Dark metal inner core */}
      <mesh ref={metalRef} scale={0.72}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#151519"
          metalness={0.92}
          roughness={0.28}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Glass envelope */}
      <mesh ref={glassRef} scale={0.95}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.92}
          roughness={0.12}
          thickness={0.6}
          ior={1.4}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Energy wireframe */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={color} wireframe toneMapped={false} />
      </mesh>

      {/* Outer counter-rotating shell */}
      <mesh ref={shellRef} scale={1.55}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} toneMapped={false} />
      </mesh>
    </group>
  );
}
