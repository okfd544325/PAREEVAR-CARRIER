"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PlannerView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tradeId = searchParams.get("tradeId");
  const locationId = searchParams.get("locationId");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const fetchPlannerData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lmis/planner?tradeId=${tradeId}&locationId=${locationId}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && tradeId && locationId) {
      fetchPlannerData();
    }
  }, [status, tradeId, locationId]);

  const generateInsight = async () => {
    setInsightLoading(true);
    try {
      // Create a simplified payload to send to our Gemini Agent
      const payload = {
        trade: data.trade.name,
        location: `${data.location.district}, ${data.location.state}`,
        demand: data.gapAnalysis.currentDemand,
        capacity: data.gapAnalysis.currentCapacity,
        gap: data.gapAnalysis.gap,
        severity: data.gapAnalysis.severity,
        forecastDemand: data.forecast?.forecastedDemand,
        signals: data.demandSignals.map((s:any) => ({ source: s.source, value: s.value }))
      };

      const res = await fetch("http://localhost:8000/api/lmis/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const result = await res.json();
        setInsight(result.insight);
      }
    } catch (e) {
      console.error(e);
      setInsight("Failed to generate insight. Please check the AI service.");
    } finally {
      setInsightLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!data || !data.trade) return <div className="text-white p-8">Data not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 mt-8 pb-32">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
          <span>←</span> Back to Dashboard
        </Link>
        <button 
          onClick={() => {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = `lmis_${data.trade.name}_${data.location.district}.json`;
            link.click();
          }}
          className="px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
        >
          Export JSON
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-accent/20 to-transparent rounded-full blur-[100px] -z-10"></div>
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-white tracking-widest uppercase">
                {data.trade.sector.name}
              </span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-white tracking-widest uppercase">
                {data.location.district}, {data.location.state}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">{data.trade.name}</h1>
            <p className="text-white/60 text-lg">NCO: {data.trade.ncoCode || 'N/A'} | NSQF Level: {data.trade.nsqfLevel || 'N/A'}</p>
          </div>
          
          <div className="text-right">
             <div className="inline-block bg-black/40 border border-white/10 px-6 py-4 rounded-xl">
               <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
               <p className={`text-xl font-extrabold ${data.gapAnalysis.gap < 0 ? 'text-red-400' : 'text-green-400'}`}>
                 {data.gapAnalysis.status}
               </p>
               <p className="text-white/80 font-mono mt-1 text-sm">{data.gapAnalysis.severity.replace('_', ' ')}</p>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Demand & Capacity Core */}
        <div className="space-y-8">
          <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Current Metrics</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Labour Demand</p>
                  <p className="text-3xl font-bold text-white">{data.gapAnalysis.currentDemand.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-sm mb-1">Total Training Capacity</p>
                  <p className="text-3xl font-bold text-white">{data.gapAnalysis.currentCapacity.toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-white/60 text-sm mb-2">Calculated Gap</p>
                <div className={`text-4xl font-extrabold ${data.gapAnalysis.gap < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {data.gapAnalysis.gap > 0 ? '+' : ''}{data.gapAnalysis.gap.toLocaleString()}
                </div>
                <p className="text-white/50 text-sm mt-2">
                  {data.gapAnalysis.gap < 0 
                    ? `Shortage of ${Math.abs(data.gapAnalysis.gap).toLocaleString()} trained individuals.` 
                    : `Oversupply of ${data.gapAnalysis.gap.toLocaleString()} trained individuals.`}
                </p>
              </div>
            </div>
          </div>

          {/* Forecasting */}
          {data.forecast && (
            <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">{data.forecast.horizonMonths}-Month Forecast</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/60 text-sm mb-1">Forecasted Demand</p>
                  <p className="text-3xl font-bold text-white">{data.forecast.forecastedDemand.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-sm mb-1">Trend Direction</p>
                  <p className="text-3xl font-bold text-primary">{data.forecast.trend}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Signals and AI */}
        <div className="space-y-8">
          <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Labour Demand Signals</h2>
            <div className="space-y-3">
              {data.demandSignals.map((sig: any) => (
                <div key={sig.id} className="flex justify-between items-center p-4 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-white font-medium">{sig.source}</span>
                  <span className="font-mono text-white/80">{sig.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-3xl border border-primary/20 shadow-[0_0_30px_rgba(96,165,250,0.1)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px]"></div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Gemini Planning Intelligence
            </h2>
            
            {insight ? (
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: insight.replace(/\n/g, '<br/>') }} />
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-white/60 mb-6 text-sm">Generate an AI-driven planner insight based on the current LMIS data, signals, and forecasts.</p>
                <button 
                  onClick={generateInsight}
                  disabled={insightLoading}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-[0_0_15px_rgba(96,165,250,0.3)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {insightLoading ? "Analyzing Data..." : "Generate Insight"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
