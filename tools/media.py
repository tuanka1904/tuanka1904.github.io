#!/usr/bin/env python3
"""
Portfolio media tool — the ffmpeg steps this site repeats every time a new capture lands.
Rules and the reasoning behind every default live in WORKFLOW.md.

    python tools/media.py video  <raw.mp4> <name> [--dir threejs] [--poster-at 48]
    python tools/media.py poster <name-or-path> --at 48
    python tools/media.py frames <video> [--count 12]
    python tools/media.py probe  <file> [<file> ...]
    python tools/media.py check

Needs ffmpeg + ffprobe on PATH. Standard library only.
"""

import argparse
import datetime
import json
import os
import re
import shutil
import struct
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
VIDEOS = PUBLIC / "videos"
POSTERS = PUBLIC / "posters"
ORIGINALS = ROOT / "_originals"  # gitignored: raw captures and contact sheets, never committed

CRF = 26
MAXRATE = "2600k"
LANDSCAPE_BOX = (1280, 720)
PORTRAIT_BOX = (720, 1280)
MAX_FPS = 30
POSTER_WIDTH = 960  # landscape posters; portrait posters keep the video's own size
WARN_MB = 20
GITHUB_LIMIT_MB = 100


def fail(msg):
    print(f"error: {msg}", file=sys.stderr)
    sys.exit(1)


def require_ffmpeg():
    for tool in ("ffmpeg", "ffprobe"):
        if shutil.which(tool) is None:
            fail(f"{tool} not found on PATH (winget install Gyan.FFmpeg)")


def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-stats", "-y", *map(str, args)], check=True)


def mb(n):
    return f"{n / 1024 / 1024:.2f} MB"


def rel(path):
    try:
        return Path(path).resolve().relative_to(ROOT).as_posix()
    except ValueError:
        return str(path)


def top_level_atoms(path):
    """Names of the top-level MP4 boxes, in file order."""
    names = []
    with open(path, "rb") as f:
        end = os.fstat(f.fileno()).st_size
        pos = 0
        while pos + 8 <= end:
            f.seek(pos)
            size, kind = struct.unpack(">I4s", f.read(8))
            if size == 1:
                size = struct.unpack(">Q", f.read(8))[0]
            elif size == 0:
                size = end - pos
            if size < 8:
                break
            names.append(kind.decode("latin-1"))
            pos += size
    return names


def info(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-print_format", "json", "-show_streams", "-show_format", str(path)],
        capture_output=True, text=True, check=True,
    ).stdout
    data = json.loads(out)
    video = next((s for s in data["streams"] if s["codec_type"] == "video"), None)
    if video is None:
        fail(f"{rel(path)} has no video stream")
    num, den = video.get("r_frame_rate", "0/1").split("/")
    atoms = top_level_atoms(path) if str(path).lower().endswith((".mp4", ".mov", ".m4v")) else []
    return {
        "width": int(video["width"]),
        "height": int(video["height"]),
        "codec": video.get("codec_name"),
        "pix_fmt": video.get("pix_fmt"),
        "fps": float(num) / float(den) if float(den) else 0.0,
        "duration": float(data["format"].get("duration", 0)),
        "size": int(data["format"].get("size", 0)),
        "audio": any(s["codec_type"] == "audio" for s in data["streams"]),
        "faststart": "moov" in atoms and "mdat" in atoms and atoms.index("moov") < atoms.index("mdat"),
    }


def describe(i):
    moov = "moov first" if i["faststart"] else "MOOV AT END"
    audio = "AUDIO" if i["audio"] else "no audio"
    return (f"{i['width']}x{i['height']} {i['codec']}/{i['pix_fmt']} {i['fps']:.0f}fps "
            f"{i['duration']:.1f}s {mb(i['size'])} | {audio} | {moov}")


def poster_path(video):
    """Mirror of posterFor() in src/components/ProjectMedia.jsx: /videos/x.mp4 -> /posters/x.jpg"""
    return POSTERS / Path(video).resolve().relative_to(VIDEOS).with_suffix(".jpg")


def resolve_public_video(arg):
    """Accept a path, a site path (/videos/threejs/x.mp4) or a bare name (threejs/x)."""
    candidates = [Path(arg), PUBLIC / arg.lstrip("/"), VIDEOS / arg, VIDEOS / f"{arg}.mp4"]
    for c in candidates:
        if c.is_file():
            return c.resolve()
    fail(f"no video found for '{arg}' (looked in public/videos)")


def grab_poster(video, at=None):
    i = info(video)
    at = i["duration"] * 0.5 if at is None else at
    at = max(0.0, min(at, i["duration"] - 0.1))
    target = poster_path(video)
    target.parent.mkdir(parents=True, exist_ok=True)
    args = ["-ss", f"{at:.2f}", "-i", video, "-frames:v", "1", "-q:v", "3"]
    if i["width"] > i["height"] and i["width"] > POSTER_WIDTH:
        args += ["-vf", f"scale={POSTER_WIDTH}:-2"]
    ffmpeg(*args, target)
    p = info(target)
    print(f"poster  {rel(target)}  {p['width']}x{p['height']}  {target.stat().st_size // 1024} KB  @ {at:.1f}s")


def cmd_video(a):
    src = Path(a.src).resolve()
    if not src.is_file():
        fail(f"{a.src} not found")
    name = Path(a.name).stem
    out = (VIDEOS / (a.dir or "") / f"{name}.mp4").resolve()
    before = info(src)
    print(f"source  {rel(src)}\n        {describe(before)}")

    # A raw capture must never stay inside public/ — it would get committed or overwrite the
    # compressed file. Move it to _originals/ first so the master is kept locally.
    if PUBLIC in src.parents:
        stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        keep = ORIGINALS / (a.dir or "") / f"{src.stem}-raw-{stamp}{src.suffix}"
        keep.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(src), keep)
        src = keep
        print(f"moved raw capture out of public/ -> {rel(keep)}")

    filters = []
    box_w, box_h = PORTRAIT_BOX if before["height"] > before["width"] else LANDSCAPE_BOX
    if a.height:
        filters.append(f"scale=-2:{a.height}")
    elif before["width"] > box_w or before["height"] > box_h:
        filters.append(f"scale={box_w}:{box_h}:force_original_aspect_ratio=decrease")
    filters.append("scale=trunc(iw/2)*2:trunc(ih/2)*2")  # libx264 yuv420p needs even dimensions
    if before["fps"] > MAX_FPS + 0.5:
        filters.append(f"fps={MAX_FPS}")

    trim_in = ["-ss", a.ss] if a.ss else []
    trim_out = ["-t", a.t] if a.t else []
    out.parent.mkdir(parents=True, exist_ok=True)
    tmp = out.with_name(out.stem + ".encoding.mp4")
    ffmpeg(
        *trim_in, "-i", src, *trim_out,
        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", a.crf,
        "-maxrate", MAXRATE, "-bufsize", "5200k",
        "-pix_fmt", "yuv420p", "-profile:v", "high", "-g", 60,
        "-vf", ",".join(filters),
        "-movflags", "+faststart", tmp,
    )
    os.replace(tmp, out)

    after = info(out)
    print(f"output  {rel(out)}\n        {describe(after)}")
    print(f"        {mb(before['size'])} -> {mb(after['size'])} ({after['size'] / before['size']:.0%})")
    if after["audio"] or not after["faststart"]:
        fail("output still has audio or moov at the end - check the ffmpeg build")
    if after["size"] > WARN_MB * 1024 * 1024:
        print(f"warning: over {WARN_MB} MB - consider --height 540 or --crf 28 (see WORKFLOW.md)")

    grab_poster(out, a.poster_at)
    site = "/" + out.relative_to(PUBLIC).as_posix()
    print(f"\nwork.js:  video: \"{site}\"" + (",\n          portrait: true" if after["height"] > after["width"] else ""))


def cmd_poster(a):
    grab_poster(resolve_public_video(a.video), a.at)


def cmd_frames(a):
    video = Path(a.video)
    if not video.is_file():
        video = resolve_public_video(a.video)
    i = info(video)
    cols = 4
    rows = -(-a.count // cols)
    step = i["duration"] / a.count
    target = ORIGINALS / "frames" / f"{video.stem}-sheet.jpg"
    target.parent.mkdir(parents=True, exist_ok=True)
    ffmpeg(
        "-i", video, "-frames:v", "1", "-q:v", "3",
        "-vf", f"fps=1/{step:.4f},scale=360:-2,tile={cols}x{rows}:padding=4:color=black",
        target,
    )
    print(f"sheet   {rel(target)}  ({cols}x{rows}, left-to-right, top-to-bottom)")
    for n in range(a.count):
        print(f"  #{n + 1:<2} ~{n * step:6.1f}s", end="\n" if (n + 1) % cols == 0 else "")
    print()


def cmd_probe(a):
    for f in a.files:
        print(f"{f}\n  {describe(info(f))}")


def cmd_check(_):
    errors, warnings = [], []

    videos = sorted(VIDEOS.rglob("*.mp4"))
    for v in videos:
        name = rel(v)
        i = info(v)
        if v.name.endswith(".encoding.mp4"):
            errors.append(f"{name}: leftover temp file from an interrupted encode")
        if not i["faststart"]:
            errors.append(f"{name}: moov atom at the end - browser must download the whole file before the first frame")
        if i["codec"] != "h264" or i["pix_fmt"] != "yuv420p":
            errors.append(f"{name}: {i['codec']}/{i['pix_fmt']} - site expects h264/yuv420p")
        if not poster_path(v).is_file():
            errors.append(f"{name}: missing poster {rel(poster_path(v))}")
        if i["audio"]:
            warnings.append(f"{name}: has an audio track (site always plays muted)")
        if i["size"] > WARN_MB * 1024 * 1024:
            warnings.append(f"{name}: {mb(i['size'])}")
        if i["fps"] > MAX_FPS + 0.5:
            warnings.append(f"{name}: {i['fps']:.0f} fps")

    for p in sorted(POSTERS.rglob("*.jpg")):
        if not (VIDEOS / p.relative_to(POSTERS).with_suffix(".mp4")).is_file():
            warnings.append(f"{rel(p)}: poster without a matching video")

    for f in PUBLIC.rglob("*"):
        if f.is_file() and f.stat().st_size > GITHUB_LIMIT_MB * 1024 * 1024:
            errors.append(f"{rel(f)}: {mb(f.stat().st_size)} - GitHub rejects files over {GITHUB_LIMIT_MB} MB")

    ref = re.compile(r"""["'`](/(?:videos|posters|images|cv)/[^"'`]+)["'`]""")
    for src in sorted((ROOT / "src").rglob("*.js*")):
        for n, line in enumerate(src.read_text(encoding="utf-8").splitlines(), 1):
            for path in ref.findall(line):
                if not (PUBLIC / path.lstrip("/")).is_file():
                    errors.append(f"{rel(src)}:{n}: {path} does not exist in public/")

    print(f"checked {len(videos)} videos")
    for w in warnings:
        print(f"  warn   {w}")
    for e in errors:
        print(f"  ERROR  {e}")
    if not warnings and not errors:
        print("  all clean")
    sys.exit(1 if errors else 0)


def main():
    parser = argparse.ArgumentParser(description="Portfolio media tool - see WORKFLOW.md")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("video", help="compress a raw capture into public/videos and cut its poster")
    p.add_argument("src", help="raw capture (may already sit inside public/ - it gets moved to _originals/)")
    p.add_argument("name", help="output file name without extension, e.g. mergedrop3d")
    p.add_argument("--dir", default="", help="subfolder under public/videos, e.g. threejs for web games")
    p.add_argument("--poster-at", type=float, help="poster timestamp in seconds (default: middle of the clip)")
    p.add_argument("--crf", default=str(CRF), help=f"x264 quality, higher = smaller (default {CRF})")
    p.add_argument("--height", type=int, help="force output height, e.g. 540 for dense footage")
    p.add_argument("--ss", help="trim: start time - only when the owner asks for a cut")
    p.add_argument("--t", help="trim: duration - only when the owner asks for a cut")
    p.set_defaults(func=cmd_video)

    p = sub.add_parser("poster", help="re-cut the poster of a video already in public/videos")
    p.add_argument("video", help="e.g. threejs/mergedrop3d or /videos/shader.mp4")
    p.add_argument("--at", type=float, required=True, help="timestamp in seconds")
    p.set_defaults(func=cmd_poster)

    p = sub.add_parser("frames", help="contact sheet of evenly spaced frames, for picking a poster time")
    p.add_argument("video")
    p.add_argument("--count", type=int, default=12)
    p.set_defaults(func=cmd_frames)

    p = sub.add_parser("probe", help="size, resolution, audio and moov position of any video")
    p.add_argument("files", nargs="+")
    p.set_defaults(func=cmd_probe)

    p = sub.add_parser("check", help="audit every video, poster and media path referenced in src/")
    p.set_defaults(func=cmd_check)

    sys.stdout.reconfigure(line_buffering=True)  # keep our lines in order with ffmpeg's
    args = parser.parse_args()
    require_ffmpeg()
    try:
        args.func(args)
    except subprocess.CalledProcessError as e:
        fail(f"{e.cmd[0]} exited with {e.returncode}")


if __name__ == "__main__":
    main()
