# DevTimeKit

DevTimeKit is a browser-based developer time tools website built with Next.js App Router, TypeScript, and TailwindCSS.

## Features

- Homepage with tool navigation, SEO intro, and popular tools
- `Current Unix Timestamp` tool (live seconds/ms/UTC/ISO + copy)
- `Timestamp to Date` converter (10/13 digit detection + copy)
- `Date to Timestamp` converter (local datetime input + copy)
- English content optimized for SEO pages
- Per-page metadata, semantic HTML, related tool links
- `robots.txt` and `sitemap.xml`
- Static export enabled for Cloudflare Pages or any static hosting

## Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

Static files will be generated into `out/` because `next.config.js` uses `output: 'export'`.

## Pages

- `/`
- `/current-unix-timestamp`
- `/timestamp-to-date`
- `/date-to-timestamp`

## Deployment

### Vercel

1. Import this repository into Vercel.
2. Framework preset: `Next.js`.
3. Build command: `npm run build`.
4. Output directory: `out`.
5. Deploy.

### Cloudflare Pages

1. Connect repository in Cloudflare Pages.
2. Build command: `npm run build`.
3. Build output directory: `out`.
4. Node version: latest LTS (recommended).
5. Deploy.

## Notes

- All tool logic runs fully in the browser.
- No backend and no database are required.