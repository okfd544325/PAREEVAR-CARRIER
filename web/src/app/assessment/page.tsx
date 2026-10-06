"use client";

import { useState } from "react";
import { saveAssessmentScores } from "../actions";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { category: "logical", text: "I enjoy solving puzzles and complex problems.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { category: "numerical", text: "I find it easy to work with numbers and statistics.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { category: "technical", text: "I like learning how computers and software work.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { category: "creativity", text: "I often come up with original ideas and designs.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { category: "communication", text: "I am comfortable speaking in front of a group.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleSelect = (val: number) => {
    setAnswers({ ...answers, [currentStep]: val });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      submitAssessment();
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    
    const scores = {
      logical: (answers[0] || 0) + 1,
      numerical: (answers[1] || 0) + 1,
      technical: (answers[2] || 0) + 1,
      creativity: (answers[3] || 0) + 1,
      communication: (answers[4] || 0) + 1,
      practical: (answers[5] || 0) + 1,
      problemSolving: (answers[6] || 0) + 1,
    };

    await saveAssessmentScores(scores);
  };

  const q = questions[currentStep];

  if (isSubmitting) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full"
          ></motion.div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI</div>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-xl font-medium text-white tracking-wide"
        >
          Analyzing parameters...
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-white/50 text-sm"
        >
          Computing optimal career trajectories
        </motion.p>
      </div>
    );
  }

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 mt-12 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-border shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          ></motion.div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">
            <span>Query {currentStep + 1} // {questions.length}</span>
            <span className="text-primary">{q.category}</span>
          </div>
        </div>

        <div className="min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                {q.text}
              </h2>

              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  const isSelected = answers[currentStep] === idx;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, backgroundColor: "var(--muted)" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                        isSelected 
                          ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(96,165,250,0.2)]" 
                          : "border-border text-foreground/60 hover:text-foreground hover:border-foreground/20"
                      }`}
                    >
                      {isSelected && (
                        <motion.div 
                          layoutId="selected-bg"
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                        />
                      )}
                      <span className="relative z-10 font-medium text-lg">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-between items-center border-t border-border pt-8">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-3 text-sm font-bold text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors uppercase tracking-wider"
          >
            ← Previous
          </button>
          
          <motion.button 
            whileHover={answers[currentStep] !== undefined ? { scale: 1.05 } : {}}
            whileTap={answers[currentStep] !== undefined ? { scale: 0.95 } : {}}
            onClick={handleNext}
            disabled={answers[currentStep] === undefined}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg ${
              answers[currentStep] !== undefined
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_15px_rgba(96,165,250,0.4)]"
                : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
            }`}
          >
            {currentStep === questions.length - 1 ? "Initialize Analysis" : "Next Query →"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
