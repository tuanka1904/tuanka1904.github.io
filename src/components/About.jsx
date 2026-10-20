"use client";

export default function About() {
    const facts = [
        { label: "Focus", value: "Gameplay systems, performance, and Editor tooling" },
        { label: "Engines", value: "Unity (C#) primary · Unreal Engine 4/5 (C++/BP) · Three.js (TypeScript)" },
        { label: "Location", value: "Ho Chi Minh City, Vietnam — remote or relocate" },
        { label: "Catfe Studio", value: "My own label — publisher of Quick Scene Switcher (Unity Asset Store) and DoLa Cafe (itch.io)" },
    ];

    return (
        <section id="about" className="pt-24 md:pt-32 pb-16 bg-[#0c0a09] border-t border-stone-800/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start">
                    <div className="md:col-span-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-5">
                            <span className="text-amber-500">04</span>
                            <span className="text-stone-700 mx-3">/</span>
                            About
                        </p>
                        <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-stone-100 leading-none mb-10">
                            How I Work
                        </h2>

                        <dl className="border-t border-stone-800/60">
                            {facts.map((fact) => (
                                <div key={fact.label} className="py-5 border-b border-stone-800/60">
                                    <dt className="text-xs text-stone-500 mb-1.5">{fact.label}</dt>
                                    <dd className="text-stone-200 text-base font-medium leading-snug">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="md:col-span-7 max-w-none md:pt-[76px]">
                        <p className="text-xl md:text-2xl text-stone-200 font-light leading-relaxed mb-8">
                            I build gameplay systems and the tools around them &mdash; Unity (C#) for over eight years, production Unreal (C++/Blueprint) alongside it, and lately casual games that run straight in the browser on Three.js.
                        </p>
                        <p className="text-stone-300 font-light leading-relaxed">
                            I work measure-first: profile, change one thing, profile again. That is how a million GPU agents hold 60 FPS, and how an Editor tool can index 300 scenes without opening one.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
