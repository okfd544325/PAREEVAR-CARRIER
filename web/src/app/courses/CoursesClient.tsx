"use client";

import { motion } from "framer-motion";

type CourseData = {
  id: string;
  name: string;
  duration: string;
  fees: number;
  eligibility: string;
  institute: { name: string } | null;
  career: { title: string } | null;
};

export default function CoursesClient({ courses }: { courses: CourseData[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 mt-12 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold uppercase tracking-wider mb-2">
          Global Registry
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Academia</span></h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">Explore certified pathways designed to bridge the gap between your current metrics and optimal career trajectory.</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {courses.map((course) => (
          <motion.div 
            key={course.id} 
            variants={item}
            className="group relative bg-card/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-2xl flex flex-col h-full hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-secondary/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-2 leading-tight">{course.name}</h2>
              <p className="text-sm font-bold text-secondary tracking-wide uppercase">{course.institute?.name}</p>
            </div>
            
            <div className="mt-8 space-y-3 flex-grow relative z-10">
              <div className="flex justify-between text-sm items-center py-2 border-b border-white/5">
                <span className="text-white/40 font-medium">Duration</span>
                <span className="font-bold text-white/90">{course.duration}</span>
              </div>
              <div className="flex justify-between text-sm items-center py-2 border-b border-white/5">
                <span className="text-white/40 font-medium">Investment</span>
                <span className="font-bold text-white/90">₹{course.fees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm items-center py-2 border-b border-white/5">
                <span className="text-white/40 font-medium">Threshold</span>
                <span className="font-bold text-white/90">{course.eligibility}</span>
              </div>
              <div className="flex justify-between text-sm items-center py-2">
                <span className="text-white/40 font-medium">Target Node</span>
                <span className="font-bold text-accent">{course.career?.title || "Various"}</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 relative z-10 w-full py-3 bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors"
            >
              Analyze Program
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
