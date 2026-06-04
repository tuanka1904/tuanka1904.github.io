"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Work", href: "#projects" },
        { name: "Expertise", href: "#skills" },
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 w-full z-50 bg-[#0c0a09]/80 backdrop-blur-md border-b border-stone-800/50"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-24">
                    <div className="flex-shrink-0 font-sans font-medium text-lg text-stone-200 tracking-tight">
                        Kieu Anh Tuan
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-12">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-stone-400 hover:text-amber-500 transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="text-sm font-medium text-stone-950 bg-stone-200 hover:bg-amber-500 px-6 py-2.5 rounded-full transition-colors duration-300"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-stone-400 hover:text-stone-200 transition-colors"
                        >
                            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#0c0a09] h-screen w-full fixed top-24 left-0">
                    <div className="px-6 pt-12 flex flex-col space-y-8 border-t border-stone-800/50 mt-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-4xl font-light text-stone-400 hover:text-amber-500 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-light text-stone-200 hover:text-amber-500 transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}
