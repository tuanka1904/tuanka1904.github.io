export default function Footer() {
    return (
        <footer className="border-t border-zinc-900 bg-[#060608]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 font-mono">
                <p>&gt; _COPYRIGHT 2026. RUNNING AT 60FPS.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Itch.io</a>
                </div>
            </div>
        </footer>
    );
}
