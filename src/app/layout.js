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
  title: "Kieu Anh Tuan — Senior Unity Developer · Systems, Tooling & Monetization",
  description:
    "8+ years building Unity game systems: performance-critical gameplay, Editor toolchains, and SDK/ad-monetization integration. Also ships Unreal (C++/BP). Published tools on the Unity Asset Store.",
  keywords: ["Unity Developer", "C#", "Game Systems", "Performance Optimization", "Editor Tooling", "Ad Monetization", "LevelPlay", "AppLovin MAX", "SDK Integration", "LiveOps", "Unreal Engine"],
  openGraph: {
    title: "Kieu Anh Tuan — Senior Unity Developer · Systems, Tooling & Monetization",
    description:
      "Unity game systems: performance-critical gameplay, Editor toolchains, and SDK/ad-monetization integration. Also ships Unreal (C++/BP).",
    url: "https://tuanka1904.github.io",
    siteName: "Kieu Anh Tuan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kieu Anh Tuan — Senior Unity Developer · Systems, Tooling & Monetization",
    description:
      "Unity game systems: performance-critical gameplay, Editor toolchains, and SDK/ad-monetization integration. Also ships Unreal (C++/BP).",
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
