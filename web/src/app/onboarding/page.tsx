"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveStudentProfile } from "../actions";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    education: "",
    stream: "",
    marks: "",
    location: "",
    budget: "",
    interests: "",
    skills: "",
    careerGoal: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAction = async (formData: FormData) => {
    setLoading(true);
    await saveStudentProfile(formData);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 pb-32"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl mb-4 shadow-[0_0_20px_rgba(96,165,250,0.3)]">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Construct Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Digital Twin</span></h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">Provide the base parameters. Our AI will analyze these inputs to compute the optimal trajectory for your career.</p>
      </motion.div>

      <form action={handleAction} className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10 rounded-3xl blur-xl"></div>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="relative bg-card/40 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div variants={item} className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Current Education</label>
              <select name="education" value={formData.education} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-black/60">
                <option value="" className="bg-slate-900">Select level</option>
                <option value="10th" className="bg-slate-900">10th Standard</option>
                <option value="12th" className="bg-slate-900">12th Standard</option>
                <option value="ITI" className="bg-slate-900">ITI / Diploma</option>
                <option value="UG" className="bg-slate-900">Undergraduate</option>
              </select>
            </motion.div>
            
            <motion.div variants={item} className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Stream / Major</label>
              <input type="text" name="stream" value={formData.stream} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-black/60" placeholder="e.g. Science, Arts, Mechanical" />
            </motion.div>
            
            <motion.div variants={item} className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Marks/Percentage (%)</label>
              <input type="number" name="marks" value={formData.marks} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-black/60" placeholder="e.g. 85" />
            </motion.div>
            
            <motion.div variants={item} className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Budget (Annual)</label>
              <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-black/60">
                <option value="" className="bg-slate-900">Select budget range</option>
                <option value="low" className="bg-slate-900">Under ₹1 Lakh</option>
                <option value="medium" className="bg-slate-900">₹1 Lakh - ₹5 Lakhs</option>
                <option value="high" className="bg-slate-900">Above ₹5 Lakhs</option>
              </select>
            </motion.div>
          </div>

          <motion.div variants={item} className="space-y-2">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Interests (Comma separated)</label>
            <input type="text" name="interests" value={formData.interests} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-black/60" placeholder="e.g. Coding, Design, Helping people" />
          </motion.div>

          <motion.div variants={item} className="space-y-2">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Skills (Comma separated)</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-black/60" placeholder="e.g. Mathematics, Communication, Python" />
          </motion.div>

          <motion.div variants={item} className="space-y-2">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Career Goal (Optional)</label>
            <textarea name="careerGoal" value={formData.careerGoal} onChange={handleChange} rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-black/60 resize-none" placeholder="What do you want to become?"></textarea>
          </motion.div>

          <motion.div variants={item} className="pt-8 flex justify-end border-t border-white/10">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading} 
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(96,165,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.5)] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Initializing...
                  </>
                ) : (
                  <>
                    Save & Continue to Assessment
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
}
