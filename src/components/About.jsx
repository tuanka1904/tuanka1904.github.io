"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-32 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start"
                >
                    <div className="md:col-span-5">
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-stone-100 mb-8">
                            The Ethos.
                        </h2>
                        
                        <div className="bg-[#1c1917]/40 border border-stone-800/60 rounded-3xl p-8 backdrop-blur-sm">
                            <ul className="space-y-6 text-sm text-stone-400 font-sans">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-amber-600 mb-1 font-mono">Focus</span>
                                    <span className="text-stone-200 text-base font-medium">Gameplay Mechanics, Modular Systems, Optimization</span>
                                </div>
                                <div className="h-px w-full bg-stone-800/50"></div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-amber-600 mb-1 font-mono">Platforms</span>
                                    <span className="text-stone-200 text-base font-medium">Unreal Engine 4/5 (C++/BP), Unity (C#)</span>
                                </div>
                                <div className="h-px w-full bg-stone-800/50"></div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-amber-600 mb-1 font-mono">Location</span>
                                    <span className="text-stone-200 text-base font-medium">Global</span>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-7 prose prose-invert prose-lg max-w-none pt-4 md:pt-16">
                        <p className="text-2xl text-stone-200 font-light leading-relaxed mb-8">
                            I am a Senior Game & Systems Developer specializing in scalable game architectures and deep performance optimization. For over 8 years, I have architected high-performance systems for Unreal Engine (C++/Blueprints) and Unity (C#).
                        </p>
                        <p className="text-stone-400 font-light leading-relaxed">
                            My technical foundation is built on architecting complex gameplay loops&mdash;from state machines and data-driven mechanics to scalable combat systems. But my execution goes deeper. I engineer custom Editor workflows and AI-powered automation tooling that act as force multipliers for entire development teams.
                        </p>
                        
                        <div className="mt-12 bg-[#1c1917]/20 border-l-2 border-amber-600 pl-6 py-2">
                            <p className="text-stone-300 font-light italic text-lg leading-relaxed m-0">
                                &quot;Whether it&apos;s optimizing complex gameplay abilities for 60fps, designing seamless Unity Editor tools, or integrating LLMs into CI/CD pipelines&mdash;I build robust, scalable architectures that multiply team efficiency.&quot;
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
