import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3, type Mesh, type MeshStandardMaterial } from "three";

const CORRIDOR_DEPTH = 135;
const CYCLE_SECONDS = 85;
const OMEGA = (Math.PI * 2) / CYCLE_SECONDS;

/**
 * AURA++'s own small courier craft — built procedurally instead of using the
 * archived Star Trek fan model (CC-BY-NC-ND: no derivatives, no commercial
 * use — recoloring it to match the site would itself violate the licence).
 * It drifts a slow, continuous loop down the full length of the world
 * corridor, so it's occasionally glimpsed passing between worlds regardless
 * of where the visitor currently is — an ambient "the network is alive"
 * detail rather than a scripted per-click event.
 */
export function AuraShuttle({ color, accent }: { color: string; accent: string }) {
  const group = useRef<Group>(null);
  const engineL = useRef<Mesh>(null);
  const engineR = useRef<Mesh>(null);
  const engineMatL = useRef<MeshStandardMaterial>(null);
  const engineMatR = useRef<MeshStandardMaterial>(null);

  const ahead = useRef(new Vector3());
  const here = useRef(new Vector3());

  const pathAt = (t: number, out: Vector3) => {
    const z = -CORRIDOR_DEPTH / 2 + (CORRIDOR_DEPTH / 2) * Math.sin(t * OMEGA);
    const x = 7 * Math.sin(t * OMEGA * 2.1 + 1.4);
    const y = 2.4 + 1.4 * Math.sin(t * OMEGA * 3.3);
    out.set(x, y, z);
    return out;
  };

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    pathAt(t, here.current);
    pathAt(t + 0.6, ahead.current);

    group.current.position.copy(here.current);
    group.current.lookAt(ahead.current);

    const pulse = 0.7 + Math.sin(t * 6) * 0.3;
    if (engineMatL.current) engineMatL.current.emissiveIntensity = pulse * 1.8;
    if (engineMatR.current) engineMatR.current.emissiveIntensity = pulse * 1.8;
    void engineL.current;
    void engineR.current;
  });

  return (
    <group ref={group} scale={0.42}>
      {/* Fuselage, nose pointing along local -Z (forward, matching lookAt convention). */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.35, 1.6, 8]} />
        <meshStandardMaterial color="#1c1e24" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.3, 0.9, 8]} />
        <meshStandardMaterial color="#26282f" metalness={0.8} roughness={0.35} />
      </mesh>

      {/* Wings */}
      <mesh position={[0.75, 0, 0.5]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[1.1, 0.06, 0.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[-0.75, 0, 0.5]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[1.1, 0.06, 0.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Engine glow */}
      <mesh ref={engineL} position={[0.55, 0, 1.05]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial
          ref={engineMatL}
          color={accent}
          emissive={accent}
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={engineR} position={[-0.55, 0, 1.05]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial
          ref={engineMatR}
          color={accent}
          emissive={accent}
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>

      <pointLight position={[0, 0, 1]} color={accent} intensity={2} distance={4} />
    </group>
  );
}
