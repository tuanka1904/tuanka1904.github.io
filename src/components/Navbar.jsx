import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 font-mono tracking-tighter text-lg text-zinc-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-none bg-orange-500 animate-pulse shadow-[0_0_10px_#FF5A00]" />
                        SYS.ID
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-zinc-400 hover:text-orange-400 transition-colors duration-200"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="ml-4 px-4 py-2 border-2 border-zinc-700 bg-zinc-900 text-zinc-300 text-sm font-mono font-bold hover:border-orange-500 hover:text-orange-400 transition-all rounded-none"
                            >
                                Initialize Mission
                            </a>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-zinc-400 hover:text-white"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#09090b] border-b border-zinc-800">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </motion.nav>
    );
}
