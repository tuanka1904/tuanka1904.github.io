/*
 * Renders the link-preview card (Open Graph / Twitter) as a 1200x630 PNG.
 * Run it through `python tools/media.py og`, which converts the PNG into public/og.jpg.
 *
 *   node tools/og.mjs <out.png>
 *
 * Copy here must stay in step with the hero and the cards it quotes (src/data/work.js).
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = process.argv[2];
if (!out) {
    console.error("usage: node tools/og.mjs <out.png>");
    process.exit(1);
}

const still = async (path) => `data:image/jpeg;base64,${(await readFile(root + path)).toString("base64")}`;
const still960 = await still("public/posters/rio-arcane-warden.jpg"); // 960x540, scaled to fill the height

const amber = "#f59e0b";
const proof = [
    ["1M agents @ 60 FPS", "GPU Fish Ecosystem"],
    ["86K objects in 7.3 s", "Quick Scene Switcher 2.0"],
    ["4 live builds", "Three.js browser games"],
];

const card = h(
    "div",
    { style: { width: 1200, height: 630, display: "flex", position: "relative", background: "#0c0a09", color: "#e7e5e4", fontFamily: "sans-serif" } },
    h("img", { src: still960, width: 1120, height: 630, style: { position: "absolute", left: 300, top: 0, width: 1120, height: 630 } }),
    h("div", { style: { position: "absolute", left: 0, top: 0, width: 1200, height: 630, display: "flex", backgroundImage: "linear-gradient(90deg, #0c0a09 0%, #0c0a09 34%, rgba(12,10,9,0.82) 56%, rgba(12,10,9,0.15) 100%)" } }),
    h(
        "div",
        { style: { position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 760 } },
        h(
            "div",
            { style: { display: "flex", flexDirection: "column" } },
            h("div", { style: { display: "flex", alignItems: "center", fontSize: 22, letterSpacing: 4, color: "#a8a29e", textTransform: "uppercase" } },
                h("div", { style: { width: 40, height: 2, background: amber, marginRight: 18 } }),
                "Game Developer · Unity · Web · Unreal"),
            h("div", { style: { fontSize: 76, fontWeight: 600, color: "#fafaf9", marginTop: 34, lineHeight: 1 } }, "Kieu Anh Tuan"),
            h("div", { style: { fontSize: 34, color: "#d6d3d1", marginTop: 26, lineHeight: 1.25 } }, "Game systems that hold their frame budget — and the tools that ship them."),
        ),
        h(
            "div",
            { style: { display: "flex", flexDirection: "column" } },
            ...proof.map(([value, label]) =>
                h("div", { key: value, style: { display: "flex", alignItems: "center", fontSize: 24, marginTop: 12 } },
                    h("div", { style: { width: 4, height: 24, background: amber, marginRight: 14 } }),
                    h("span", { style: { color: amber, marginRight: 14 } }, value),
                    h("span", { style: { color: "#a8a29e" } }, label))
            ),
            h("div", { style: { fontSize: 22, color: "#78716c", marginTop: 30 } }, "tuanka1904.github.io"),
        ),
    ),
);

const png = Buffer.from(await new ImageResponse(card, { width: 1200, height: 630 }).arrayBuffer());
await writeFile(out, png);
console.log(`og      ${out}  1200x630  ${(png.length / 1024).toFixed(0)} KB png`);
