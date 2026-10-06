"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col items-center min-h-[90vh] px-4 pt-20 pb-32 text-center relative overflow-hidden">
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl space-y-8 relative z-10"
      >
        <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 shadow-[0_0_15px_rgba(96,165,250,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Family Decision-Support Platform
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
          Make career decisions together <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse-slow">
            with evidence
          </span>
        </motion.h1>

        <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          AI-powered career counselling that brings students and families together with verified career outcomes, local opportunities and clear progression pathways.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link href="/family">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(96,165,250,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="relative group inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 text-base font-bold text-white shadow-lg overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative flex items-center gap-2 uppercase tracking-wide text-sm">
                Start Family Career Session
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </motion.button>
          </Link>

          <Link href="/careers">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "var(--muted)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-border bg-transparent px-8 text-base font-bold text-foreground shadow-sm transition-colors w-full sm:w-auto hover:border-foreground/20 uppercase tracking-wide text-sm"
            >
              Explore Career Intelligence
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-32 grid md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10"
      >
        <div className="group bg-card backdrop-blur-xl p-8 rounded-3xl border border-border hover:border-primary/50 transition-colors shadow-2xl hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/50 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">✓</div>
          <h3 className="text-xl font-bold mb-3 text-foreground">Evidence-Backed</h3>
          <p className="text-muted-foreground leading-relaxed">We use verified career data, training duration, and local opportunity metrics instead of assumptions.</p>
        </div>
        
        <div className="group bg-card backdrop-blur-xl p-8 rounded-3xl border border-border hover:border-secondary/50 transition-colors shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold text-white shadow-lg shadow-secondary/30 group-hover:scale-110 transition-transform">✓</div>
          <h3 className="text-xl font-bold mb-3 text-foreground">Family-Centred</h3>
          <p className="text-muted-foreground leading-relaxed">Compare student interests with parent concerns like income, safety, and job security in our Decision Room.</p>
        </div>

        <div className="group bg-card backdrop-blur-xl p-8 rounded-3xl border border-border hover:border-accent/50 transition-colors shadow-2xl hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/50 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold text-white shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform">✓</div>
          <h3 className="text-xl font-bold mb-3 text-foreground">Human Escalation</h3>
          <p className="text-muted-foreground leading-relaxed">When AI isn't enough, easily escalate unresolved family disagreements to a certified human counsellor.</p>
        </div>
      </motion.div>
    </div>
  );
}
