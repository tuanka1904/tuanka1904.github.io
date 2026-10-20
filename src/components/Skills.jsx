"use client";

export default function Skills() {
    // Every group points at the section holding the work that backs it up.
    const categories = [
        {
            title: "Engines & Platforms",
            skills: ["Unity (C#)", "Unreal Engine 4/5 (C++/Blueprint)", "Three.js · React Three Fiber (TypeScript)", "Mobile, PC, web and AR installations"],
            proof: [{ label: "Vinpearl", href: "#unreal" }, { label: "Web builds", href: "#web" }],
        },
        {
            title: "Gameplay Architecture",
            skills: ["AI, behavior trees & state machines", "Data-driven design (ScriptableObjects / DataAssets)", "Server-authoritative netcode", "NUnit test coverage"],
            proof: [{ label: "Outpost Breach", href: "#unity" }, { label: "Seal of Exorcism", href: "#unreal" }],
        },
        {
            title: "Graphics & Performance",
            skills: ["Compute shaders (HLSL)", "GPU-driven & indirect rendering", "URP Render Graph post-processing", "CPU/GPU profiling, batching & instancing"],
            proof: [{ label: "GPU Fish Ecosystem", href: "#unity" }, { label: "CatfeShader", href: "#unity" }],
        },
        {
            title: "Tooling & Backend",
            skills: ["Unity Editor tooling", "PlayFab & Node.js", "Python automation", "Local LLM pipeline"],
            proof: [{ label: "Quick Scene Switcher", href: "#unity" }, { label: "Christmas Wonderland", href: "#unreal" }],
        },
    ];

    return (
        <section id="skills" className="pt-8 pb-24 md:pb-32 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div>
                    <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-6 flex items-center gap-4">
                        <span className="shrink-0">Capabilities</span>
                        <span className="h-px flex-grow bg-stone-800/60" aria-hidden="true" />
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-800/50 border border-stone-800/50 rounded-lg overflow-hidden">
                        {categories.map((category) => (
                            <div key={category.title} className="bg-[#0f0d0c] p-7 flex flex-col">
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
                                <p className="mt-auto pt-6 text-xs text-stone-500">
                                    See{" "}
                                    {category.proof.map((p, i) => (
                                        <span key={p.label}>
                                            {i > 0 && " · "}
                                            <a href={p.href} className="text-stone-300 hover:text-amber-500 transition-colors">{p.label}</a>
                                        </span>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
