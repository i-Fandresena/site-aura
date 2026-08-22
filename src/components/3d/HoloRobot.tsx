import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Box3, LoopOnce, LoopRepeat, MathUtils, Mesh, Vector3, type Group } from "three";
import { createHologramMaterial } from "./materials/hologram";

const MODEL_URL = "/assets/aura/3d/robot-expressive.glb";

/** Animations the robot cycles through when the visitor clicks it. */
const GREETINGS = ["Wave", "ThumbsUp", "Dance", "Yes", "Jump"] as const;
const IDLE = "Idle";

useGLTF.preload(MODEL_URL);

/**
 * Interactive holographic robot — the AURA++ "operator" projection.
 * Idles by default, waves when the pointer enters, and cycles through
 * greeting animations on click. Model: Tomás Laulhé (Quaternius), CC0.
 */
export function HoloRobot({
  color,
  isDark,
  reducedMotion,
  position = [0, -1.15, 0],
  targetHeight = 2.4,
}: {
  color: string;
  isDark: boolean;
  reducedMotion: boolean;
  position?: [number, number, number];
  /** Desired on-screen height in world units; the model is normalized to it. */
  targetHeight?: number;
}) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, mixer } = useAnimations(animations, group);

  const current = useRef<string>(IDLE);
  const greetIndex = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const holo = useMemo(() => createHologramMaterial({ color, isDark }), [color, isDark]);

  // The GLB's armature carries a x100 scale, so a hardcoded scale factor would
  // be a magic number tied to this exact asset. Measure the bind-pose bounds
  // instead and normalize to `targetHeight`, with the feet resting at y=0.
  const fit = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const normScale = size.y > 0 ? targetHeight / size.y : 1;
    return { normScale, groundOffset: -box.min.y * normScale };
  }, [scene, targetHeight]);

  // Swap every mesh onto the hologram material. Re-runs when the theme flips,
  // and disposes the previous material so repeated toggles don't leak GPU memory.
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = holo.material;
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
    return () => holo.material.dispose();
  }, [scene, holo]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  /** Cross-fades to `name`; one-shot clips clamp on their last frame. */
  const play = (name: string, once = false) => {
    const next = actions[name];
    if (!next || name === current.current) return;
    const prev = actions[current.current];

    next.reset();
    next.setLoop(once ? LoopOnce : LoopRepeat, once ? 1 : Infinity);
    next.clampWhenFinished = once;
    next.fadeIn(0.35).play();
    prev?.fadeOut(0.35);
    current.current = name;
  };

  // Start idling, and fall back to idle whenever a one-shot greeting ends.
  useEffect(() => {
    const idle = actions[IDLE];
    idle?.reset().fadeIn(0.5).play();
    current.current = IDLE;

    const onFinished = () => {
      const idleAction = actions[IDLE];
      if (!idleAction) return;
      const prev = actions[current.current];
      idleAction.reset().setLoop(LoopRepeat, Infinity).fadeIn(0.4).play();
      if (prev !== idleAction) prev?.fadeOut(0.4);
      current.current = IDLE;
    };

    mixer.addEventListener("finished", onFinished);
    return () => {
      mixer.removeEventListener("finished", onFinished);
      mixer.stopAllAction();
    };
  }, [actions, mixer]);

  useFrame((state, delta) => {
    holo.uniforms.uHoloTime.value = state.clock.elapsedTime;

    if (!group.current || reducedMotion) return;

    // Turn toward the cursor so the projection feels aware of the visitor.
    const targetY = pointer.current.x * 0.6;
    const targetX = pointer.current.y * 0.12;
    const lerp = Math.min(delta * 2.5, 1);
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetY, lerp);
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, targetX, lerp);

    // Gentle levitation — it is a projection, not a machine standing on a floor.
    group.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.9) * 0.055 + (hovered ? 0.06 : 0);
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
        if (!reducedMotion) play("Wave", true);
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (reducedMotion) return;
        const next = GREETINGS[greetIndex.current % GREETINGS.length]!;
        greetIndex.current += 1;
        play(next, true);
      }}
    >
      <group scale={fit.normScale} position={[0, fit.groundOffset, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
