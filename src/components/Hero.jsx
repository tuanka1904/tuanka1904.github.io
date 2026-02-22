import { motion } from "framer-motion";
import AutoTetris from "./AutoTetris";
import SystemLog from "./SystemLog";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="max-w-[400px]">
                            <SystemLog logs={["SYS.ROLE: REAL_TIME_3D_&_GAMEPLAY_ENGINEER"]} />
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.1] mb-6">
                            Engineering Realities.<br />Compiling Logic.<br />
                            <span className="text-zinc-500">Spatial Experiences.</span>
                        </h1>
                        <p className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed">
                            I engineer immersive real-time systems where physical spaces meet digital logic. With 7+ years of experience spanning Unreal Engine, Unity, and interactive hardware, I turn complex technical constraints into seamless, magical interactions.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#projects"
                                className="px-6 py-3 bg-zinc-100 text-zinc-950 font-mono text-sm hover:bg-white font-bold hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-orange-500 rounded-none shadow-[4px_4px_0_0_#FF5A00]"
                            >
                                Initialize Mission
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3 border border-zinc-800 text-zinc-300 font-mono text-sm hover:text-white hover:border-orange-500 transition-all font-bold rounded-none"
                            >
                                View Architecture
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Synthetic Game/AI visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex justify-center md:justify-end"
                >
                    <AutoTetris />
                </motion.div>
            </div>
        </section>
    );
}
