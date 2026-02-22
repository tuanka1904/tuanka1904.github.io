import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import SystemLog from "./SystemLog";

const projectCategories = [
    {
        categoryTitle: "[ 01 / INTERACTIVE INSTALLATIONS ]",
        projects: [
            {
                title: "Volcanic Awakening",
                subtitle: "AR & Projection Mapping",
                date: "2023",
                tags: ["[ Unity Editor ]", "[ C# ]", "[ Real-time ]", "[ Sensors ]"],
                description: "An immersive projection mapping game combined with an AR volcano experience deployed at Vinpearl Aquarium.",
                fullDescription: "Architected a large-scale spatial installation. The experience involved blending multi-projector mapping with a custom AR overlay. Overcame significant performance bottlenecks to maintain a stable 60 FPS while handling complex physics and real-time interaction from multiple users simultaneously.",
                role: "Lead Gameplay Engineer",
                timeline: "6 Months"
            },
            {
                title: "Kinetic Cycling",
                subtitle: "AR Mirror Experience",
                date: "2022",
                tags: ["[ Unreal Engine ]", "[ C++ ]", "[ Computer Vision ]", "[ IoT ]"],
                description: "An AR mirror and interactive cycling game developed for the HomeTeam Festival Singapore.",
                fullDescription: "Developed an interactive physical-digital hybrid game. Connected custom Raspberry Pi sensors on exercise bikes to Unreal Engine via UDP. Integrated real-time computer vision for the AR mirror, establishing a seamless loop between player physical exertion and on-screen visual feedback.",
                role: "Interactive Developer",
                timeline: "4 Months"
            },
            {
                title: "Tactile Topography",
                subtitle: "AR Sandbox Engine",
                date: "2021",
                tags: ["[ C++ ]", "[ Depth Sensors ]", "[ Shaders ]"],
                description: "An interactive AR sandbox experience for the Singapore Discovery Center using depth sensing and real-time mesh deformation.",
                fullDescription: "Engineered the core logic transforming raw depth-map data from sensors (Kinect) into a dynamic 3D topographical mesh. Wrote custom shaders to simulate real-time water flow and terrain elevation coloring based on the user's physical interaction with the sand.",
                role: "Graphics Programmer",
                timeline: "3 Months"
            },
            {
                title: "The Star Tower",
                subtitle: "Brand Activation",
                date: "2020",
                tags: ["[ Unity ]", "[ TouchDesigner ]", "[ DMX ]"],
                description: "A synchronized sensory installation combining real-time 3D visuals with physical stage lighting for Heineken.",
                fullDescription: "Led the technical execution of a massive interactive tower. Bridged Unity's real-time rendering engine with lighting protocols to control physical stage lights based on user interactions on touch panels across the venue.",
                role: "Creative Technologist",
                timeline: "2 Months"
            },
            {
                title: "Digital Canvas",
                subtitle: "Interactive WebGL",
                date: "2019",
                tags: ["[ WebGL ]", "[ Node.js ]", "[ Websockets ]"],
                description: "A massive interactive canvas installed at the National Gallery Singapore.",
                fullDescription: "Built a highly optimized WebGL interactive installation allowing multiple museum-goers to simultaneously 'paint' on a massive 8-meter wall using their smartphones and on-site multi-touch kiosks in real-time.",
                role: "Fullstack Engineer",
                timeline: "5 Months"
            }
        ]
    },
    {
        categoryTitle: "[ 02 / GAME PROTOTYPES ]",
        projects: [
            {
                title: "Project: NEON",
                subtitle: "Top-Down Action",
                date: "2025",
                tags: ["[ Unreal 5 ]", "[ C++ ]", "[ GAS ]"],
                description: "A high-speed hack-and-slash prototype featuring complex AI enemies and a robust custom combo system built on GAS.",
                fullDescription: "Architected the core gameplay loop using Unreal Engine 5's Gameplay Ability System (GAS). Developed non-linear AI behaviors using advanced Behavior Trees and EQ (Environmental Query System) to create dynamic combat encounters. Maintained strict 60fps targets by offloading physics to C++.",
                role: "Solo Developer",
                timeline: "Personal Prototype"
            },
            {
                title: "Sector 7",
                subtitle: "Tactical FPS Simulator",
                date: "2024",
                tags: ["[ Unity ]", "[ C# ]", "[ State Machines ]"],
                description: "A hardcore tactical FPS prototype focused on realistic weapon handling and intense enemy AI.",
                fullDescription: "Engineered a custom weapon framework simulating ballistics, recoil animations, and mechanical jamming. Built a robust modular AI state machine for enemy cover-finding, flanking, and group tactics.",
                role: "Solo Developer",
                timeline: "Personal Prototype"
            }
        ]
    },
    {
        categoryTitle: "[ 03 / EXPERIMENTS & R&D ]",
        projects: [
            {
                title: "Neural Pathfinding",
                subtitle: "ML-Agents Training",
                date: "2026",
                tags: ["[ Unity ML-Agents ]", "[ Pytorch ]", "[ AI ]"],
                description: "An R&D project training AI agents to navigate procedurally generated obstacle courses.",
                fullDescription: "Set up a reinforcement learning environment using Unity ML-Agents. Trained agents to solve complex maze structures and adapt to dynamic obstacles, experimenting with different reward functions to achieve emergent behaviors.",
                role: "AI Researcher",
                timeline: "R&D"
            },
            {
                title: "Spatial Shader Suite",
                subtitle: "Graphics Programming",
                date: "2023",
                tags: ["[ HLSL ]", "[ Shader Graph ]", "[ VR ]"],
                description: "A collection of custom spatial shaders including volumetric holograms and distortion effects optimized for VR hardware.",
                fullDescription: "A deep dive into writing custom HLSL shaders for Unity's Universal Render Pipeline. Implemented depth-based scanning effects, glitching volumetric holograms, and interactive particle systems specifically optimized for standalone VR headsets like the Meta Quest.",
                role: "Technical Artist",
                timeline: "R&D"
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
                    "> DECRYPTING 3 DIRECTORIES: INSTALLATIONS, PROTOTYPES, R&D."
                ]} />

                <div className="mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
                        Selected Works
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Projects spanning game systems, rendering experiments, and digital products. Built for high performance, designed for total immersion.
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
                                    className={`group flex flex-col border-2 border-zinc-800 bg-[#121214] rounded-none overflow-hidden cursor-pointer hover:border-orange-500 transition-colors ${idx === 0 && catIdx === 0 ? "lg:col-span-2 lg:flex-row" : ""}`}
                                >
                                    <div className={`w-full bg-zinc-900 overflow-hidden relative ${idx === 0 && catIdx === 0 ? "lg:w-1/2 h-64 lg:h-auto" : "h-64"}`}>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#27272a_1px,_transparent_1px)] bg-[length:16px_16px] opacity-20" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent flex items-end p-6">
                                            <span className="font-mono text-xs text-zinc-500 group-hover:text-orange-400 transition-colors">[ Preview Activated ]</span>
                                        </div>
                                        {/* Simulated scanline effect on hover */}
                                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className={`p-8 flex flex-col justify-between ${idx === 0 && catIdx === 0 ? "lg:w-1/2" : ""}`}>
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

                            <div className="h-48 sm:h-64 bg-zinc-900 relative flex items-center justify-center overflow-hidden border-b border-zinc-800">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#27272a_1px,_transparent_1px)] bg-[length:16px_16px] opacity-20" />
                                <div className="w-16 h-16 border border-orange-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(249,115,22,0.2)]" />
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
                                    <p className="text-zinc-400 leading-relaxed overflow-hidden">
                                        {selectedProject.fullDescription}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
