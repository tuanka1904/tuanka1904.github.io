"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center pt-24 bg-[#0c0a09] relative overflow-hidden">
            {/* Subtle warm glow background */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl"
                >
                    <p className="text-amber-600 font-mono text-sm tracking-widest uppercase mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-amber-600/50"></span>
                        Senior Game &amp; Systems Developer &mdash; Unreal &amp; Unity
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-100 leading-[1.05] mb-12">
                        I engineer game systems<br />
                        that hold their frame budget<br />
                        <span className="text-stone-500">&mdash; and the tools that ship them.</span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-20 border-t border-stone-800/60 pt-12">
                        <p className="text-lg text-stone-400 max-w-md leading-relaxed font-light">
                            8+ years on gameplay architecture, performance profiling, and Editor toolchains in Unreal Engine (C++) and Unity (C#) &mdash; shipped on PC, mobile, and AR/MR.
                        </p>

                        <div className="flex flex-col gap-6 justify-start">
                            <a href="#projects" className="group flex items-center gap-4 text-stone-200 hover:text-amber-500 transition-colors w-fit">
                                <span className="text-sm font-medium">Selected Works</span>
                                <span className="h-px w-12 bg-stone-700 group-hover:w-20 group-hover:bg-amber-500 transition-all duration-500"></span>
                            </a>
                            <a href="#about" className="group flex items-center gap-4 text-stone-500 hover:text-stone-200 transition-colors w-fit">
                                <span className="text-sm font-medium">How I Work</span>
                                <span className="h-px w-12 bg-stone-800 group-hover:w-20 group-hover:bg-stone-500 transition-all duration-500"></span>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-stone-800/40">
                        {[
                            { value: "8+", label: "Years Engineering" },
                            { value: "14", label: "Featured Projects" },
                            { value: "UE5 · Unity", label: "C++ / C# Cores" },
                            { value: "PC · Mobile · AR", label: "Shipped Platforms" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl md:text-3xl font-medium text-stone-100 tracking-tight mb-1">{stat.value}</p>
                                <p className="text-xs uppercase tracking-widest text-stone-500 font-mono">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
