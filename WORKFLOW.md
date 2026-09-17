# WORKFLOW — site structure, rules, and the jobs that repeat

Operating manual for this portfolio. Anything done twice is written down here with a runnable
command. Every media job (compress, poster, audit) is wrapped in [tools/media.py](tools/media.py) —
don't type ffmpeg by hand.

Missing figures and owner decisions live in [TODO-FILL.md](TODO-FILL.md), not here.

---

## 1. Site structure

Next.js 16 (App Router) + Tailwind 4, **static export** (`output: 'export'` in
[next.config.js](next.config.js)). Push to `main` → GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds `out/` → GitHub Pages.
No server, no API — everything must work as static files.

### Page order ([src/app/page.js](src/app/page.js))

```
Navbar
Hero        3 engine tiles (cover images come from engines[].cover)
Work        01 Unity → 02 Web → 03 Unreal   (one component renders all three sections)
About       04
Skills      Capabilities
Contact     05
Footer
```

### What each file owns

| File | Edit it for |
|---|---|
| [src/data/work.js](src/data/work.js) | **All project data.** Add/remove/reorder cards, change engine, tier, video, link, metric — plus the `engines` object (name, summary, stack, cover per section) |
| [src/components/Work.jsx](src/components/Work.jsx) | Card layouts (lead / feature / grid / game / credit) and the column rules |
| [src/components/ProjectMedia.jsx](src/components/ProjectMedia.jsx) | `LazyVideo`, `posterFor()`, `MetricReadout`, `CardMedia`, detail modal — shared styling for every card |
| [src/components/Hero.jsx](src/components/Hero.jsx) | Headline, intro paragraph, the three engine tiles |
| [src/components/Navbar.jsx](src/components/Navbar.jsx) | `navLinks`, `CV_HREF` (CV path) |
| [About.jsx](src/components/About.jsx), [Skills.jsx](src/components/Skills.jsx), [Contact.jsx](src/components/Contact.jsx) | Static copy of those sections |
| [src/app/layout.js](src/app/layout.js) | `<title>`, description, OpenGraph, keywords |

### Media in `public/`

```
public/
  videos/<name>.mp4            Unity / Unreal cards (landscape)
  videos/threejs/<name>.mp4    Web cards (portrait)
  posters/<same path>.jpg      poster — MUST mirror the video path
  images/                      stills for cards with no video (images: [...])
  cv/Kieu-Anh-Tuan-Unity.pdf   CV file (CV_HREF)
```

Posters are **not declared in work.js** — `posterFor()` derives them:
`/videos/threejs/x.mp4` → `/posters/threejs/x.jpg`. Wrong name or wrong folder means the card
shows a black frame until hover.

### A project object in `work.js`

```js
{
    title: "Merge Drop 3D",
    subtitle: "Physics Merge Arcade",
    date: "2026",
    tier: "feature",                 // omit for the compact grid; see the tier table
    tags: ["Three.js", "TypeScript"],
    description: "1–2 sentences, shown on the card.",
    fullDescription: "Opening paragraph in the modal.",
    bulletPoints: [ { title: "...", desc: "..." } ],   // 3–5 entries
    role: "Solo Developer",
    timeline: "Live · playable in browser",
    video: "/videos/threejs/mergedrop3d.mp4",          // OR images: ["/images/a.jpg", ...]
    portrait: true,                  // portrait captures only (web games)
    link: "https://mergedrop3d.vercel.app",            // optional — no link, no button
    linkLabel: "Play in browser",    // optional
    badge: "Live on Asset Store",    // optional — amber tag over the card image
    metric: { value: "1M agents @ 60 FPS", label: "RTX 4060 · 6 draw calls" },  // or null
    summary: "One line."             // tier: "credit" ONLY
}
```

| `tier` | Renders as |
|---|---|
| `"lead"` | Wide card opening the section — **max 1** |
| `"feature"` | Large two-column cards under the lead |
| *(none)* | The "More X work" grid. All-`portrait` grid → 4-column phone-shaped tiles |
| `"credit"` | One-line rows at the bottom; needs `summary` |

- Array order is display order.
- The grid picks its column count so no row ends on an orphan: 4/8 cards → 4 columns, 3/6 → 3,
  **5 or 7 → the first grid card goes double-width**. Adding or removing a grid card changes the
  layout — check it in the browser.
- Section header counts and Hero tile counts derive from array length.

---

## 2. Non-negotiable rules

### Media

| Rule | Why |
|---|---|
| **Never commit a raw capture.** Always run it through `tools/media.py video` | Raws run 20–130 MB, several times the bitrate the content needs |
| **Strip audio** (`-an`) | The site always plays muted — audio is dead weight |
| **`moov` atom first** (`+faststart`) | moov at the end means the browser downloads the whole file before the first frame. The most common defect in raw captures |
| h264 · yuv420p · CRF 26 · ≤30 fps · maxrate 2600k | What every video already on the site uses |
| **Never trim** unless the owner asks | The owner picks the take; the tool only cuts with `--ss/--t` |
| Web games (portrait): **keep native resolution** | Captures are already small (~500–720 px wide) |
| Landscape: 1280x720 max; dense footage (fish schools, particles) → `--height 540` | When interframe compression can't help, resolution is the only lever |
| Small HUD text: **stay at 720p** and check a frame after encoding | 540p smeared the HUD on Rio: Arcane Warden |
| Poster: landscape 960x540; portrait matches the video's own size | Matches every existing poster |
| Cut the poster **from the compressed file**, on a frame with action that explains the game | Never a menu, loading screen or empty frame |
| Target sizes: web game ~1–2 MB, landscape < 20 MB, hard limit < 100 MB | GitHub rejects files over 100 MB |
| Masters stay out of git — the tool moves them to `_originals/` (gitignored) | Back them up elsewhere too; `_originals/` is local only |

### Content

- **Never invent a number.** `metric` carries measured figures only. No figure yet → `metric: null`
  with a `FILL:` comment, and an entry in [TODO-FILL.md](TODO-FILL.md).
- **Card copy describes only what is visible** in the video, on the HUD, or in the live build — or
  what the owner confirmed. No durations, trigger conditions or counts the footage doesn't show.
- **Live links use the public URL** (`<project>.vercel.app`), never `vercel.com/<team>/<project>`
  (a dashboard, login required). Open the link and check its `<title>` matches the card name.
- No dead placeholders: no `link` → no button; no `metric` → no readout line.
- Site copy and repo docs are in English.

### Git

- Commit messages in English: `feat:` / `fix:` / `perf:` plus one sentence; the body explains **why**
  (before/after size, why that poster frame, etc.).
- Every notable media or data change gets an entry in [TODO-FILL.md](TODO-FILL.md): command used,
  result, what is still FILL.
- `python tools/media.py check` must report no `ERROR` before committing.

---

## 3. The tool: `tools/media.py`

Needs `ffmpeg` + `ffprobe` on PATH (`winget install Gyan.FFmpeg`) and Python 3.8+. No packages to
install. Run from the repo root.

| Command | Does |
|---|---|
| `python tools/media.py video <raw.mp4> <name> [--dir threejs] [--poster-at 48]` | Encodes to the section 2 rules → `public/videos/[dir]/<name>.mp4`, cuts the poster into the matching path, prints the `video:` line for work.js. A raw sitting inside `public/` is moved to `_originals/` first |
| `python tools/media.py frames <video> [--count 12]` | Contact sheet of evenly spaced frames → `_originals/frames/<name>-sheet.jpg`, with each tile's timestamp. Use it to pick a poster second |
| `python tools/media.py poster <threejs/name> --at 48` | Re-cuts the poster for a video already on the site |
| `python tools/media.py probe <file>...` | Resolution, fps, duration, size, audio track, moov position |
| `python tools/media.py check` | Audits everything: moov at end, missing poster, orphan poster, wrong codec, files > 100 MB, and `/videos` `/posters` `/images` `/cv` paths referenced in `src/` that don't exist. Exit 1 on `ERROR` |

Extra flags on `video`: `--crf 28` (smaller, softer), `--height 540`, `--ss 100 --t 45` (trim — only
when asked).

> `check` currently warns about audio tracks on 10 older Unity/Unreal videos and the size of
> `gpu-ecosystem` (30 MB) and `shader` (22 MB). Warnings, not blockers. To clean them up, re-run
> `video` per file (the file in `public/` is moved to `_originals/`, then re-encoded under the same name).

---

## 4. The repeating jobs

### 4.1 Replace an existing card's video

The owner just overwrote `public/videos/threejs/mergedrop3d.mp4` with a new capture:

```
python tools/media.py probe public/videos/threejs/mergedrop3d.mp4
python tools/media.py frames public/videos/threejs/mergedrop3d.mp4
#   → open _originals/frames/mergedrop3d-sheet.jpg, pick the best second
python tools/media.py video public/videos/threejs/mergedrop3d.mp4 mergedrop3d --dir threejs --poster-at 48
python tools/media.py check
```

Then:
1. Look at the poster. Not right → `poster threejs/mergedrop3d --at <other second>`.
2. Re-read the card copy against the new capture: does it still show what the copy claims? Anything
   new on screen? Change copy only to match what is visible.
3. Log it in TODO-FILL.md: size before/after, poster second, where the master is.
4. Commit `feat: swap in the new <Game> capture, compressed`.

### 4.2 Add a project

1. **Media:** `python tools/media.py video <raw path> <kebab-case-name> [--dir threejs] --poster-at <sec>`.
   Web game → `--dir threejs`. Stills-only project → put JPEGs in `public/images/<name>-1.jpg` (~q85, ≤ 1920 wide).
2. **Data:** add the object to the right engine array in [work.js](src/data/work.js)
   (`unityProjects` / `webProjects` / `unrealProjects`), paste the `video:` line the tool printed, pick a `tier`.
3. **Copy:** written from the video, the live build, or what the owner stated. No figure → `metric: null /* FILL: ... */`.
4. New stack entries may belong in `engines[].stack`.
5. Verify: `python tools/media.py check`, then `npm run dev` and look at the card and modal
   (mind the 5/7-card grid rule in section 1).
6. Add a dated TODO-FILL.md entry; commit `feat: add <Project> to the <Engine> section`.

### 4.3 Add or fix a play link (web games)

```js
link: "https://<project>.vercel.app",
linkLabel: "Play in browser",
```

Open it first: it must load **logged out**, and its `<title>` should match the card name (if it
doesn't, flag it in TODO-FILL.md the way MewShoot is flagged).

### 4.4 Reorder, retier, or move between engines

- Reorder: move the object inside its array.
- New lead: move `tier: "lead"` to another object and put it first in the array. One lead per section.
- Change engine: cut the object into the other array. Hybrid projects (Unity + Unreal) are filed by
  the main engineering in their first bullet; record the reasoning in the hybrid-project table in TODO-FILL.md.

### 4.5 Change a Hero engine tile cover

Point `cover` in `engines` ([work.js](src/data/work.js)) at an existing poster. A portrait poster in
a wide tile needs `coverPosition` (e.g. `"center 70%"`) to frame the interesting part.

### 4.6 Metrics

Only with a real measurement from the owner: `metric: { value: "<number>", label: "<machine · conditions>" }`.
Delete the matching `FILL:` comment and strike the TODO-FILL.md entry.

### 4.7 Replace the CV

Drop the PDF in `public/cv/`. A different filename means updating `CV_HREF` in
[Navbar.jsx](src/components/Navbar.jsx) (Contact imports it from there). `check` catches a path that
points at a missing file.

### 4.8 Before pushing

```
python tools/media.py check      # no ERROR
npm run lint
npm run build                    # the static export must build — CI runs exactly this
git status                       # no raw .mp4, no _originals/
```

Pushing `main` deploys.

---

## 5. Handing a job to Claude Code

[CLAUDE.md](CLAUDE.md) loads this file into every session, so a short instruction is enough:

- "I overwrote `public/videos/threejs/mewshoot.mp4` with a new capture — process it as usual."
- "Add a new project from `D:/Captures/tower.mp4`, Unity, feature tier. Details: ..."
- "Run the media check before I push."

Claude runs `tools/media.py`, reads the contact sheet to pick a poster, edits `work.js`, logs
TODO-FILL.md, and commits per section 4.
