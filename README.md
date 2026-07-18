# Kalinga Stone — Homepage

Production build of the Figma "Homepage · Option 1 · v2" design, built with **Vite + React (JSX)**.
The hero is a scroll-scrubbed animation driven by the new opening video
(`Kaling hero video no logo.mp4`), pre-rendered to 240 frames in `public/frames/`.

## Run locally

```bash
cd final
npm install      # first time only
npm run dev      # start dev server → http://localhost:5173
```

Then open the printed URL (default **http://localhost:5173**) in your browser.

Other commands:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally to sanity-check
```

## Deploy to Vercel

The project is zero-config for Vercel (framework preset: **Vite**).

- **Root Directory:** `final`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Either import the repo in the Vercel dashboard and set the root directory to
`final`, or from this folder run `vercel` (Vercel CLI) and accept the detected
Vite settings.

## Notes / assets

- **Hero animation** — `src/Hero.jsx` preloads `public/frames/f_001.jpg … f_240.jpg`
  and scrubs them to scroll position on a `<canvas>` (same technique as the original
  prototype). To regenerate frames from a new video:
  `ffmpeg -i video.mp4 -q:v 3 public/frames/f_%03d.jpg`
- **Fonts** — body text uses self-hosted **Neue Haas Grotesk Text** (in `public/fonts`).
  The Figma display face is **Transducer Test**, which is a licensed font not included
  here — the stack falls back to *Saira*. Drop the Transducer `.woff2` files into
  `public/fonts` and uncomment the `@font-face` block at the top of `src/index.css`
  for a pixel-exact match.
- **Imagery** — placeholder photography uses the stone textures available in the repo.
  Swap the files in `public/img/` (and the hero poster) for final art.
