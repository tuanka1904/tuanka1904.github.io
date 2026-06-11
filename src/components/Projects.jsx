"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

const projectCategories = [
    {
        categoryTitle: "Company Projects",
        projects: [
            {
                title: "Christmas Wonderland Metaverse",
                subtitle: "Virtual Event Platform",
                date: "2021",
                tags: ["Unreal Engine", "Node.js", "Multiplayer", "Optimization"],
                description: "Multiplayer metaverse for PC & Mobile driven by a scalable Node.js backend.",
                fullDescription: "Engineered real-time server architecture for live events and concurrent user synchronization across platforms.",
                bulletPoints: [
                    { title: "Real-time Multiplayer Sync", desc: "Architected a highly scalable Node.js backend supporting shared-world interactivity and live states." },
                    { title: "Mobile Build Pipeline", desc: "Optimized UE mobile builds targeting low-end Android/iOS through aggressive draw-call and memory management." }
                ],
                role: "Core Gameplay & Optimization",
                timeline: "Completed",
                images: ["/images/christmas-1.png", "/images/christmas-2.jpg"]
            },
            {
                title: "CPF: Let the CPF Game On!",
                subtitle: "Educational Mobile App",
                date: "2022",
                tags: ["Unity 3D", "Mobile Optimization", "Publishing"],
                description: "Educational mobile app integrated directly with physical hardware vending machines.",
                fullDescription: "Managed end-to-end telemetry integration, game optimization, and multi-platform publishing for iOS and Android.",
                bulletPoints: [
                    { title: "Core Logic Optimization", desc: "Refactored game logic to ensure stable 60FPS on low-tier mobile devices." },
                    { title: "Telemetry & Pipeline", desc: "Integrated secure authentication and automated the publishing pipeline to major app stores." }
                ],
                role: "Gameplay & Release Engineer",
                timeline: "Completed",
                video: "/videos/cpf-game.mp4"
            },
            {
                title: "Singapore Discovery Center",
                subtitle: "AR & Interactive Exhibits",
                date: "2022",
                tags: ["Unity 3D", "AR", "Shaders"],
                description: "Interactive AR exhibits powered by Unity and custom spatial tracking.",
                fullDescription: "Developed highly visual AR installations leveraging advanced shaders, tracking, and fluid animations.",
                bulletPoints: [
                    { title: "Spatial Tracking", desc: "Engineered robust AR tracking logic for seamless physical-digital blending." },
                    { title: "Custom VFX Pipelines", desc: "Authored complex shaders and custom VFX to drive interactive visual feedback." }
                ],
                role: "Technical Artist / AR Engineer",
                timeline: "Completed",
                video: "/videos/sg-discovery.mp4"
            },
            {
                title: "Vinpearl Digital Aquarium",
                subtitle: "Mixed-Reality Ecosystem",
                date: "2023",
                tags: ["Unreal Engine", "Unity", "Holographic Sync", "BLE"],
                description: "Mixed-reality ecosystem featuring location-aware mapping and holographic synchronization.",
                fullDescription: "Architected a multi-platform installation integrating BLE beacon mapping, AR gameplay, and cross-display hologram sync.",
                bulletPoints: [
                    { title: "Cross-Display Synchronization", desc: "Architected real-time sync logic bridging UE holograms and external projection surfaces." },
                    { title: "AR Spatial Mapping", desc: "Developed custom AR mapping pipelines for dynamic physics interactions on physical structures." }
                ],
                role: "Lead Interactive Engineer",
                timeline: "Completed",
                video: "/videos/vinpearl.mp4",
                images: ["/images/vinpearl-1.png", "/images/vinpearl-2.png"]
            }
        ]
    },
    {
        categoryTitle: "Core Engineering",
        projects: [
            {
                title: "UE C++: Modular Combat Framework",
                subtitle: "Unreal Engine 5",
                date: "2024",
                tags: ["Unreal Engine", "Pure C++", "Architecture"],
                description: "Scalable, data-driven combat architecture entirely in C++.",
                fullDescription: "Built a highly resilient core logic framework designed for scalability in complex game environments.",
                bulletPoints: [
                    { title: "Object-Oriented AI Cloning", desc: "Enemy spawning system sharing core mechanics with custom pursuit logic." },
                    { title: "Data-Driven Weaponry", desc: "Dynamic weapon-swapping linking Animation Blueprints and state machines." },
                    { title: "Unified Damage System", desc: "Robust combat interface supporting AI combat and environmental destruction." }
                ],
                role: "Core Engineer",
                timeline: "Personal Prototype",
                video: "/videos/combat-system.mp4"
            },
            {
                title: "Action Top-Down Framework",
                subtitle: "Unity 3D",
                date: "2025",
                tags: ["Unity 3D", "C#", "AI State Machines"],
                description: "Robust core architecture for a fast-paced action shooter.",
                fullDescription: "A fully developed C# logic core intended for a fast-paced game environment emphasizing controller responsiveness.",
                bulletPoints: [
                    { title: "Responsive Controller", desc: "Fluid character system featuring mouse-driven targeting and advanced movement." },
                    { title: "Modular AI Behavior", desc: "Engineered diverse AI state machines, patrol routines, and pursuit logic." },
                    { title: "Event-Driven Combat", desc: "Complex environmental interactions and active hazards." }
                ],
                role: "Lead Gameplay Engineer",
                timeline: "Core System Setup",
                video: "/videos/action-rpg.mp4"
            },
            {
                title: "UE5: Top-Down Action RPG Framework",
                subtitle: "Unreal Engine 5 Core Systems",
                date: "2026",
                tags: ["Unreal Engine", "C++", "GAS", "Object Pooling"],
                description: "A high-performance top-down action framework leveraging Unreal's Gameplay Ability System (GAS) and advanced memory management.",
                fullDescription: "Engineered a scalable, data-driven core architecture for a top-down action game, focusing heavily on runtime performance and ability modularity using C++ and GAS.",
                bulletPoints: [
                    { title: "Gameplay Ability System", desc: "Designed modular abilities, attributes, and precise gameplay effects for complex combat scenarios." },
                    { title: "Advanced Object Pooling", desc: "Implemented custom C++ object pools for projectiles and FX, completely eliminating garbage collection hitches during intense firefights." },
                    { title: "Data-Driven Enemy AI", desc: "Constructed lightweight AI behavior trees integrated with GAS for scalable, high-density enemy encounters." },
                    { title: "Optimized Top-Down Camera", desc: "Engineered a smooth, customizable camera system with occlusion handling and screen-shake integration." }
                ],
                role: "Core Gameplay Engineer",
                timeline: "Completed",
                video: "/videos/ue5-topdown.mp4"
            }
        ]
    },
    {
        categoryTitle: "Custom Tooling",
        projects: [
            {
                title: "Advanced Workspace Manager",
                subtitle: "Unity Editor Scripting",
                date: "2026",
                tags: ["Editor Scripting", "Workflow", "C#"],
                description: "Custom Editor utility eliminating friction in multi-scene environments.",
                fullDescription: "Built a highly optimized custom GUI integration natively inside the Unity Editor.",
                bulletPoints: [
                    { title: "Rapid Navigation", desc: "Quick-switch interface with automated visual snapshots." },
                    { title: "Workspace Persistence", desc: "Layout management enabling users to save and restore window configurations." },
                    { title: "Live Dependency Tracking", desc: "Real-time dependency analyzer to visualize and validate scene relationships." }
                ],
                role: "Tool Developer",
                timeline: "Ongoing Tooling",
                video: "/videos/scene-manager.mp4"
            },
            {
                title: "AI-Powered Profiler",
                subtitle: "Automated Remediation",
                date: "2026",
                tags: ["Local LLM", "Remediation", "C#"],
                description: "Integrating local LLMs to automate technical auditing and asset fixes.",
                fullDescription: "A powerful tool chaining local LLM inference via Ollama directly into Unity to act as an automated technical director.",
                bulletPoints: [
                    { title: "Local AI Diagnostics", desc: "Context-aware scanning system parsing hierarchy and memory data." },
                    { title: "Automated Remediation", desc: "One-click auto-fix pipeline correcting misconfigured import settings." },
                    { title: "Granular Profiling", desc: "Interface exposing critical metrics like precise VRAM footprints." }
                ],
                role: "Automation Engineer",
                timeline: "Internal Tool",
                video: "/videos/logic-validator.mp4"
            },
            {
                title: "Catfe Vault Inventory (Catfe.InvPro)",
                subtitle: "Unity Editor & Architecture",
                date: "v1.2.0",
                tags: ["Editor Scripting", "C#", "Clean Architecture", "NUnit"],
                description: "Built a highly decoupled, scalable inventory and equipment system with a custom Architect dashboard for streamlined Unity Editor workflows.",
                fullDescription: "Built a highly decoupled, scalable inventory and equipment system with a custom Architect dashboard for streamlined Unity Editor workflows.",
                bulletPoints: [
                    { title: "Inventory Architect Window", desc: "Custom Editor GUI dashboard centralizing data configuration (Items, Loot, UI) for designers." },
                    { title: "Clean Architecture", desc: "Strict separation of C# logic models and UI components, communicating entirely through Interfaces." },
                    { title: "Advanced Core Mechanics", desc: "Implemented robust item pickup, crafting with rollback support, and an equipment system that preserves instance data." },
                    { title: "Reliable Stability", desc: "Maintained system integrity with comprehensive NUnit test suites for all core logic and health systems." }
                ],
                role: "System Designer & Programmer",
                timeline: "Completed (v1.2.0)",
                video: "/videos/catfe-inventory.mp4"
            },
            {
                title: "PolyWorld: Dynamic World Streaming & Runtime Navigation",
                subtitle: "Unity Engine Architecture",
                date: "2026",
                tags: ["Unity 3D", "C#", "Async Optimization", "Architecture"],
                description: "Built a highly optimized, modular framework for seamless infinite chunk streaming and real-time asynchronous background NavMesh baking inside the Unity Engine.",
                fullDescription: "Built a highly optimized, modular framework for seamless infinite chunk streaming and real-time asynchronous background NavMesh baking inside the Unity Engine.",
                bulletPoints: [
                    { title: "Zero-Stutter Infinite Streaming", desc: "Advanced object pooling architecture that recycles environment chunks using active state toggles to prevent garbage collection spikes and main-thread CPU hiccups." },
                    { title: "Asynchronous Background Baking", desc: "Real-time navigation mesh generation running on background worker threads, achieving 12ms average bake times per chunk without blocking game thread execution." },
                    { title: "Interactive Zone Painting", desc: "A specialized Unity Scene View tool allowing level designers to paint area-specific gameplay behaviors, AI spawn rules, and travel costs visually on the grid." },
                    { title: "Observer-Pattern Events", desc: "A decoupled event API (PolyWorldEvents) facilitating clean, modular integrations with custom gameplay controllers and AI behavior scripts." }
                ],
                role: "Core Engineer",
                timeline: "Completed",
                video: "/videos/polyworld-streaming.mp4"
            }
        ]
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-32 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-20 flex flex-col md:flex-row justify-between items-baseline border-b border-stone-800/50 pb-8">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-stone-100">
                        Selected Works.
                    </h2>
                    <a href="https://www.linkedin.com/in/tuanka19" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-amber-500 transition-colors mt-4 md:mt-0 text-sm font-medium flex items-center gap-2">
                        View Full History <ArrowRight size={16} />
                    </a>
                </div>

                <div className="space-y-32">
                    {projectCategories.map((category, catIdx) => (
                        <div key={catIdx}>
                            <h3 className="text-amber-600/80 uppercase tracking-widest text-sm mb-12 font-mono flex items-center gap-4">
                                <span>{category.categoryTitle}</span>
                                <span className="h-px flex-grow bg-stone-800/30"></span>
                            </h3>
                            <div className="grid md:grid-cols-2 gap-10">
                                {category.projects.map((p, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        onClick={() => setSelectedProject(p)}
                                        className="group cursor-pointer flex flex-col bg-[#1c1917]/20 border border-stone-800/40 hover:border-stone-700 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-[#1c1917]/40 hover:shadow-2xl hover:shadow-amber-900/5"
                                    >
                                        <div className="w-full aspect-[16/10] bg-[#1c1917] overflow-hidden relative border-b border-stone-800/40">
                                            {p.video ? (
                                                <video
                                                    src={p.video}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105"
                                                />
                                            ) : p.images && p.images.length > 0 ? (
                                                <img 
                                                    src={p.images[0]} 
                                                    alt={p.title}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#1c1917]" />
                                            )}
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-3 flex justify-between">
                                                <span>{p.subtitle}</span>
                                                <span>{p.date}</span>
                                            </div>
                                            <h4 className="text-2xl font-medium text-stone-100 mb-4 group-hover:text-amber-500 transition-colors">{p.title}</h4>
                                            <p className="text-stone-400 font-light text-sm mb-8 leading-relaxed">{p.description}</p>
                                            
                                            <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-stone-800/30">
                                                {p.tags.map(tag => (
                                                    <span key={tag} className="text-xs text-stone-400 bg-stone-900/50 px-3 py-1.5 rounded-full border border-stone-800/50">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12 bg-[#0c0a09]/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#12100f] w-full max-w-5xl rounded-3xl overflow-hidden relative flex flex-col border border-stone-800/60 shadow-2xl max-h-[95vh]"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-10 text-stone-500 hover:text-amber-500 bg-stone-900/80 backdrop-blur rounded-full p-2 transition-colors border border-stone-800"
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>

                            <div className="overflow-y-auto w-full custom-scrollbar">
                                <div className="w-full bg-[#0c0a09] relative border-b border-stone-800/50 flex flex-col items-center">
                                    {selectedProject.video && (
                                        <div className="aspect-video w-full flex items-center justify-center">
                                            <video
                                                src={selectedProject.video}
                                                controls
                                                autoPlay
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    {selectedProject.images && selectedProject.images.length > 0 && (
                                        <div className="w-full flex flex-col">
                                            {selectedProject.images.map((img, idx) => (
                                                <img key={idx} src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-auto max-h-[80vh] object-contain bg-[#12100f] border-b border-stone-800/30 last:border-0" />
                                            ))}
                                        </div>
                                    )}
                                    {!selectedProject.video && (!selectedProject.images || selectedProject.images.length === 0) && (
                                        <div className="aspect-video w-full" />
                                    )}
                                </div>

                                <div className="p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
                                    <div className="mb-12">
                                        <p className="text-amber-600 font-mono text-sm uppercase tracking-widest mb-3">{selectedProject.subtitle} &mdash; {selectedProject.date}</p>
                                        <h2 className="text-3xl md:text-4xl font-medium text-stone-100">{selectedProject.title}</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-12 mb-12 bg-[#1c1917]/30 p-8 rounded-2xl border border-stone-800/30">
                                        <div>
                                            <h3 className="text-xs text-stone-500 uppercase tracking-widest mb-3 font-mono">Role & Timeline</h3>
                                            <p className="text-base text-stone-200 font-medium mb-1">{selectedProject.role}</p>
                                            <p className="text-stone-400 font-light text-sm">{selectedProject.timeline}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xs text-stone-500 uppercase tracking-widest mb-3 font-mono">Technologies</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tags.map(tag => (
                                                    <span key={tag} className="text-sm text-stone-300 font-medium">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prose prose-invert prose-lg max-w-none">
                                        <p className="text-xl text-stone-300 font-light leading-relaxed mb-10">
                                            {selectedProject.fullDescription}
                                        </p>

                                        {selectedProject.bulletPoints && (
                                            <ul className="space-y-6 list-none pl-0">
                                                {selectedProject.bulletPoints.map((bullet, idx) => (
                                                    <li key={idx} className="flex gap-4">
                                                        <span className="text-amber-600 mt-1.5">•</span>
                                                        <div>
                                                            <strong className="text-stone-200 block text-base font-medium mb-1">{bullet.title}</strong>
                                                            <p className="text-stone-400 font-light text-sm leading-relaxed m-0">{bullet.desc}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
