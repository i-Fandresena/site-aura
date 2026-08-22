/**
 * The AURA++ Odyssey — ten worlds strung along a single corridor. The
 * visitor travels this path once, scrolling forward through it alongside
 * AURA-1 (the hologram robot). Day theme = this journey at dawn; night theme
 * = the same journey after dark — same worlds, different sky.
 */
export type SceneId =
  | "hero" // Le Quai — The Dock
  | "vision" // L'Observatoire — The Observatory
  | "universe" // Le Monde-Berceau — The Home World
  | "sanctuary" // Le Sanctuaire — The Sanctuary
  | "projects" // La Forge — The Forge
  | "technology" // Le Codex — The Codex
  | "process" // Mission Control
  | "team" // Le Noyau — The Core
  | "timeline" // L'Avant-Poste — The Outpost
  | "contact"; // Le Signal — The Beacon

export interface SceneKeyframe {
  id: SceneId;
  index: number;
  /** Camera position in world space for this keyframe. */
  cameraPosition: [number, number, number];
  /** Point the camera aims at — usually this scene's anchor. */
  lookAt: [number, number, number];
  fov: number;
}

/**
 * Where each world's 3D landmark lives in world space. Worlds are strung out
 * along -Z rather than stacked at the origin, so the camera genuinely travels
 * through the corridor as you scroll; fog keeps the next world hidden until
 * you approach it.
 */
export const SCENE_ANCHORS: Record<SceneId, [number, number, number]> = {
  hero: [0, 0, 0],
  vision: [-2.1, 0.4, -15],
  universe: [2.15, 0.65, -30],
  sanctuary: [-2, 0.2, -45],
  projects: [0, 0, -60],
  technology: [2, 0.3, -75],
  process: [-2.3, 0.3, -90],
  team: [0, 0, -105],
  timeline: [2.2, 0.2, -120],
  contact: [0, 0, -135],
};

export const SCENES: SceneKeyframe[] = [
  { id: "hero", index: 0, cameraPosition: [0.6, 0.25, 5.6], lookAt: [1.15, -0.15, 0], fov: 42 },
  {
    id: "vision",
    index: 1,
    cameraPosition: [-2.4, 0.7, -9.4],
    lookAt: [-2.1, 0.4, -15],
    fov: 44,
  },
  {
    id: "universe",
    index: 2,
    cameraPosition: [2.5, 1.15, -24.3],
    lookAt: [1.8, 0.5, -30],
    fov: 46,
  },
  {
    id: "sanctuary",
    index: 3,
    cameraPosition: [-2.3, 0.8, -39.3],
    lookAt: [-2, 0.2, -45],
    fov: 45,
  },
  { id: "projects", index: 4, cameraPosition: [-2.6, 0.5, -54.2], lookAt: [0, 0, -60], fov: 46 },
  {
    id: "technology",
    index: 5,
    cameraPosition: [2.3, 0.7, -69.3],
    lookAt: [2, 0.3, -75],
    fov: 45,
  },
  {
    id: "process",
    index: 6,
    cameraPosition: [-2.5, 0.6, -84.4],
    lookAt: [-2.3, 0.3, -90],
    fov: 45,
  },
  { id: "team", index: 7, cameraPosition: [-2.2, 0.9, -99.2], lookAt: [0, 0, -105], fov: 47 },
  {
    id: "timeline",
    index: 8,
    cameraPosition: [2.4, 0.5, -114.3],
    lookAt: [2.2, 0.2, -120],
    fov: 45,
  },
  { id: "contact", index: 9, cameraPosition: [0, 0.2, -129.4], lookAt: [0, 0, -135], fov: 42 },
];

export const SCENE_COUNT = SCENES.length;
