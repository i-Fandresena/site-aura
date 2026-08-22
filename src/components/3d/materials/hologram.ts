import { Color, MeshStandardMaterial, type IUniform } from "three";

export interface HologramUniforms {
  uHoloTime: IUniform<number>;
  uHoloRim: IUniform<Color>;
  uHoloScanIntensity: IUniform<number>;
  uHoloRimPower: IUniform<number>;
}

export interface HologramMaterial {
  material: MeshStandardMaterial;
  uniforms: HologramUniforms;
}

/**
 * Builds a holographic material by patching MeshStandardMaterial via
 * `onBeforeCompile`, rather than authoring a raw ShaderMaterial.
 *
 * This matters: the robot is a SkinnedMesh with morph targets. Going through
 * MeshStandardMaterial keeps three.js's skinning / morph / lighting chunks
 * intact, and we only inject a fresnel rim and scrolling scanlines on top.
 * A hand-written ShaderMaterial would have to reimplement skinning by hand.
 */
export function createHologramMaterial({
  color,
  isDark,
}: {
  color: string;
  isDark: boolean;
}): HologramMaterial {
  const rim = new Color(color);

  const uniforms: HologramUniforms = {
    uHoloTime: { value: 0 },
    uHoloRim: { value: rim },
    // A translucent hologram reads well against a near-black scene but washes
    // out on the ice-white light theme, so both scanlines and rim are pushed
    // harder in light mode.
    uHoloScanIntensity: { value: isDark ? 0.16 : 0.3 },
    uHoloRimPower: { value: isDark ? 1.7 : 2.4 },
  };

  const material = new MeshStandardMaterial({
    color: rim,
    emissive: rim,
    emissiveIntensity: isDark ? 0.55 : 0.35,
    metalness: 0.35,
    roughness: 0.4,
    transparent: true,
    opacity: isDark ? 0.62 : 0.78,
    depthWrite: true,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms["uHoloTime"] = uniforms.uHoloTime;
    shader.uniforms["uHoloRim"] = uniforms.uHoloRim;
    shader.uniforms["uHoloScanIntensity"] = uniforms.uHoloScanIntensity;
    shader.uniforms["uHoloRimPower"] = uniforms.uHoloRimPower;

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
        varying vec3 vHoloWorld;`,
      )
      // `transformed` is fully skinned/morphed by the time project_vertex runs,
      // so deriving world position here follows the animated pose.
      .replace(
        "#include <project_vertex>",
        `vHoloWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
        #include <project_vertex>`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        uniform float uHoloTime;
        uniform vec3 uHoloRim;
        uniform float uHoloScanIntensity;
        uniform float uHoloRimPower;
        varying vec3 vHoloWorld;`,
      )
      .replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
        vec3 holoView = normalize( vViewPosition );
        float holoFresnel = pow( 1.0 - abs( dot( normalize( vNormal ), holoView ) ), uHoloRimPower );

        float holoScan = sin( vHoloWorld.y * 42.0 - uHoloTime * 2.6 ) * 0.5 + 0.5;
        holoScan = smoothstep( 0.4, 1.0, holoScan );

        // Slow vertical sweep, like a scanning beam passing over the projection.
        float holoSweep = smoothstep( 0.0, 0.06, abs( fract( vHoloWorld.y * 0.16 - uHoloTime * 0.09 ) - 0.5 ) );
        holoSweep = 1.0 - holoSweep;

        gl_FragColor.rgb += uHoloRim * ( holoFresnel * 1.5 + holoScan * uHoloScanIntensity + holoSweep * 0.5 );
        gl_FragColor.a = clamp( gl_FragColor.a + holoFresnel * 0.5 + holoSweep * 0.25, 0.0, 1.0 );`,
      );
  };

  return { material, uniforms };
}
