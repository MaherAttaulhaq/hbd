# Happy Birthday Dr. Mansoor Ahmed 🎉

A production-grade, responsive birthday greeting site built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Framer Motion**. Premium midnight-blue × gold × white palette, glassmorphism, floating balloons, confetti, an animated cake, and a local ambient-music loop.

## Stack

- Next.js 15 (App Router, `src/`, static export via `output: "export"`)
- React 19
- Tailwind CSS v4 (CSS-first `@theme` config)
- Framer Motion (`motion`)
- `canvas-confetti`
- Self-hosted fonts via `next/font` (Playfair Display + Montserrat)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script               | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Start the dev server (Turbopack)               |
| `npm run build`      | Production build (static export to `out/`)     |
| `npm run lint`       | Run ESLint                                     |
| `npm run generate:audio` | Regenerate `public/audio/birthday-loop.wav` (pure Node, no deps) |

## Customizing

- **Name / date / tagline** — `src/lib/constants.ts`
- **Birthday wishes** — `src/lib/wishes.ts` (add/remove cards)
- **Photos** — `public/images/hero-portrait.jpg`, `public/images/wishes-photo.jpg`
- **Music** — regenerate or replace `public/audio/birthday-loop.wav`
- **Palette / animations** — `src/app/globals.css` (`@theme` tokens)

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in the [Vercel dashboard](https://vercel.com/new) — the build command is the default `next build`; the site is exported statically and served from `out/`.
