"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { CV_HREF } from "./Navbar";

export default function Contact() {
    return (
        <section id="contact" className="py-28 bg-[#0c0a09]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="border-t border-stone-800/60 pt-20 pb-12">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-stone-100 leading-tight mb-6">
                            Looking for a Unity engineer<br className="hidden md:block" /> who measures before shipping?
                        </h2>
                        <p className="text-lg text-stone-300 font-light leading-relaxed mb-10">
                            Open to senior Unity roles in gameplay systems, Editor tooling, and monetization &mdash; Ho Chi Minh City, remote, or relocation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="mailto:tuanka1904@gmail.com"
                                className="inline-flex items-center justify-center gap-3 bg-amber-500 text-stone-950 px-7 py-3.5 rounded-md font-medium hover:bg-amber-400 transition-colors"
                            >
                                Start a conversation
                                <ArrowUpRight size={18} />
                            </a>
                            <a
                                href={CV_HREF}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 border border-stone-700 text-stone-200 px-7 py-3.5 rounded-md font-medium hover:border-stone-500 hover:text-stone-100 transition-colors"
                            >
                                <Download size={18} />
                                Download CV
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
