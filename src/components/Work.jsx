"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { engines } from "@/data/work";
import { CardMedia, MetricReadout, ProjectModal } from "@/components/ProjectMedia";

const CARD = "group cursor-pointer flex flex-col bg-[#131110] border border-stone-800/60 hover:border-stone-600 rounded-lg overflow-hidden transition-colors";
const LABEL = "font-mono text-[11px] uppercase tracking-[0.22em]";

/*
 * Grid width follows the item count so a row never ends on a lone orphan card. Counts that
 * fit neither 3 nor 4 columns (5, 7) open with one double-width card, which evens the rows.
 */
function gridLayout(count) {
    if (count % 4 === 0) return { cols: "sm:grid-cols-2 xl:grid-cols-4", wide: false };
    if (count % 3 === 0) return { cols: "sm:grid-cols-2 lg:grid-cols-3", wide: false };

    const slots = count + 1;
    if (slots % 4 === 0) return { cols: "sm:grid-cols-2 xl:grid-cols-4", wide: true };
    if (slots % 3 === 0) return { cols: "sm:grid-cols-2 lg:grid-cols-3", wide: true };
    return { cols: "sm:grid-cols-2", wide: false };
}

// Cards act as buttons, so they answer the keyboard like buttons — but only when the
// card itself has focus, never when Enter is pressed on a link inside it.
function cardProps(project, open) {
    return {
        role: "button",
        tabIndex: 0,
        "aria-label": `${project.title} — view project details`,
        onClick: () => open(project),
        onKeyDown: (e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            open(project);
        },
    };
}

function Meta({ project, className = "" }) {
    return (
        <p className={`text-xs text-stone-500 ${className}`}>
            {project.subtitle} <span className="text-stone-700">·</span> {project.date}
        </p>
    );
}

function Tags({ tags, limit }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, limit).map((tag) => (
                <span key={tag} className="text-[11px] text-stone-400 border border-stone-800 px-2 py-0.5 rounded">
                    {tag}
                </span>
            ))}
        </div>
    );
}

function ProjectLink({ project, className }) {
    if (!project.link) return null;

    return (
        <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={className}
        >
            {project.linkLabel || "View project"} <ArrowUpRight size={14} />
        </a>
    );
}

function LeadCard({ project, open }) {
    return (
        <article {...cardProps(project, open)} className={`${CARD} lg:grid lg:grid-cols-5`}>
            <CardMedia
                project={project}
                aspect="aspect-video"
                className="lg:col-span-3 lg:self-start border-b lg:border-b-0 lg:border-r border-stone-800/60"
            />
            <div className="lg:col-span-2 p-6 md:p-8 flex flex-col">
                <Meta project={project} className="mb-3" />
                <h3 className="text-2xl md:text-3xl font-medium text-stone-100 tracking-tight leading-tight mb-4">
                    {project.title}
                </h3>
                <p className="text-stone-300 font-light leading-relaxed mb-6">{project.description}</p>

                <div className="mt-auto space-y-4">
                    <Tags tags={project.tags} limit={5} />
                    <MetricReadout metric={project.metric} />
                    <div className="pt-4 border-t border-stone-800/60 flex items-center justify-between gap-4">
                        <p className="text-xs text-stone-400">
                            {project.role} <span className="text-stone-600">·</span> {project.timeline}
                        </p>
                        {project.link ? (
                            <ProjectLink
                                project={project}
                                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
                            />
                        ) : (
                            <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 group-hover:text-amber-500 transition-colors">
                                Breakdown <ArrowRight size={14} />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

function FeatureCard({ project, open }) {
    return (
        <article {...cardProps(project, open)} className={CARD}>
            <CardMedia project={project} aspect="aspect-video" className="border-b border-stone-800/60" />
            <div className="p-6 md:p-7 flex flex-col flex-grow">
                <Meta project={project} className="mb-3" />
                <h3 className="text-xl md:text-2xl font-medium text-stone-100 mb-3 tracking-tight leading-snug">
                    {project.title}
                </h3>
                <p className="text-stone-300 font-light text-sm mb-6 leading-relaxed">{project.description}</p>

                <div className="mt-auto pt-5 border-t border-stone-800/60 space-y-4">
                    <MetricReadout metric={project.metric} />
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-stone-400">
                            {project.role} <span className="text-stone-600">·</span> {project.timeline}
                        </p>
                        <ProjectLink
                            project={project}
                            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}

// A wide card spans two columns at double the aspect, so its media stays level with its row.
function GridCard({ project, open, wide }) {
    return (
        <article {...cardProps(project, open)} className={`${CARD} ${wide ? "sm:col-span-2" : ""}`}>
            <CardMedia
                project={project}
                aspect={wide ? "aspect-[16/10] sm:aspect-[32/10]" : "aspect-[16/10]"}
                className="border-b border-stone-800/60"
            />
            <div className="p-5 flex flex-col flex-grow">
                <Meta project={project} className="mb-2" />
                <h4 className="text-base font-medium text-stone-100 mb-2 leading-snug">{project.title}</h4>
                <p className="text-stone-400 font-light text-sm mb-5 leading-relaxed line-clamp-3">{project.description}</p>

                <div className="mt-auto pt-4 border-t border-stone-800/60 space-y-3">
                    <MetricReadout metric={project.metric} />
                    <Tags tags={project.tags} limit={3} />
                </div>
            </div>
        </article>
    );
}

function GameCard({ project, open }) {
    return (
        <article {...cardProps(project, open)} className={CARD}>
            <CardMedia project={project} aspect="aspect-[9/16]" className="border-b border-stone-800/60" />
            <div className="p-4 lg:p-5 flex flex-col flex-grow">
                <Meta project={project} className="mb-2" />
                <h3 className="text-base font-medium text-stone-100 mb-2 leading-snug">{project.title}</h3>
                <p className="text-stone-400 font-light text-sm mb-5 leading-relaxed line-clamp-3">{project.description}</p>

                <div className="mt-auto space-y-4">
                    <MetricReadout metric={project.metric} />
                    <Tags tags={project.tags} limit={2} />
                    <ProjectLink
                        project={project}
                        className="w-full inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-medium text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 px-2 py-2 rounded-md transition-colors"
                    />
                </div>
            </div>
        </article>
    );
}

function SubHeading({ children, count }) {
    return (
        <div className={`${LABEL} flex items-center gap-4 text-stone-500 mb-6`}>
            <span className="shrink-0">{children}</span>
            <span className="h-px flex-grow bg-stone-800/60" aria-hidden="true" />
            {count !== undefined && <span className="shrink-0 text-stone-600">{String(count).padStart(2, "0")}</span>}
        </div>
    );
}

function EngineSection({ engine, open, tinted }) {
    const { projects } = engine;
    const lead = projects.find((p) => p.tier === "lead");
    const features = projects.filter((p) => p.tier === "feature");
    const grid = projects.filter((p) => !p.tier);
    const credits = projects.filter((p) => p.tier === "credit");
    const portrait = grid.length > 0 && grid.every((p) => p.portrait);
    const hasHeadline = Boolean(lead) || features.length > 0;
    const layout = gridLayout(grid.length);

    return (
        <section id={engine.id} className={`py-24 md:py-32 border-t border-stone-800/50 ${tinted ? "bg-[#100e0d]" : "bg-[#0c0a09]"}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <header className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-10 mb-12 border-b border-stone-800/60">
                    <div className="lg:col-span-7">
                        <p className={`${LABEL} text-stone-500 mb-5`}>
                            <span className="text-amber-500">{engine.index}</span>
                            <span className="text-stone-700 mx-3">/</span>
                            {engine.role}
                        </p>
                        <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-stone-100 leading-none">
                            {engine.name}
                        </h2>
                        <p className="text-stone-300 font-light leading-relaxed max-w-xl mt-6">{engine.summary}</p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col lg:items-end gap-5">
                        <p className="flex items-baseline gap-3">
                            <span className="font-mono text-4xl md:text-5xl text-stone-100 tracking-tight">
                                {String(projects.length).padStart(2, "0")}
                            </span>
                            <span className={`${LABEL} text-stone-500`}>{engine.countLabel}</span>
                        </p>
                        <ul className="flex flex-wrap lg:justify-end gap-1.5 max-w-md" aria-label={`${engine.name} stack`}>
                            {engine.stack.map((item) => (
                                <li key={item} className="text-xs text-stone-300 bg-stone-900/60 border border-stone-800 px-2.5 py-1 rounded">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>

                {lead && <LeadCard project={lead} open={open} />}

                {features.length > 0 && (
                    <div className={`grid lg:grid-cols-2 gap-6 ${lead ? "mt-6" : ""}`}>
                        {features.map((p) => (
                            <FeatureCard key={p.title} project={p} open={open} />
                        ))}
                    </div>
                )}

                {grid.length > 0 && (
                    <div className={hasHeadline ? "mt-16" : ""}>
                        {hasHeadline && <SubHeading count={grid.length}>More {engine.name} work</SubHeading>}
                        {portrait ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                {grid.map((p) => (
                                    <GameCard key={p.title} project={p} open={open} />
                                ))}
                            </div>
                        ) : (
                            <div className={`grid ${layout.cols} gap-5`}>
                                {grid.map((p, i) => (
                                    <GridCard key={p.title} project={p} open={open} wide={layout.wide && i === 0} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {credits.length > 0 && (
                    <div className="mt-16">
                        <SubHeading count={credits.length}>Earlier production credits</SubHeading>
                        <ul className="border-t border-stone-800/60">
                            {credits.map((p) => (
                                <li key={p.title}>
                                    <button
                                        type="button"
                                        onClick={() => open(p)}
                                        className="group w-full text-left py-5 border-b border-stone-800/60 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 hover:bg-stone-900/30 transition-colors px-2 -mx-2"
                                    >
                                        <span className="font-mono text-sm text-stone-500 shrink-0 w-12">{p.date}</span>
                                        <span className="text-stone-100 font-medium shrink-0 sm:w-72">{p.title}</span>
                                        <span className="text-sm text-stone-400 font-light leading-relaxed flex-grow">{p.summary}</span>
                                        <ArrowRight size={16} className="hidden sm:block shrink-0 text-stone-600 group-hover:text-amber-500 transition-colors" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}

export default function Work() {
    const [selected, setSelected] = useState(null);

    // Lock page scroll while the detail modal is open
    useEffect(() => {
        document.body.style.overflow = selected ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selected]);

    return (
        <>
            {engines.map((engine, i) => (
                <EngineSection
                    key={engine.id}
                    engine={engine}
                    tinted={i % 2 === 1}
                    open={(project) => setSelected({ ...project, engine: engine.name })}
                />
            ))}

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </>
    );
}
