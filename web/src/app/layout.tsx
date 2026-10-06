import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Career Platform",
  description: "AI-Enabled Career Counselling & Family Decision-Support Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans dark", geist.variable)}>
      <body className={cn(inter.className, "bg-background text-foreground antialiased selection:bg-primary/30")}>
        {/* Static Background Tint */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
          <div className="absolute top-[20%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-primary/15 blur-[120px]"></div>
        </div>

        <div className="min-h-screen flex flex-col relative">
          <Providers>
            <Navbar />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <footer className="border-t border-white/10 bg-background/50 backdrop-blur-md text-white/40 py-8 text-center text-sm">
              <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-xs font-bold text-white">AI</div>
                  <span>PAREEVAR CARRIER</span>
                </div>
                <p>© {new Date().getFullYear()} PAREEVAR CARRIER Intelligence. All rights reserved.</p>
              </div>
            </footer>
          </Providers>
        </div>
      </body>
    </html>
  );
}
