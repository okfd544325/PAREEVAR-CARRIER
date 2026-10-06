"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Briefcase, GraduationCap, MapPin, DollarSign, Brain } from "lucide-react";

export default function StudentProfile() {
  const [education, setEducation] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [interest, setInterest] = useState<string | null>(null);
  const [income, setIncome] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const eduOptions = ["10th Pass", "12th Pass", "ITI / Diploma", "Graduate", "Other"];
  const locationOptions = ["Nanded", "Pune", "Mumbai", "Nagpur", "Nashik"];
  const careerInterests = ["Electrician", "Healthcare", "IT / Software", "Retail", "Automotive", "Construction"];
  const incomeRanges = ["₹15,000 - ₹20,000", "₹20,000 - ₹30,000", "₹30,000+"];

  return (
    <div className="min-h-[90vh] px-4 pt-24 pb-12 flex flex-col items-center">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 mb-12 text-sm font-bold tracking-widest text-muted-foreground uppercase">
        <span className="text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">Profile</span>
        <span className="text-border">→</span>
        <span>Concerns</span>
        <span className="text-border">→</span>
        <span>Decision</span>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-3xl bg-card backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-xl">
        <motion.h1 variants={item} className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground">
          Student Profile
        </motion.h1>
        <motion.p variants={item} className="text-muted-foreground mb-10">
          Tell us about yourself to find the best evidence-backed career matches.
        </motion.p>

        <div className="space-y-10">
          {/* Education */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><GraduationCap className="text-primary" /> Highest Education</h3>
            <div className="flex flex-wrap gap-3">
              {eduOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => setEducation(opt)}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${education === opt ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-muted/50 text-foreground hover:bg-muted border border-border'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* District */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><MapPin className="text-secondary" /> Home District</h3>
            <div className="flex flex-wrap gap-3">
              {locationOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => setLocation(opt)}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${location === opt ? 'bg-secondary text-white shadow-lg shadow-secondary/30' : 'bg-muted/50 text-foreground hover:bg-muted border border-border'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Career Interest */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><Briefcase className="text-accent" /> Preferred Career Path</h3>
            <div className="flex flex-wrap gap-3">
              {careerInterests.map(opt => (
                <button 
                  key={opt}
                  onClick={() => setInterest(opt)}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${interest === opt ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-muted/50 text-foreground hover:bg-muted border border-border'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Income Expectation */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><DollarSign className="text-green-500" /> Expected Starting Income</h3>
            <div className="flex flex-wrap gap-3">
              {incomeRanges.map(opt => (
                <button 
                  key={opt}
                  onClick={() => setIncome(opt)}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${income === opt ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-muted/50 text-foreground hover:bg-muted border border-border'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-12 pt-8 border-t border-border flex justify-end">
          <Link href="/parent-profile">
            <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              Continue to Parent Profile
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
