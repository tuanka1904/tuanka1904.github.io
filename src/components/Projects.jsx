"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { X, ArrowRight, ArrowUpRight, Play } from "lucide-react";

const posterFor = (video) => video.replace("/videos/", "/posters/").replace(".mp4", ".jpg");

/*
 * metric: the one measured number a card is allowed to show. Never estimate it —
 * leave it null and list the gap in TODO-FILL.md until a real figure exists.
 */
const projectCategories = [
    {
        categoryTitle: "Studio Works",
        projects: [
            {
                title: "Seal of Exorcism",
                subtitle: "Action Roguelike Game",
                date: "2025",
                tags: ["Unreal Engine", "C++/BP", "Core Optimization", "Steam"],
                description: "Owned core systems and performance for a high-entity-count action roguelike headed to Steam.",
                fullDescription: "Core technical owner for systems and performance on a fast-paced action roguelike. Built high-performance gameplay systems, kept 500+ concurrent entities within frame budget, and structured framework modules for reuse across projects.",
                bulletPoints: [
                    { title: "Core Gameplay Systems", desc: "High-throughput projectile combat with object pooling, boss mechanics driven by phase-based state machines, and enemy AI on behavior trees with dynamic difficulty scaling." },
                    { title: "System Optimization & Profiling", desc: "Profiled and resolved CPU-bound bottlenecks across gameplay ticks — 500+ concurrent entities sustained via spatial partitioning, LOD cascading, and tick-rate throttling." },
                    { title: "Reusable Framework Modules", desc: "Decoupled, interface-driven C++ modules (damage pipeline, ability slots, status effects) designed for cross-project reuse without source modification." }
                ],
                role: "Core Systems Engineer",
                timeline: "Upcoming Steam Release",
                video: "/videos/ue5-topdown.mp4",
                featured: true,
                metric: null /* FILL: entity count / ms per frame / draw calls — see TODO-FILL.md */
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
                images: ["/images/vinpearl-1.jpg", "/images/vinpearl-2.jpg"],
                featured: true,
                metric: null /* FILL: hologram sync error (ms) or concurrent devices — see TODO-FILL.md */
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
                title: "Christmas Wonderland Metaverse",
                subtitle: "Multiplayer Metaverse Platform",
                date: "2021",
                summary: "Node.js multiplayer backend and UE mobile build optimization for a cross-platform live-events world.",
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
                images: ["/images/christmas-1.jpg", "/images/christmas-2.jpg"],
                earlier: true
            },
            {
                title: "Singapore Discovery Center",
                subtitle: "AR Interactive Sandbox",
                date: "2022",
                summary: "AR sandbox holding sub-centimeter terrain alignment, with custom HLSL environmental VFX.",
                tags: ["Unity 3D", "Unreal", "AR", "Shaders"],
                description: "AR interactive sandbox teaching disaster preparedness through physical terrain and digital overlays.",
                fullDescription: "An AR-based interactive sandbox featuring infrastructure models and educational mini-games focused on disaster preparedness, installed at the Singapore Discovery Centre.",
                bulletPoints: [
                    { title: "Spatial Tracking & AR Pipeline", desc: "Custom AR tracking and spatial mapping pipelines on Unity AR Foundation, holding sub-centimeter alignment between physical sandbox terrain and digital overlays." },
                    { title: "Custom Shader & Material Authoring", desc: "HLSL/ShaderGraph shaders and particle systems render real-time environmental VFX — water, fire, structural damage — driven by user interaction data." }
                ],
                role: "Technical Artist / AR Engineer",
                timeline: "Completed",
                video: "/videos/sg-discovery.mp4",
                earlier: true
            },
            {
                title: "CPF: Let the CPF Game On!",
                subtitle: "Educational Mobile Game",
                date: "2022",
                summary: "Educational mobile title shipped to both app stores with PlayFab telemetry and an automated release pipeline.",
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
                ],
                earlier: true
            }
        ]
    },
    {
        categoryTitle: "Core Engineering",
        note: "Self-directed framework work — personal projects, not shipped titles.",
        projects: [
            {
                title: "UE C++: Modular Combat Framework",
                subtitle: "Unreal Engine 5 · Personal Project",
                date: "2024",
                tags: ["Unreal Engine", "C++", "Architecture"],
                description: "Data-driven combat architecture in C++, built to extend without modifying engine source.",
                fullDescription: "A self-directed core logic framework written in C++, exploring how far a combat architecture can scale without touching engine source. Personal project, not a shipped title.",
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
                subtitle: "Unity 3D · Personal Project",
                date: "2025",
                tags: ["Unity 3D", "C#", "AI State Machines"],
                description: "C# gameplay core for a fast-paced action shooter, built around controller responsiveness.",
                fullDescription: "A self-directed C# logic core for a fast-paced action environment, engineered around input responsiveness and decoupled combat systems.",
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
                badge: "Live on Asset Store",
                featured: true,
                metric: { value: "82 KB", label: "package · zero dependencies · editor-only" }
            },
            {
                title: "GPU Fish Ecosystem",
                subtitle: "GPU-Driven Simulation & Rendering",
                date: "2026",
                tags: ["Compute Shader", "HLSL", "C#", "URP", "GPU-Driven Rendering"],
                description: "Large-scale fish ecosystem in Unity URP, simulating and rendering 200k agents entirely on the GPU with zero game-thread overhead.",
                fullDescription: "A massive-scale fish ecosystem simulation built for Unity URP. The entire simulation and rendering pipeline runs directly on the GPU, achieving high-fidelity interaction for 200k agents without GameObjects, MonoBehaviours, or synchronous readbacks on the hot path.",
                bulletPoints: [
                    { title: "GPU-Driven Simulation Pipeline", desc: "Runs the entire agent lifecycle — spatial hashing, counting sort, prefix sum, boid steering (separation/alignment/cohesion), and predator/prey behaviors between 3 distinct species — sequentially inside HLSL compute shaders." },
                    { title: "Indirect Rendering & Culling", desc: "Performs GPU compaction for frustum culling and Level of Detail (LOD) selection. Renders the entire ecosystem using only 6 indirect draw calls (3 species × 2 LODs), avoiding cheap scale-to-zero vertex shader hacks." },
                    { title: "Custom Ecosystem Designer", desc: "A dedicated Unity Editor window enabling live-apply parameter tuning, species configuration, and Vertex Animation Texture (VAT) baking directly in Play Mode, with structural rebuilds grouped into a clear rebuild button." }
                ],
                role: "GPU Engineer & System Architect",
                timeline: "Completed (Demo Ocean)",
                video: "/videos/gpu-ecosystem.mp4",
                featured: true,
                metric: { value: "200k agents", label: "6 indirect draw calls · 0 game-thread overhead" }
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
                video: "/videos/catfe-analyzer.mp4",
                metric: null /* FILL: draw calls before/after on one real scene — see TODO-FILL.md */
            },
            {
                title: "PolyWorld: Dynamic World Streaming",
                subtitle: "Unity Engine Architecture",
                date: "2026",
                tags: ["Unity 3D", "C#", "Async Optimization", "Architecture"],
                description: "Infinite chunk streaming with async background NavMesh baking — no main-thread stalls.",
                fullDescription: "A modular framework for seamless infinite chunk streaming and asynchronous background NavMesh baking inside Unity — worlds stream and stay navigable without ever blocking the game thread.",
                bulletPoints: [
                    { title: "Zero-Stutter Infinite Streaming", desc: "Object pooling recycles environment chunks via active-state toggles, preventing GC spikes and main-thread CPU hiccups during streaming." },
                    { title: "Asynchronous Background Baking", desc: "NavMesh generation runs on background worker threads — 12ms average bake per chunk with zero game-thread blocking." },
                    { title: "Interactive Zone Painting", desc: "Scene View tool lets level designers paint area-specific gameplay behaviors, AI spawn rules, and travel costs directly onto the grid." },
                    { title: "Observer-Pattern Events", desc: "Decoupled event API (PolyWorldEvents) for clean integration with custom gameplay controllers and AI behavior scripts." }
                ],
                role: "Core Engineer",
                timeline: "Completed",
                video: "/videos/polyworld-streaming.mp4",
                metric: { value: "12 ms", label: "avg NavMesh bake/chunk · 0 main-thread stall" }
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
            }
        ]
    }
];

/* Flagship order is deliberate: Unity-first, publish evidence before in-progress work. */
const FLAGSHIP_ORDER = [
    "Quick Scene Switcher",
    "GPU Fish Ecosystem",
    "Seal of Exorcism",
    "Vinpearl Digital Aquarium"
];

const allProjects = projectCategories.flatMap((category) => category.projects);

const featuredProjects = FLAGSHIP_ORDER.map((title) => allProjects.find((p) => p.title === title)).filter(Boolean);

const earlierCredits = allProjects.filter((p) => p.earlier);

const supportingCategories = projectCategories
    .map((category) => ({
        ...category,
        projects: category.projects.filter((p) => !p.featured && !p.earlier)
    }))
    .filter((category) => category.projects.length > 0);

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

/*
 * The one signature element on this site: a measured number, read like a profiler
 * gauge. Same treatment everywhere it appears — never restyled per card.
 */
function MetricReadout({ metric }) {
    if (!metric) return null;

    return (
        <p className="flex items-baseline gap-2.5 text-sm">
            <span className="w-[3px] h-3.5 bg-amber-500 shrink-0 translate-y-[2px]" aria-hidden="true" />
            <span className="font-mono text-amber-500 tracking-tight">{metric.value}</span>
            <span className="text-stone-400 font-light">{metric.label}</span>
        </p>
    );
}

function CardMedia({ project, aspect }) {
    const mediaClass = "w-full h-full object-cover";

    return (
        <div className={`w-full ${aspect} bg-[#171412] overflow-hidden relative border-b border-stone-800/60`}>
            {project.video ? (
                <>
                    <LazyVideo src={project.video} className={mediaClass} />
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-stone-300 bg-stone-950/75 backdrop-blur px-2.5 py-1 rounded border border-stone-800/60 pointer-events-none group-hover:opacity-0 transition-opacity">
                        <Play size={9} className="fill-current" /> Hover to play
                    </span>
                </>
            ) : project.images && project.images.length > 0 ? (
                <img src={project.images[0]} alt={project.title} loading="lazy" className={mediaClass} />
            ) : (
                <div className="w-full h-full bg-[#171412]" />
            )}
            {project.badge && (
                <span className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] text-amber-400 bg-stone-950/85 backdrop-blur px-2.5 py-1 rounded border border-amber-700/40 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {project.badge}
                </span>
            )}
        </div>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Cards act as buttons, so they need to answer the keyboard like buttons too.
    const openOnKey = useCallback((project) => (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        setSelectedProject(project);
    }, []);

    // Lock page scroll while the detail modal is open
    useEffect(() => {
        document.body.style.overflow = selectedProject ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedProject]);

    return (
        <section id="projects" className="py-28 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-16 border-b border-stone-800/60 pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-stone-100">
                            Selected Works.
                        </h2>
                        <a href="https://www.linkedin.com/in/tuanka19" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-100 transition-colors text-sm font-medium flex items-center gap-2">
                            Full history on LinkedIn <ArrowRight size={15} />
                        </a>
                    </div>
                    <p className="text-stone-300 font-light leading-relaxed max-w-2xl mt-6">
                        Shipped titles, installations, and Editor tools. The common thread is systems that stay fast as they scale, and toolchains that cut a team&apos;s iteration time.
                    </p>
                </div>

                <div className="mb-20">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {featuredProjects.map((p) => (
                            <article
                                key={p.title}
                                role="button"
                                tabIndex={0}
                                aria-label={`${p.title} — view project details`}
                                onClick={() => setSelectedProject(p)}
                                onKeyDown={openOnKey(p)}
                                className="group cursor-pointer flex flex-col bg-[#131110] border border-stone-800/60 hover:border-stone-600 rounded-lg overflow-hidden transition-colors"
                            >
                                <CardMedia project={p} aspect="aspect-video" />
                                <div className="p-6 md:p-7 flex flex-col flex-grow">
                                    <p className="text-xs text-stone-500 mb-3">
                                        {p.subtitle} · {p.date}
                                    </p>
                                    <h3 className="text-xl md:text-2xl font-medium text-stone-100 mb-3 tracking-tight leading-snug">
                                        {p.title}
                                    </h3>
                                    <p className="text-stone-300 font-light text-sm mb-6 leading-relaxed">{p.description}</p>

                                    <div className="mt-auto pt-5 border-t border-stone-800/60 space-y-4">
                                        <MetricReadout metric={p.metric} />
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-xs text-stone-400">
                                                {p.role} <span className="text-stone-600">·</span> {p.timeline}
                                            </p>
                                            {p.link && (
                                                <a
                                                    href={p.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
                                                >
                                                    {p.linkLabel} <ArrowUpRight size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="space-y-16">
                    {supportingCategories.map((category) => (
                        <div key={category.categoryTitle}>
                            <div className="mb-8 pb-4 border-b border-stone-800/60">
                                <h3 className="text-stone-100 text-base font-medium">{category.categoryTitle}</h3>
                                {category.note && (
                                    <p className="text-sm text-stone-500 font-light mt-1.5">{category.note}</p>
                                )}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-5">
                                {category.projects.map((p) => (
                                    <article
                                        key={p.title}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${p.title} — view project details`}
                                        onClick={() => setSelectedProject(p)}
                                        onKeyDown={openOnKey(p)}
                                        className="group cursor-pointer flex flex-col bg-[#131110] border border-stone-800/60 hover:border-stone-600 rounded-lg overflow-hidden transition-colors"
                                    >
                                        <CardMedia project={p} aspect="aspect-[16/10]" />
                                        <div className="p-5 flex flex-col flex-grow">
                                            <p className="text-xs text-stone-500 mb-2">
                                                {p.subtitle} · {p.date}
                                            </p>
                                            <h4 className="text-base font-medium text-stone-100 mb-2 leading-snug">{p.title}</h4>
                                            <p className="text-stone-300 font-light text-sm mb-5 leading-relaxed">{p.description}</p>

                                            <div className="mt-auto pt-4 border-t border-stone-800/60 space-y-3">
                                                <MetricReadout metric={p.metric} />
                                                <div className="flex flex-wrap gap-1.5">
                                                    {p.tags.map(tag => (
                                                        <span key={tag} className="text-[11px] text-stone-400 border border-stone-800 px-2 py-0.5 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))}

                    {earlierCredits.length > 0 && (
                        <div>
                            <div className="mb-2 pb-4 border-b border-stone-800/60">
                                <h3 className="text-stone-100 text-base font-medium">Earlier production credits</h3>
                            </div>
                            <ul>
                                {earlierCredits.map((p) => (
                                    <li key={p.title}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(p)}
                                            className="w-full text-left py-5 border-b border-stone-800/60 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 group hover:bg-stone-900/30 transition-colors px-2 -mx-2"
                                        >
                                            <span className="text-sm text-stone-500 shrink-0 w-12">{p.date}</span>
                                            <span className="text-stone-100 font-medium shrink-0 sm:w-72">{p.title}</span>
                                            <span className="text-sm text-stone-400 font-light leading-relaxed">{p.summary}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12 bg-[#0c0a09]/92 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 12, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#131110] w-full max-w-5xl rounded-xl overflow-hidden relative flex flex-col border border-stone-800 max-h-[95vh]"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                aria-label="Close project details"
                                className="absolute top-5 right-5 z-10 text-stone-400 hover:text-stone-100 bg-stone-950/85 backdrop-blur rounded-md p-2 transition-colors border border-stone-800"
                            >
                                <X size={22} strokeWidth={1.5} />
                            </button>

                            <div className="overflow-y-auto w-full custom-scrollbar">
                                <div className="w-full bg-[#0c0a09] relative border-b border-stone-800/60 flex flex-col items-center">
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
                                                <img key={idx} src={img} alt={`${selectedProject.title} screenshot ${idx + 1}`} loading="lazy" className="w-full h-auto max-h-[80vh] object-contain bg-[#131110] border-b border-stone-800/40 last:border-0" />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 md:p-12 lg:p-14 max-w-4xl mx-auto">
                                    <div className="mb-10">
                                        <p className="text-sm text-stone-500 mb-3">
                                            {selectedProject.subtitle} · {selectedProject.date}
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-medium text-stone-100 tracking-tight mb-5">{selectedProject.title}</h2>
                                        <MetricReadout metric={selectedProject.metric} />
                                        {selectedProject.link && (
                                            <a
                                                href={selectedProject.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-stone-950 bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-md transition-colors"
                                            >
                                                {selectedProject.linkLabel || "View Project"} <ArrowUpRight size={15} />
                                            </a>
                                        )}
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-8 mb-10 py-6 border-y border-stone-800/60">
                                        <div>
                                            <h3 className="text-xs text-stone-500 mb-2">Role &amp; Timeline</h3>
                                            <p className="text-base text-stone-100 font-medium mb-1">{selectedProject.role}</p>
                                            <p className="text-stone-400 font-light text-sm">{selectedProject.timeline}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xs text-stone-500 mb-2">Technologies</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tags.map(tag => (
                                                    <span key={tag} className="text-sm text-stone-200">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-lg text-stone-200 font-light leading-relaxed mb-10">
                                        {selectedProject.fullDescription}
                                    </p>

                                    {selectedProject.bulletPoints && selectedProject.bulletPoints.length > 0 && (
                                        <ul className="space-y-6 list-none pl-0">
                                            {selectedProject.bulletPoints.map((bullet, idx) => (
                                                <li key={idx}>
                                                    <strong className="text-stone-100 block text-base font-medium mb-1.5">{bullet.title}</strong>
                                                    <p className="text-stone-300 font-light text-sm leading-relaxed m-0">{bullet.desc}</p>
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
