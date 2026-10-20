# tuanka1904.github.io

Portfolio of **Kieu Anh Tuan**, game developer — Unity (C#) gameplay systems, GPU rendering and
Editor tooling, production Unreal (C++/Blueprint), and live browser games in Three.js.

**Live site:** https://tuanka1904.github.io

## Stack

- [Next.js 16](https://nextjs.org) App Router with `output: "export"` — the whole site is static files
- Tailwind CSS 4, Framer Motion, lucide-react
- Deployed to GitHub Pages by [.github/workflows/deploy.yml](.github/workflows/deploy.yml) on every push to `main`

## Layout

| Path | Holds |
|---|---|
| `src/data/work.js` | Every project on the site, grouped by engine — cards, credits and archive rows render from this one file |
| `src/components/` | One component per section: Hero, Experience, Work, About, Skills, Contact |
| `public/videos`, `public/posters` | Compressed gameplay captures (h264, no audio, faststart) and their poster frames |
| `tools/media.py` | Encodes captures, cuts posters, audits media, renders the link-preview image |
| `tools/og.mjs` | Layout of the 1200×630 Open Graph card (`python tools/media.py og`) |

## Run locally

```bash
npm install
npm run dev
```

`npm run build` produces the static export in `out/` — exactly what CI deploys.

Media jobs need `ffmpeg` and `ffprobe` on PATH:

```bash
python tools/media.py check
```

## License

Code © Kieu Anh Tuan. Videos, images and project material belong to their respective owners and
are shown here as portfolio work; please don't reuse them.
