"use client";

import { motion } from "framer-motion";
import { TrendingUp, MapPin, Briefcase, DollarSign, BrainCircuit, Users } from "lucide-react";
import Link from "next/link";

export default function CareerIntelligence() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 flex flex-col items-center">
      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-6xl">
        
        <motion.div variants={item} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Career Intelligence</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deep dive into market realities for the selected career path.
          </p>
        </motion.div>

        {/* Hero Career Card */}
        <motion.div variants={item} className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden shadow-[0_0_40px_rgba(96,165,250,0.15)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold tracking-wider uppercase mb-3 inline-block">Vocational Path</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Certified Electrician</h2>
              <p className="text-muted-foreground mt-2 text-lg">High demand in local infrastructure and real estate sectors.</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Expected Starting Salary</p>
              <h3 className="text-4xl font-bold text-green-500">₹18,000<span className="text-xl text-muted-foreground">/mo</span></h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-muted/50 rounded-2xl border border-border/50">
              <TrendingUp className="text-primary w-8 h-8 mb-3" />
              <p className="text-sm text-muted-foreground">Job Growth (5 Yrs)</p>
              <p className="text-xl font-bold">+24%</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-2xl border border-border/50">
              <MapPin className="text-secondary w-8 h-8 mb-3" />
              <p className="text-sm text-muted-foreground">Top Hiring Hubs</p>
              <p className="text-xl font-bold">Pune, Mumbai</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-2xl border border-border/50">
              <Briefcase className="text-accent w-8 h-8 mb-3" />
              <p className="text-sm text-muted-foreground">Placement Rate</p>
              <p className="text-xl font-bold">87%</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-2xl border border-border/50">
              <Users className="text-green-500 w-8 h-8 mb-3" />
              <p className="text-sm text-muted-foreground">Industry Demand</p>
              <p className="text-xl font-bold">Very High</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-center gap-4 mt-8">
          <Link href="/compare">
            <button className="px-8 py-4 bg-card border border-border text-foreground font-bold rounded-full hover:bg-muted transition-colors">
              Compare Careers
            </button>
          </Link>
          <Link href="/pathway">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              View Learning Pathway
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
