"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";

export default function Pathway() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 flex flex-col items-center">
      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-4xl">
        
        <motion.div variants={item} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Action Pathway</h1>
          <p className="text-muted-foreground text-lg">
            Steps to become a Certified Electrician.
          </p>
        </motion.div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
          
          {/* Step 1 */}
          <motion.div variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(96,165,250,0.5)] z-10">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><BookOpen className="text-primary w-5 h-5"/> Enrol in ITI</h3>
              <p className="text-muted-foreground text-sm">Join the 2-year Electrician trade course at a local Government ITI.</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              2
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><GraduationCap className="text-secondary w-5 h-5"/> Apprenticeship</h3>
              <p className="text-muted-foreground text-sm">Complete a 1-year apprenticeship under the NAPS scheme for hands-on experience.</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-accent text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              3
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Briefcase className="text-accent w-5 h-5"/> Certification & Job</h3>
              <p className="text-muted-foreground text-sm">Acquire NCVT certification and get placed in local manufacturing or construction firms.</p>
            </div>
          </motion.div>

        </div>

        <motion.div variants={item} className="flex justify-center mt-16">
          <Link href="/counsellor">
            <button className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              Talk to AI Counsellor
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
