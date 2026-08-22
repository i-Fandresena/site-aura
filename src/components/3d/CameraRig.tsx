import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3, type PerspectiveCamera } from "three";
import { SCENES } from "@/config/scenes";
import { getSceneProgressSnapshot } from "@/hooks/useSceneProgress";

/**
 * Scroll-driven cinematic camera. Lerps position, aim point and FOV between
 * scene keyframes, then layers a small mouse-parallax offset on top so the
 * environment feels alive even when the scroll is still.
 */
export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  const smoothedPosition = useRef(new Vector3(...SCENES[0]!.cameraPosition));
  const smoothedTarget = useRef(new Vector3(...SCENES[0]!.lookAt));
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());

  useEffect(() => {
    if (reducedMotion) return;
    const onPointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reducedMotion]);

  useFrame((_, delta) => {
    const { sceneIndex, sceneBlend } = getSceneProgressSnapshot();
    const from = SCENES[sceneIndex] ?? SCENES[0]!;
    const to = SCENES[sceneIndex + 1] ?? from;

    targetPosition.current.set(
      MathUtils.lerp(from.cameraPosition[0], to.cameraPosition[0], sceneBlend),
      MathUtils.lerp(from.cameraPosition[1], to.cameraPosition[1], sceneBlend),
      MathUtils.lerp(from.cameraPosition[2], to.cameraPosition[2], sceneBlend),
    );
    targetLookAt.current.set(
      MathUtils.lerp(from.lookAt[0], to.lookAt[0], sceneBlend),
      MathUtils.lerp(from.lookAt[1], to.lookAt[1], sceneBlend),
      MathUtils.lerp(from.lookAt[2], to.lookAt[2], sceneBlend),
    );
    const fov = MathUtils.lerp(from.fov, to.fov, sceneBlend);

    const smoothing = reducedMotion ? 1 : Math.min(delta * 2.2, 1);
    smoothedPosition.current.lerp(targetPosition.current, smoothing);
    smoothedTarget.current.lerp(targetLookAt.current, smoothing);

    const parallaxX = reducedMotion ? 0 : pointer.current.x * 0.32;
    const parallaxY = reducedMotion ? 0 : -pointer.current.y * 0.22;

    camera.position.set(
      smoothedPosition.current.x + parallaxX,
      smoothedPosition.current.y + parallaxY,
      smoothedPosition.current.z,
    );
    camera.lookAt(smoothedTarget.current);

    const perspective = camera as PerspectiveCamera;
    if (typeof perspective.fov === "number" && Math.abs(perspective.fov - fov) > 0.01) {
      perspective.fov = fov;
      perspective.updateProjectionMatrix();
    }
  });

  return null;
}
