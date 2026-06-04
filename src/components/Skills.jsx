"use client";

import { motion } from "framer-motion";

export default function Skills() {
    const categories = [
        {
            title: "Core Tech",
            skills: ["Unreal Engine (C++/BP)", "Unity 3D (C#)", "Rendering Pipelines", "Optimization"]
        },
        {
            title: "Architecture",
            skills: ["AI & Behavior Trees", "State Machines", "Core Game Loops", "Data-Driven Design"]
        },
        {
            title: "Tooling",
            skills: ["Unity Editor Tooling", "LLM Pipeline", "Python Automation", "Workflow Accel"]
        },
        {
            title: "Systems",
            skills: ["Memory Management", "Multi-platform", "Algorithms", "Event-Driven"]
        }
    ];

    return (
        <section id="skills" className="py-32 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="border-t border-stone-800/50 pt-24">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-20 text-stone-100">
                        Capabilities.
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="bg-[#1c1917]/30 border border-stone-800/40 rounded-3xl p-8 hover:bg-[#1c1917]/50 hover:border-stone-700/60 transition-colors"
                            >
                                <h3 className="text-amber-600 text-sm uppercase tracking-widest font-mono mb-8 border-b border-stone-800/50 pb-4">
                                    {category.title}
                                </h3>
                                <ul className="space-y-4">
                                    {category.skills.map(skill => (
                                        <li key={skill} className="text-stone-300 font-light text-sm flex items-center gap-3">
                                            <span className="w-1 h-1 bg-stone-600 rounded-full"></span>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
