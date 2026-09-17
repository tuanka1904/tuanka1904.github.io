"use client";

export default function Skills() {
    const categories = [
        {
            title: "Engines",
            skills: ["Unity 3D (C#)", "Unreal Engine 4/5 (C++/BP)", "Three.js · React Three Fiber (TypeScript)", "Profiling & Optimization", "NUnit Test Coverage"]
        },
        {
            title: "Architecture",
            skills: ["AI & Behavior Trees", "State Machines", "Core Game Loops", "Data-Driven Design"]
        },
        {
            title: "Graphics & GPU",
            skills: ["Compute shaders (HLSL)", "GPU-driven & indirect rendering", "URP & shader authoring (ShaderGraph)", "Draw-call batching & GPU instancing"]
        },
        {
            title: "Tooling & Backend",
            skills: ["Editor Tooling", "PlayFab & Node.js", "Python Automation", "Local LLM Pipeline"]
        },
        {
            /* FILL: keep only the lines you have actually shipped — delete the rest (see TODO-FILL.md) */
            title: "Monetization & LiveOps",
            skills: ["Ad mediation (AppLovin MAX / LevelPlay)", "In-app bidding & waterfall tuning", "IAP & game economy design", "Analytics & remote config"]
        },
        {
            title: "Platforms",
            skills: ["Multi-platform (Mobile / PC / Web)", "VR/AR Development", "Swift & Java", "Hardware (Arduino/RPi)"]
        }
    ];

    return (
        <section id="skills" className="pt-8 pb-24 md:pb-32 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div>
                    <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-6 flex items-center gap-4">
                        <span className="shrink-0">Capabilities</span>
                        <span className="h-px flex-grow bg-stone-800/60" aria-hidden="true" />
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800/50 border border-stone-800/50 rounded-lg overflow-hidden">
                        {categories.map((category) => (
                            <div key={category.title} className="bg-[#0f0d0c] p-7">
                                <h3 className="text-stone-100 text-base font-medium mb-5 pb-4 border-b border-stone-800/60">
                                    {category.title}
                                </h3>
                                <ul className="space-y-3">
                                    {category.skills.map(skill => (
                                        <li key={skill} className="text-stone-300 font-light text-sm leading-relaxed">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
