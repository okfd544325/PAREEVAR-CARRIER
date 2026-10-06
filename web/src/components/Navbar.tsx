"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const links = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Careers", href: "/recommendations" },
    { name: "Courses", href: "/courses" },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(96,165,250,0.5)] group-hover:shadow-[0_0_25px_rgba(96,165,250,0.8)] transition-all">
            CV
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            PAREEVAR CARRIER
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Family Session", href: "/family" },
            { name: "Career Intelligence", href: "/careers" },
            { name: "Compare Careers", href: "/compare" },
            { name: "Counsellor", href: "/counsellor" },
            { name: "Admin", href: "/admin" },
          ].map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 inset-x-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="px-5 py-2 text-sm font-medium text-foreground border border-border rounded-full hover:bg-muted transition-colors">
              Profile Login
            </button>
          </Link>
          <Link href="/family">
            <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_15px_rgba(96,165,250,0.4)] hover:shadow-[0_0_25px_rgba(167,139,250,0.6)] hover:scale-105 transition-all">
              Start Session
            </button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
