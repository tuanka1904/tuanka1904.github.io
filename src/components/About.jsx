import { motion } from "framer-motion";
import SystemLog from "./SystemLog";

export default function About() {
    return (
        <section id="about" className="py-24 border-t border-zinc-900 bg-[#09090b]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Story Transition */}
                <SystemLog logs={[
                    "> SYSTEM.LOG: ANALYZING ENGINEER PROFILE...",
                    "> DECRYPTING CORE PHILOSOPHY..."
                ]} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-16 items-start"
                >
                    <div>
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-8">
                            The Builder Ethos
                        </h2>
                        <p>
                            I am a Real-time 3D and Gameplay Engineer specializing in high-performance interactive systems. For over 7 years, I have lived at the intersection of game engines (Unreal & Unity) and physical spaces.
                        </p>
                        <p>
                            My technical foundation is built on architecting complex gameplay loops&mdash;from state machines and boss mechanics to scalable combat systems. But my execution goes beyond traditional screens. I have engineered projection mapping games, AR ecosystems, and sensory installations for major venues like the Singapore Discovery Center and Vinpearl Aquarium.
                        </p>
                        <p className="text-zinc-200 mt-8 block border-l-2 border-orange-500 pl-4">
                            &quot;Whether it&apos;s optimizing a massive Niagara VFX scene for 60fps, integrating a PlayFab backend, or wiring an Arduino prototype to communicate with an immersive web app&mdash;I build robust, end-to-end architectures that just work.&quot;
                        </p>
                    </div>

                    <div className="bg-[#121214] border-2 border-zinc-800 rounded-none p-8 lg:p-12 relative overflow-hidden group">
                        <div className="absolute opacity-10 top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

                        <h3 className="text-xl font-medium text-white mb-6">Execution Output</h3>

                        <ul className="space-y-6 font-mono text-sm relative z-10">
                            <li className="flex justify-between items-center border-b border-zinc-900 pb-4">
                                <span className="text-zinc-500">Focus</span>
                                <span className="text-zinc-200 text-right max-w-[200px]">Gameplay Systems, XR Installations, Optimization</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-zinc-900 pb-4">
                                <span className="text-zinc-500">Platforms</span>
                                <span className="text-zinc-200 text-right max-w-[200px]">PC, Console, Mobile, Web, Hardware</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-zinc-900 pb-4">
                                <span className="text-zinc-500">Status</span>
                                <span className="text-emerald-400 flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-500 shadow-[0_0_5px_#10B981]"></span>
                                    </span>
                                    Accepting Contracts
                                </span>
                            </li>
                            <li className="flex justify-between items-center pb-2">
                                <span className="text-zinc-500">Location</span>
                                <span className="text-zinc-200">Remote / Global</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
