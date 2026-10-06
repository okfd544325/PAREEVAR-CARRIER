"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ParentProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    education: "",
    occupation: "",
    preferredSectors: "",
    preferredEduLevel: "",
    preferredLocation: "",
    budget: "",
    employmentVsHigherEdu: "",
    vocationalWillingness: false,
  });

  const [concerns, setConcerns] = useState<{concern: string, importance: string}[]>([
    { concern: "Job security", importance: "HIGH" },
    { concern: "Salary", importance: "HIGH" }
  ]);

  const [targetCareer, setTargetCareer] = useState("B.Com");

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/parent/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
        }
        if (data.concerns) {
          setConcerns(data.concerns);
        }
        if (data.preferences && data.preferences.length > 0) {
          setTargetCareer(data.preferences[0].careerName);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && (session?.user as any)?.role !== "PARENT") {
      // If not a parent, maybe they shouldn't be here, but for demo let's allow or redirect
    }
    
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router, session?.user]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/parent/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          profile, 
          concerns,
          preferences: [{ careerName: targetCareer, sector: profile.preferredSectors }] 
        }),
      });
      if (res.ok) {
        alert("Profile saved successfully");
      } else {
        alert("Failed to save profile");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 mt-8 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Parent Profile</h1>
        <p className="text-white/60 text-lg">Manage your expectations, concerns, and family preferences.</p>
      </motion.div>

      <form onSubmit={saveProfile} className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Background</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/60 mb-2">Education</label>
              <input 
                type="text" 
                value={profile.education} 
                onChange={e => setProfile({...profile, education: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. B.Com, 12th Pass"
              />
            </div>
            <div>
              <label className="block text-white/60 mb-2">Occupation</label>
              <input 
                type="text" 
                value={profile.occupation} 
                onChange={e => setProfile({...profile, occupation: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. Business, Teacher"
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/60 mb-2">Preferred Sectors</label>
              <input 
                type="text" 
                value={profile.preferredSectors} 
                onChange={e => setProfile({...profile, preferredSectors: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. IT, Healthcare, Engineering"
              />
            </div>
            <div>
              <label className="block text-white/60 mb-2">Preferred Education Level</label>
              <select 
                value={profile.preferredEduLevel} 
                onChange={e => setProfile({...profile, preferredEduLevel: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 appearance-none"
              >
                <option value="" className="bg-slate-900">Select Level</option>
                <option value="Degree" className="bg-slate-900">Degree</option>
                <option value="Diploma" className="bg-slate-900">Diploma</option>
                <option value="Certificate" className="bg-slate-900">Certificate</option>
              </select>
            </div>
            <div>
              <label className="block text-white/60 mb-2">Budget (per year)</label>
              <input 
                type="text" 
                value={profile.budget} 
                onChange={e => setProfile({...profile, budget: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. ₹1 Lakh"
              />
            </div>
            <div>
              <label className="block text-white/60 mb-2">Willing to do Vocational Training?</label>
              <div className="flex items-center space-x-4 h-[50px]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="vocational" 
                    checked={profile.vocationalWillingness === true}
                    onChange={() => setProfile({...profile, vocationalWillingness: true})}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-white">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="vocational" 
                    checked={profile.vocationalWillingness === false}
                    onChange={() => setProfile({...profile, vocationalWillingness: false})}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-white">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-white/60 mb-2">Target Career for Student</label>
              <input 
                type="text" 
                value={targetCareer} 
                onChange={e => setTargetCareer(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. B.Com, Engineer, Doctor"
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Concerns</h2>
            <button 
              type="button" 
              onClick={() => setConcerns([...concerns, { concern: "", importance: "MEDIUM" }])}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition text-sm font-bold"
            >
              + Add Concern
            </button>
          </div>
          
          <div className="space-y-4">
            {concerns.map((c, i) => (
              <div key={i} className="flex gap-4 items-center bg-black/20 p-4 rounded-xl border border-white/5">
                <input 
                  type="text" 
                  value={c.concern}
                  onChange={(e) => {
                    const newC = [...concerns];
                    newC[i].concern = e.target.value;
                    setConcerns(newC);
                  }}
                  className="flex-grow bg-transparent border-b border-white/10 px-2 py-1 text-white focus:outline-none focus:border-primary/50"
                  placeholder="e.g. Job Security, Distance from home"
                />
                <select 
                  value={c.importance}
                  onChange={(e) => {
                    const newC = [...concerns];
                    newC[i].importance = e.target.value;
                    setConcerns(newC);
                  }}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none appearance-none"
                >
                  <option value="LOW" className="bg-slate-900">Low</option>
                  <option value="MEDIUM" className="bg-slate-900">Medium</option>
                  <option value="HIGH" className="bg-slate-900">High</option>
                </select>
                <button 
                  type="button"
                  onClick={() => setConcerns(concerns.filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(96,165,250,0.3)] hover:scale-[1.02] transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile & Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
