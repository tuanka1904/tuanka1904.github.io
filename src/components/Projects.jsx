import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import SystemLog from "./SystemLog";

const projectCategories = [
    {
        categoryTitle: "[ 01 / CORE ENGINEERING & ARCHITECTURE ]",
        projects: [
            {
                title: "UE C++: Modular Combat Framework",
                subtitle: "Unreal Engine 5",
                date: "2024",
                tags: ["[ Unreal Engine ]", "[ Pure C++ ]", "[ System Architecture ]"],
                description: "Engineered a scalable, data-driven combat architecture entirely in C++, focusing on modularity and high performance.",
                fullDescription: "Built a highly resilient core logic framework designed for scalability in complex game environments.",
                bulletPoints: [
                    {
                        title: "Object-Oriented AI Cloning",
                        desc: "Designed an enemy spawning system where AI adversaries inherit directly from the base Player class, sharing core mechanics while executing custom pursuit and attack logic."
                    },
                    {
                        title: "Data-Driven Weaponry",
                        desc: "Implemented a dynamic weapon-swapping system that automatically links and updates Animation Blueprints and state machines based on the equipped item."
                    },
                    {
                        title: "Unified Damage System",
                        desc: "Integrated a robust combat interface supporting both AI combat and environmental destruction (destructible meshes like crates and obstacles)."
                    }
                ],
                role: "Core Engineer",
                timeline: "Personal Prototype",
                video: "/videos/combat-system.mp4"
            },
            {
                title: "Unity C#: Action Top-Down Framework",
                subtitle: "Unity 3D",
                date: "2025",
                tags: ["[ Unity 3D ]", "[ Twin-stick Controller ]", "[ AI State Machines ]"],
                description: "A robust core architecture designed for a fast-paced top-down action shooter, focusing on fluid twin-stick controllers, diverse AI state machines, and dynamic environmental combat events.",
                fullDescription: "A fully developed C# logic core intended for a fast-paced game environment emphasizing controller responsiveness and modular systems.",
                bulletPoints: [
                    {
                        title: "Responsive Twin-Stick Controller",
                        desc: "Developed a fluid player character system featuring mouse-driven directional targeting, dynamic health management, and advanced movement mechanics (e.g., dash/evade execution)."
                    },
                    {
                        title: "Modular AI Behavior & Loot Systems",
                        desc: "Engineered diverse AI state machines, including patrol routines, line-of-sight detection, and pursuit logic (e.g., bat enemies). Implemented a scalable loot generation system triggered upon entity destruction."
                    },
                    {
                        title: "Dynamic Environmental Combat",
                        desc: "Designed complex, event-driven combat interactions and active hazards. This includes linked spawn points that trigger secondary AoE explosions upon enemy defeat (e.g., exploding graves) and static projectile-firing fixtures."
                    }
                ],
                role: "Lead Gameplay Engineer",
                timeline: "Core System Setup",
                video: "/videos/action-rpg.mp4"
            }
        ]
    },
    {
        categoryTitle: "[ 02 / CUSTOM TOOLING & AUTOMATION ]",
        projects: [
            {
                title: "Unity Workflow: Advanced Scene & Workspace Manager",
                subtitle: "Advanced Scene Manager",
                date: "2026",
                tags: ["[ Editor Scripting ]", "[ Workflow Optimization ]", "[ C# ]"],
                description: "A comprehensive custom Editor utility built to eliminate friction in large-scale, multi-scene environments, drastically reducing context-switching overhead and cognitive load for the development team.",
                fullDescription: "Built a highly optimized custom GUI integration natively inside the Unity Editor.",
                bulletPoints: [
                    {
                        title: "Visual Context & Rapid Navigation",
                        desc: "Engineered a quick-switch interface featuring automated visual snapshots (screenshots) and inline contextual notes, allowing developers to instantly identify and transition between complex scenes."
                    },
                    {
                        title: "Workspace State Persistence",
                        desc: "Implemented a robust layout management system enabling users to save, manage, and instantly restore multi-scene hierarchies and custom editor window configurations."
                    },
                    {
                        title: "Live Dependency Tracking",
                        desc: "Integrated a real-time dependency analyzer (\"Despen\") to visualize and validate scene-to-asset relationships, preventing broken references, optimizing project cleanliness, and safeguarding the build pipeline."
                    }
                ],
                role: "Tool Developer",
                timeline: "Ongoing Tooling",
                video: "/videos/scene-manager.mp4"
            },
            {
                title: "AI-Powered Profiler & Automated Remediation",
                subtitle: "Automation Tool",
                date: "2026",
                tags: ["[ Local LLM ]", "[ Automated Remediation ]", "[ C# Tooling ]"],
                description: "An advanced custom Editor utility integrating local Large Language Models to automate technical auditing, provide actionable optimization insights, and execute one-click fixes for asset configurations.",
                fullDescription: "A powerful tool chaining local LLM inference via Ollama directly into Unity to act as an automated technical director and asset validator.",
                bulletPoints: [
                    {
                        title: "Local AI Diagnostics (Ollama)",
                        desc: "Engineered a context-aware scanning system that parses hierarchy and memory data. The local LLM acts as an automated technical director, evaluating scanned metrics to generate actionable, context-specific optimization strategies."
                    },
                    {
                        title: "Automated Asset Remediation",
                        desc: "Evolved the tool beyond passive validation by implementing a one-click auto-fix pipeline. It dynamically corrects misconfigured import settings, texture compressions, and memory bottlenecks based on AI recommendations."
                    },
                    {
                        title: "Granular Profiling Dashboard",
                        desc: "Built a comprehensive interface exposing critical metrics—such as precise VRAM footprints and instance counts—allowing developers to instantly identify and resolve assets that violate the project's performance budgets."
                    }
                ],
                role: "Automation Engineer",
                timeline: "Internal Tool",
                video: "/videos/logic-validator.mp4"
            }
        ]
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-24 border-t border-zinc-900 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Story Transition */}
                <SystemLog logs={[
                    "> SYSTEM.LOG: ACCESSING CLASSIFIED ARTIFACTS...",
                    "> DECRYPTING 2 DIRECTORIES: CORE ENGINEERING, CUSTOM TOOLING."
                ]} />

                <div className="mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
                        Selected Works
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Projects spanning scalable game architectures, optimized systems, and custom editor tooling. Built for high performance, designed to multiply team efficiency.
                    </p>
                </div>

                {projectCategories.map((category, catIdx) => (
                    <div key={catIdx} className="mb-24">
                        <h3 className="font-mono text-orange-400 text-xl font-bold tracking-widest mb-8 pb-4 border-b-2 border-zinc-800">
                            {category.categoryTitle}
                        </h3>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {category.projects.map((p, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    onClick={() => setSelectedProject(p)}
                                    className="group flex flex-col border-2 border-zinc-800 bg-[#121214] rounded-none overflow-hidden cursor-pointer hover:border-orange-500 transition-colors"
                                >
                                    <div className="w-full bg-zinc-900 overflow-hidden relative h-64">
                                        {p.video ? (
                                            <video
                                                src={p.video}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[2px] group-hover:blur-none"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#27272a_1px,_transparent_1px)] bg-[length:16px_16px] opacity-20" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent flex items-end p-6 pointer-events-none">
                                            <span className="font-mono text-xs text-zinc-500 group-hover:text-orange-400 transition-colors bg-zinc-950/50 px-2 py-1 rounded backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.8)]">[ Preview Activated ]</span>
                                        </div>
                                        {/* Simulated scanline effect on hover */}
                                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>

                                    <div className="p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <p className="font-mono text-orange-400 text-sm">{p.subtitle}</p>
                                                <p className="font-mono text-zinc-600 text-xs">{p.date}</p>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">{p.title}</h3>
                                            <p className="text-zinc-400 mb-6 font-light">{p.description}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {p.tags.map(tag => (
                                                <span key={tag} className="font-mono text-xs text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded-none border border-zinc-700/50">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto">
                                            <span className="text-sm font-medium border-b border-transparent group-hover:block transition-all uppercase tracking-widest gap-2 flex items-center text-zinc-500 group-hover:text-white">
                                                Inspect Artifact
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            className="bg-[#121214] border-2 border-zinc-800 w-full max-w-4xl rounded-none overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-10 text-zinc-400 hover:text-white bg-zinc-900/50 p-2 rounded-full backdrop-blur transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden border-b border-zinc-800">
                                {selectedProject.video ? (
                                    <video
                                        src={selectedProject.video}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#27272a_1px,_transparent_1px)] bg-[length:16px_16px] opacity-20" />
                                        <div className="w-16 h-16 border border-orange-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(249,115,22,0.2)]" />
                                    </>
                                )}
                            </div>

                            <div className="p-8 sm:p-12 overflow-y-auto">
                                <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 mb-8">
                                    <div>
                                        <p className="font-mono text-orange-400 text-sm mb-2">{selectedProject.subtitle}</p>
                                        <h2 className="text-3xl sm:text-4xl font-bold text-white">{selectedProject.title}</h2>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="px-4 py-2 border-2 border-zinc-700 bg-zinc-900 font-mono hover:border-orange-500 text-sm font-bold rounded-none text-zinc-300 hover:text-white transition-all">
                                            Expand Logs
                                        </button>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-4 gap-6 mb-8 border-y border-zinc-800/50 py-6">
                                    <div>
                                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-1">Role</p>
                                        <p className="text-sm text-zinc-300">{selectedProject.role}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-1">Timeline</p>
                                        <p className="text-sm text-zinc-300">{selectedProject.timeline}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-1">Stack</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="font-mono text-xs text-zinc-400">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <h3 className="text-xl font-bold text-white mb-4">The Architecture</h3>
                                    <p className="text-zinc-400 leading-relaxed overflow-hidden mb-6">
                                        {selectedProject.fullDescription}
                                    </p>

                                    {selectedProject.bulletPoints && selectedProject.bulletPoints.length > 0 && (
                                        <ul className="space-y-4">
                                            {selectedProject.bulletPoints.map((bullet, idx) => (
                                                <li key={idx} className="flex gap-4">
                                                    <span className="text-orange-500 mt-1">▹</span>
                                                    <div>
                                                        <strong className="text-zinc-200 block font-mono text-sm mb-1">{bullet.title}</strong>
                                                        <p className="text-zinc-400 text-sm leading-relaxed m-0">{bullet.desc}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
