"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, AlertCircle, FileText } from "lucide-react";

export default function AdminAnalytics() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 flex flex-col items-center">
      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-7xl">
        
        <motion.div variants={item} className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Admin Analytics</h1>
            <p className="text-muted-foreground">National Level Insights & Escalations</p>
          </div>
          <button className="px-4 py-2 bg-primary/20 text-primary font-bold rounded-lg border border-primary/30">
            Export Report
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-lg">
            <Users className="text-primary w-8 h-8 mb-4" />
            <h3 className="text-3xl font-bold">12,450</h3>
            <p className="text-sm text-muted-foreground">Families Counselled</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl shadow-lg">
            <BarChart3 className="text-secondary w-8 h-8 mb-4" />
            <h3 className="text-3xl font-bold">78%</h3>
            <p className="text-sm text-muted-foreground">Resolution Rate</p>
          </div>
          <div className="bg-card border border-red-500/30 p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full"></div>
            <AlertCircle className="text-red-500 w-8 h-8 mb-4" />
            <h3 className="text-3xl font-bold text-red-500">312</h3>
            <p className="text-sm text-muted-foreground">Human Escalations</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl shadow-lg">
            <FileText className="text-accent w-8 h-8 mb-4" />
            <h3 className="text-3xl font-bold">ITI / Tech</h3>
            <p className="text-sm text-muted-foreground">Top Converted Path</p>
          </div>
        </motion.div>

        {/* Escalation Queue */}
        <motion.div variants={item} className="bg-card border border-border rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-500" /> Human Counsellor Queue
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-4 font-medium">Session ID</th>
                  <th className="pb-4 font-medium">Conflict Focus</th>
                  <th className="pb-4 font-medium">Student Preference</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4">#8291-A</td>
                  <td className="py-4 font-semibold text-foreground">Income vs Passion</td>
                  <td className="py-4">Electrician</td>
                  <td className="py-4"><span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">Requires Action</span></td>
                  <td className="py-4"><button className="text-primary hover:underline font-bold">Review</button></td>
                </tr>
                <tr>
                  <td className="py-4">#8291-B</td>
                  <td className="py-4 font-semibold text-foreground">Safety vs Location</td>
                  <td className="py-4">Healthcare</td>
                  <td className="py-4"><span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-bold">Assigned</span></td>
                  <td className="py-4"><button className="text-primary hover:underline font-bold">Review</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
