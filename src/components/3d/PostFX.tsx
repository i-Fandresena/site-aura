import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { Vector2 } from "three";

const CHROMATIC_OFFSET = new Vector2(0.0005, 0.0005);

/**
 * Subtle cinematic post-processing. Skipped entirely on low-power/mobile.
 *
 * Bloom is dark-theme only, and deliberately so: the light theme's background
 * is near-white, which sits above any useful luminance threshold, so bloom
 * ends up blooming the backdrop itself and hazes the whole scene. On light we
 * keep only a faint vignette and aberration so 3D objects stay crisp.
 */
export function PostFX({ enabled, isDark }: { enabled: boolean; isDark: boolean }) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0}>
      {isDark ? (
        <Bloom intensity={0.6} luminanceThreshold={0.2} luminanceSmoothing={0.3} mipmapBlur />
      ) : (
        <></>
      )}
      <ChromaticAberration offset={CHROMATIC_OFFSET} />
      <Vignette eskil={false} offset={0.3} darkness={isDark ? 0.65 : 0.12} />
    </EffectComposer>
  );
}
