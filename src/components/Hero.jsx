"use client";

import { ArrowDownRight } from "lucide-react";
import { engines } from "@/data/work";
import { FrameCorners } from "@/components/ProjectMedia";

const LABEL = "font-mono text-[11px] uppercase tracking-[0.22em]";

const stats = [
    { value: "8+", label: "Years shipping games" },
    /* FILL: replace with a real performance number once measured — see TODO-FILL.md */
    { value: "1", label: "Tool live on the Unity Asset Store" },
    { value: "4", label: "Browser games playable now" },
    { value: "PC · Mobile · AR · Web", label: "Shipped platforms" },
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-24 bg-[#0c0a09]">
            <div className="scene-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                <div className="rise">
                    <p className={`${LABEL} text-stone-400 mb-8 flex flex-wrap items-center gap-x-3 gap-y-2`}>
                        <span className="w-8 h-px bg-amber-500" aria-hidden="true" />
                        <span className="whitespace-nowrap">Game Developer</span>
                        <span className="text-stone-700">/</span>
                        <span className="whitespace-nowrap">Unity · Web · Unreal</span>
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-100 leading-[1.05] max-w-5xl">
                        I engineer game systems<br className="hidden sm:block" /> that hold their frame budget<br />
                        <span className="text-stone-500">&mdash; and the tools that ship them.</span>
                    </h1>

                    <p className="text-lg text-stone-300 max-w-2xl leading-relaxed font-light mt-8">
                        8+ years shipping games &mdash; Unity (C#) as my main engine, production Unreal (C++/Blueprint) alongside it, and casual games that run straight in the browser on Three.js. Gameplay systems, performance profiling, and the Editor tools that speed up a whole team.
                    </p>
                </div>

                <nav aria-label="Jump to engine" className="rise rise-delay grid md:grid-cols-3 gap-4 mt-14 md:mt-16">
                    {engines.map((engine) => (
                        <a
                            key={engine.id}
                            href={`#${engine.id}`}
                            className="group relative overflow-hidden rounded-lg border border-stone-800 hover:border-stone-600 bg-[#131110] min-h-[168px] md:min-h-[230px] p-6 flex flex-col justify-between transition-colors"
                        >
                            <img
                                src={engine.cover}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700"
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/60 to-[#0c0a09]/10" aria-hidden="true" />
                            <FrameCorners />

                            <span className={`relative flex items-center justify-between ${LABEL}`}>
                                <span className="text-amber-500">{engine.index}</span>
                                <span className="text-stone-300">
                                    {String(engine.projects.length).padStart(2, "0")} {engine.countLabel}
                                </span>
                            </span>

                            <span className="relative block">
                                <span className="flex items-end justify-between gap-4">
                                    <span className="text-3xl md:text-4xl font-medium tracking-tight text-stone-100">{engine.name}</span>
                                    <ArrowDownRight size={26} strokeWidth={1.5} className="text-stone-500 group-hover:text-amber-500 transition-colors mb-1" />
                                </span>
                                <span className="block text-sm text-stone-400 mt-1.5">{engine.role}</span>
                            </span>
                        </a>
                    ))}
                </nav>

                <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mt-12 pt-8 border-t border-stone-800/50">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse">
                            <dt className="text-xs text-stone-400">{stat.label}</dt>
                            <dd className="text-xl md:text-2xl font-medium text-stone-100 tracking-tight mb-1">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
