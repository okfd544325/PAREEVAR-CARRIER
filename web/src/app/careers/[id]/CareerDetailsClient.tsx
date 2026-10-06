"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { saveCareerPreference } from "@/app/actions";
import { useState } from "react";

type CareerData = {
  title: string;
  description: string;
  reqEducation: string;
  reqSkills: string;
  careerProgression: string | null;
  courses: {
    name: string;
    duration: string;
    fees: number;
    institute: { name: string } | null;
  }[];
};

export default function CareerDetailsClient({ career }: { career: CareerData }) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCareerPreference(career.title, "");
      alert("Career saved to your profile!");
    } catch (e) {
      console.error(e);
      alert("Failed to save career.");
    } finally {
      setSaving(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10"
      >
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
            Career Data File
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">{career.title}</h1>
          <p className="text-xl text-white/60 leading-relaxed">{career.description}</p>
        </div>
        <div className="flex gap-4 shrink-0">
          <Link href="/recommendations" className="px-6 py-3 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
            ← Return
          </Link>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-[0_0_15px_rgba(96,165,250,0.3)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] transition-all hover:scale-105 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save to Profile"}
          </button>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid lg:grid-cols-2 gap-8"
      >
        <motion.div variants={item} className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700"></div>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            Base Requirements
          </h2>
          
          <div className="space-y-8 relative z-10">
            <div>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-2">Education Threshold</h3>
              <p className="text-xl font-medium text-white">{career.reqEducation}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-3">Required Skill Matrix</h3>
              <div className="flex flex-wrap gap-3">
                {career.reqSkills.split(',').map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 text-white font-medium rounded-xl shadow-sm backdrop-blur-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-2">Projected Trajectory</h3>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/80 font-medium leading-relaxed">{career.careerProgression}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors duration-700"></div>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            Academic Pathways
          </h2>
          
          <div className="space-y-4 relative z-10">
            {career.courses.length > 0 ? (
              career.courses.map((course, idx) => (
                <div key={idx} className="group/course p-5 border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 hover:border-primary/50 transition-all">
                  <h4 className="text-lg font-bold text-white mb-1">{course.name}</h4>
                  <p className="text-sm font-medium text-primary mb-4">{course.institute?.name}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg text-white/80">
                      <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      ₹{course.fees.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg text-white/80">
                      <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {course.duration}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border border-white/5 rounded-2xl bg-white/5">
                <p className="text-white/40 font-medium">No verified academic pathways mapped currently.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
