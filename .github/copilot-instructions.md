You are building a developer portfolio with 5 switchable UI themes.

## Tech Stack

- React 19 + Vite 7
- Three.js 0.183 + React Three Fiber 9 + drei 10 + postprocessing 3
- @react-three/rapier (rigid-body physics for metaverse car)
- Framer Motion 12 (UI animations)
- GSAP 3.14 (ScrollTrigger, camera transitions)
- Lenis 1.3 (smooth scrolling — used in non-metaverse themes)
- TailwindCSS 4 (utility-first styling)
- react-router-dom 7 (HashRouter)

## Architecture

- **Theme system** lives in `src/context/ThemeContext.jsx`. `SKINS` object holds 5 themes: `cyber`, `minimal`, `terminal`, `brutalist`, `metaverse`. Each skin defines colors, fonts, card/btn/section/animation styles. Components branch on `themeKey`.
- **Sections** (`src/components/sections/`) each export a root component that dispatches to per-theme sub-components (e.g. `CyberHero`, `MinimalHero`).
- **3D components** live in `src/components/three/`. Metaverse-specific 3D code goes in `src/components/three/metaverse/`.
- **UI overlays** for metaverse go in `src/components/ui/metaverse/`.
- Separate world logic (Three.js scenes), UI logic (React DOM), and physics logic (Rapier rigid bodies).

## Theme: Metaverse (`themeKey === 'metaverse'`)

When the metaverse theme is active, `App.jsx` renders `<MetaverseWorld />` instead of the scrolling sections. This is a full-screen R3F Canvas containing a 3D city.

### Visual Style

- Background: `#030014` (deep space navy)
- Primary: `#00F5FF` (electric cyan)
- Secondary: `#8B5CF6` (vivid purple)
- Highlight: `#FF006E` (hot pink), `#FFD700` (gold)
- Neon glow aesthetic — bloom post-processing, emissive materials
- Grid ground plane with animated pulse lines

### Districts (map to portfolio sections)

| District | Section Content | Visual |
|---|---|---|
| Projects District | Project cards, live demos | Skyscraper cluster with holographic screens |
| Skills Lab | Tech stack, proficiency | Dome building with orbiting skill icons |
| Education Street | Timeline, degrees, certs | Pathway with milestone markers |
| Future Zone | Upcoming projects, goals | Construction-site scaffolding with blueprints |
| Contact Hub | Email form, socials | Beacon tower with pulsing signal rings |

### Car Controller

- WASD / Arrow keys for movement
- Rapier `RigidBody` type `dynamic` with `CuboidCollider`
- Acceleration / brake / steering with velocity clamping
- Camera follows car via spring-damped `ThirdPersonCamera`

### Camera Modes

1. **Driving** — third-person follow with spring damping
2. **Cinematic** — triggered when clicking a sign board; GSAP-animated fly-to

### Sign Boards

- Placed at road intersections pointing toward each district
- Click to trigger cinematic camera fly to that district
- drei `<Html>` labels with district name + icon

### District Interaction

- Drive near a building → proximity trigger shows `<DistrictPanel>` overlay
- Panel uses Framer Motion `AnimatePresence` slide-in from right
- Panel content = the same data used by the scroll-based section (projects array, skills array, etc.)

### Performance Targets

- 60 fps on mid-range GPU
- LOD on buildings (drei `<Detailed>`)
- Instanced geometry for repeated elements (street lights, trees)
- Max 50K triangles in view
- Lazy-load district panel content with React `lazy()` + `Suspense`

## File Organization

```
src/components/three/metaverse/
  MetaverseWorld.jsx    — root Canvas + Physics + scene
  CityEnvironment.jsx   — ground, sky, roads, lighting
  CarController.jsx     — Rapier-powered car
  ThirdPersonCamera.jsx — spring-follow camera
  DistrictBuilding.jsx  — procedural buildings per district
  SignBoard.jsx         — clickable navigation signs
  NeonRoad.jsx          — road segments with glow lines

src/components/ui/metaverse/
  MetaverseHUD.jsx      — speed, minimap, controls hint
  DistrictPanel.jsx     — slide-in content panel
```

## Conventions

- Use `useTheme()` hook to access current skin in every component
- Use `useFrame()` for per-frame 3D updates, never `requestAnimationFrame`
- Physics bodies use Rapier via `@react-three/rapier` — `<RigidBody>`, `<CuboidCollider>`
- Camera transitions use GSAP `gsap.to(camera.position, { ... })`
- All colors come from `theme.*` tokens, never hard-coded