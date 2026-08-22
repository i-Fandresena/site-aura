# Legacy 3D components

Not imported anywhere — kept as a reference/rollback point per the request to
back up components before replacing them with real downloaded models.

- **EarthGlobe.procedural.tsx** — the original NASA-texture procedural globe
  (day/night texture swap, cloud shell, atmosphere shader) used in the
  Universe scene before it was replaced by `LittlePlanet.tsx`, which loads
  `/3D/little_planet_earth.glb` (Sketchfab, CC-BY-4.0) instead. The procedural
  version had a real day/night texture pair the new model doesn't — if the
  modeled planet ever needs to be swapped back out, this is a working,
  previously-verified starting point.
