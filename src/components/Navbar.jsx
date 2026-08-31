"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

/* FILL: real CV file — drop it at public/cv/Kieu-Anh-Tuan-Unity.pdf (see TODO-FILL.md) */
export const CV_HREF = "/cv/Kieu-Anh-Tuan-Unity.pdf";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Work", href: "#projects" },
        { name: "Capabilities", href: "#skills" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0c0a09]/90 backdrop-blur-md border-b border-stone-800/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-baseline gap-5 min-w-0">
                        <span className="flex-shrink-0 font-medium text-lg text-stone-100 tracking-tight">
                            Kieu Anh Tuan
                        </span>
                        <span className="hidden sm:flex items-center gap-2 text-xs text-stone-400 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Available for new roles
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-stone-400 hover:text-stone-100 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href={CV_HREF}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-medium text-stone-300 hover:text-stone-100 border border-stone-700 hover:border-stone-500 px-4 py-2 rounded-md transition-colors"
                            >
                                Download CV
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
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-light text-stone-300 hover:text-stone-100 transition-colors"
                            >
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
