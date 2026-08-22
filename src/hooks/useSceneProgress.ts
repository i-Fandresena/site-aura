import { useSyncExternalStore } from "react";
import { SCENE_COUNT } from "@/config/scenes";

interface ProgressState {
  /** Raw scroll fraction, 0..1. */
  progress: number;
  /** Index of the scene the timeline is currently at or past. */
  sceneIndex: number;
  /** 0..1 blend toward `sceneIndex + 1`. */
  sceneBlend: number;
}

const INITIAL_STATE: ProgressState = { progress: 0, sceneIndex: 0, sceneBlend: 0 };

let state: ProgressState = INITIAL_STATE;
const listeners = new Set<() => void>();

/**
 * Sets the global scroll timeline position. Called once per scroll frame by
 * `useSmoothScroll`. Cheap consumers (HUD) subscribe via `useSceneProgress`;
 * the 3D render loop reads `getSceneProgressSnapshot()` directly inside
 * `useFrame` instead of subscribing, to avoid a React re-render per frame.
 */
export function setSceneProgress(rawProgress: number) {
  const clamped = Math.min(Math.max(rawProgress, 0), 1);
  const scaled = clamped * (SCENE_COUNT - 1);
  const sceneIndex = Math.min(Math.floor(scaled), Math.max(SCENE_COUNT - 2, 0));
  const sceneBlend = scaled - sceneIndex;

  if (
    state.progress === clamped &&
    state.sceneIndex === sceneIndex &&
    state.sceneBlend === sceneBlend
  ) {
    return;
  }
  state = { progress: clamped, sceneIndex, sceneBlend };
  listeners.forEach((listener) => listener());
}

export function getSceneProgressSnapshot(): ProgressState {
  return state;
}

function getServerSnapshot(): ProgressState {
  return INITIAL_STATE;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** React-reactive hook for HUD elements (active nav label, progress bar). */
export function useSceneProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSceneProgressSnapshot, getServerSnapshot);
}

/**
 * How "in focus" `targetIndex` is right now, as a 0..1 triangular falloff
 * around the continuous scroll position. Used by per-scene 3D objects to
 * fade/scale themselves in and out without subscribing to React state.
 */
export function computeSceneFocus(targetIndex: number, falloff = 1) {
  const continuous = state.sceneIndex + state.sceneBlend;
  const distance = Math.abs(continuous - targetIndex);
  return Math.max(0, 1 - distance / falloff);
}
