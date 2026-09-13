# Adorable's Birthday 🎉

A 3D neon birthday countdown site built with React + Three.js (react-three-fiber).

## What it does

- Shows a **live countdown** to September 14, 2026 with a glowing neon 3D background
  (floating distorted blobs/rings, starfield, sparkles, bloom glow) and a 3D floating
  photo gallery you can drag to spin.
- **Automatically switches** to a full celebration page the moment the birthday
  arrives: confetti burst, "Happy Birthday" message, the birthday video, and the
  photo gallery again.
- No manual work needed on the day itself — it flips over on its own at midnight,
  local time on the visitor's device.

## Preview celebration mode early

Add `?party=1` to the URL to force celebration mode any time, e.g.
`http://localhost:5173/?party=1` — useful for testing/screenshots before the 14th.

## Run it

```
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Deploy

This is a static Vite app — `npm run build` produces a `dist/` folder you can deploy
to Vercel, Netlify, GitHub Pages, or any static host.

## Customize

- Name / target date: `src/App.jsx`
- Countdown copy: `src/components/CountdownPage.jsx`
- Celebration copy: `src/components/CelebrationPage.jsx`
- Colors/theme: `src/index.css` (CSS variables at the top)
- Photos: drop images into `src/assets/photos/` (auto-included in the gallery)
- Video: `public/video/birthday-video.mp4`
