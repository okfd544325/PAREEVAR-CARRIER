"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type RoadmapProps = {
  career: { title: string; reqEducation: string; careerProgression: string | null };
  profile: { education: string };
  missingSkills: string[];
  acquiredSkills: string[];
};

export default function RoadmapClient({ career, profile, missingSkills, acquiredSkills }: RoadmapProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const } }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 mt-12 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-2">
          Computed Trajectory
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Roadmap</span></h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Optimized execution plan targeting the role of: <strong className="text-white">{career.title}</strong>
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8">
        {/* Skill Gap Section */}
        <motion.section 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl h-fit space-y-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Skill Analysis
          </h2>
          
          <div className="space-y-6 relative z-10">
            <div>
              <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div> Acquired Matrix
              </h3>
              {acquiredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {acquiredSkills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-medium rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/40 italic">No matching skills mapped.</p>
              )}
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div> Delta (Gap)
              </h3>
              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/40 italic">Requirements fully satisfied.</p>
              )}
            </div>
          </div>
        </motion.section>

        {/* Roadmap Section */}
        <motion.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Execution Plan
          </h2>
          
          <div className="relative border-l-2 border-white/10 ml-4 space-y-12 pb-4">
            
            <motion.div variants={item} className="relative pl-10">
              <div className="absolute w-5 h-5 bg-green-500 rounded-full -left-[11px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <h3 className="text-xl font-bold text-white">Phase 1: Foundation</h3>
              <div className="mt-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-primary font-medium text-sm uppercase tracking-wider mb-1">Current State: {profile.education}</p>
                <p className="text-white/60">Complete ongoing academic commitments while maintaining high performance metrics.</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="relative pl-10">
              <div className="absolute w-5 h-5 bg-blue-500 rounded-full -left-[11px] top-1 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <h3 className="text-xl font-bold text-white">Phase 2: Delta Resolution</h3>
              <div className="mt-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/60">Initialize targeted skill acquisition for identified gaps:</p>
                <p className="text-white font-medium mt-2">{missingSkills.length > 0 ? missingSkills.join(', ') : 'No critical gaps identified.'}</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="relative pl-10">
              <div className="absolute w-5 h-5 bg-accent rounded-full -left-[11px] top-1 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              <h3 className="text-xl font-bold text-white">Phase 3: Formal Certification</h3>
              <div className="mt-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/60">Attain minimum industry requirement: <span className="text-white font-medium">{career.reqEducation}</span></p>
                <Link href="/courses" className="mt-4 inline-flex items-center gap-2 text-sm text-accent font-bold hover:text-white transition-colors">
                  Query Verified Institutions
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </motion.div>

            <motion.div variants={item} className="relative pl-10">
              <div className="absolute w-5 h-5 bg-secondary rounded-full -left-[11px] top-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              <h3 className="text-xl font-bold text-white">Phase 4: Trajectory</h3>
              <div className="mt-3 p-4 bg-gradient-to-r from-secondary/10 to-transparent border border-secondary/20 rounded-xl">
                <p className="text-white/80 leading-relaxed">{career.careerProgression}</p>
              </div>
            </motion.div>

          </div>
        </motion.section>
      </div>
    </div>
  );
}
