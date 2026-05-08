# SenioriSelko — Project Context for Claude

> **Always read this file first.** It is the single source of truth for project structure, tech stack, design decisions, and conventions. Every Claude session should anchor to this before touching any code.

---

## What This Project Is

**SenioriSelko** ("Senior Clarity" in Finnish) is a PWA (Progressive Web App) designed for elderly Finnish users. The app is warm, accessible, and elder-friendly. It has four core sections:

| Section | Finnish | Color | Purpose |
|---|---|---|---|
| Apuri | Assistant | Blue `#3F7FE0` | Voice-based AI assistant |
| Juttuseura | Companionship | Purple `#A381DC` | Chat with a named companion (Onni) |
| Ohjeet | Guides | Coral `#F18A6E` | Step-by-step tutorials |
| Hätä | Emergency | Orange `#F0973A` | SOS / emergency contact auto-dial |

The UI uses **orbs** — radial gradient circles — as the core visual identity for each section. Each orb has three gradient stops (light → mid → dark) plus a matching shadow color.

---

## Current State of the Repo

The entire app currently lives in **one file**: `index.html` (586 lines, ~34 KB). There is no build step, no bundler, no `package.json`. React 18.3.1 is loaded from CDN (unpkg), Babel Standalone handles JSX in the browser.

```
SenioriselkoMVP/
├── index.html        ← full app: React + CSS + logic, all inline
├── manifest.json     ← PWA manifest (Finnish, portrait, #f0eee9 background)
├── icon.svg          ← Blue gradient "S" icon (192×192)
└── CLAUDE.md         ← this file
```

### Screens implemented in index.html

1. **LockScreen** — Dark gradient, time, memory-of-the-day widget, swipe-to-unlock
2. **HomeScreen** — 4-tile grid, user greeting, bottom dock navigation
3. **AIScreen** — Voice waveform animation, mic button, radiating ring background
4. **ChatScreen** — Chat thread with Onni, auto-reply after 800 ms
5. **HelpScreen** — Tip card, category filter pills, guide list
6. **GuideScreen** — Multi-step tutorial with progress bar, step-by-step instructions
7. **SOSScreen** — 5-second countdown, emergency contact quick-call, concentric rings

### Design tokens (CSS variables, defined at `:root`)

```css
--bg: #f0eee9           /* warm beige */
--bg-card: rgba(255,255,255,0.6)
--ink: #1A1714          /* dark brown text */
--ink-2: rgba(60,50,40,0.7)
--ink-3: rgba(60,50,40,0.45)
--hairline: rgba(0,0,0,0.07)
--ai: #3F7FE0
--chat: #A381DC
--help: #F18A6E
--emer: #F0973A
```

Typography: `system-ui` for body, `Instrument Serif` (Google Fonts, italic) for display/headline text. Font sizes are user-adjustable (14 / 18 / 22 px) via a Drawer setting.

Mobile dimensions baked in: 390 × 844 px (iPhone 14 reference). Desktop shows a centered phone mockup. `@media (max-width: 430px)` switches to real full-viewport mode with `env(safe-area-inset-*)` support.

---

## Where We Are Heading — 3D UI with React Three Fiber

We are rebuilding/extending the UI with a **3D layer** using **React Three Fiber** and **Tailwind CSS**. The existing single-file approach will be migrated to a proper Vite + React + TypeScript project.

### Mandatory stack

| Layer | Library | Notes |
|---|---|---|
| 3D rendering | `@react-three/fiber` (R3F) | React renderer for Three.js |
| 3D helpers | `@react-three/drei` | Cameras, controls, loaders, shaders — always prefer Drei over rolling your own |
| UI / layout | Tailwind CSS | Utility-first, no custom CSS files unless unavoidable |
| Framework | React 18+ with TypeScript | Strict mode on |
| Build | Vite | Fast HMR, ESM-native |
| State | TBD (Zustand preferred) | Keep 3D state separate from UI state |

### Planned project structure (target)

```
SenioriselkoMVP/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── CLAUDE.md                  ← always here
├── public/
│   ├── manifest.json
│   └── icon.svg
└── src/
    ├── main.tsx               ← React root, <Canvas> setup lives here or App.tsx
    ├── App.tsx                ← top-level router / screen manager
    ├── components/
    │   ├── 3d/                ← ALL Three.js / R3F components go here
    │   │   ├── Orb.tsx        ← 3D orb mesh (replaces CSS radial gradients)
    │   │   ├── Scene.tsx      ← root <Canvas> scene wrapper
    │   │   ├── OrbField.tsx   ← home screen orb layout
    │   │   └── ...
    │   ├── ui/                ← flat React / Tailwind UI components
    │   │   ├── BottomDock.tsx
    │   │   ├── Drawer.tsx
    │   │   ├── StatusBar.tsx
    │   │   └── ...
    │   └── screens/           ← full-screen views
    │       ├── HomeScreen.tsx
    │       ├── AIScreen.tsx
    │       ├── ChatScreen.tsx
    │       ├── HelpScreen.tsx
    │       ├── GuideScreen.tsx
    │       └── SOSScreen.tsx
    ├── hooks/                 ← custom hooks (useOrbAnimation, useSOS, etc.)
    ├── stores/                ← Zustand stores
    ├── types/                 ← shared TypeScript types
    └── utils/                 ← pure helpers
```

### Rules for 3D components (`src/components/3d/`)

- Every file under `src/components/3d/` must be a **React Three Fiber** component — it expects to render inside a `<Canvas>`.
- Use `@react-three/drei` for anything it already provides: `OrbitControls`, `Environment`, `useGLTF`, `MeshTransmissionMaterial`, `Float`, `Sparkles`, `Html`, `Text`, `useTexture`, etc. Do not reimplement what Drei provides.
- Orbs should be 3D meshes (sphere geometry + custom shader or `MeshStandardMaterial`). The existing CSS radial gradient orb aesthetic (3-stop gradient: light → mid → dark, soft shadow) should be reproduced with 3D lighting and materials.
- Keep R3F components pure — no direct DOM refs, no Tailwind classes (those belong in `components/ui/`). Pass callbacks in as props.
- Use `useFrame` sparingly. Prefer declarative animations via `@react-spring/three` or Drei's `Float`/`Sparkles` over imperative frame loops.
- `<Canvas>` lives in `App.tsx` or `Scene.tsx`. Do not nest a second Canvas.

### Tailwind conventions

- All layout, spacing, color, and typography for non-3D elements via Tailwind utility classes.
- Preserve the warm palette: use Tailwind config to extend with the project's custom colors (ai, chat, help, emer, bg, ink).
- No `styled-components`, no CSS modules unless absolutely required for Three.js shader integration.

---

## Color Reference (always use these values)

```
Orb — Apuri (ai/blue):
  light  #8AB8FF
  mid    #3F7FE0
  dark   #1A4FA8

Orb — Juttuseura (chat/purple):
  light  #D4B8FF
  mid    #A381DC
  dark   #6B4FB8

Orb — Ohjeet (help/coral):
  light  #FFC4A8
  mid    #F18A6E
  dark   #C85A38

Orb — Hätä (emergency/orange):
  light  #FFD88A
  mid    #F0973A
  dark   #C86A18

Background: #f0eee9 (warm beige)
Text:       #1A1714 (dark brown)
```

---

## Key UX Constraints (do not change without discussion)

1. **Large touch targets** — buttons must be at least 56 px tall. Seniors need forgiving tap areas.
2. **High contrast** — never drop below WCAG AA contrast ratios for text on background.
3. **No hidden gestures** — every action must have a visible button. Swipe-to-unlock is the only exception (on LockScreen).
4. **Font size user-controlled** — respect the 3-level font size selector (14 / 18 / 22 px). 3D `Html` overlays from Drei must inherit the root font size.
5. **Portrait only** — lock orientation. The 3D canvas should be laid out for portrait 9:16.
6. **Safe area** — always apply `env(safe-area-inset-*)` padding on the bottom dock and top status bar.
7. **Finnish language** — all user-visible strings are in Finnish. Do not change copy without being asked.

---

## PWA Requirements

- `manifest.json` must stay at the project root (or `public/`).
- `lang: "fi"`, `display: "standalone"`, `orientation: "portrait-primary"`.
- Theme color `#f0eee9` must stay in sync between `manifest.json` and the `<meta name="theme-color">` tag.
- The SVG icon (`icon.svg`) is the app icon — do not replace it without approval.

---

## Git Branches

| Branch | Purpose |
|---|---|
| `main` | Stable, deployed to GitHub Pages |
| `claude/add-ui-design-MR9fx` | Previous UI design work |
| `claude/create-project-docs-TDngQ` | Current — project docs + CLAUDE.md |

Always develop on a `claude/` feature branch and open a draft PR. Never push directly to `main`.

---

## Commit History Summary (as of May 2026)

```
a1f61c6  Start app on home screen, skip lock screen
87a296e  Optimize: production React builds, fix safe-area spacers, fix drawer notch
db0bb3a  Optimize for real mobile: hide mock UI, add PWA install support
77e2ac3  SenioriSelko MVP — final interactive app on main
433c728  Make UI self-contained: inline all components and screens
6955167  Add SenioriSelko UI design HTML
733967c  Initial commit
```

---

## Common Tasks & Where to Look

| Task | Where |
|---|---|
| Change an orb color | Color reference above + `index.html` `:root` CSS vars (current) → Tailwind config + `src/components/3d/Orb.tsx` (future) |
| Add a new screen | `index.html` (current) → `src/components/screens/` (future) |
| Modify navigation | `navigate()` callback in `index.html` (current) → routing store (future) |
| Touch a 3D object | `src/components/3d/` — use R3F `onPointerDown`/`onClick` |
| Add a Drei helper | Import from `@react-three/drei`, place in `src/components/3d/` |
| Change UI layout | Tailwind classes in `src/components/ui/` or `src/components/screens/` |
| Add a custom hook | `src/hooks/` |
| Add global state | `src/stores/` (Zustand) |

---

## Do Not Do (common mistakes to avoid)

- Do not use `useEffect` to drive Three.js animations — use `useFrame`.
- Do not put Tailwind classes on R3F mesh/group components — those are 3D objects, not DOM.
- Do not put Three.js code in `components/ui/` — keep 3D isolated in `components/3d/`.
- Do not nest a `<Canvas>` inside another `<Canvas>`.
- Do not shrink touch targets below 56 px.
- Do not hardcode Finnish strings in new components — keep them as named constants so localization is possible later.
- Do not break the warm beige aesthetic by introducing cold grays or harsh blacks.
