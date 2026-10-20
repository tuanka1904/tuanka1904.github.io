/*
 * Every project on the site, grouped by the engine it was built in. The page renders
 * three identical sections from this file — Unity, Web, Unreal — so layout never has
 * to be edited to add, move, or reorder a project.
 *
 * tier (array order inside each tier is the display order):
 *   "lead"    — the one wide card that opens the section
 *   "feature" — large cards directly under the lead
 *   (none)    — the compact grid
 *   "credit"  — one-line rows for client / studio work, under the cards
 *   "archive" — one-line rows for personal and R&D work, at the bottom of the section
 *
 * "credit" and "archive" rows need a one-line `summary`; they still open the full modal.
 * Keep the cards (lead + feature + grid) to the work that carries proof — a link, a
 * measured number, or a capture that shows the claim.
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
        title: "Outpost Breach",
        subtitle: "Third-Person Horde Survival Shooter",
        date: "2026",
        tier: "feature",
        tags: ["Unity 6", "C#", "Netcode for GameObjects", "URP · Render Graph", "Squad AI"],
        description: "Three-wave horde survival with server-authoritative squad AI, NavMesh-free attack drones, and a full loot-craft-upgrade loop — built on two of my own Unity packages.",
        fullDescription: "A third-person horde-survival shooter in Unity 6 on URP and Netcode for GameObjects. A squad holds a fortified arena across three escalating waves on a shared pool of team lives, looting downed enemies to craft and upgrade between contacts. Built as a systems showcase: the entire demo — arena, enemy variants, drone airspace lanes, weapon data, loot tables, recipes, wave configuration, NavMesh, menus and build settings — regenerates from a single Editor command, backed by an AI Debug Monitor that visualises each state machine and records human-readable transition reasons.",
        bulletPoints: [
            { title: "Squad-Based Enemy AI", desc: "A five-state machine — Patrol, Chase, Attack, Investigate, Dead — fed by four target-acquisition channels: vision, gunfire, incoming damage, and squad alerts. Enemies keep the player's last known position, walk it down when contact breaks, gate engagement on line-of-sight checks, and pass confirmed sightings to neighbours through controlled one-hop alerts." },
            { title: "NavMesh-Free Drone AI", desc: "Aerial units steer in full 3D rather than on a NavMesh — authored flight bands, hover motion, banking, obstacle avoidance, patrol routes and investigation orbits. Scout drones act as the squad's eyes, revealing the player to nearby ground units, then crash and detonate when shot down." },
            { title: "Server-Authoritative Combat & Modular Weapons", desc: "Gameplay decisions resolve on the authority, shared state replicates through NetworkVariables, and thin RPCs carry effect intent only — each client rebuilds muzzle flashes, tracers, impacts, explosions and ragdolls locally. Weapons are composed from ScriptableObject data, swappable firing mechanisms and projectile behaviours, with the same assets driving player and enemy guns and pooled projectiles keeping allocations and network traffic down." },
            { title: "Inventory, Equipment & Crafting", desc: "Catfe Vault Inventory — my own framework, also on this page — drives the field kit, grid backpack, equipment paperdoll, supply containers, loot tables, crafting, upgrades and repairs. The demo ships 13 items, six recipes, and separate loot tables for grunts, snipers and drones; armour protection scales with durability and is capped so it can never read as invulnerability." },
            { title: "Gameplay-Driven Screen Feedback", desc: "Gameplay FX from CatfeShaders, my URP Render Graph post-processing packs (also on this page), turns gameplay events into screen state: spawn and respawn dissolves, damage vignette, chromatic aberration, heavy-hit glitches, a low-health heartbeat, explosion shockwaves, wave transitions and a victory grade. Every effect is evaluated locally per player, so none of it costs network traffic." }
        ],
        role: "Solo Gameplay & Systems Engineer",
        timeline: "Playable Demo Build",
        video: "/videos/outpost-breach.mp4",
        metric: { value: "50 automated tests", label: "EditMode + PlayMode · AI, inventory, waves, win/lose flows" }
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
        tags: ["Editor Scripting", "C#", "Background Indexing", "Asset Store"],
        description: "Commercial Unity Editor tool shipped on the Asset Store under Catfe Studio. Version 2.0 searches inside every scene without opening them — objects, components, broken references, and every place an asset is used.",
        fullDescription: "A scene-workflow tool designed, built, and published to the Unity Asset Store as a commercial product under the Catfe Studio publisher account. Version 2.0 rebuilds it around a background scene index: every scene and prefab file is read as text, each hierarchy is reconstructed the way the Hierarchy window would show it, and the whole project becomes searchable without opening a single scene. Editor-only and read-only, for Unity 2022.3 LTS through Unity 6.",
        bulletPoints: [
            { title: "Background Scene Index", desc: "Reads every .unity and .prefab file under Assets as YAML on a background thread and rebuilds each hierarchy with prefab instances expanded — nested prefabs, variants and overrides applied. Results are cached per file, so a save re-reads only that file and re-checks the scenes that depend on it." },
            { title: "Find in Scenes & Where Used", desc: "Name and component queries (boss t:AudioSource) run across every saved scene and come back grouped by scene with build status; right-click any asset to list every scene and object that uses it, directly or through another asset — a texture via its material. Enter opens the scene and selects the object." },
            { title: "Scene Health Without a Scan", desc: "Missing scripts, prefabs and asset references are checked in the background in short slices of editor time and counted by root cause, not by object — one broken prefab placed 200 times is one problem. Where the scene file or the tool's script history records it, the lost class name is shown; it is never guessed." },
            { title: "Switching & Play From Boot", desc: "A Ctrl+Alt+O fuzzy Quick Open, a thumbnail grid rendered from each scene's camera, workspaces, tags and notes — plus Play from, which sets the Play Mode start scene so Play boots from the Boot scene and reopens the scenes being edited on stop." },
            { title: "Live Commercial Release", desc: "Passed Unity Asset Store review as a paid Extension Asset, and upgraded in place: 2.0 imports over 1.0 and keeps every user's favorites, workspaces, tags, notes and thumbnails." }
        ],
        role: "Publisher & Tool Developer",
        timeline: "Live on Asset Store (v2.0)",
        video: "/videos/scene-manager.mp4",
        link: "https://assetstore.unity.com/packages/tools/utilities/quick-scene-switcher-384534",
        linkLabel: "View on Asset Store",
        badge: "Live on Asset Store",
        metric: { value: "86K objects in 7.3 s", label: "300-scene first index · 0.6 s from cache · i7-12650H" }
    },
    {
        title: "CatfeShaders: Retro, Gameplay & Cinematic FX",
        subtitle: "URP Render Graph Post-Processing Packs",
        date: "2026",
        tier: "feature",
        tags: ["Unity 6", "URP · Render Graph", "HLSL", "Volume System", "Asset Store"],
        description: "Three post-processing packs for Unity 6 URP on one Render Graph framework — 35 effects and 21 looks, every effect a Volume override and any of them one line of code from gameplay.",
        fullDescription: "A family of fullscreen post-processing packs built on the Unity 6 Render Graph API and driven entirely through the Volume system. Add one renderer feature once; after that every effect is a Volume override that blends between Volumes, keys on a Timeline or an Animator, is driven from gameplay in one line, and costs nothing while its intensity sits at 0. One mask confines every effect to part of the screen or a range of distances, and the same stack renders onto a RenderTexture for a screen inside the game. Three themed packs, a free edition and a Complete edition ship from one codebase in one export run, version 1.0.0, now going through Unity Asset Store submission.",
        bulletPoints: [
            { title: "Three Packs, One Framework", desc: "Retro FX (13 effects, 7 looks, Neon Drive demo), Gameplay FX (12 effects, 6 looks, Outpost demo) and Cinematic FX (12 effects, 6 looks, Karst River demo), plus a free 4-effect edition and Complete — all 35 effects and 21 looks, two of them crossover looks found only there. Every edition carries the same framework scripts, so upgrading adds effects and changes nothing already built, and the two effects shared between packs overwrite the same files instead of duplicating them." },
            { title: "Retro FX — Modelled, Not Filtered", desc: "CRT curves the glass, glows the phosphor through a blur chain and smears colour the way a composite signal does. VHS resamples chroma at tape bandwidth and lays it back under a sharp picture — the artefact that actually reads as videotape. Old Film steps on the projector's own frame rate, so it looks the same at 30 and at 144 fps, and Datamosh follows the scene's real motion vectors." },
            { title: "Gameplay FX — One Line Per Effect", desc: "CatfeEffects.Flash<CatfeDamageVignette>(), CatfeEffects.Shockwave(worldPosition), CatfeEffects.Set<CatfeHeartbeat>(1 - health / maxHealth) and CatfeTransition.LoadScene(\"Level2\") need no scene setup; the transition covers the screen, loads asynchronously behind it and runs on unscaled time, so it works while the game is paused. The heartbeat is a real lub-dub rather than a sine, and Frost builds Voronoi crystals that refract each facet along its own normal." },
            { title: "Cinematic FX — Lens and Paint", desc: "Kuwahara is the anisotropic version: a structure tensor finds which way the image runs and stretches the brush along it, and its quality setting lowers resolution rather than brush size. Motion Blur reads URP's motion vectors with a streak clamp so a camera cut never smears the frame; Tilt Shift is a depth-free miniature band or true depth of field; Film Grade ships six lookup tables generated from formulas." },
            { title: "Release Pipeline", desc: "Render Graph throughout with no Compatibility Mode path. Every export is gated by a validation pass — shader compilation plus a render with every effect enabled — a per-effect visibility measurement on the demo scenes, an import test of each edition into a blank URP project, and player builds on D3D11, D3D12, Vulkan and OpenGL." }
        ],
        role: "Graphics & Tools Engineer",
        timeline: "Asset Store submission · v1.0.0",
        video: "/videos/catfeshaders.mp4",
        metric: { value: "35 effects", label: "21 looks · 3 packs · 1 renderer feature · no third-party textures" }
    },
    {
        title: "Mobile Game Framework",
        subtitle: "Casual Mechanics Playground",
        date: "2026",
        tier: "archive",
        summary: "One ScriptableObject-driven codebase running two casual genres — a roguelite arena and a multiplier-gate runner.",
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
        tier: "archive",
        summary: "C# action-shooter core: buffered input, dodge i-frames, and pluggable AI state machines.",
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
        tier: "archive",
        summary: "Infinite chunk streaming with NavMesh baked on background threads — 12 ms per chunk, no main-thread stall.",
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
        title: "Catfe Scene Analyzer Suite",
        subtitle: "Editor Tooling & Diagnostics",
        date: "2026",
        tier: "archive",
        summary: "Editor diagnostics that score scene renderers by draw-call risk, with one-click instancing and static batching.",
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
        tier: "archive",
        summary: "Interface-driven inventory, crafting and equipment framework with NUnit coverage — the kit inside Outpost Breach.",
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
        tier: "archive",
        summary: "Local LLM (Ollama) wired into the Editor to audit assets and fix misconfigured import settings, fully offline.",
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
        timeline: "Shipped · Dreamchasers Interactive",
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
        title: "DoLa Cafe: Purr & Go",
        subtitle: "Drive-Thru Coffee Arcade",
        date: "2026",
        tags: ["Three.js", "TypeScript", "Procedural Geometry", "Web Audio"],
        description: "Street-side coffee cart run against the morning rush — read each order, brew it from seven ingredients, and serve cat commuters before the queue at the cart runs out of patience.",
        fullDescription: "A timing-based cooking arcade set on a Vietnamese street, where the player works a mobile coffee cart as a puppy barista. Customers pull up on motorbikes with a named drink order, the drink is assembled ingredient by ingredient from the panel under the scene, and a correct serve pays out on a rising combo. Every 3D asset and sound is generated in code rather than downloaded. Published on itch.io and playable in the browser.",
        bulletPoints: [
            { title: "Order Reading & Brewing", desc: "Each customer arrives with an order named above the cart — Matcha Latte, Iced Milk Coffee, Iced Black Coffee — assembled from a seven-slot ingredient panel (cup, coffee, condensed milk, ice, hot water, fresh milk, matcha) with CLEAR and SERVE under it. Slots light up as they go in, so a wrong drink reads before it is served." },
            { title: "Combo Economy & Wave Pressure", desc: "A clean serve pops PERFECT! and pays coins against a combo multiplier that climbs with the streak — ×1.1 to ×1.8 across the captured run — while a wave counter raises the rush and three hearts absorb the misses." },
            { title: "Inspection Evasion Event", desc: "An INSPECTION CAR! alert interrupts service on a 5.5-second timer: pack the three items and tap the stand to pull it in, hold while the vehicle passes, then roll it back out — a full stop in the serving loop rather than a score penalty." },
            { title: "Code-Generated Scene & Audio", desc: "Cart, customers, street and sound are all built procedurally in Three.js and the Web Audio API — no downloaded models or audio files — which keeps the build loading straight into play in the browser. Bilingual English / Vietnamese." }
        ],
        role: "Solo Developer",
        timeline: "Live · playable in browser",
        video: "/videos/threejs/dolacafe.mp4",
        portrait: true,
        link: "https://catfe.itch.io/dolacafe",
        linkLabel: "Play on itch.io"
    },
    {
        title: "StackPuzzle 3D",
        subtitle: "Hexa Tile Match",
        date: "2026",
        tags: ["Three.js", "TypeScript", "Vite", "Web Audio"],
        description: "Level-based hex stack puzzle in real 3D — drag stacks from the tray, merge neighbours sharing a top colour, and pile ten of a colour to clear it before the moves run out.",
        fullDescription: "A turn-based hex puzzle built on Three.js, where the board is actual 3D geometry rather than a sprite grid. Each level hands the player fifteen moves and a three-slot tray of coloured stacks; neighbouring stacks that share a top colour merge into one, and a colour clears off the board once it piles up to ten. Deployed and playable in the browser.",
        bulletPoints: [
            { title: "Stack Merging & Colour Goals", desc: "Stacks drag from a three-slot tray onto a hex board; neighbours sharing a top colour merge into a single taller stack, and a colour clears at ten. Goal chips above the board count each colour down and tick off as they complete, with chained merges paying COMBO bonuses on top of the drop score." },
            { title: "Real 3D Presentation", desc: "Extruded hex prisms lit and shadowed in Three.js, so drops, merges, and clears animate as objects in space instead of swapped sprites — a merged stack physically grows taller, so the board state reads as depth rather than as a number printed on a flat grid." },
            { title: "Level Economy & Scoring", desc: "Twelve levels, each on a fifteen-move budget, closing on a star rating that reports the moves spent and the points awarded — plus a separate endless mode, with a best score persisted for each across sessions." }
        ],
        role: "Solo Developer",
        timeline: "Live · playable in browser",
        video: "/videos/threejs/hexa_threejs.mp4",
        portrait: true,
        link: "https://stack-puzzle.vercel.app",
        linkLabel: "Play in browser"
    },
    {
        title: "MewShoot",
        subtitle: "Kill-Chain Survivor",
        date: "2026",
        tags: ["Three.js", "WebGL", "React Three Fiber", "TypeScript"],
        description: "Survivor run scored on chain kills — an auto-firing hero, two charge-based abilities, and announced swarms that raise the threat tier while the multiplier climbs.",
        fullDescription: "A survivor-style arena run built around a kill chain instead of a wave counter. The hero fires on its own while the player handles positioning and spends two charge-based abilities; kills landed back to back drive a multiplier up through named ranks, and the threat tier steps up as the survival clock runs.",
        bulletPoints: [
            { title: "Kill Chain & Rank Ladder", desc: "Uninterrupted kills stack a multiplier that climbs through named ranks — NICE, GREAT, SAVAGE, BRUTAL — reaching ×67 in the captured run. A bar under the counter drains between kills, so holding a rank means staying in contact with the swarm." },
            { title: "Threat Tiers & Announced Swarms", desc: "Difficulty steps through threat tiers rather than discrete waves, punctuated by named events: a full-screen SWARM banner reading \"Runners from the treeline\" lands a dense pack at once instead of the steady trickle between events." },
            { title: "Charge-Based Abilities & Levelling", desc: "Two active abilities sit in the HUD on SPACE and R, each carrying its own charge count, alongside an XP bar that levels the hero seven times inside the first seventy seconds against a 100-point HP pool." }
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
            { title: "Level-Up Power-Up Draft", desc: "Levelling pauses the stage on a three-way pick — Blast Rounds (impact explosion on a 0.6u radius), Critical Eye (+8% crit chance), or Multishot (+1 projectile) — each carrying its own level, so a run compounds rather than resets." },
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
        link: "https://vnexpress.net/the-thao/gameverse/gamehub/2026/seal-of-exorcism-phu-an-tru-ta-308",
        linkLabel: "Vietnam GameVerse 2026 entry",
        metric: null /* FILL: entity count / ms per frame / draw calls — see TODO-FILL.md */
    },
    {
        title: "Vinpearl Digital Aquarium",
        subtitle: "Mixed-Reality Ecosystem",
        date: "2023",
        tier: "feature",
        tags: ["Unreal Engine", "Unity", "Holographic Sync", "BLE"],
        description: "Mixed-reality installation combining BLE indoor positioning, AR gameplay, and frame-accurate hologram sync.",
        fullDescription: "A multi-platform installation integrating BLE beacon mapping, AR gameplay, and cross-display hologram synchronization for a live aquarium exhibit.",
        bulletPoints: [
            { title: "Cross-Display Holographic Sync", desc: "Socket-based IPC protocol in UE C++ bridging an internal holographic display with external projection hardware — frame-accurate synchronization for interactive 3D assets." },
            { title: "AR Spatial Mapping & Physics", desc: "Custom AR spatial mapping in Unity projects and anchors dynamic coral meshes onto pre-built physical structures, with real-time Rigidbody physics for interactive turtle and volcano gameplay." },
            { title: "Location-Based Gameplay Triggering", desc: "Companion app using BLE RSSI trilateration for indoor positioning, triggering localized AR events and state changes as visitors approach exhibit zones." }
        ],
        role: "Lead Interactive Engineer",
        timeline: "Shipped · Dreamchasers Interactive",
        images: ["/images/vinpearl-1.jpg", "/images/vinpearl-2.jpg"],
        metric: null /* FILL: hologram sync error (ms) or concurrent devices — see TODO-FILL.md */
    },
    {
        title: "UE C++: Modular Combat Framework",
        subtitle: "UE5 · Personal Project",
        date: "2024",
        tier: "archive",
        summary: "Data-driven UE5 combat in C++: polymorphic AI, DataAsset weapons, and one damage interface for every source.",
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
        tier: "feature",
        tags: ["Unity", "Unreal", "AR", "Skeletal Tracking"],
        description: "AR mirror for real-time virtual uniform fitting driven by skeletal pose tracking.",
        fullDescription: "An AR mirror experience using real-time skeletal pose estimation to map and align virtual uniform meshes onto users as they move.",
        bulletPoints: [
            { title: "Real-Time Skeletal Binding", desc: "Skeletal pose estimation maps virtual uniform meshes onto dynamic user poses with accurate joint-to-mesh binding." },
            { title: "Occlusion & Rendering Optimization", desc: "Occlusion handling and depth-sorting shaders keep rendering order correct between the physical user and virtual meshes." }
        ],
        role: "Interactive & AR Engineer",
        timeline: "Shipped · Dreamchasers Interactive",
        images: ["/images/hometeam-1.jpg"]
    },
    {
        title: "Christmas Wonderland Metaverse",
        subtitle: "Multiplayer Metaverse Platform",
        date: "2021",
        tier: "credit",
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
        timeline: "Shipped · Dreamchasers Interactive",
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
        stack: ["C#", "URP · Render Graph", "HLSL · Compute", "Netcode for GameObjects", "Editor Scripting", "ScriptableObjects", "NUnit", "AR Foundation"],
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
        stack: ["Three.js", "React Three Fiber", "TypeScript", "WebGL", "Procedural Geometry", "Web Audio"],
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
