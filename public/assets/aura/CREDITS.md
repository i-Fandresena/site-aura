# AURA++ — 3D asset credits

All assets bundled here are public domain (CC0). Attribution is not legally
required, but is recorded so their provenance stays traceable.

## Models

| File | Source | Author | Licence |
| --- | --- | --- | --- |
| `3d/robot-expressive.glb` | [three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/RobotExpressive) | Tomás Laulhé ([Quaternius](https://www.patreon.com/quaternius)), modified by [Don McCurdy](https://donmccurdy.com/) | CC0 1.0 |

The robot ships with 14 animation clips (`Idle`, `Wave`, `Dance`, `ThumbsUp`,
`Yes`, `No`, `Jump`, `Punch`, `Walking`, `Running`, `Sitting`, `Standing`,
`WalkJump`, `Death`) plus `Angry` / `Surprised` / `Sad` facial morph targets.

## Textures

| File | Source | Licence |
| --- | --- | --- |
| `textures/earth-day.jpg` | [three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets) — NASA Blue Marble derived | Public domain |
| `textures/earth-night.jpg` | idem — NASA city-lights composite | Public domain |
| `textures/earth-normal.jpg` | idem | Public domain |
| `textures/earth-clouds.png` | idem | Public domain |

> Note: `earth-clouds.png` is a palette-indexed PNG whose transparency lives in
> a `tRNS` chunk. It must be used as `map` (alpha channel), **not** `alphaMap` —
> `alphaMap` samples the green channel, which is opaque across this image and
> turns the cloud shell into a solid white veil.
