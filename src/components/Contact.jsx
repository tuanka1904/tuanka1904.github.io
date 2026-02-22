import { motion } from "framer-motion";
import { Mail, Github, ExternalLink } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 border-t border-zinc-900 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#121214] border-2 border-orange-500/20 rounded-none p-8 lg:p-16 text-center shadow-[8px_8px_0_0_rgba(249,115,22,0.1)]"
                >
                    <div className="mb-8 font-mono text-sm text-zinc-500 uppercase flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse shadow-[0_0_10px_#10B981]"></span>
                        SYSTEM CONNECTION: ESTABLISHED
                    </div>

                    {/* Story Transition */}
                    <div className="mb-12 font-mono text-xs text-orange-500 border-l-2 border-orange-500 pl-4 py-1 opacity-80 uppercase tracking-widest text-left max-w-xl mx-auto">
                        <p>{`> SYSTEM.LOG: READINESS_CHECK_COMPLETE.`}</p>
                        <p className="mt-1">{`> AWAITING NEW DIRECTIVES AND CO-OP PROTOCOLS.`}</p>
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-white">Ready for Assignment</h2>

                    <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
                        Whether you are a studio looking to architect a complex combat system, or an agency needing an interactive installation built from the ground up&mdash;my comms are open.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono">
                        <a
                            href="mailto:hello@example.com"
                            className="w-full sm:w-auto px-8 py-4 bg-zinc-100 text-zinc-950 font-bold hover:bg-orange-500 rounded-none transition-all outline-none focus:ring-2 focus:ring-orange-500 shadow-[4px_4px_0_0_#FF5A00] active:translate-y-1 active:shadow-[0px_0px_0_0_#FF5A00] flex items-center justify-center gap-3"
                        >
                            <Mail size={18} />
                            Start a Dialogue
                        </a>

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-8 py-4 border-2 border-zinc-700 bg-zinc-900 hover:border-orange-500 text-zinc-300 rounded-none transition-all flex items-center justify-center gap-3"
                        >
                            <Github size={18} />
                            Source Code
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
