"use client";

export default function About() {
    const facts = [
        { label: "Focus", value: "Gameplay systems, performance, and Editor tooling" },
        { label: "Engines", value: "Unity (C#) primary · Unreal Engine 4/5 (C++/BP) · Three.js (TypeScript)" },
        { label: "Location", value: "Ho Chi Minh City, Vietnam — remote or relocate" },
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
                            I am a game developer specializing in scalable game architecture and deep performance work. For over 8 years I have built and profiled systems in Unity (C#), with production Unreal Engine work in C++ and Blueprint alongside it, shipping commercial titles on PC, mobile, and AR/MR &mdash; and, more recently, casual games that run straight in the browser on Three.js.
                        </p>
                        <p className="text-stone-300 font-light leading-relaxed mb-6">
                            My core expertise spans end-to-end gameplay engineering &mdash; data-driven combat and inventory frameworks, AI and state-machine architecture, async streaming systems, and the profiling work that keeps them inside frame budget on low-end hardware. Beyond runtime code, I design custom Editor toolchains, CI/CD publishing pipelines, and AI-augmented profiling workflows that compress iteration cycles across an entire team.
                        </p>
                        <p className="text-stone-300 font-light leading-relaxed">
                            That same systems thinking carries past the game loop into the layer that makes a build a product: third-party SDK integration, ad mediation and IAP wiring, analytics and remote config. A frame budget and an ARPDAU curve are both instrumentation problems &mdash; measure first, then change one thing at a time.
                        </p>

                        <blockquote className="mt-10 border-l-2 border-amber-500 pl-6">
                            <p className="text-stone-200 font-light text-lg leading-relaxed m-0">
                                &ldquo;From profiling draw-call bottlenecks on constrained mobile GPUs, to designing decoupled interface-driven architectures with full NUnit coverage &mdash; I build systems that scale from prototype to production without rewrites.&rdquo;
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
