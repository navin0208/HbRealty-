"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Send, MapPin, Building2, Image as ImageIcon, Maximize, CheckCircle2, AlertCircle } from "lucide-react";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-white/50 animate-pulse text-xs uppercase tracking-widest border border-white/10 rounded-xl">Loading Map...</div> });

export default function AdminPropertyForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState<[number, number] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!location) {
      setStatus("error");
      setMessage("Please select a location on the map.");
      return;
    }

    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      type: formData.get("type"),
      price: formData.get("price"),
      size: formData.get("size"),
      image: formData.get("image"),
      location: location
    };

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Property listed successfully!");
        (e.target as HTMLFormElement).reset();
        setLocation(null);
      } else {
        const errorData = await res.json();
        setStatus("error");
        setMessage(errorData.error || "Failed to add property.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-zinc-950 border border-white/10 p-12 rounded-[30px] flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto w-full">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Property Added</h3>
        <p className="text-white/60 font-light text-lg">{message}</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-zinc-200 transition-colors"
        >
          Add Another Property
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-white/10 p-8 md:p-12 rounded-[30px] max-w-5xl mx-auto w-full relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mb-10">
        <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-4">Admin: Add Listing</h3>
        <p className="text-white/50 font-light text-sm md:text-base">Enter property details and drop a pin on the map to publish it immediately.</p>
      </div>

      {status === "error" && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-500 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p>{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Form Fields */}
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={12} /> Property Title</label>
            <input required type="text" name="title" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="e.g. Prime Industrial Plot" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Building2 size={12} /> Type</label>
              <select name="type" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none">
                <option value="Industrial Land">Industrial Land</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Residential">Residential</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Price</label>
              <input required type="text" name="price" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="e.g. ₹12 Cr" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Maximize size={12} /> Size</label>
            <input required type="text" name="size" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="e.g. 5 Acres" />
          </div>

          <div className="space-y-2">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12} /> Image URL</label>
            <input type="url" name="image" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="Optional: https://..." />
          </div>
          
          <button 
            disabled={status === "loading"}
            type="submit" 
            className="w-full bg-emerald-500 text-black font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {status === "loading" ? "Publishing..." : (
              <>Publish Property <Send size={16} /></>
            )}
          </button>
        </div>

        {/* Right Column: Map Locator */}
        <div className="flex flex-col gap-4 h-[500px] lg:h-auto">
          <div className="space-y-1">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Location Coordinates</label>
            <p className="text-white/60 text-xs">Click anywhere on the map to set the exact location pin, or paste coordinates below.</p>
            <input 
              type="text" 
              placeholder="e.g. 19.9975, 73.7898" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors mt-2 text-sm font-mono"
              value={location ? `${location[0]}, ${location[1]}` : ""}
              onChange={(e) => {
                const parts = e.target.value.split(',');
                if (parts.length === 2) {
                  const lat = parseFloat(parts[0].trim());
                  const lng = parseFloat(parts[1].trim());
                  if (!isNaN(lat) && !isNaN(lng)) {
                    setLocation([lat, lng]);
                  }
                } else if (e.target.value.trim() === '') {
                  setLocation(null);
                }
              }}
            />
          </div>
          <div className={`flex-1 rounded-xl overflow-hidden border transition-colors ${location ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-white/10'}`}>
            <LocationPickerMap 
              onLocationSelect={(lat, lng) => setLocation([lat, lng])} 
              location={location}
            />
          </div>
          {location && (
            <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 text-xs text-emerald-400 font-mono">
              <span>Lat: {location[0].toFixed(6)}</span>
              <span>Lng: {location[1].toFixed(6)}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
