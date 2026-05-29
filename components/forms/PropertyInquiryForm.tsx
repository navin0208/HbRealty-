"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Building2, MapPin, Maximize, User, Mail, Phone } from "lucide-react";

type FormType = "sell" | "developer";

interface PropertyInquiryFormProps {
  type: FormType;
}

export default function PropertyInquiryForm({ type }: PropertyInquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add type to payload
    data.inquiryType = type;

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(result.message);
      } else {
        setStatus("error");
        setMessage(result.error || "Failed to submit inquiry.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  const title = type === "sell" ? "List Your Property" : "Developer Partnership";
  const subtitle = type === "sell" 
    ? "Submit your property details for our verification process. Once verified, it will be listed on our exclusive portal." 
    : "Looking for land or strategic partnerships? Submit your requirements and our team will connect with you.";

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-950 border border-white/10 p-12 rounded-[30px] flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto w-full"
      >
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Inquiry Received</h3>
        <p className="text-white/60 font-light text-lg">{message}</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-zinc-200 transition-colors"
        >
          Submit Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-white/10 p-8 md:p-12 rounded-[30px] max-w-3xl mx-auto w-full relative overflow-hidden shadow-2xl">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mb-10">
        <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-4">{title}</h3>
        <p className="text-white/50 font-light text-sm md:text-base">{subtitle}</p>
      </div>

      {status === "error" && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-500 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p>{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><User size={12} /> Full Name</label>
            <input required type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Mail size={12} /> Email Address</label>
            <input required type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="john@example.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Phone size={12} /> Phone Number</label>
            <input required type="tel" name="phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Building2 size={12} /> Property Type</label>
            <select name="propertyType" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none">
              <option value="land">Agricultural Land</option>
              <option value="industrial">Industrial Land</option>
              <option value="warehouse">Warehouse Space</option>
              <option value="residential">Residential Plot</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={12} /> Location / City</label>
            <input required type="text" name="location" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="Nashik, Maharashtra" />
          </div>
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Maximize size={12} /> Size (Acres / Sq.Ft)</label>
            <input required type="text" name="size" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="e.g. 5 Acres" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Additional Details</label>
          <textarea name="details" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none" placeholder={type === 'sell' ? "Describe the property, legal status, road access..." : "Describe your requirements, preferred budget..."} />
        </div>

        <button 
          disabled={status === "loading"}
          type="submit" 
          className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : (
            <>Submit Inquiry <Send size={16} /></>
          )}
        </button>
      </form>
    </div>
  );
}
