"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

/* FILL: real CV file — drop it at public/cv/Kieu-Anh-Tuan-Unity.pdf (see TODO-FILL.md) */
export const CV_HREF = "/cv/Kieu-Anh-Tuan-Unity.pdf";

const navLinks = [
    { index: "01", name: "Unity", id: "unity" },
    { index: "02", name: "Web", id: "web" },
    { index: "03", name: "Unreal", id: "unreal" },
    { index: "04", name: "About", id: "about" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("");

    // Highlight the section crossing the middle of the viewport; nothing while in the hero.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                    else setActive((current) => (current === entry.target.id ? "" : current));
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        navLinks.forEach((link) => {
            const section = document.getElementById(link.id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0c0a09]/85 backdrop-blur-md border-b border-stone-800/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    <a href="#top" className="flex items-baseline gap-5 min-w-0">
                        <span className="flex-shrink-0 font-medium text-lg text-stone-100 tracking-tight">
                            Kieu Anh Tuan
                        </span>
                        <span className="hidden sm:flex lg:hidden xl:flex items-center gap-2 text-xs text-stone-400 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Available for new roles
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-8 lg:gap-10">
                        <ul className="flex items-center gap-6 lg:gap-8">
                            {navLinks.map((link) => {
                                const isActive = active === link.id;
                                return (
                                    <li key={link.id}>
                                        <a
                                            href={`#${link.id}`}
                                            aria-current={isActive ? "true" : undefined}
                                            className={`relative flex items-baseline gap-1.5 text-sm font-medium transition-colors ${isActive ? "text-stone-100" : "text-stone-400 hover:text-stone-100"}`}
                                        >
                                            <span className={`font-mono text-[10px] ${isActive ? "text-amber-500" : "text-stone-600"}`}>{link.index}</span>
                                            {link.name}
                                            <span
                                                className={`absolute -bottom-[29px] left-0 right-0 h-px bg-amber-500 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="flex items-center gap-3">
                            <a
                                href={CV_HREF}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-medium text-stone-300 hover:text-stone-100 border border-stone-700 hover:border-stone-500 px-4 py-2 rounded-md transition-colors"
                            >
                                CV
                            </a>
                            <a
                                href="#contact"
                                className="text-sm font-medium text-stone-950 bg-amber-500 hover:bg-amber-400 px-5 py-2 rounded-md transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            className="text-stone-300 hover:text-stone-100 transition-colors"
                        >
                            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#0c0a09] h-screen w-full fixed top-20 left-0 border-t border-stone-800/50">
                    <div className="px-6 pt-10 flex flex-col space-y-7">
                        <span className="flex items-center gap-2 text-sm text-stone-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Available for new roles
                        </span>
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-baseline gap-3 text-3xl font-light text-stone-300 hover:text-stone-100 transition-colors"
                            >
                                <span className="font-mono text-xs text-amber-500">{link.index}</span>
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={CV_HREF}
                            download
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-light text-stone-300 hover:text-stone-100 transition-colors"
                        >
                            Download CV
                        </a>
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-light text-amber-500 transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
