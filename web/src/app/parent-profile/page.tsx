"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Briefcase, ShieldCheck, MapPin, TrendingUp, BookOpen, Users, Heart } from "lucide-react";

export default function ParentProfile() {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [preferredCareer, setPreferredCareer] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const careers = ["B.Com", "Engineering", "Electrician", "Healthcare", "Government Job"];

  const concernsList = [
    { id: "income", label: "Income", icon: <TrendingUp className="w-6 h-6 mb-2 text-green-500" /> },
    { id: "security", label: "Job Security", icon: <ShieldCheck className="w-6 h-6 mb-2 text-primary" /> },
    { id: "local", label: "Local Work", icon: <MapPin className="w-6 h-6 mb-2 text-secondary" /> },
    { id: "growth", label: "Career Growth", icon: <Briefcase className="w-6 h-6 mb-2 text-accent" /> },
    { id: "education", label: "Further Education", icon: <BookOpen className="w-6 h-6 mb-2 text-primary" /> },
    { id: "perception", label: "Social Perception", icon: <Users className="w-6 h-6 mb-2 text-purple-400" /> },
    { id: "safety", label: "Safety", icon: <Heart className="w-6 h-6 mb-2 text-red-400" /> }
  ];

  const toggleConcern = (id: string) => {
    if (selectedConcerns.includes(id)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== id));
    } else {
      setSelectedConcerns([...selectedConcerns, id]);
    }
  };

  return (
    <div className="min-h-[90vh] px-4 pt-24 pb-12 flex flex-col items-center">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 mb-12 text-sm font-bold tracking-widest text-muted-foreground uppercase">
        <span className="text-muted-foreground">Profile</span>
        <span className="text-border">→</span>
        <span className="text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">Concerns</span>
        <span className="text-border">→</span>
        <span>Decision</span>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-4xl bg-card backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-xl">
        <motion.h1 variants={item} className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground">
          Parent Profile
        </motion.h1>
        <motion.p variants={item} className="text-muted-foreground mb-10 text-lg">
          What matters most to you when choosing a career for your child?
        </motion.p>

        <div className="space-y-12">
          {/* Parent's Preferred Career */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">What career do you prefer for them?</h3>
            <div className="flex flex-wrap gap-3">
              {careers.map(opt => (
                <button 
                  key={opt}
                  onClick={() => setPreferredCareer(opt)}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all ${preferredCareer === opt ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-muted/50 text-foreground hover:bg-muted border border-border'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Concerns Selection */}
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">Select your main concerns</h3>
            <p className="text-muted-foreground text-sm">Select all that apply</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {concernsList.map(concern => {
                const isSelected = selectedConcerns.includes(concern.id);
                return (
                  <button 
                    key={concern.id}
                    onClick={() => toggleConcern(concern.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all text-center h-full
                      ${isSelected 
                        ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(96,165,250,0.2)]' 
                        : 'border-border bg-card hover:bg-muted/50 hover:border-border/80'
                      }`}
                  >
                    {concern.icon}
                    <span className={`font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>{concern.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Selected Concerns Chips (Visual confirmation) */}
          {selectedConcerns.length > 0 && (
            <motion.div variants={item} className="pt-4">
              <p className="text-sm font-semibold text-muted-foreground mb-3">You selected:</p>
              <div className="flex flex-wrap gap-2">
                {selectedConcerns.map(id => {
                  const c = concernsList.find(x => x.id === id);
                  return (
                    <span key={id} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
                      {c?.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div variants={item} className="mt-12 pt-8 border-t border-border flex justify-between items-center">
          <Link href="/student-profile">
            <button className="px-6 py-3 text-muted-foreground hover:text-foreground font-medium transition-colors">
              Back
            </button>
          </Link>
          <Link href="/decision-room">
            <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              Enter Family Decision Room
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
