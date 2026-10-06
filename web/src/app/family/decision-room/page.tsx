"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DecisionRoomPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [counsellingLoading, setCounsellingLoading] = useState(false);
  const [counsellingResult, setCounsellingResult] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchRoom();
    }
  }, [status, router]);

  const fetchRoom = async () => {
    try {
      const res = await fetch("/api/family/decision-room");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.error("Failed to load decision room");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const runCounselling = async () => {
    setCounsellingLoading(true);
    try {
      // In a real app, this would call the AI backend service directly
      // For demo, calling a next.js api that proxies to python ai service or simulates it
      const res = await fetch("/api/family/counselling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          studentPref: data?.studentPref,
          parentPref: data?.parentPref,
          conflicts: data?.conflicts,
          concerns: data?.parentConcerns
        })
      });
      if (res.ok) {
        const json = await res.json();
        setCounsellingResult(json.counselling);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCounsellingLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 mt-8 pb-32">
        <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No Active Decision Room</h2>
          <p className="text-white/60 mb-6">Ensure family accounts are linked and authorized.</p>
          <button onClick={() => router.push("/family")} className="px-6 py-3 bg-white/10 text-white rounded-xl">Go to Family Settings</button>
        </div>
      </div>
    );
  }

  const hasConflict = data.status === "CONFLICT_DETECTED";

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 mt-8 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border shadow-2xl relative overflow-hidden ${hasConflict ? 'border-red-500/30' : 'border-white/10'}`}
      >
        <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 ${hasConflict ? 'bg-red-500/10' : 'bg-primary/20'}`}></div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Family Decision Room</h1>
            <p className="text-white/60 text-lg">Collaborative Career Planning & Resolution</p>
          </div>
          {hasConflict && (
            <span className="px-4 py-1.5 bg-red-500/20 border border-red-500/50 text-red-400 font-bold uppercase tracking-widest rounded-full animate-pulse">
              Conflict Detected
            </span>
          )}
        </div>

        {hasConflict && (
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h3 className="text-xl font-bold text-red-200 mb-2">Your preferred pathways differ.</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                <span className="text-sm text-white/50 uppercase">Student Preference</span>
                <p className="text-xl font-bold text-white mt-1">{data.studentPref}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                <span className="text-sm text-white/50 uppercase">Parent Preference</span>
                <p className="text-xl font-bold text-white mt-1">{data.parentPref}</p>
              </div>
            </div>
            {data.parentConcerns?.length > 0 && (
              <div className="mt-4">
                <span className="text-sm text-white/50 uppercase">Parent Concerns</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.parentConcerns.map((c: any, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
                      {c.concern} ({c.importance})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Task 6: Career Comparison Engine */}
      {hasConflict && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 overflow-x-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Evidence & Comparison Matrix</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-white/10 text-white/50 uppercase">Factor</th>
                <th className="p-4 border-b border-white/10 text-primary font-bold">{data.studentPref}</th>
                <th className="p-4 border-b border-white/10 text-secondary font-bold">{data.parentPref}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-white/5 text-white/70">Education Required</td>
                <td className="p-4 border-b border-white/5 text-white">ITI / Vocational Training</td>
                <td className="p-4 border-b border-white/5 text-white">Bachelor&apos;s Degree (3 Years)</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-white/5 text-white/70">Duration</td>
                <td className="p-4 border-b border-white/5 text-white">1 - 2 Years</td>
                <td className="p-4 border-b border-white/5 text-white">3 - 4 Years</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-white/5 text-white/70">Approx. Cost</td>
                <td className="p-4 border-b border-white/5 text-white">₹10,000 - ₹50,000</td>
                <td className="p-4 border-b border-white/5 text-white">₹1,00,000 - ₹5,00,000</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-white/5 text-white/70">Early Employment</td>
                <td className="p-4 border-b border-white/5 text-green-400">High (Immediate Entry)</td>
                <td className="p-4 border-b border-white/5 text-yellow-400">Medium (Post-Graduation)</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-white/5 text-white/70">Skill Gap</td>
                <td className="p-4 border-b border-white/5 text-white">Practical Wiring, Safety Protocol</td>
                <td className="p-4 border-b border-white/5 text-white">Accounting, Economics, Taxation</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Task 7: Career Pathway */}
      {hasConflict && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">{data.studentPref} Career Pathway</h3>
            <ol className="relative border-l border-white/10 ml-3 space-y-6">
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-4 ring-black">1</span>
                <h4 className="text-white font-bold">10th / 12th Grade</h4>
                <p className="text-white/60 text-sm">Complete basic schooling</p>
              </li>
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-4 ring-black">2</span>
                <h4 className="text-white font-bold">ITI Certification</h4>
                <p className="text-white/60 text-sm">1-2 year technical training</p>
              </li>
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-4 ring-black">3</span>
                <h4 className="text-white font-bold">Apprenticeship</h4>
                <p className="text-white/60 text-sm">Hands-on industry experience</p>
              </li>
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-4 ring-black">4</span>
                <h4 className="text-white font-bold">Certified Electrician</h4>
                <p className="text-white/60 text-sm">Employment / Self-employed</p>
              </li>
            </ol>
          </div>
          
          <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-secondary/20">
            <h3 className="text-xl font-bold text-secondary mb-4">{data.parentPref} Career Pathway</h3>
            <ol className="relative border-l border-white/10 ml-3 space-y-6">
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary/20 rounded-full -left-3 ring-4 ring-black">1</span>
                <h4 className="text-white font-bold">12th Commerce</h4>
                <p className="text-white/60 text-sm">Pass with minimum 50%</p>
              </li>
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary/20 rounded-full -left-3 ring-4 ring-black">2</span>
                <h4 className="text-white font-bold">B.Com Degree</h4>
                <p className="text-white/60 text-sm">3 year university program</p>
              </li>
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary/20 rounded-full -left-3 ring-4 ring-black">3</span>
                <h4 className="text-white font-bold">Internship</h4>
                <p className="text-white/60 text-sm">Accounting firm experience</p>
              </li>
              <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary/20 rounded-full -left-3 ring-4 ring-black">4</span>
                <h4 className="text-white font-bold">Accountant / Analyst</h4>
                <p className="text-white/60 text-sm">Corporate employment</p>
              </li>
            </ol>
          </div>
        </motion.div>
      )}

      {/* Task 8: Gemini Family AI Counselling */}
      {hasConflict && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-accent/20"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-accent">✧</span> Gemini Family Counselling
            </h2>
            {!counsellingResult && (
              <button 
                onClick={runCounselling}
                disabled={counsellingLoading}
                className="px-6 py-2 bg-gradient-to-r from-accent to-blue-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-[1.02] transition"
              >
                {counsellingLoading ? "Analyzing..." : "Generate Insights"}
              </button>
            )}
          </div>

          {counsellingResult ? (
            <div className="prose prose-invert max-w-none bg-black/30 p-6 rounded-xl border border-white/5">
              <div dangerouslySetInnerHTML={{ __html: counsellingResult.replace(/\n/g, '<br/>') }} />
            </div>
          ) : (
            <p className="text-white/50 text-center py-8">Click &quot;Generate Insights&quot; to have Gemini analyze the family preferences, identify common ground, and propose a mutually beneficial action plan.</p>
          )}
        </motion.div>
      )}

      {/* Task 9: Final Action Plan */}
      {(hasConflict && counsellingResult) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/20"
        >
          <h2 className="text-3xl font-extrabold text-white mb-6">Family Career Action Plan</h2>
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border border-white/10">
              <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider text-white/50">Recommended Compromise / Next Step</h3>
              <p className="text-xl text-white">Pursue ITI Electrician Training (1 Year) to secure early employment, while enrolling in B.Com Distance Education to satisfy higher education goals and long-term career growth.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <h4 className="text-white/50 text-sm uppercase">Short-term Action</h4>
                <p className="text-white mt-1">Enroll in local ITI (Electrician trade)</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <h4 className="text-white/50 text-sm uppercase">Long-term Action</h4>
                <p className="text-white mt-1">Register for IGNOU B.Com program</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <h4 className="text-white/50 text-sm uppercase">Cost Estimate</h4>
                <p className="text-white mt-1">₹35,000 / year total</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition">
                Revisit Later
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-[1.02] transition">
                Finalize & Save Plan
              </button>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
