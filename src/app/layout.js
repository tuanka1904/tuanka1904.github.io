import { Geist, VT323 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pixelFont = VT323({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio | Digital Architecture & Game Logic",
  description: "Real-time 3D graphics, game development, and modern web apps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${pixelFont.variable} antialiased bg-[#09090b] text-zinc-50 selection:bg-orange-500/30`}
      >
        {children}
      </body>
    </html>
  );
}
