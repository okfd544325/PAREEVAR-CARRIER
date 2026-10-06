"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Users, AlertTriangle, CheckCircle2, XCircle, ArrowRight, BrainCircuit, Activity } from "lucide-react";

export default function DecisionRoom() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[90vh] px-4 pt-24 pb-12 flex flex-col items-center">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 mb-8 text-sm font-bold tracking-widest text-muted-foreground uppercase">
        <span className="text-muted-foreground">Profile</span>
        <span className="text-border">→</span>
        <span className="text-muted-foreground">Concerns</span>
        <span className="text-border">→</span>
        <span className="text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">Decision</span>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-6xl">
        <motion.div variants={item} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Family Decision Room</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comparing Student and Parent career preferences to find the best evidence-backed pathway.
          </p>
        </motion.div>

        {/* Conflict Level Gauge / Status */}
        <motion.div variants={item} className="mb-12 bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Activity className="text-yellow-500 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Conflict Level: Moderate</h3>
              <p className="text-muted-foreground text-sm">Differing career paths selected. Alignment needed on core concerns.</p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="w-16 h-3 rounded-full bg-green-500"></span>
            <span className="w-16 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-16 h-3 rounded-full bg-muted"></span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Student Card */}
          <motion.div variants={item} className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(96,165,250,0.1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="text-primary w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Student's Choice</p>
                <h2 className="text-3xl font-bold text-foreground">Electrician</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Key Motivators</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Quick Employment</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Hands-on Work</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Local Jobs</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Parent Card */}
          <motion.div variants={item} className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -z-10"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center">
                <Users className="text-secondary w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Parent's Choice</p>
                <h2 className="text-3xl font-bold text-foreground">B.Com</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Key Concerns</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Social Perception</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Job Security</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Income Growth</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alignment Analysis */}
        <motion.div variants={item} className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-green-500 flex items-center gap-2 mb-4">
              <CheckCircle2 /> Areas of Agreement
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                <span className="text-foreground">Both prefer jobs that offer long-term <strong>Job Security</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                <span className="text-foreground">Both agree on staying near the <strong>Home District</strong>.</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-red-500 flex items-center gap-2 mb-4">
              <XCircle /> Areas of Conflict
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                <span className="text-foreground"><strong>Career Type:</strong> Vocational (Electrician) vs Degree (B.Com).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                <span className="text-foreground"><strong>Parent Concern:</strong> B.Com is seen as having better "Social Perception", whereas Electrician is perceived as manual labor.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div variants={item} className="flex justify-center mt-12">
          <Link href="/counsellor">
            <button className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              <BrainCircuit className="w-6 h-6" />
              Resolve Conflict with AI Counsellor
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
