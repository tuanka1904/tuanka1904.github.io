import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://tuanka1904.github.io"),
  title: "Kieu Anh Tuan — Game Developer · Unity, Unreal & Web",
  description:
    "Game developer with 8+ years shipping games: Unity (C#) gameplay systems, GPU rendering and Editor tooling; production Unreal (C++/BP); and live browser games in Three.js. Published tools on the Unity Asset Store.",
  keywords: ["Game Developer", "Unity Developer", "Unreal Engine", "C#", "C++", "Three.js", "WebGL", "Game Systems", "Performance Optimization", "Editor Tooling", "Web Games"],
  openGraph: {
    title: "Kieu Anh Tuan — Game Developer · Unity, Unreal & Web",
    description:
      "Unity gameplay systems and Editor tooling, production Unreal (C++/BP), and browser games playable right now in Three.js.",
    url: "https://tuanka1904.github.io",
    siteName: "Kieu Anh Tuan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kieu Anh Tuan — Game Developer · Unity, Unreal & Web",
    description:
      "Unity gameplay systems and Editor tooling, production Unreal (C++/BP), and browser games playable right now in Three.js.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0c0a09] text-stone-200 selection:bg-amber-600 selection:text-stone-950`}
      >
        {children}
      </body>
    </html>
  );
}
