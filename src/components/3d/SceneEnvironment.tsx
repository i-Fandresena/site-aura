import { Environment, Lightformer } from "@react-three/drei";

/**
 * Global lighting rig, fog and a procedural (network-free) light studio so
 * physical metal/glass materials have something to reflect. No HDR downloads.
 *
 * Only distance-independent lights live here: the camera travels ~80 units
 * down the corridor, so point lights anchored near the origin would leave the
 * later scenes unlit. Per-scene accent point lights are placed at their own
 * anchors in SceneManager instead.
 */
export function SceneEnvironment({
  signal,
  cyan,
  backgroundHex,
  isDark,
}: {
  signal: string;
  cyan: string;
  backgroundHex: string;
  isDark: boolean;
}) {
  return (
    <>
      <color attach="background" args={[backgroundHex]} />
      {/* Tuned so the current scene reads clearly while the next one stays
          hidden ~15 units ahead, revealing itself as the camera approaches. */}
      <fog attach="fog" args={[backgroundHex, 8, 24]} />

      {/* Low fill on purpose: a strong ambient flattens spheres into discs, and
          the day/night terminator across the globe is what sells its volume.
          Light theme runs noticeably darker exposure than an early pass did —
          the ice-white background was blowing out every model's own texture. */}
      <ambientLight intensity={isDark ? 0.35 : 0.22} />
      {/* The key light stays near-white on the light theme so textured assets
          (the Earth in particular) show their own colour instead of reading as
          a monochrome blue-grey ball. Dark keeps the tinted, moodier key. */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={isDark ? 0.6 : 0.75}
        color={isDark ? signal : "#ffffff"}
      />
      <directionalLight position={[-5, -2, 3]} intensity={isDark ? 0.35 : 0.18} color={cyan} />

      <Environment resolution={64} frames={1}>
        <Lightformer
          form="rect"
          intensity={isDark ? 2 : 1}
          color={signal}
          position={[4, 3, -2]}
          scale={[4, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={isDark ? 1.4 : 0.7}
          color={cyan}
          position={[-4, -2, -2]}
          scale={[3, 4, 1]}
        />
        <Lightformer
          form="ring"
          intensity={isDark ? 1.2 : 0.6}
          color={signal}
          position={[0, 0, -6]}
          scale={6}
        />
      </Environment>
    </>
  );
}
