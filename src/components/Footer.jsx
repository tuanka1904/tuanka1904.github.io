export default function Footer() {
    return (
        <footer className="bg-[#0c0a09] pb-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 uppercase tracking-widest font-mono border-t border-stone-800/30 pt-8">
                <p>&copy; 2026 Kieu Anh Tuan. All rights reserved.</p>
                <div className="flex gap-8 mt-6 md:mt-0">
                    <a href="https://www.linkedin.com/in/tuanka19" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
                    <a href="#top" className="hover:text-amber-500 transition-colors">Back to Top &uarr;</a>
                </div>
            </div>
        </footer>
    );
}
