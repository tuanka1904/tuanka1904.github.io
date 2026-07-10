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
  title: "Kieu Anh Tuan — Senior Game & Systems Developer",
  description:
    "8+ years engineering gameplay systems, performance optimization, and Editor toolchains across Unreal Engine (C++) and Unity (C#). Shipped on PC, mobile, and AR/MR.",
  keywords: ["Game Developer", "Unreal Engine", "Unity", "C++", "C#", "Gameplay Engineer", "Performance Optimization", "Editor Tooling"],
  openGraph: {
    title: "Kieu Anh Tuan — Senior Game & Systems Developer",
    description:
      "Gameplay systems, performance optimization, and Editor toolchains across Unreal Engine (C++) and Unity (C#).",
    url: "https://tuanka1904.github.io",
    siteName: "Kieu Anh Tuan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kieu Anh Tuan — Senior Game & Systems Developer",
    description:
      "Gameplay systems, performance optimization, and Editor toolchains across Unreal Engine (C++) and Unity (C#).",
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
