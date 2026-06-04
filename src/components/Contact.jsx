"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 bg-[#0c0a09] relative overflow-hidden">
            {/* Subtle warm glow background */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-stone-800/50 pt-24 pb-12"
                >
                    <div className="bg-[#1c1917]/30 border border-stone-800/40 rounded-[3rem] p-12 md:p-20 text-center backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/0 to-amber-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative z-10">
                            <p className="text-amber-600 font-mono text-sm tracking-widest uppercase mb-8 flex items-center justify-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                Available for New Roles
                            </p>

                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-stone-100 leading-tight mb-12">
                                Let&apos;s build <br className="hidden md:block" />
                                <span className="text-stone-500">the core architecture.</span>
                            </h2>

                            <a
                                href="mailto:tuanka1904@gmail.com"
                                className="inline-flex items-center gap-4 bg-stone-200 text-stone-950 px-8 py-4 rounded-full font-medium text-lg hover:bg-amber-500 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Start a Conversation
                                <ArrowUpRight size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
