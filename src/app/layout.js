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
  title: "Kieu Anh Tuan | Core Engineer",
  description: "Core Engineer and Tool Developer specializing in scalable game architectures.",
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
