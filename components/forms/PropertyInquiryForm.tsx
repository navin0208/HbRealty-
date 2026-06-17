"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Building2, MapPin, Maximize, User, Mail, Phone, FileUp, Camera } from "lucide-react";
import { toast } from "sonner";

type FormType = "sell" | "developer";

interface PropertyInquiryFormProps {
  type: FormType;
}

export default function PropertyInquiryForm({ type }: PropertyInquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("Document must be smaller than 5MB.");
        e.target.value = ""; // Clear the input
      } else {
        setFileError("");
      }
    } else {
      setFileError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    formData.append("inquiryType", type);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(result.message);
        toast.success("Email sent successfully! We will contact you soon.");
      } else {
        setStatus("error");
        setMessage(result.error || "Failed to submit inquiry.");
        toast.error("Email not sent. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
      toast.error("Email not sent. An unexpected error occurred.");
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
            <input required type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Mail size={12} /> Email Address</label>
            <input required type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="john@example.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Phone size={12} /> Phone Number</label>
            <input required type="tel" name="phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Building2 size={12} /> Type of Land</label>
            <select name="propertyType" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors appearance-none">
              <option value="agriculture" className="bg-zinc-900">Agriculture</option>
              <option value="commercial" className="bg-zinc-900">Commercial</option>
              <option value="industrial" className="bg-zinc-900">Industrial</option>
              <option value="warehouse" className="bg-zinc-900">Warehouse</option>
              <option value="other" className="bg-zinc-900">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={12} /> Location (Area, Locality)</label>
            <input required type="text" name="location" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="e.g. Gangapur Road, Nashik" />
          </div>
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Maximize size={12} /> Land Size (Guntha, Acre, Hectare)</label>
            <input required type="text" name="size" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="e.g. 5 Acres" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Rate (per Vaar, Guntha, Acre, Hectare)</label>
            <input type="text" name="rate" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="e.g. 10 Lakhs per Guntha" />
          </div>
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Distance from Highways</label>
            <input type="text" name="highwayDistance" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="e.g. 2 km from Mumbai-Agra Highway" />
          </div>
        </div>

        {type === 'sell' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Land Legal Status</label>
              <select name="legalStatus" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors appearance-none">
                <option value="agricultural" className="bg-zinc-900">Agricultural (Not NA)</option>
                <option value="na_cleared" className="bg-zinc-900">NA Cleared (Non-Agricultural)</option>
                <option value="na_order_pending" className="bg-zinc-900">NA Order Pending</option>
                <option value="not_applicable" className="bg-zinc-900">Not Applicable</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Road Access (in meters)</label>
              <input type="text" name="roadSize" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors" placeholder="e.g. 18 meters" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Additional Details</label>
          <textarea name="details" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50/50 transition-colors resize-none" placeholder={type === 'sell' ? "Describe the property, legal status, road access..." : "Describe your requirements, preferred budget..."} />
        </div>

        <div className="space-y-2">
          <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <FileUp size={12} /> Property Document (7/12 For Verification)
          </label>
          <div className="relative">
            <input 
              type="file" 
              name="document" 
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white/80 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer ${
                fileError ? "border-red-500/50" : "border-white/10 focus:border-white/50/50"
              }`} 
            />
            <p className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-[9px] font-bold uppercase tracking-widest pointer-events-none hidden sm:block">Max 5MB</p>
          </div>
          {fileError && <p className="text-red-400 text-xs mt-1">{fileError}</p>}
        </div>

        {type === 'sell' && (
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Camera size={12} /> Property Images
            </label>
            <div className="relative">
              <input 
                type="file" 
                name="propertyImages" 
                accept="image/*"
                multiple
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" 
              />
            </div>
          </div>
        )}

        <button 
          disabled={status === "loading"}
          type="submit" 
          className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-xl hover:bg-white/90 text-[#062B4A] transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : (
            <>Submit Inquiry <Send size={16} /></>
          )}
        </button>
      </form>
    </div>
  );
}
