/*
 * Every project on the site, grouped by the engine it was built in. The page renders
 * three identical sections from this file — Unity, Web, Unreal — so layout never has
 * to be edited to add, move, or reorder a project.
 *
 * tier (array order inside each tier is the display order):
 *   "lead"    — the one wide card that opens the section
 *   "feature" — large cards directly under the lead
 *   (none)    — the compact grid
 *   "credit"  — one-line rows at the bottom of the section
 *
 * metric: the one measured number a card is allowed to show. Never estimate it —
 * leave it null and list the gap in TODO-FILL.md until a real figure exists.
 */

const unityProjects = [
    {
        title: "Rio: Arcane Warden",
        subtitle: "Arena Survival Prototype",
        date: "2026",
        tier: "lead",
        tags: ["Unity 3D", "C#", "Wave Director", "HLSL / VFX", "Inventory"],
        description: "Wave-based arena survival built on the top-down combat core — a wave director, four-discipline ability kit, grid inventory, and a shader pass that repaints the arena each wave.",
        fullDescription: "A playable arena survival build that takes the top-down combat core further: instead of a sandbox of agents, a wave director drives escalating encounters inside a closed arena, with run progression, a grid inventory, and a per-wave lighting and shader pass carrying the pacing. Personal project, not a shipped title.",
        bulletPoints: [
            { title: "Wave Director & Encounter Escalation", desc: "A wave director sequences the run rather than trickling spawns — 28 enemies in wave 1 up to 61 by wave 3, mixed archetypes placed on ring spawn points away from the player, with a scored intermission between waves that pushes the player out to collect loot before the next one lands." },
            { title: "Four-Discipline Ability Kit", desc: "Mist Step (dash), Arcane Nova, Mirror Image, and Annihilate run on independent cooldown timers surfaced live on the HUD, over an Arcane Bolt primary with a finite ammo pool. A spell-chain multiplier rewards uninterrupted kill streaks, backed by floating damage numbers and hit feedback." },
            { title: "Run Progression & Grid Inventory", desc: "Arcane Ascension levels the player 13 times in a single run — each level grants +2 damage, +6 max HP and added mobility, scaling life essence 120→192 and bolt capacity 24→32. Loot drops stack into a 25-cell Arcane Satchel with pickup toasts, feeding a Grimoire Score that persists a high-rune record across runs." },
            { title: "Arena Presentation & Shader Pass", desc: "Each wave re-grades the arena — amber, to violet, to blood red — through lighting and a fullscreen shader pass, so escalation reads before the wave banner does. Emissive nova bursts, bolt tracers, and dissolve deaths keep dozens of simultaneous enemies legible against the shifting palette." }
        ],
        role: "Solo Gameplay & VFX Engineer",
        timeline: "Playable Build",
        video: "/videos/rio-arcane-warden.mp4",
        metric: { value: "61-enemy waves", label: "3 escalating waves · 13 ascension levels per run" }
    },
    {
        title: "GPU Fish Ecosystem",
        subtitle: "GPU-Driven Simulation & Rendering",
        date: "2026",
        tier: "feature",
        tags: ["Compute Shader", "HLSL", "C#", "URP", "GPU-Driven Rendering"],
        description: "Large-scale fish ecosystem in Unity URP, simulating and rendering up to 2M agents entirely on the GPU with zero game-thread overhead.",
        fullDescription: "A massive-scale fish ecosystem simulation built for Unity URP. The entire simulation and rendering pipeline runs directly on the GPU, sustaining 1M agents at 60 FPS on a mid-range RTX 4060 and scaling to 2M at 45-50 FPS — without GameObjects, MonoBehaviours, or synchronous readbacks on the hot path.",
        bulletPoints: [
            { title: "GPU-Driven Simulation Pipeline", desc: "Runs the entire agent lifecycle — spatial hashing, counting sort, prefix sum, boid steering (separation/alignment/cohesion), and predator/prey behaviors between 3 distinct species — sequentially inside HLSL compute shaders." },
            { title: "Indirect Rendering & Culling", desc: "Performs GPU compaction for frustum culling and Level of Detail (LOD) selection. Renders the entire ecosystem using only 6 indirect draw calls (3 species × 2 LODs), avoiding cheap scale-to-zero vertex shader hacks." },
            { title: "Custom Ecosystem Designer", desc: "A dedicated Unity Editor window enabling live-apply parameter tuning, species configuration, and Vertex Animation Texture (VAT) baking directly in Play Mode, with structural rebuilds grouped into a clear rebuild button." }
        ],
        role: "GPU Engineer & System Architect",
        timeline: "Completed (Demo Ocean)",
        video: "/videos/gpu-ecosystem.mp4",
        metric: { value: "1M agents @ 60 FPS", label: "RTX 4060 · scales to 2M · 6 indirect draw calls" }
    },
    {
        title: "Quick Scene Switcher",
        subtitle: "Published Unity Asset Store Tool",
        date: "2026",
        tier: "feature",
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
        metric: { value: "82 KB", label: "package · zero dependencies · editor-only" }
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
        title: "Action Top-Down Framework",
        subtitle: "Gameplay Core · Personal Project",
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
    },
    {
        title: "PolyWorld: Dynamic World Streaming",
        subtitle: "Engine Architecture",
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
        title: "CatfeShader: Screen Effects for URP",
        subtitle: "Render Graph Post-Processing Pack",
        date: "2026",
        tags: ["Unity 6", "URP", "Render Graph", "HLSL", "Volume System"],
        description: "24 fullscreen post-processing effects for Unity 6 URP — one renderer feature, every effect a Volume override.",
        fullDescription: "A fullscreen post-processing pack built on the Unity 6 Render Graph API and driven entirely through the Volume system. The whole pack installs as a single renderer feature; after that every effect is a Volume override, so quality tiers and per-area looks are just different profiles. Every pattern is generated procedurally in HLSL — no textures, no third-party packages.",
        bulletPoints: [
            { title: "Render Graph Pass Chain", desc: "Effects composite in a fixed order that follows a real image path (distortion → resampling → stylize → colour → overlay → display), with intermediate targets borrowed from the Render Graph pool. Nothing is queued at all while every intensity sits at 0." },
            { title: "Analog Signal Simulation", desc: "CRT and VHS are modelled rather than overlaid: phosphor glow, aperture-grille/slot/shadow masks and interlacing on one side; chroma genuinely resampled at tape bandwidth on an eighth-width buffer, edge-enhance overshoot and head-switch tearing on the other." },
            { title: "Global Masking & Offscreen Chain", desc: "One screen-space and depth-range mask confines every effect at once — keeping a HUD readable or the weapon crisp — and the same stack runs onto a RenderTexture for in-world screens, with buffer-dependent effects skipped and reported." },
            { title: "Runtime API & Editor Tooling", desc: "One-line gameplay hooks (flash, fade, shockwave-from-world-position), covered scene transitions, and a Timeline-animatable driver, backed by an effect browser, a generated demo scene, a validation pass over every shader, and per-edition package export." }
        ],
        role: "Graphics & Tools Engineer",
        timeline: "Completed",
        video: "/videos/shader.mp4",
        metric: { value: "24 effects", label: "16 preset looks · 1 renderer feature · zero textures" }
    },
    {
        title: "Catfe Scene Analyzer Suite",
        subtitle: "Editor Tooling & Diagnostics",
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
        title: "Catfe Vault Inventory (Catfe.InvPro)",
        subtitle: "Editor & Architecture",
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
        title: "Singapore Discovery Center",
        subtitle: "AR Interactive Sandbox",
        date: "2022",
        tier: "credit",
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
        video: "/videos/sg-discovery.mp4"
    },
    {
        title: "CPF: Let the CPF Game On!",
        subtitle: "Educational Mobile Game",
        date: "2022",
        tier: "credit",
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
        ]
    }
];

/*
 * Browser games, all portrait captures — the cards are phone-shaped on purpose.
 * All four are deployed, so every card carries a live link; nothing here claims a
 * number that is not visible on screen in the capture or in the shipped build.
 */
const webProjects = [
    {
        title: "StackPuzzle 3D",
        subtitle: "Hexa Tile Match",
        date: "2026",
        tags: ["Three.js", "React Three Fiber", "TypeScript", "WebGL"],
        description: "Level-based hex tile match rendered in real 3D — drop coloured tiles onto the board and fuse matching numbers before the move budget runs out.",
        fullDescription: "A turn-based hex puzzle built on Three.js, where the board is actual 3D geometry rather than a sprite grid. Each level hands the player a move budget and a tray of numbered colour tiles; matching colours placed adjacent fuse into a higher number, and the run is scored against a persisted best. Deployed and playable in the browser.",
        bulletPoints: [
            { title: "Hex Board & Merge Resolution", desc: "A hex-shaped board of hex cells with a three-tile draw tray — placement is validated against occupancy, and matching colours resolve into a combined higher-value tile on drop." },
            { title: "Real 3D Presentation", desc: "Extruded hex prisms lit and shadowed in Three.js, so drops, merges, and clears animate as objects in space instead of swapped sprites — the board reads as depth, not as a flat grid." },
            { title: "Level Economy & Scoring", desc: "Each level runs on its own move budget with per-colour tile counters at the top of the HUD, a live score, and a best score carried across sessions." }
        ],
        role: "Solo Developer",
        timeline: "Live · playable in browser",
        video: "/videos/threejs/hexa_threejs.mp4",
        portrait: true,
        link: "https://stack-puzzle.vercel.app",
        linkLabel: "Play in browser"
    },
    {
        title: "Merge Drop 3D",
        subtitle: "Physics Merge Arcade",
        date: "2026",
        tags: ["Three.js", "React Three Fiber", "Rigid-Body Physics", "TypeScript"],
        description: "Drop-and-merge arcade with real rigid bodies — spheres fall into a glass box, equal tiers fuse into the next one, and the stack has to stay below the danger line.",
        fullDescription: "A drop-and-merge arcade game where the whole board is a physics simulation. Spheres are rigid bodies falling into a transparent container, so every drop resettles the stack instead of snapping to a grid — the failure state is the pile itself rising past the danger line.",
        bulletPoints: [
            { title: "Rigid-Body Stacking", desc: "Spheres simulate as physics bodies inside a glass container — each drop rolls, collides, and resettles the existing pile, so no two runs build the same shape." },
            { title: "Merge & Combo Chain", desc: "Contact between two spheres of the same tier fuses them into the next tier up; chained fusions raise a combo multiplier and spawn floating score popups at the merge point." },
            { title: "Fever Mode & Tier Discovery", desc: "Fever Mode doubles score for a timed window — opened by a full-screen FEVER! / DOUBLE SCORE banner shown with the current level, then tracked by a ×2 bar counting down under the next-sphere preview. Chained merges get GREAT ×N callouts, and reaching a new sphere tier raises a New Discovery card that names it." },
            { title: "Aim Guide, Next Preview & Fail Line", desc: "A dashed guide previews the drop column and the next sphere is shown ahead of time, against a red danger line that ends the run when the stack crosses it — score, best, and best combo all persist between sessions." },
            { title: "Dual Input & Context-Loss Recovery", desc: "Aim by mouse drag or arrow keys, drop on release or spacebar, pause on Esc — and the build recovers from a browser-reclaimed WebGL context instead of dying on it, with sound quality auto-scaling to the device." }
        ],
        role: "Solo Developer",
        timeline: "Live · playable in browser",
        video: "/videos/threejs/mergedrop3d.mp4",
        portrait: true,
        link: "https://mergedrop3d.vercel.app",
        linkLabel: "Play in browser"
    },
    {
        title: "MewShoot",
        subtitle: "Survivor Arena",
        date: "2026",
        tags: ["Three.js", "WebGL", "React Three Fiber", "TypeScript"],
        description: "Survivor-style arena run in the browser — an auto-firing hero, enemies closing from every edge, and XP levels stacking on a survival clock.",
        fullDescription: "A survivor-style arena run built for the browser. The player moves, the shooting is automatic, and pressure comes from enemies streaming in from all four edges of the arena while a survival clock, kill count, and growth tier climb together.",
        bulletPoints: [
            { title: "Run Loop & Escalation", desc: "Survival timer, kill counter, and a growth tier drive the difficulty curve — enemies spawn off-screen at the arena edges and converge on the player continuously rather than in discrete waves." },
            { title: "Auto-Combat & Levelling", desc: "The hero fires on its own at nearby targets while the player handles positioning; an XP bar fills into levels several times inside the first minute, feeding the tiered growth track." },
            { title: "Portrait-First HUD", desc: "HP and XP bars, run stats, and a pause control laid out for a phone viewport — the arena is framed vertically so the readable play area survives on a narrow screen." }
        ],
        role: "Solo Developer",
        timeline: "Live · playable in browser",
        video: "/videos/threejs/mewshoot.mp4",
        portrait: true,
        link: "https://mewshoot.vercel.app",
        linkLabel: "Play in browser"
    },
    {
        title: "CasualShoot",
        subtitle: "Wave Defense Shooter",
        date: "2026",
        tags: ["Three.js", "WebGL", "React Three Fiber", "TypeScript"],
        description: "Stage-based defence shooter — hold the wall against advancing enemy waves with arrow volleys, on a shared HP pool and a three-wave stage structure.",
        fullDescription: "A lane defence shooter structured around stages rather than an endless run. Enemies advance down a single vertical lane in formation, the player answers with arrow volleys, and the stage is lost when the wall's shared HP pool is drained.",
        bulletPoints: [
            { title: "Stage & Wave Structure", desc: "Stages break into numbered waves (1/3 onward) against one 1000-point wall HP pool — enemies enter in formation at the top of the lane and push down together." },
            { title: "Volley Combat & Feedback", desc: "Multi-projectile arrow volleys with hit flashes and impact bursts on contact, so a connecting volley reads instantly against a crowded lane." },
            { title: "Demo-Ready HUD", desc: "A speed toggle and pause control sit directly in the HUD alongside the wave counter and HP bar — the build is set up to be shown, not just played." }
        ],
        role: "Solo Developer",
        timeline: "Live · playable in browser",
        video: "/videos/threejs/casualshoot.mp4",
        portrait: true,
        link: "https://casualshoot.vercel.app",
        linkLabel: "Play in browser"
    }
];

const unrealProjects = [
    {
        title: "Seal of Exorcism",
        subtitle: "Action Roguelike Game",
        date: "2025",
        tier: "lead",
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
        metric: null /* FILL: entity count / ms per frame / draw calls — see TODO-FILL.md */
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
        metric: null /* FILL: hologram sync error (ms) or concurrent devices — see TODO-FILL.md */
    },
    {
        title: "UE C++: Modular Combat Framework",
        subtitle: "UE5 · Personal Project",
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
        images: ["/images/christmas-1.jpg", "/images/christmas-2.jpg"]
    }
];

/* Section order on the page and in the nav. */
export const engines = [
    {
        id: "unity",
        index: "01",
        name: "Unity",
        role: "Primary engine · C#",
        summary: "My main engine for 8+ years — gameplay systems, GPU-driven rendering, and the Editor tools that make a team faster, one of them live on the Asset Store.",
        stack: ["C#", "URP · Render Graph", "HLSL · Compute", "Editor Scripting", "ScriptableObjects", "NUnit", "AR Foundation"],
        cover: "/posters/rio-arcane-warden.jpg",
        countLabel: "projects",
        projects: unityProjects
    },
    {
        id: "web",
        index: "02",
        name: "Web",
        role: "Three.js · TypeScript",
        summary: "Casual games that run straight in the browser — no install, no engine runtime. Every card below is a live build you can play right now.",
        stack: ["Three.js", "React Three Fiber", "TypeScript", "WebGL", "Rigid-Body Physics"],
        cover: "/posters/threejs/hexa_threejs.jpg",
        coverPosition: "center 70%", // portrait poster in a wide tile — frame the hex board, not the tray
        countLabel: "live builds",
        projects: webProjects
    },
    {
        id: "unreal",
        index: "03",
        name: "Unreal",
        role: "C++ · Blueprint",
        summary: "Production Unreal in C++ and Blueprint — core systems and performance for a roguelike headed to Steam, hologram sync for a live installation, and a mobile-tuned multiplayer world.",
        stack: ["C++", "Blueprint", "Behavior Trees", "DataAssets · Anim BP", "Mobile Optimization"],
        cover: "/posters/ue5-topdown.jpg",
        countLabel: "projects",
        projects: unrealProjects
    }
];
