# Quib Inc.

The home for Quib Inc., Mediaocre Games and Team Thorn: small games, soundtracks and web experiments.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Contact forms

The forms post to `/api/contact`, which forwards mail through the existing mail service. Copy `.env.example` to `.env.local` and fill in the two access tokens to enable delivery. Without tokens the form returns a friendly error instead of silently failing.

## Where things live

- `app/` — routes, metadata and the global design system (`app/globals.css`)
- `components/` — shared UI
- `lib/site.ts` — all games, tracks, projects, devlog entries and contact details
- `public/assets/` — artwork and videos
- `public/games/` — browser-playable game builds and downloads
- `public/showcase/` — standalone web experiments
