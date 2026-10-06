"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CompareCareers() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 flex flex-col items-center">
      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-6xl">
        
        <motion.div variants={item} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Compare Options</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Student's Choice vs Parent's Choice side-by-side.
          </p>
        </motion.div>

        <motion.div variants={item} className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Option 1 */}
          <div className="bg-card backdrop-blur-xl border-2 border-primary/50 rounded-3xl p-8 shadow-[0_0_30px_rgba(96,165,250,0.15)] relative">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-xl rounded-tr-3xl text-sm font-bold">Student Pick</div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Electrician</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-bold">1 - 2 Years (ITI)</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Starting Salary</span>
                <span className="font-bold text-green-500">₹15k - ₹20k /mo</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Job Availability</span>
                <span className="font-bold">Immediate / Local</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Cost of Study</span>
                <span className="font-bold text-green-500">Low (₹10k - ₹30k)</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <h4 className="font-bold text-green-500 mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Pros</h4>
              <p className="text-sm text-foreground">Fast entry into workforce, low financial burden, high local demand.</p>
            </div>
          </div>

          {/* Option 2 */}
          <div className="bg-card backdrop-blur-xl border-2 border-secondary/50 rounded-3xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative">
            <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 rounded-bl-xl rounded-tr-3xl text-sm font-bold">Parent Pick</div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">B.Com</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-bold">3 Years (Degree)</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Starting Salary</span>
                <span className="font-bold text-green-500">₹12k - ₹18k /mo</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Job Availability</span>
                <span className="font-bold text-yellow-500">High Competition</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Cost of Study</span>
                <span className="font-bold text-yellow-500">Medium (₹50k - ₹1L)</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <h4 className="font-bold text-yellow-500 mb-2 flex items-center gap-2"><XCircle className="w-5 h-5"/> Challenges</h4>
              <p className="text-sm text-foreground">Higher cost and time investment, saturated job market for entry-level roles.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-center mt-8">
          <Link href="/pathway">
            <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              See the Path Forward
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
