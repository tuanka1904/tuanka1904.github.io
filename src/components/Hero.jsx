"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center pt-32 pb-24 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl"
                >
                    <p className="text-stone-400 text-sm mb-8">
                        Senior Unity Developer &mdash; Systems, Tooling &amp; Monetization
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-100 leading-[1.05] mb-12">
                        I engineer game systems<br />
                        that hold their frame budget<br />
                        <span className="text-stone-500">&mdash; and the tools that ship them.</span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-20 border-t border-stone-800/60 pt-12">
                        <p className="text-lg text-stone-300 max-w-lg leading-relaxed font-light">
                            8+ years on Unity (C#) &mdash; gameplay systems, performance profiling, Editor toolchains, and the SDK/monetization layer that turns a build into a product. Also ships Unreal (C++/BP). Live on PC, mobile, and AR/MR.
                        </p>

                        <div className="flex flex-col gap-6 justify-start">
                            <a href="#projects" className="group flex items-center gap-4 text-stone-200 hover:text-amber-500 transition-colors w-fit">
                                <span className="text-sm font-medium">Selected Works</span>
                                <span className="h-px w-12 bg-stone-700 group-hover:bg-amber-500 transition-colors"></span>
                            </a>
                            <a href="#about" className="group flex items-center gap-4 text-stone-400 hover:text-stone-100 transition-colors w-fit">
                                <span className="text-sm font-medium">How I Work</span>
                                <span className="h-px w-12 bg-stone-800 group-hover:bg-stone-500 transition-colors"></span>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-stone-800/40">
                        {[
                            { value: "8+", label: "Years shipping games" },
                            /* FILL: replace with a real performance number once measured — see TODO-FILL.md */
                            { value: "1", label: "Tool live on the Unity Asset Store" },
                            { value: "Unity · UE5", label: "C# / C++ · BP" },
                            { value: "PC · Mobile · AR", label: "Shipped platforms" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl md:text-3xl font-medium text-stone-100 tracking-tight mb-1">{stat.value}</p>
                                <p className="text-xs text-stone-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
