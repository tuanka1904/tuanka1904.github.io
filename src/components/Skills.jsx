import { motion } from "framer-motion";
import SystemLog from "./SystemLog";

export default function Skills() {
    const categories = [
        {
            title: "ENGINES & GRAPHICS",
            skills: ["Unreal Engine (C++/BP)", "Unity 3D (C#)", "Niagara VFX", "Profiling & Optimization"]
        },
        {
            title: "GAMEPLAY ARCHITECTURE",
            skills: ["AI & Behavior Trees", "Combat & Weapon Systems", "Boss Mechanics", "State Machines"]
        },
        {
            title: "IMMERSIVE & HARDWARE",
            skills: ["AR / VR Integration", "Projection Mapping", "Arduino / Raspberry Pi", "Serial/UDP comms"]
        },
        {
            title: "BACKEND & SYSTEMS",
            skills: ["PlayFab Backend", "Node.js / WebGL", "Multi-platform Deployment"]
        }
    ];

    return (
        <section id="skills" className="py-24 border-t border-zinc-900 bg-[#09090b]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Story Transition */}
                <SystemLog logs={[
                    "> SYSTEM.LOG: SCANNING ENGINEERING ARSENAL...",
                    "> STATUS: ALL SYSTEMS NOMINAL. VALID FOR HIGH PERFORMANCE DEPLOYMENT."
                ]} />

                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-16 text-center text-white">
                    The Technical Arsenal
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-[#121214]/50 border-2 border-zinc-800/50 rounded-none p-6 hover:border-orange-500 transition-colors"
                        >
                            <h3 className="font-mono text-cyan-400 text-sm mb-6 pb-4 border-b border-zinc-800">
                                [ {category.title} ]
                            </h3>
                            <ul className="space-y-4">
                                {category.skills.map(skill => (
                                    <li key={skill} className="flex items-center gap-3 text-zinc-300">
                                        <div className="w-2 h-2 bg-orange-500 rounded-none shadow-[2px_2px_0_0_#A1A1AA]" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
