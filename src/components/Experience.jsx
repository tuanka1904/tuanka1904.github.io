/*
 * Employment history, straight from the CV (public/cv) — keep the two in step.
 * It sits right under the hero so "8+ years" can be checked before the personal work starts.
 */
const roles = [
    {
        years: "2025 — Now",
        company: "Ripple Interactive",
        role: "Software & Game Developer",
        summary: "Gameplay systems, reusable components and custom Unity Editor tools, plus Three.js browser games — delivered end to end, including Magic Mirror, a photobooth, an endless runner, SMU Voice and SMU Running.",
    },
    {
        years: "2020 — 2025",
        company: "Dreamchasers Interactive",
        role: "Software Engineer",
        summary: "AI navigation, combat, player controls and boss state machines in Unity and Unreal; Unreal multiplayer sync for real-time combat; AR and interactive installations for Vinpearl Phu Quoc, Singapore Discovery Centre, HomeTeam NS and Christmas Wonderland.",
    },
    {
        years: "2017 — 2020",
        company: "FPO",
        role: "Mobile Developer",
        summary: "Cross-platform mobile applications and JavaScript features, balancing delivery speed, stability and performance.",
    },
];

export default function Experience() {
    return (
        <section id="experience" aria-labelledby="experience-heading" className="pb-20 md:pb-24 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <h2 id="experience-heading" className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-6 flex items-center gap-4">
                    <span className="shrink-0">Experience</span>
                    <span className="h-px flex-grow bg-stone-800/60" aria-hidden="true" />
                </h2>

                <ol className="border-t border-stone-800/60">
                    {roles.map((r) => (
                        <li key={r.company} className="py-5 border-b border-stone-800/60 grid md:grid-cols-12 gap-1 md:gap-6 items-baseline">
                            <span className="md:col-span-2 font-mono text-sm text-amber-500/90 whitespace-nowrap">{r.years}</span>
                            <span className="md:col-span-3">
                                <span className="block text-stone-100 font-medium">{r.company}</span>
                                <span className="block text-sm text-stone-400">{r.role}</span>
                            </span>
                            <p className="md:col-span-7 text-sm text-stone-300 font-light leading-relaxed m-0">{r.summary}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
