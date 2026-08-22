import { Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { ParticleField } from "@/components/3d/ParticleField";
import { CameraRig } from "@/components/3d/CameraRig";
import { SceneEnvironment } from "@/components/3d/SceneEnvironment";
import { Avatar } from "@/components/3d/Avatar";
import { LittlePlanet } from "@/components/3d/LittlePlanet";
import { AlienSkybox } from "@/components/3d/AlienSkybox";
import { WorldProp } from "@/components/3d/WorldProp";
import { ImageLandmark } from "@/components/3d/ImageLandmark";
import { PostFX } from "@/components/3d/PostFX";
import { SCENE_ANCHORS } from "@/config/scenes";
import { computeSceneFocus } from "@/hooks/useSceneProgress";
import { useLazyMount } from "@/hooks/useLazyMount";
import { useAuraTheme } from "@/hooks/useAuraTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLowPowerDevice } from "@/hooks/useLowPowerDevice";

const SIGNAL_LIGHT = "#0052FF";
// Nebula violet — matches --signal's new oklch(0.66 0.24 292) in styles.css.
const SIGNAL_DARK = "#9B68FF";
const CYAN = "#00F0FF";
const BACKGROUND_LIGHT = "#f8f9fa";
const BACKGROUND_DARK = "#0a0a0c";

/**
 * Positions children at a world's anchor and culls them once the scroll
 * timeline moves away, so distant worlds cost nothing to render.
 */
function SceneGroup({
  sceneIndex,
  position,
  falloff = 1.35,
  children,
}: {
  sceneIndex: number;
  position: [number, number, number];
  falloff?: number;
  children: ReactNode;
}) {
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (ref.current) ref.current.visible = computeSceneFocus(sceneIndex, falloff) > 0.015;
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

/** Defers a heavy landmark's fetch until the timeline is nearby (see useLazyMount). */
function LazyLandmark({
  sceneIndex,
  margin = 2,
  children,
}: {
  sceneIndex: number;
  /** Scenes of head start before arrival. Bump this for especially heavy
   * models (city_for_my_game.glb is 88MB) so the fetch+parse has real time
   * to finish before a visitor scrolls in, instead of racing it. */
  margin?: number;
  children: ReactNode;
}) {
  const mounted = useLazyMount(sceneIndex, margin);
  if (!mounted) return null;
  return <Suspense fallback={null}>{children}</Suspense>;
}

function SceneContent({
  isDark,
  reducedMotion,
  lowPower,
}: {
  isDark: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
}) {
  const signal = isDark ? SIGNAL_DARK : SIGNAL_LIGHT;
  const background = isDark ? BACKGROUND_DARK : BACKGROUND_LIGHT;

  return (
    <>
      <SceneEnvironment signal={signal} cyan={CYAN} backgroundHex={background} isDark={isDark} />
      <CameraRig reducedMotion={reducedMotion} />

      {/* ── 0 · LE QUAI — AURA-1 alone, no procedural set-dressing ──────── */}
      <SceneGroup sceneIndex={0} position={SCENE_ANCHORS.hero}>
        <pointLight position={[3.2, 2, 2.5]} intensity={9} distance={12} color={signal} />
        <pointLight position={[0.2, 0.5, 1.5]} intensity={5} distance={10} color={CYAN} />
        <Suspense fallback={null}>
          <Avatar
            url="/3D/team-mascot.glb"
            color={signal}
            isDark={isDark}
            reducedMotion={reducedMotion}
            position={[1.9, -1.28, 0]}
            targetHeight={2.15}
          />
        </Suspense>
      </SceneGroup>

      {/* ── 1 · L'OBSERVATOIRE — an alien horizon, filling the view ─────── */}
      <SceneGroup sceneIndex={1} position={SCENE_ANCHORS.vision} falloff={1.6}>
        <pointLight position={[0, 1, 3]} intensity={7} distance={12} color={signal} />
        <LazyLandmark sceneIndex={1}>
          <AlienSkybox
            sceneIndex={1}
            position={[0.4, -1.4, -6]}
            targetWidth={16}
            maxOpacity={isDark ? 1 : 0.95}
          />
        </LazyLandmark>
      </SceneGroup>

      {/* ── 2 · LE MONDE-BERCEAU — the home planet, front and center ────── */}
      <SceneGroup sceneIndex={2} position={SCENE_ANCHORS.universe}>
        <pointLight position={[4, 2, 4]} intensity={14} distance={18} color={signal} />
        <LazyLandmark sceneIndex={2}>
          <LittlePlanet
            color={signal}
            isDark={isDark}
            sceneIndex={2}
            position={[0.3, -0.1, -1.8]}
            reducedMotion={reducedMotion}
          />
        </LazyLandmark>
      </SceneGroup>

      {/* ── 3 · LE SANCTUAIRE — the team's oasis, an island refuge ──────── */}
      <SceneGroup sceneIndex={3} position={SCENE_ANCHORS.sanctuary} falloff={1.5}>
        <pointLight position={[0, 2, 2]} intensity={8} distance={14} color={CYAN} />
        <LazyLandmark sceneIndex={3}>
          <WorldProp
            url="/3D/ibizone_basic_setup_vers.02.glb"
            sceneIndex={3}
            position={[0.3, -2.4, -5]}
            targetWidth={15}
            maxOpacity={isDark ? 0.85 : 1}
            envMapIntensity={isDark ? 0.7 : 0.3}
            falloff={1.5}
            spinSpeed={0.0015}
          />
        </LazyLandmark>
      </SceneGroup>

      {/* ── 4 · LA FORGE — atmosphere only; the project cards carry it ──── */}
      <SceneGroup sceneIndex={4} position={SCENE_ANCHORS.projects}>
        <pointLight position={[0, 2, 3]} intensity={9} distance={14} color={signal} />
        <pointLight position={[0, -1, 2]} intensity={5} distance={10} color={CYAN} />
      </SceneGroup>

      {/* ── 5 · LE CODEX — the collective's grimoire, close and legible ─── */}
      <SceneGroup sceneIndex={5} position={SCENE_ANCHORS.technology} falloff={1.5}>
        <pointLight position={[0, 1.5, 2]} intensity={8} distance={12} color={CYAN} />
        <LazyLandmark sceneIndex={5}>
          <WorldProp
            url="/3D/magic_book_set.glb"
            sceneIndex={5}
            position={[0.2, -0.9, -1.2]}
            targetWidth={6.5}
            maxOpacity={1}
            envMapIntensity={isDark ? 1 : 0.4}
            falloff={1.5}
            spinSpeed={0.004}
          />
        </LazyLandmark>
      </SceneGroup>

      {/* ── 6 · MISSION CONTROL — the metropolis, front and center ──────── */}
      <SceneGroup sceneIndex={6} position={SCENE_ANCHORS.process} falloff={1.5}>
        <pointLight position={[0, 1.5, 2]} intensity={7} distance={12} color={CYAN} />
        <LazyLandmark sceneIndex={6}>
          <WorldProp
            url="/3D/cyberpunk_city_-_1.glb"
            sceneIndex={6}
            position={[0.2, -2.6, -6]}
            targetWidth={15}
            desaturate={0.5}
            maxOpacity={isDark ? 0.9 : 0.85}
            envMapIntensity={isDark ? 0.8 : 0.35}
            falloff={1.5}
          />
        </LazyLandmark>
      </SceneGroup>

      {/* ── 7 · LE NOYAU — the operators' own home base ──────────────────── */}
      <SceneGroup sceneIndex={7} position={SCENE_ANCHORS.team} falloff={1.5}>
        <pointLight position={[2, 2, 3]} intensity={10} distance={14} color={signal} />
        <LazyLandmark sceneIndex={7} margin={4}>
          <ImageLandmark
            url="/3D/team-landmark.jpg"
            sceneIndex={7}
            position={[0.2, -1.4, -3.5]}
            targetWidth={12}
            maxOpacity={isDark ? 0.9 : 1}
            falloff={1.5}
            spinSpeed={0.002}
          />
        </LazyLandmark>
      </SceneGroup>

      {/* ── 8 · L'AVANT-POSTE — a skyline of milestones, lit at night ───── */}
      <SceneGroup sceneIndex={8} position={SCENE_ANCHORS.timeline} falloff={1.5}>
        <pointLight position={[0, 1.5, 2]} intensity={7} distance={12} color={signal} />
        <LazyLandmark sceneIndex={8}>
          <WorldProp
            url="/3D/city_at_night.glb"
            sceneIndex={8}
            position={[0.4, -2.8, -6.5]}
            targetWidth={15}
            desaturate={0.1}
            maxOpacity={isDark ? 0.95 : 0.85}
            envMapIntensity={isDark ? 0.9 : 0.35}
            falloff={1.5}
          />
        </LazyLandmark>
      </SceneGroup>

      {/* ── 9 · LE SIGNAL — journey's end, a pure transmission ─────────── */}
      <SceneGroup sceneIndex={9} position={SCENE_ANCHORS.contact}>
        <pointLight position={[0, 1, 3]} intensity={9} distance={12} color={signal} />
      </SceneGroup>

      <ParticleField
        color={CYAN}
        reducedMotion={reducedMotion}
        count={lowPower ? 550 : 1400}
        depth={148}
        spread={16}
      />

      <PostFX enabled={!lowPower} isDark={isDark} />
    </>
  );
}

/**
 * The persistent, full-viewport R3F scene behind the scroll timeline. Only
 * ever mounted client-side (see `Scene3D.tsx`'s dynamic import).
 */
export function SceneManager() {
  const isDark = useAuraTheme();
  const reducedMotion = useReducedMotion();
  const lowPower = useLowPowerDevice();

  return (
    <Canvas
      dpr={lowPower ? [1, 1] : [1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0.6, 0.25, 5.6], fov: 42, far: 600 }}
    >
      <SceneContent isDark={isDark} reducedMotion={reducedMotion} lowPower={lowPower} />
    </Canvas>
  );
}
