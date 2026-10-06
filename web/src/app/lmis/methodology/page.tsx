"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MethodologyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-[80vh] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 mt-8 pb-32 text-white">
      <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
        <span>←</span> Back to Dashboard
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Demand Index Methodology</h1>
        <p className="text-lg text-white/60 leading-relaxed mb-8">
          The LMIS Demand Index calculates the composite demand for specific trades using a weighted algorithm.
          This ensures that heterogeneous signals (job postings, government registries, industry inputs) are normalized into a single actionable metric.
        </p>

        <div className="bg-card/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">1. Data Inputs</h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li><strong>NCS (National Career Service):</strong> Job postings and candidate availability.</li>
              <li><strong>e-Shram:</strong> Informal sector employment registries.</li>
              <li><strong>Job Portals:</strong> Aggregated web-scraped data for private sector demand.</li>
              <li><strong>Industry Hiring Signals:</strong> Direct feedback from Sector Skill Councils (SSCs).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">2. Normalization</h2>
            <p className="text-white/80 leading-relaxed">
              All data points are normalized geographically (State/District level) and occupationally (mapped to standardized NCO codes and NSQF levels) before scoring.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">3. Configurable Weighting (Default)</h2>
            <div className="bg-black/30 rounded-xl p-6 border border-white/5 font-mono text-sm text-white/70">
              Demand Index = <br/>
              (0.35 × Normalized Job Portals) + <br/>
              (0.25 × Normalized Industry Signals) + <br/>
              (0.20 × Normalized NCS Postings) + <br/>
              (0.10 × e-Shram Registration Growth) + <br/>
              (0.10 × Historical Trend Coefficient)
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">4. Forecasting</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              The forecasting engine currently relies on a deterministic exponential smoothing model applied over a 12-month trailing baseline, calculating a trend coefficient (UP, DOWN, FLAT) to project future workforce gaps.
            </p>
            <p className="text-white/50 text-sm italic">
              Note: Current demo calculations are powered by seed data mapping deterministic states (e.g., Electricians in Nanded) to showcase the planner UI capabilities.
            </p>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
