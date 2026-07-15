"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { X, ArrowRight, Play } from "lucide-react";

const posterFor = (video) => video.replace("/videos/", "/posters/").replace(".mp4", ".jpg");

const projectCategories = [
    {
        categoryTitle: "Studio Works",
        projects: [
            {
                title: "Seal of Exorcism",
                subtitle: "Action Roguelike Game",
                date: "2025",
                tags: ["Unreal Engine", "C++", "Core Optimization", "Steam"],
                description: "Owned core systems and performance for a high-entity-count action roguelike headed to Steam.",
                fullDescription: "Core technical owner for systems and performance on a fast-paced action roguelike. Built high-performance gameplay systems, kept 500+ concurrent entities within frame budget, and structured framework modules for reuse across projects.",
                bulletPoints: [
                    { title: "Core Gameplay Systems", desc: "High-throughput projectile combat with object pooling, boss mechanics driven by phase-based state machines, and enemy AI on behavior trees with dynamic difficulty scaling." },
                    { title: "System Optimization & Profiling", desc: "Profiled and resolved CPU-bound bottlenecks across gameplay ticks — 500+ concurrent entities sustained via spatial partitioning, LOD cascading, and tick-rate throttling." },
                    { title: "Reusable Framework Modules", desc: "Decoupled, interface-driven C++ modules (damage pipeline, ability slots, status effects) designed for cross-project reuse without source modification." }
                ],
                role: "Core Systems Engineer",
                timeline: "Upcoming Steam Release",
                video: "/videos/ue5-topdown.mp4"
            },
            {
                title: "Mobile Game Framework",
                subtitle: "Casual Mechanics Playground",
                date: "2026",
                tags: ["Unity", "C#", "ScriptableObjects", "Mobile Optimization"],
                description: "Data-driven Unity framework powering two distinct casual game genres from a single modular codebase.",
                fullDescription: "A data-driven Unity framework built for rapid prototyping and deployment of mobile casual game modes. Two distinct genres run on the same codebase, configured entirely through ScriptableObjects — no per-mode rewrites.",
                bulletPoints: [
                    { title: "Multi-Genre Gameplay Modes", desc: "Two prototypes in one codebase: a Roguelite survival arena with auto-orbiting weapon upgrades, and a hyper-casual runner built around mathematical multiplier gates." },
                    { title: "Data-Driven Level Configurator", desc: "ScriptableObject-based architecture defines enemy waves, spawn rules, and dynamic level scaling — designers ship new levels without touching code." },
                    { title: "Performance & Object Pooling", desc: "Custom object pooling for enemies, pickups, and VFX bursts eliminates runtime allocations and GC spikes on low-end mobile hardware." },
                    { title: "Meta-Progression & Mission Systems", desc: "Persistent upgrade shop backed by local save data, plus a polymorphic mission manager supporting Defend, Gather, and Destroy objectives." }
                ],
                role: "Solo Game Developer & Architect",
                timeline: "Completed",
                video: "/videos/mobile-game-framework.mp4"
            },
            {
                title: "Vinpearl Digital Aquarium",
                subtitle: "Mixed-Reality Ecosystem",
                date: "2023",
                tags: ["Unreal Engine", "Unity", "Holographic Sync", "BLE"],
                description: "Mixed-reality installation combining BLE indoor positioning, AR gameplay, and frame-accurate hologram sync.",
                fullDescription: "A multi-platform installation integrating BLE beacon mapping, AR gameplay, and cross-display hologram synchronization for a live aquarium exhibit.",
                bulletPoints: [
                    { title: "Cross-Display Holographic Sync", desc: "Socket-based IPC protocol in UE C++ bridging an internal holographic display with external projection hardware — frame-accurate synchronization for interactive 3D assets." },
                    { title: "AR Spatial Mapping & Physics", desc: "Custom AR spatial mapping in Unity projects and anchors dynamic coral meshes onto pre-built physical structures, with real-time Rigidbody physics for interactive turtle and volcano gameplay." },
                    { title: "Location-Based Gameplay Triggering", desc: "Companion app using BLE RSSI trilateration for indoor positioning, triggering localized AR events and state changes as visitors approach exhibit zones." }
                ],
                role: "Lead Interactive Engineer",
                timeline: "Completed",
                images: ["/images/vinpearl-1.jpg", "/images/vinpearl-2.jpg"]
            },
            {
                title: "Christmas Wonderland Metaverse",
                subtitle: "Multiplayer Metaverse Platform",
                date: "2021",
                tags: ["Unreal Engine", "Node.js", "Multiplayer", "Optimization"],
                description: "Cross-platform multiplayer metaverse with live events, backed by a Node.js real-time server.",
                fullDescription: "Real-time server architecture for live events and concurrent user synchronization across PC and mobile clients.",
                bulletPoints: [
                    { title: "Real-time Multiplayer Sync", desc: "Node.js WebSocket backend handling concurrent user state sync, shared-world RPCs, and live event broadcasting with sub-100ms latency." },
                    { title: "Mobile Build Pipeline", desc: "UE mobile builds tuned for low-end Android/iOS — draw-call batching, texture streaming budgets, LOD tuning, and memory pooling to hold 30 FPS on min-spec hardware." },
                    { title: "Interactive Gameplay Systems", desc: "Login flows, gacha reward systems, and a real-time minimap with dynamic POI tracking." }
                ],
                role: "Core Gameplay & Optimization",
                timeline: "Completed",
                images: ["/images/christmas-1.jpg", "/images/christmas-2.jpg"]
            },
            {
                title: "Singapore Discovery Center",
                subtitle: "AR Interactive Sandbox",
                date: "2022",
                tags: ["Unity 3D", "Unreal", "AR", "Shaders"],
                description: "AR interactive sandbox teaching disaster preparedness through physical terrain and digital overlays.",
                fullDescription: "An AR-based interactive sandbox featuring infrastructure models and educational mini-games focused on disaster preparedness, installed at the Singapore Discovery Centre.",
                bulletPoints: [
                    { title: "Spatial Tracking & AR Pipeline", desc: "Custom AR tracking and spatial mapping pipelines on Unity AR Foundation, holding sub-centimeter alignment between physical sandbox terrain and digital overlays." },
                    { title: "Custom Shader & Material Authoring", desc: "HLSL/ShaderGraph shaders and particle systems render real-time environmental VFX — water, fire, structural damage — driven by user interaction data." }
                ],
                role: "Technical Artist / AR Engineer",
                timeline: "Completed",
                video: "/videos/sg-discovery.mp4"
            },
            {
                title: "HomeTeam NS",
                subtitle: "AR Avatar Fitting System",
                date: "2023",
                tags: ["Unity", "Unreal", "AR", "Skeletal Tracking"],
                description: "AR mirror for real-time virtual uniform fitting driven by skeletal pose tracking.",
                fullDescription: "An AR mirror experience using real-time skeletal pose estimation to map and align virtual uniform meshes onto users as they move.",
                bulletPoints: [
                    { title: "Real-Time Skeletal Binding", desc: "Skeletal pose estimation maps virtual uniform meshes onto dynamic user poses with accurate joint-to-mesh binding." },
                    { title: "Occlusion & Rendering Optimization", desc: "Occlusion handling and depth-sorting shaders keep rendering order correct between the physical user and virtual meshes." }
                ],
                role: "Interactive & AR Engineer",
                timeline: "Completed",
                images: ["/images/hometeam-1.jpg"]
            },
            {
                title: "CPF: Let the CPF Game On!",
                subtitle: "Educational Mobile Game",
                date: "2022",
                tags: ["Unity 3D", "Mobile Optimization", "Publishing"],
                description: "Educational mobile game shipped to both app stores, integrated with physical vending-machine hardware.",
                fullDescription: "Owned telemetry integration, performance, and multi-platform publishing end-to-end — from PlayFab backend wiring to App Store and Google Play release.",
                bulletPoints: [
                    { title: "Core Logic Optimization", desc: "Profiled and refactored core game loops, cutting per-frame allocation overhead to hold a stable 60 FPS on low-tier Android and iOS devices." },
                    { title: "Telemetry & CI/CD Pipeline", desc: "PlayFab authentication, player data persistence, and cloud analytics, with an automated build-to-store pipeline for both Apple App Store and Google Play." }
                ],
                role: "Gameplay & Release Engineer",
                timeline: "Completed",
                images: [
                    "/images/cpf-1.png",
                    "/images/cpf-2.png",
                    "/images/cpf-3.png",
                    "/images/cpf-4.png"
                ]
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
                description: "Data-driven combat architecture written entirely in C++, designed to scale without engine-source changes.",
                fullDescription: "A resilient core logic framework in pure C++, designed for scalability in complex game environments without touching engine source.",
                bulletPoints: [
                    { title: "Object-Oriented AI Architecture", desc: "Polymorphic enemy spawning with shared base combat logic and specialized pursuit/aggro state machines driven by Behavior Trees." },
                    { title: "Data-Driven Weapon Pipeline", desc: "DataAsset-driven weapon system with hot-swappable stat profiles linked to Animation Blueprints and Anim Notify-driven state transitions." },
                    { title: "Unified Damage Interface", desc: "Decoupled IDamageable interface supports AI combat, environmental destruction, and projectiles through a single polymorphic dispatch." }
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
                description: "C# gameplay core for a fast-paced action shooter, built around controller responsiveness.",
                fullDescription: "A fully developed C# logic core for a fast-paced action environment, engineered around input responsiveness and decoupled combat systems.",
                bulletPoints: [
                    { title: "Responsive Controller", desc: "Fluid character controller with mouse-driven aiming, root motion blending, dodge i-frames, and input buffering for responsive combat feel." },
                    { title: "Modular AI Behavior", desc: "Pluggable AI state machines with configurable patrol graphs, aggro radius detection, and weighted pursuit logic supporting 50+ concurrent agents." },
                    { title: "Event-Driven Combat", desc: "Observer-pattern event bus decouples combat interactions, environmental hazard triggers, and feedback systems (hit-stop, screen-shake)." }
                ],
                role: "Lead Gameplay Engineer",
                timeline: "Core System Setup",
                video: "/videos/action-rpg.mp4"
            }
        ]
    },
    {
        categoryTitle: "Custom Tooling",
        projects: [
            {
                title: "Quick Scene Switcher",
                subtitle: "Published Unity Asset Store Tool",
                date: "2026",
                tags: ["Editor Scripting", "C#", "Asset Store", "Workflow"],
                description: "Commercial scene-workflow tool shipped on the Unity Asset Store under Catfe Studio — from code to store listing, end to end.",
                fullDescription: "A scene-management productivity tool designed, built, and published to the Unity Asset Store as a commercial product under the Catfe Studio publisher account. Compatible with Built-in, URP, and HDRP across Unity 2022.3+, and shipped through Unity's full submission review pipeline.",
                bulletPoints: [
                    { title: "Live Commercial Release", desc: "Passed Unity Asset Store review and released as a paid Extension Asset — versioned, documented, and supported as a real product, not a portfolio prototype." },
                    { title: "Rapid Scene Navigation", desc: "Quick-switch interface with automated visual snapshots of each scene, cutting the constant open-scene friction of multi-scene projects." },
                    { title: "Workspace Persistence", desc: "Saves and restores window layouts and scene sets per task, so context-switching between features costs seconds instead of minutes." },
                    { title: "Lightweight, Zero-Dependency Design", desc: "Entire tool ships in a ~82 KB package with no third-party dependencies — editor-only code that adds nothing to player builds." }
                ],
                role: "Publisher & Tool Developer",
                timeline: "Live on Asset Store (v1.0)",
                video: "/videos/scene-manager.mp4",
                link: "https://assetstore.unity.com/packages/tools/utilities/quick-scene-switcher-384534",
                linkLabel: "View on Asset Store",
                badge: "Asset Store"
            },
            {
                title: "GPU Fish Ecosystem",
                subtitle: "GPU-Driven Simulation & Rendering",
                date: "2026",
                tags: ["Compute Shader", "HLSL", "C#", "URP", "GPU-Driven Rendering"],
                description: "Large-scale fish ecosystem in Unity URP, simulating and rendering 950,050 agents entirely on the GPU with zero game-thread overhead.",
                fullDescription: "A massive-scale fish ecosystem simulation built for Unity URP. The entire simulation and rendering pipeline runs directly on the GPU, achieving high-fidelity interaction for 950,050 agents without GameObjects, MonoBehaviours, or synchronous readbacks on the hot path.",
                bulletPoints: [
                    { title: "GPU-Driven Simulation Pipeline", desc: "Runs the entire agent lifecycle — spatial hashing, counting sort, prefix sum, boid steering (separation/alignment/cohesion), and predator/prey behaviors between 3 distinct species — sequentially inside HLSL compute shaders." },
                    { title: "Indirect Rendering & Culling", desc: "Performs GPU compaction for frustum culling and Level of Detail (LOD) selection. Renders the entire ecosystem using only 6 indirect draw calls (3 species × 2 LODs), avoiding cheap scale-to-zero vertex shader hacks." },
                    { title: "Custom Ecosystem Designer", desc: "A dedicated Unity Editor window enabling live-apply parameter tuning, species configuration, and Vertex Animation Texture (VAT) baking directly in Play Mode, with structural rebuilds grouped into a clear rebuild button." }
                ],
                role: "GPU Engineer & System Architect",
                timeline: "Completed (Demo Ocean)",
                video: "/videos/gpu-ecosystem.mp4"
            },
            {
                title: "Catfe Scene Analyzer Suite",
                subtitle: "Unity Editor Tooling & Diagnostics",
                date: "2026",
                tags: ["Unity 3D", "C#", "Editor Scripting", "Optimization"],
                description: "Real-time rendering diagnostics and one-click draw-call optimization, built directly into the Unity Editor.",
                fullDescription: "A rendering diagnostic and draw-call optimization suite inside the Unity Editor — it detects bottlenecks in real time and automates scene performance profiling for the whole team.",
                bulletPoints: [
                    { title: "Heuristic Risk Profiling Engine", desc: "Real-time scanning evaluates scene renderers against weighted performance costs — detecting multi-material splitting, missing static flags, uninstanced meshes, and redundant shadow casters." },
                    { title: "Interactive 3D Heatmap & HUD", desc: "Custom scene-view overlays and diagnostic badges with frustum culling, distance throttling, and screen-space anti-collision to stay readable in dense scenes." },
                    { title: "1-Click Automated Batching", desc: "Automated remediation groups fragmented materials and meshes for GPU Instancing and Static Batching — hundreds of draw calls saved per scene, with full Undo/Redo safety." },
                    { title: "KPI Audit Reporting", desc: "Executive dashboard of scene performance metrics plus an automated generator that exports markdown audit reports for team review." }
                ],
                role: "Tooling & Performance Engineer",
                timeline: "Completed",
                video: "/videos/catfe-analyzer.mp4"
            },
            {
                title: "PolyWorld: Dynamic World Streaming",
                subtitle: "Unity Engine Architecture",
                date: "2026",
                tags: ["Unity 3D", "C#", "Async Optimization", "Architecture"],
                description: "Infinite chunk streaming with async background NavMesh baking — 12ms average bake per chunk, zero main-thread stalls.",
                fullDescription: "A modular framework for seamless infinite chunk streaming and asynchronous background NavMesh baking inside Unity — worlds stream and stay navigable without ever blocking the game thread.",
                bulletPoints: [
                    { title: "Zero-Stutter Infinite Streaming", desc: "Object pooling recycles environment chunks via active-state toggles, preventing GC spikes and main-thread CPU hiccups during streaming." },
                    { title: "Asynchronous Background Baking", desc: "NavMesh generation runs on background worker threads — 12ms average bake per chunk with zero game-thread blocking." },
                    { title: "Interactive Zone Painting", desc: "Scene View tool lets level designers paint area-specific gameplay behaviors, AI spawn rules, and travel costs directly onto the grid." },
                    { title: "Observer-Pattern Events", desc: "Decoupled event API (PolyWorldEvents) for clean integration with custom gameplay controllers and AI behavior scripts." }
                ],
                role: "Core Engineer",
                timeline: "Completed",
                video: "/videos/polyworld-streaming.mp4"
            },
            {
                title: "AI-Powered Profiler",
                subtitle: "Automated Remediation",
                date: "2026",
                tags: ["Local LLM", "Remediation", "C#"],
                description: "Local LLM inference wired into Unity to automate technical audits and asset fixes.",
                fullDescription: "Chains local LLM inference (via Ollama) directly into the Unity Editor to act as an automated technical director — scanning, diagnosing, and fixing asset issues without cloud dependencies.",
                bulletPoints: [
                    { title: "Local AI Diagnostics", desc: "Context-aware scanning parses hierarchy and memory data for analysis — fully offline, no cloud round-trips." },
                    { title: "Automated Remediation", desc: "One-click auto-fix pipeline corrects misconfigured import settings." },
                    { title: "Granular Profiling", desc: "Exposes precise per-asset metrics such as exact VRAM footprints." }
                ],
                role: "Automation Engineer",
                timeline: "Internal Tool",
                video: "/videos/logic-validator.mp4"
            },
            {
                title: "Catfe Vault Inventory (Catfe.InvPro)",
                subtitle: "Unity Editor & Architecture",
                date: "2026",
                tags: ["Editor Scripting", "C#", "Clean Architecture", "NUnit"],
                description: "Decoupled inventory and equipment system with a custom Architect dashboard and full NUnit coverage on core logic.",
                fullDescription: "A decoupled, scalable inventory and equipment system with a custom Architect dashboard that streamlines designer workflows inside the Unity Editor.",
                bulletPoints: [
                    { title: "Inventory Architect Window", desc: "Custom Editor dashboard centralizing data configuration — Items, Loot, UI — in one place for designers." },
                    { title: "Clean Architecture", desc: "Strict separation of C# logic models and UI components, communicating entirely through interfaces." },
                    { title: "Advanced Core Mechanics", desc: "Item pickup, crafting with rollback support, and an equipment system that preserves instance data." },
                    { title: "Test Coverage", desc: "Comprehensive NUnit test suites over all core logic and health systems keep refactors safe." }
                ],
                role: "System Designer & Programmer",
                timeline: "Completed (v1.2.0)",
                video: "/videos/catfe-inventory.mp4"
            }
        ]
    }
];

function LazyVideo({ src, className }) {
    const videoRef = useRef(null);
    const loadedRef = useRef(false);

    const ensureLoaded = useCallback(() => {
        const video = videoRef.current;
        if (!video || loadedRef.current) return;
        video.src = src;
        loadedRef.current = true;
    }, [src]);

    const handleMouseEnter = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        ensureLoaded();
        video.play().catch(() => {});
    }, [ensureLoaded]);

    const handleMouseLeave = useCallback(() => {
        videoRef.current?.pause();
    }, []);

    return (
        <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={posterFor(src)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}
        />
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Lock page scroll while the detail modal is open
    useEffect(() => {
        document.body.style.overflow = selectedProject ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedProject]);

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

                <div className="space-y-24">
                    {projectCategories.map((category, catIdx) => (
                        <div key={catIdx}>
                            <h3 className="text-amber-600/80 uppercase tracking-widest text-sm mb-10 font-mono flex items-center gap-4">
                                <span>{category.categoryTitle}</span>
                                <span className="h-px flex-grow bg-stone-800/30"></span>
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.projects.map((p, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
                                        onClick={() => setSelectedProject(p)}
                                        className="group cursor-pointer flex flex-col bg-[#1c1917]/20 border border-stone-800/40 hover:border-stone-700 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-[#1c1917]/40 hover:shadow-2xl hover:shadow-amber-900/5"
                                    >
                                        <div className="w-full aspect-[16/10] bg-[#1c1917] overflow-hidden relative border-b border-stone-800/40">
                                            {p.video ? (
                                                <>
                                                    <LazyVideo
                                                        src={p.video}
                                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono text-stone-300 bg-stone-950/70 backdrop-blur px-2.5 py-1 rounded-full border border-stone-800/60 pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity duration-500">
                                                        <Play size={10} className="fill-current" /> Demo
                                                    </div>
                                                </>
                                            ) : p.images && p.images.length > 0 ? (
                                                <img
                                                    src={p.images[0]}
                                                    alt={p.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#1c1917]" />
                                            )}
                                            {p.badge && (
                                                <div className="absolute top-3 left-3 text-[9px] uppercase tracking-widest font-mono text-amber-400 bg-stone-950/80 backdrop-blur px-2.5 py-1 rounded-full border border-amber-700/40 pointer-events-none">
                                                    {p.badge}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="text-stone-500 font-mono text-[10px] uppercase tracking-widest mb-2 flex justify-between gap-2">
                                                <span className="truncate">{p.subtitle}</span>
                                                <span className="shrink-0">{p.date}</span>
                                            </div>
                                            <h4 className="text-lg font-medium text-stone-100 mb-2 group-hover:text-amber-500 transition-colors leading-snug">{p.title}</h4>
                                            <p className="text-stone-400 font-light text-[13px] mb-5 leading-relaxed line-clamp-3">{p.description}</p>

                                            <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-stone-800/30">
                                                {p.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-[10px] text-stone-400 bg-stone-900/50 px-2.5 py-1 rounded-full border border-stone-800/50">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {p.tags.length > 3 && (
                                                    <span className="text-[10px] text-stone-500 px-1.5 py-1">+{p.tags.length - 3}</span>
                                                )}
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
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12 bg-[#0c0a09]/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#12100f] w-full max-w-5xl rounded-3xl overflow-hidden relative flex flex-col border border-stone-800/60 shadow-2xl max-h-[95vh]"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                aria-label="Close project details"
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
                                                poster={posterFor(selectedProject.video)}
                                                controls
                                                autoPlay
                                                muted
                                                playsInline
                                                preload="metadata"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    {selectedProject.images && selectedProject.images.length > 0 && (
                                        <div className="w-full flex flex-col">
                                            {selectedProject.images.map((img, idx) => (
                                                <img key={idx} src={img} alt={`${selectedProject.title} screenshot ${idx + 1}`} loading="lazy" className="w-full h-auto max-h-[80vh] object-contain bg-[#12100f] border-b border-stone-800/30 last:border-0" />
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
                                        {selectedProject.link && (
                                            <a
                                                href={selectedProject.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-amber-500 hover:text-amber-400 border border-amber-700/40 hover:border-amber-600/60 bg-amber-950/20 px-4 py-2 rounded-full transition-colors"
                                            >
                                                {selectedProject.linkLabel || "View Project"} <ArrowRight size={14} />
                                            </a>
                                        )}
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
