import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  AdditiveBlending,
  BackSide,
  NormalBlending,
  Color,
  MathUtils,
  SRGBColorSpace,
  ShaderMaterial,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
} from "three";
import { computeSceneFocus } from "@/hooks/useSceneProgress";

const TEXTURES = {
  day: "/assets/aura/textures/earth-day.jpg",
  night: "/assets/aura/textures/earth-night.jpg",
  normal: "/assets/aura/textures/earth-normal.jpg",
  clouds: "/assets/aura/textures/earth-clouds.png",
};

/**
 * Rim-lit atmosphere shell, rendered from the inside so it haloes the planet.
 * Additive blending only works on the dark theme — added light over the
 * near-white light theme just blows the planet out, so that variant blends
 * normally.
 */
function useAtmosphereMaterial(color: string, isDark: boolean) {
  return useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { uColor: { value: new Color(color) }, uOpacity: { value: 0 } },
        transparent: true,
        blending: isDark ? AdditiveBlending : NormalBlending,
        side: BackSide,
        depthWrite: false,
        vertexShader: /* glsl */ `
          varying vec3 vNormalV;
          varying vec3 vViewV;
          void main() {
            vec4 mv = modelViewMatrix * vec4( position, 1.0 );
            vNormalV = normalize( normalMatrix * normal );
            vViewV = normalize( -mv.xyz );
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uOpacity;
          varying vec3 vNormalV;
          varying vec3 vViewV;
          void main() {
            float rim = pow( 1.0 - abs( dot( vNormalV, vViewV ) ), 3.0 );
            gl_FragColor = vec4( uColor, rim * uOpacity );
          }
        `,
      }),
    [color, isDark],
  );
}

/**
 * Earth seen from orbit. The theme drives which face of the planet you get:
 * the light theme shows the daylight Blue Marble, the dark theme shows the
 * night side with city lights — which reads as a network of populated nodes.
 * Textures are NASA-derived, public domain (via three.js examples).
 */
export function EarthGlobe({
  color,
  isDark,
  sceneIndex,
  position,
  reducedMotion,
}: {
  color: string;
  isDark: boolean;
  sceneIndex: number;
  position: [number, number, number];
  reducedMotion: boolean;
}) {
  const group = useRef<Group>(null);
  const globe = useRef<Mesh>(null);
  const clouds = useRef<Mesh>(null);
  const globeMaterial = useRef<MeshStandardMaterial>(null);
  const cloudMaterial = useRef<MeshStandardMaterial>(null);

  const textures = useTexture(TEXTURES);
  const atmosphere = useAtmosphereMaterial(color, isDark);

  const surface = isDark ? textures.night : textures.day;
  surface.colorSpace = SRGBColorSpace;
  textures.clouds.colorSpace = SRGBColorSpace;

  useFrame((_, delta) => {
    const focus = computeSceneFocus(sceneIndex, 1.2);
    const spin = reducedMotion ? 0.1 : 1;

    if (globe.current) globe.current.rotation.y += delta * 0.035 * spin;
    // Clouds drift slightly faster than the surface for parallax.
    if (clouds.current) clouds.current.rotation.y += delta * 0.052 * spin;

    if (group.current) {
      group.current.scale.setScalar(MathUtils.lerp(0.55, 1, focus));
      group.current.visible = focus > 0.02;
    }
    if (globeMaterial.current) {
      globeMaterial.current.opacity = MathUtils.lerp(globeMaterial.current.opacity, focus, 0.09);
    }
    if (cloudMaterial.current) {
      cloudMaterial.current.opacity = MathUtils.lerp(
        cloudMaterial.current.opacity,
        focus * (isDark ? 0.25 : 0.75),
        0.09,
      );
    }
    atmosphere.uniforms["uOpacity"]!.value = MathUtils.lerp(
      atmosphere.uniforms["uOpacity"]!.value as number,
      focus * (isDark ? 0.95 : 0.32),
      0.09,
    );
  });

  return (
    <group ref={group} position={position} rotation={[0.32, 0, 0.12]}>
      <mesh ref={globe}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshStandardMaterial
          ref={globeMaterial}
          map={surface}
          normalMap={textures.normal}
          // The night texture is already emissive city light; letting it also
          // drive emissive keeps the lights readable against the dark theme.
          emissiveMap={isDark ? textures.night : null}
          emissive={isDark ? new Color(color) : new Color("#000000")}
          emissiveIntensity={isDark ? 0.85 : 0}
          metalness={0.1}
          roughness={0.85}
          // The scene's Environment lights every standard material uniformly,
          // which flattens the Blue Marble into a grey disc. Keep IBL low here
          // so the texture's own colour and the directional terminator lead.
          envMapIntensity={isDark ? 0.5 : 0.15}
          transparent
          opacity={0}
        />
      </mesh>

      <mesh ref={clouds} scale={1.015}>
        <sphereGeometry args={[1.25, 48, 48]} />
        {/* `map`, not `alphaMap`: this PNG is palette-indexed with a tRNS chunk,
            so its transparency lives in the alpha channel. alphaMap samples the
            green channel instead, which is ~1 across the whole image here and
            turned the cloud shell into a solid white veil over the planet. */}
        <meshStandardMaterial
          ref={cloudMaterial}
          map={textures.clouds}
          transparent
          opacity={0}
          depthWrite={false}
          roughness={1}
        />
      </mesh>

      <mesh scale={1.16} material={atmosphere}>
        <sphereGeometry args={[1.25, 48, 48]} />
      </mesh>
    </group>
  );
}
