"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Users, UsersRound } from "lucide-react";

export default function FamilyEntry() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[90vh] px-4 pt-24 pb-12 flex flex-col items-center">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 mb-16 text-sm font-bold tracking-widest text-muted-foreground uppercase">
        <span className="text-primary bg-primary/10 px-4 py-2 rounded-full">Profile</span>
        <span className="text-border">→</span>
        <span>Concerns</span>
        <span className="text-border">→</span>
        <span>Decision</span>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-5xl">
        <motion.h1 variants={item} className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-foreground">
          Who is making the decision?
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/student-profile">
            <motion.div variants={item} whileHover={{ scale: 1.02, y: -5 }} className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 hover:border-primary/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] cursor-pointer h-full group text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">STUDENT</h2>
              <p className="text-muted-foreground font-medium">"I am exploring my career."</p>
            </motion.div>
          </Link>

          <Link href="/parent-profile">
            <motion.div variants={item} whileHover={{ scale: 1.02, y: -5 }} className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 hover:border-secondary/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer h-full group text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">PARENT</h2>
              <p className="text-muted-foreground font-medium">"I want to understand the career options."</p>
            </motion.div>
          </Link>

          <Link href="/decision-room">
            <motion.div variants={item} whileHover={{ scale: 1.02, y: -5 }} className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 hover:border-accent/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] cursor-pointer h-full group text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UsersRound className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-3">START TOGETHER</h2>
              <p className="text-muted-foreground font-medium">"We want to decide together."</p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
