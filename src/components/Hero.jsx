"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center pt-24 bg-[#0c0a09] relative overflow-hidden">
            {/* Subtle warm glow background */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl"
                >
                    <p className="text-amber-600 font-mono text-sm tracking-widest uppercase mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-amber-600/50"></span>
                        Core Engineer & Tool Developer
                    </p>
                    
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-stone-100 leading-[0.9] mb-12">
                        System.<br />
                        Logic.<br />
                        Architecture.
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-20 border-t border-stone-800/60 pt-12">
                        <p className="text-lg text-stone-400 max-w-md leading-relaxed font-light">
                            I engineer scalable game architectures and automation tools for real-time engines. Focused on data-driven design and workflow multipliers.
                        </p>
                        
                        <div className="flex flex-col gap-6 justify-start">
                            <a href="#projects" className="group flex items-center gap-4 text-stone-200 hover:text-amber-500 transition-colors w-fit">
                                <span className="text-sm font-medium">Selected Works</span>
                                <span className="h-px w-12 bg-stone-700 group-hover:w-20 group-hover:bg-amber-500 transition-all duration-500"></span>
                            </a>
                            <a href="#about" className="group flex items-center gap-4 text-stone-500 hover:text-stone-200 transition-colors w-fit">
                                <span className="text-sm font-medium">The Ethos</span>
                                <span className="h-px w-12 bg-stone-800 group-hover:w-20 group-hover:bg-stone-500 transition-all duration-500"></span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
