"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { CardMedia, ProjectModal } from "@/components/ProjectMedia";

/*
 * Browser games, all portrait captures — the cards are phone-shaped on purpose.
 * link: FILL with the live build URL once each game is deployed (see TODO-FILL.md).
 * Nothing here claims a number that is not visible on screen in the capture.
 */
const webGames = [
    {
        title: "Hexa Merge",
        subtitle: "Three.js · 3D Hex Puzzle",
        date: "2026",
        tags: ["Three.js", "React Three Fiber", "TypeScript", "WebGL"],
        description: "Level-based hex merge puzzle rendered in real 3D — drop coloured tiles onto the board and fuse matching numbers before the move budget runs out.",
        fullDescription: "A turn-based hex puzzle built on Three.js, where the board is actual 3D geometry rather than a sprite grid. Each level hands the player a fixed move budget and a tray of numbered colour tiles; matching colours placed adjacent fuse into a higher number, and the run is scored against a persisted best.",
        bulletPoints: [
            { title: "Hex Board & Merge Resolution", desc: "A hex-shaped board of hex cells with a three-tile draw tray — placement is validated against occupancy, and matching colours resolve into a combined higher-value tile on drop." },
            { title: "Real 3D Presentation", desc: "Extruded hex prisms lit and shadowed in Three.js, so drops, merges, and clears animate as objects in space instead of swapped sprites — the board reads as depth, not as a flat grid." },
            { title: "Level Economy & Scoring", desc: "Each level runs on a fixed move budget (15) with per-colour tile counters at the top of the HUD, a live score, and a best score carried across sessions." }
        ],
        role: "Solo Developer",
        timeline: "Playable Build",
        video: "/videos/threejs/hexa_threejs.mp4",
        portrait: true
    },
    {
        title: "Merge Drop 3D",
        subtitle: "Three.js · Physics Merge Arcade",
        date: "2026",
        tags: ["Three.js", "React Three Fiber", "Rigid-Body Physics", "TypeScript"],
        description: "Drop-and-merge arcade with real rigid bodies — spheres fall into a glass box, equal tiers fuse into the next one, and the stack has to stay below the danger line.",
        fullDescription: "A drop-and-merge arcade game where the whole board is a physics simulation. Spheres are rigid bodies falling into a transparent container, so every drop resettles the stack instead of snapping to a grid — the failure state is the pile itself rising past the danger line.",
        bulletPoints: [
            { title: "Rigid-Body Stacking", desc: "Spheres simulate as physics bodies inside a glass container — each drop rolls, collides, and resettles the existing pile, so no two runs build the same shape." },
            { title: "Merge & Combo Chain", desc: "Contact between two spheres of the same tier fuses them into the next tier up; chained fusions raise a combo multiplier and spawn floating score popups at the merge point." },
            { title: "Aim Guide, Next Preview & Fail Line", desc: "A dashed guide previews the drop column and the next sphere is shown ahead of time, against a red danger line that ends the run when the stack crosses it — score tracked against a persisted best." }
        ],
        role: "Solo Developer",
        timeline: "Playable Build",
        video: "/videos/threejs/mergedrop3d.mp4",
        portrait: true
    },
    {
        title: "MewShoot",
        subtitle: "WebGL · Survivor Arena",
        date: "2026",
        tags: ["Three.js", "WebGL", "React Three Fiber", "TypeScript"],
        description: "Survivor-style arena run in the browser — an auto-firing hero, enemies closing from every edge, and XP levels stacking on a survival clock.",
        fullDescription: "A survivor-style arena run built for the browser. The player moves, the shooting is automatic, and pressure comes from enemies streaming in from all four edges of the arena while a survival clock, kill count, and growth tier climb together.",
        bulletPoints: [
            { title: "Run Loop & Escalation", desc: "Survival timer, kill counter, and a growth tier drive the difficulty curve — enemies spawn off-screen at the arena edges and converge on the player continuously rather than in discrete waves." },
            { title: "Auto-Combat & Levelling", desc: "The hero fires on its own at nearby targets while the player handles positioning; an XP bar fills into levels several times inside the first minute, feeding the tiered growth track." },
            { title: "Portrait-First HUD", desc: "HP and XP bars, run stats, and a pause control laid out for a phone viewport — the arena is framed vertically so the readable play area survives on a narrow screen." }
        ],
        role: "Solo Developer",
        timeline: "Playable Build",
        video: "/videos/threejs/mewshoot.mp4",
        portrait: true
    },
    {
        title: "CasualShoot",
        subtitle: "WebGL · Wave Defense Shooter",
        date: "2026",
        tags: ["Three.js", "WebGL", "React Three Fiber", "TypeScript"],
        description: "Stage-based defence shooter — hold the wall against advancing enemy waves with arrow volleys, on a shared HP pool and a three-wave stage structure.",
        fullDescription: "A lane defence shooter structured around stages rather than an endless run. Enemies advance down a single vertical lane in formation, the player answers with arrow volleys, and the stage is lost when the wall's shared HP pool is drained.",
        bulletPoints: [
            { title: "Stage & Wave Structure", desc: "Stages break into numbered waves (1/3 onward) against one 1000-point wall HP pool — enemies enter in formation at the top of the lane and push down together." },
            { title: "Volley Combat & Feedback", desc: "Multi-projectile arrow volleys with hit flashes and impact bursts on contact, so a connecting volley reads instantly against a crowded lane." },
            { title: "Demo-Ready HUD", desc: "A speed toggle and pause control sit directly in the HUD alongside the wave counter and HP bar — the build is set up to be shown, not just played." }
        ],
        role: "Solo Developer",
        timeline: "Playable Build",
        video: "/videos/threejs/casualshoot.mp4",
        portrait: true
    }
];

export default function WebGames() {
    const [selectedGame, setSelectedGame] = useState(null);

    // Cards act as buttons, so they need to answer the keyboard like buttons too.
    const openOnKey = useCallback((game) => (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        setSelectedGame(game);
    }, []);

    // Lock page scroll while the detail modal is open
    useEffect(() => {
        document.body.style.overflow = selectedGame ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedGame]);

    return (
        <section id="web-games" className="py-28 bg-[#0c0a09] border-t border-stone-800/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-16 border-b border-stone-800/60 pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-stone-100">
                            Web Games.
                        </h2>
                        <p className="text-sm text-stone-500">Three.js / WebGL &mdash; 2026</p>
                    </div>
                    <p className="text-stone-300 font-light leading-relaxed max-w-2xl mt-6">
                        Four casual games running entirely in the browser &mdash; no install, no engine runtime. Same systems habits as the engine work, moved onto React Three Fiber and a portrait phone viewport: a physics-driven merge board, a 3D hex puzzle, and two arcade shooters.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {webGames.map((game) => (
                        <article
                            key={game.title}
                            role="button"
                            tabIndex={0}
                            aria-label={`${game.title} — view project details`}
                            onClick={() => setSelectedGame(game)}
                            onKeyDown={openOnKey(game)}
                            className="group cursor-pointer flex flex-col bg-[#131110] border border-stone-800/60 hover:border-stone-600 rounded-lg overflow-hidden transition-colors"
                        >
                            <CardMedia project={game} aspect="aspect-[9/16]" />
                            <div className="p-4 lg:p-5 flex flex-col flex-grow">
                                <p className="text-xs text-stone-500 mb-2">{game.subtitle}</p>
                                <h3 className="text-base font-medium text-stone-100 mb-2 leading-snug">{game.title}</h3>
                                <p className="text-stone-300 font-light text-sm mb-5 leading-relaxed">{game.description}</p>

                                <div className="mt-auto pt-4 border-t border-stone-800/60 flex flex-wrap gap-1.5">
                                    {game.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[11px] text-stone-400 border border-stone-800 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {game.link && (
                                    <a
                                        href={game.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
                                    >
                                        {game.linkLabel || "Play in browser"} <ArrowUpRight size={14} />
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedGame && (
                    <ProjectModal project={selectedGame} onClose={() => setSelectedGame(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
