"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Recommendation = {
  id: string;
  title: string;
  matchScore: number;
  explanation: string;
  courses: { name: string; institute: string; fees: string }[];
};

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ai/recommendation")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setRecommendations(data);
        } else {
          console.error(data.error);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full"
          ></motion.div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI</div>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-xl font-medium text-white tracking-wide"
        >
          Compiling results...
        </motion.h3>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 mt-12 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Your Optimal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Trajectories</span></h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">Deterministic results based on your profile inputs and real-time database vectors.</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {recommendations.map((rec, index) => (
          <motion.div 
            key={rec.id} 
            variants={item}
            className="group relative bg-card/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(96,165,250,0.15)] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/30">
                  #{index + 1}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{rec.title}</h2>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full font-bold text-sm tracking-wider uppercase">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    {rec.matchScore}% Match Confidence
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 mb-8 bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm group-hover:bg-black/60 transition-colors">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-3">AI Synthesis</h3>
              <p className="text-lg text-white/80 leading-relaxed">{rec.explanation}</p>
            </div>

            <div className="relative z-10 mb-8">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Recommended Pathway Nodes</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rec.courses.map((course, idx) => (
                  <div key={idx} className="border border-white/10 rounded-2xl p-5 bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="font-bold text-white mb-1">{course.name}</p>
                    <p className="text-sm text-primary">{course.institute}</p>
                    <p className="text-sm font-semibold text-white/60 mt-3 bg-white/5 inline-block px-3 py-1 rounded-lg">{course.fees}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap gap-4">
              <Link href="/roadmap" className="inline-flex group/btn items-center justify-center px-6 py-3 text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-[0_0_15px_rgba(96,165,250,0.3)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] transition-all hover:scale-105">
                Generate Full Roadmap
                <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </Link>
              <Link href={`/careers/${rec.id}`} className="inline-flex group/btn items-center justify-center px-6 py-3 text-sm font-bold border-2 border-white/10 text-white rounded-xl hover:bg-white/10 transition-all hover:scale-105">
                Inspect Career Data
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
