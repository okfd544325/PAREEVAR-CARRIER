"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CareerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [setupStage, setSetupStage] = useState<number>(0); 
  const [role, setRole] = useState<'student'|'parent'|null>(null);
  
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    location: "Nanded",
    education: "",
    interests: "",
    careerInterests: "",
    parentName: "",
    relationship: "Father",
    concerns: [] as string[]
  });

  const concernsList = ["Income", "Job Security", "Local Work", "Career Growth", "Further Education", "Social Perception", "Safety"];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const saved = localStorage.getItem("pareevar_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setRole(parsed.role);
        setProfile(parsed);
        setSetupStage(3);
      } else {
        setSetupStage(1);
      }
    }
  }, [status, router]);

  const handleRoleSelect = (selectedRole: 'student'|'parent') => {
    setRole(selectedRole);
    setSetupStage(2);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { ...profile, role };
    localStorage.setItem("pareevar_profile", JSON.stringify(dataToSave));
    setSetupStage(3);
  };

  const clearProfile = () => {
    localStorage.removeItem("pareevar_profile");
    setSetupStage(1);
    setRole(null);
  };

  const fillMockData = () => {
    if (role === 'student') {
      setProfile({ ...profile, name: "Rahul", age: "16", location: "Nanded", education: "10th Grade", interests: "Fixing things, working with hands", careerInterests: "Electrician" });
    } else {
      setProfile({ ...profile, parentName: "Ramesh", relationship: "Father", name: "Rahul", location: "Nanded", careerInterests: "B.Com", concerns: ["Income", "Job Security", "Social Perception"] });
    }
  };

  const toggleConcern = (concern: string) => {
    setProfile(prev => {
      const exists = prev.concerns.includes(concern);
      if (exists) return { ...prev, concerns: prev.concerns.filter(c => c !== concern) };
      return { ...prev, concerns: [...prev.concerns, concern] };
    });
  };

  if (status === "loading" || setupStage === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full"
        ></motion.div>
        <p className="text-white/50 mt-4 font-mono uppercase tracking-widest text-sm">Loading Profile...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 mt-8 pb-32 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-[100px] -z-10"></div>
      
      <AnimatePresence mode="wait">
        {/* STAGE 1: ROLE SELECTION */}
        {setupStage === 1 && (
          <motion.div 
            key="stage1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card/40 backdrop-blur-2xl p-10 rounded-[2rem] border border-white/10 shadow-2xl text-center">
              <h1 className="text-3xl font-extrabold text-white mb-4">Welcome to PAREEVAR CARRIER</h1>
              <p className="text-white/60 mb-8">Who is setting up this profile?</p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => handleRoleSelect('student')}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 transition-all group"
                >
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Student</h3>
                  <p className="text-sm text-white/50">I am exploring career options for myself.</p>
                </button>

                <button 
                  onClick={() => handleRoleSelect('parent')}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary hover:bg-secondary/10 transition-all group"
                >
                  <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Parent / Guardian</h3>
                  <p className="text-sm text-white/50">I am guiding my child's career path.</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: PROFILE COMPLETION */}
        {setupStage === 2 && (
          <motion.div 
            key="stage2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative">
              <button onClick={fillMockData} className="absolute top-6 right-6 text-xs bg-white/10 hover:bg-white/20 text-white py-1 px-3 rounded-full transition-colors">
                Load Demo Data
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">Complete {role === 'student' ? 'Your' : 'Family'} Profile</h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {role === 'parent' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Your Name (Parent)</label>
                      <input required type="text" value={profile.parentName} onChange={e => setProfile({...profile, parentName: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Relationship</label>
                      <input required type="text" value={profile.relationship} onChange={e => setProfile({...profile, relationship: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">{role === 'parent' ? "Child's Name" : "Your Name"}</label>
                    <input required type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">{role === 'parent' ? "Child's Age" : "Your Age"}</label>
                    <input required type="number" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Location</label>
                    <input required type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  {role === 'student' && (
                    <div>
                      <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Current Education</label>
                      <input required type="text" value={profile.education} onChange={e => setProfile({...profile, education: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                  )}
                </div>

                {role === 'student' && (
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Interests & Skills</label>
                    <input required type="text" value={profile.interests} onChange={e => setProfile({...profile, interests: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" placeholder="e.g. Fixing things, computers, math..." />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">
                    {role === 'parent' ? "Preferred Career Choice for Child" : "Career Interests"}
                  </label>
                  <input required type="text" value={profile.careerInterests} onChange={e => setProfile({...profile, careerInterests: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" placeholder={role === 'parent' ? "e.g. B.Com, Engineering" : "e.g. Electrician, Software"} />
                </div>

                {role === 'parent' && (
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Main Concerns (Select all that apply)</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {concernsList.map(c => (
                        <button 
                          key={c}
                          type="button"
                          onClick={() => toggleConcern(c)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${profile.concerns.includes(c) ? 'bg-primary/20 border-primary/50 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-opacity">
                    Save Profile & Continue
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: DASHBOARD */}
        {setupStage === 3 && (
          <motion.div 
            key="stage3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-end bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-xl">
              <div>
                <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">My Career Profile</h1>
                <p className="text-white/60 text-lg">
                  {role === 'student' ? 'Student Dashboard' : 'Parent Dashboard'} • {profile.location}
                </p>
              </div>
              <button onClick={clearProfile} className="text-sm text-white/40 hover:text-white transition-colors underline">
                Reset Demo Profile
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* PROFILE SUMMARY CARD */}
              <div className="md:col-span-1 bg-card/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-xl space-y-6">
                
                {role === 'student' ? (
                  <>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{profile.name}, {profile.age}</h3>
                      <p className="text-primary mt-1 font-medium">{profile.education}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Interests & Work Style</p>
                      <p className="text-white/80 bg-white/5 p-3 rounded-xl border border-white/5">{profile.interests}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Career Goal</p>
                      <p className="text-white/80 bg-white/5 p-3 rounded-xl border border-white/5 font-bold text-secondary">{profile.careerInterests}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between text-xs text-white/60 mb-2 font-bold">
                        <span>Profile Completion</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{profile.parentName}</h3>
                      <p className="text-secondary mt-1 font-medium">{profile.relationship} of {profile.name} (Age {profile.age})</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Preferred Career For Child</p>
                      <p className="text-white/80 bg-white/5 p-3 rounded-xl border border-white/5 font-bold text-primary">{profile.careerInterests}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Main Concerns</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.concerns.map(c => (
                          <span key={c} className="bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold">
                            {c}
                          </span>
                        ))}
                        {profile.concerns.length === 0 && <span className="text-white/40 italic text-sm">None selected</span>}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ACTION AREA */}
              <div className="md:col-span-2 space-y-6">
                
                {/* QUICK ACTIONS */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {role === 'student' ? (
                    <>
                      <Link href="/decision-room" className="bg-primary/20 hover:bg-primary/30 border border-primary/30 p-6 rounded-2xl transition-colors group">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">Take Career Assessment</h4>
                        <p className="text-sm text-white/60">Discover paths based on your strengths.</p>
                      </Link>
                      <Link href="/careers" className="bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 p-6 rounded-2xl transition-colors group">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">Explore Recommended Careers</h4>
                        <p className="text-sm text-white/60">View jobs matching your interests.</p>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/decision-room" className="bg-primary/20 hover:bg-primary/30 border border-primary/30 p-6 rounded-2xl transition-colors group">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">Start Family Session</h4>
                        <p className="text-sm text-white/60">Collaborate with your child and AI counselor.</p>
                      </Link>
                      <Link href="/careers" className="bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 p-6 rounded-2xl transition-colors group">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">View Career Comparison</h4>
                        <p className="text-sm text-white/60">Compare {profile.careerInterests} vs other options.</p>
                      </Link>
                    </>
                  )}
                </div>

                {/* STATUS TABLE / LIST */}
                <div className="bg-card/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden">
                  <div className="p-6 border-b border-white/10 bg-black/20">
                    <h2 className="text-xl font-bold text-white">
                      {role === 'student' ? 'Saved Careers & Status' : 'Family Session Activity'}
                    </h2>
                  </div>
                  <div className="p-6">
                    {role === 'student' ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                          <div>
                            <p className="font-bold text-white">{profile.careerInterests || "Electrician"}</p>
                            <p className="text-xs text-white/50">Vocational Track</p>
                          </div>
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">Highly Recommended</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                          <div>
                            <p className="font-bold text-white">IT Technician</p>
                            <p className="text-xs text-white/50">Technology Track</p>
                          </div>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">Explore Further</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 text-center py-8">
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-white/60">No recent sessions found.</p>
                        <Link href="/decision-room" className="inline-block mt-4 text-primary font-bold hover:underline">Start a new session</Link>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
