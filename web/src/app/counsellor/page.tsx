"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, BrainCircuit, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Counsellor() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I noticed there's a conflict: the student wants to be an Electrician, but the parent prefers B.Com. I'm an AI Counsellor here to help you both find common ground. What is the parent's biggest worry about the Electrician path?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "I understand that social perception and growth are concerns. However, modern vocational careers offer highly skilled, respected roles with excellent growth through upskilling. Did you know senior technicians often out-earn entry-level commerce graduates within 3 years?" }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[75vh]">
        
        {/* Header */}
        <div className="bg-muted/50 p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <BrainCircuit className="text-primary w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-xl">AI Career Counsellor</h2>
              <p className="text-sm text-muted-foreground">Mediating family discussions</p>
            </div>
          </div>
          <Link href="/admin">
            <button className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors border border-red-400/30 px-3 py-1.5 rounded-full">
              <ShieldAlert className="w-3 h-3" /> Escalate to Human
            </button>
          </Link>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-secondary/20" : "bg-primary/20"}`}>
                {m.role === "user" ? <User className="text-secondary w-5 h-5" /> : <BrainCircuit className="text-primary w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] ${m.role === "user" ? "bg-secondary text-white rounded-tr-sm" : "bg-muted border border-border rounded-tl-sm text-foreground"}`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-border flex gap-3">
          <input 
            type="text"
            className="flex-1 bg-muted/50 border border-border rounded-full px-6 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="Type your response as Parent or Student..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
