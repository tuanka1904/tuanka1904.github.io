"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import { X, ArrowUpRight, Play } from "lucide-react";

export const posterFor = (video) => video.replace("/videos/", "/posters/").replace(".mp4", ".jpg");

export function LazyVideo({ src, className }) {
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
export function MetricReadout({ metric }) {
    if (!metric) return null;

    return (
        <p className="flex items-baseline gap-2.5 text-sm">
            <span className="w-[3px] h-3.5 bg-amber-500 shrink-0 translate-y-[2px]" aria-hidden="true" />
            <span className="font-mono text-amber-500 tracking-tight whitespace-nowrap shrink-0">{metric.value}</span>
            <span className="text-stone-400 font-light">{metric.label}</span>
        </p>
    );
}

/* Selection-gizmo corners — the hovered card reads like the selected object in a scene view. */
export function FrameCorners() {
    const corner = "absolute w-3.5 h-3.5 border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none";

    return (
        <span aria-hidden="true">
            <span className={`${corner} top-2 left-2 border-t-2 border-l-2`} />
            <span className={`${corner} top-2 right-2 border-t-2 border-r-2`} />
            <span className={`${corner} bottom-2 left-2 border-b-2 border-l-2`} />
            <span className={`${corner} bottom-2 right-2 border-b-2 border-r-2`} />
        </span>
    );
}

export function CardMedia({ project, aspect, className = "" }) {
    const mediaClass = "w-full h-full object-cover";

    return (
        <div className={`w-full ${aspect} bg-[#171412] overflow-hidden relative ${className}`}>
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
            <FrameCorners />
            {project.badge && (
                <span className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] text-amber-400 bg-stone-950/85 backdrop-blur px-2.5 py-1 rounded border border-amber-700/40 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {project.badge}
                </span>
            )}
        </div>
    );
}

/*
 * Portrait captures (phone-shaped web games) get a height-bounded stage instead of a
 * 16:9 frame — a wide frame would pillarbox them back into the black bars we removed.
 */
export function ProjectModal({ project, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
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
                    onClick={onClose}
                    aria-label="Close project details"
                    className="absolute top-5 right-5 z-10 text-stone-400 hover:text-stone-100 bg-stone-950/85 backdrop-blur rounded-md p-2 transition-colors border border-stone-800"
                >
                    <X size={22} strokeWidth={1.5} />
                </button>

                <div className="overflow-y-auto w-full custom-scrollbar">
                    <div className="w-full bg-[#0c0a09] relative border-b border-stone-800/60 flex flex-col items-center">
                        {project.video && (
                            <div className={`w-full flex items-center justify-center ${project.portrait ? "py-6" : "aspect-video"}`}>
                                <video
                                    src={project.video}
                                    poster={posterFor(project.video)}
                                    controls
                                    autoPlay
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className={
                                        project.portrait
                                            ? "max-h-[70vh] w-auto max-w-full rounded-lg border border-stone-800/60"
                                            : "w-full h-full object-contain"
                                    }
                                />
                            </div>
                        )}
                        {project.images && project.images.length > 0 && (
                            <div className="w-full flex flex-col">
                                {project.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`${project.title} screenshot ${idx + 1}`} loading="lazy" className="w-full h-auto max-h-[80vh] object-contain bg-[#131110] border-b border-stone-800/40 last:border-0" />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-12 lg:p-14 max-w-4xl mx-auto">
                        <div className="mb-10">
                            <p className="text-sm text-stone-500 mb-3">
                                {project.engine && (
                                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-amber-500 mr-2">{project.engine}</span>
                                )}
                                {project.subtitle} · {project.date}
                            </p>
                            <h2 className="text-2xl md:text-3xl font-medium text-stone-100 tracking-tight mb-5">{project.title}</h2>
                            <MetricReadout metric={project.metric} />
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-stone-950 bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-md transition-colors"
                                >
                                    {project.linkLabel || "View Project"} <ArrowUpRight size={15} />
                                </a>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8 mb-10 py-6 border-y border-stone-800/60">
                            <div>
                                <h3 className="text-xs text-stone-500 mb-2">Role &amp; Timeline</h3>
                                <p className="text-base text-stone-100 font-medium mb-1">{project.role}</p>
                                <p className="text-stone-400 font-light text-sm">{project.timeline}</p>
                            </div>
                            <div>
                                <h3 className="text-xs text-stone-500 mb-2">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-sm text-stone-200">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-stone-200 font-light leading-relaxed mb-10">
                            {project.fullDescription}
                        </p>

                        {project.bulletPoints && project.bulletPoints.length > 0 && (
                            <ul className="space-y-6 list-none pl-0">
                                {project.bulletPoints.map((bullet, idx) => (
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
    );
}
