---
description: "Step-by-step workflow for building the SatyajitVerse 3D metaverse city — ground plane, roads, car physics, camera, districts, UI panels, and polish."
---

# Metaverse World Builder Skill

Build the SatyajitVerse 3D city district by district. Follow this order to avoid dependency issues.

## Prerequisites

- `@react-three/rapier` installed
- `metaverse` skin registered in `src/context/ThemeContext.jsx`
- Directory structure exists: `src/components/three/metaverse/`, `src/components/ui/metaverse/`

## Step 1 — City Ground & Skybox

File: `src/components/three/metaverse/CityEnvironment.jsx`

- Infinite grid ground plane using drei `<Grid>` or custom shader with animated pulse lines
- Color: dark navy `#030014`, grid lines in cyan `#00F5FF` at low opacity
- Skybox: gradient from `#030014` at horizon to `#0a0025` at zenith, subtle star particles
- Ambient light (low intensity 0.3) + directional light (moonlight feel)
- Fog: exponential, matching bg color, density 0.015

## Step 2 — Road Network

File: `src/components/three/metaverse/NeonRoad.jsx`

- Road segments as flat box geometries with neon edge lines (emissive cyan)
- Layout: cross-shaped main roads connecting 5 districts
- Center intersection = spawn point
- Road width: 8 units, lane markings as thin glowing strips
- Use `<instancedMesh>` for repeated lane markers

## Step 3 — Car Controller

File: `src/components/three/metaverse/CarController.jsx`

- Rapier `<RigidBody type="dynamic">` with `<CuboidCollider>`
- Keyboard input: W/↑ accelerate, S/↓ brake/reverse, A/← steer left, D/→ steer right
- Apply forces via `rigidBody.applyImpulse()` for acceleration
- Apply torque via `rigidBody.applyTorqueImpulse()` for steering
- Velocity clamping: max speed ~20 units/s
- Visual: simple box mesh with neon edge highlights (theme.primary)
- Expose car position via ref or zustand for camera & HUD

## Step 4 — Third-Person Camera

File: `src/components/three/metaverse/ThirdPersonCamera.jsx`

- Spring-damped follow camera behind and above car
- Offset: `[0, 4, -8]` relative to car heading
- Use `useFrame()` to lerp camera position toward target
- Spring stiffness ~4, damping ~0.8
- Lock to car's forward direction with slight lag for cinematic feel
- Support "cinematic mode" override: when active, GSAP takes control of camera position

## Step 5 — Sign Boards

File: `src/components/three/metaverse/SignBoard.jsx`

- Placed at road intersections, one per district direction
- Visual: tall pole + rectangular sign face with emissive text
- drei `<Html>` overlay showing district name + arrow icon
- `onClick` → dispatch cinematic camera fly to that district using GSAP
- Glow effect on hover (scale up sign, intensify emissive)
- Props: `{ districtName, position, targetPosition, rotation }`

## Step 6 — District Buildings

File: `src/components/three/metaverse/DistrictBuilding.jsx`

- Each district = cluster of procedural box buildings with unique visual identity
- **Projects District** (position: [40, 0, 0]): tall skyscrapers, holographic screen planes
- **Skills Lab** (position: [0, 0, 40]): dome shape (SphereGeometry half), orbiting small spheres
- **Education Street** (position: [-40, 0, 0]): pathway with milestone pillar meshes
- **Future Zone** (position: [0, 0, -40]): scaffolding wireframes, blueprint-blue emissive
- **Contact Hub** (position: [0, 0, 0] elevated): beacon tower with pulsing ring torus
- Proximity detection: when car is within 15 units, trigger `onApproach` callback
- Use `drei <Detailed>` for LOD (full detail < 30 units, simplified > 30)

## Step 7 — HUD Overlay

File: `src/components/ui/metaverse/MetaverseHUD.jsx`

- Fixed overlay on the Canvas (React DOM, not 3D)
- Show: car speed (from rigid body velocity), current nearest district, controls hint (WASD)
- Style: glassmorphism panel, theme colors, bottom-left position
- Framer Motion fade-in on mount

## Step 8 — District Panel

File: `src/components/ui/metaverse/DistrictPanel.jsx`

- Slide-in panel from right when car approaches a district
- Content loaded via React `lazy()` + `Suspense` — reuses same data as scroll sections
- Framer Motion `AnimatePresence` for enter/exit
- Close button + auto-close when car drives away
- Panel sections: Projects → project cards, Skills → skill bars, etc.

## Step 9 — Post-Processing & Polish

In `MetaverseWorld.jsx`:

- `<EffectComposer>` with `<Bloom luminanceThreshold={0.6} intensity={1.5} />`
- Add `<Vignette>` for focus effect
- Particle system: floating dust/ember particles using `<Points>` with random positions
- Ambient sound cues (optional, defer if not needed)

## Step 10 — Performance Audit

- Check triangle count with `renderer.info.render.triangles` in useFrame
- Ensure instanced geometry for repeated elements (lane markers, street lights, particles)
- LOD on all district buildings
- Frustum culling enabled (default in Three.js)
- Target: 60fps on GTX 1060 equivalent

## Verification

```bash
npx vite build
```

- No build errors
- Toggle to metaverse theme → 3D city loads
- WASD drives the car
- Sign boards clickable → camera flies to district
- Approaching district → panel slides in
- Performance: 60fps at 1080p
