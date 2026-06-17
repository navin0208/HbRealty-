"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Send, MapPin, Building2, Image as ImageIcon, Maximize, CheckCircle2, AlertCircle } from "lucide-react";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center bg-[#FAF9F6] text-[#062B4A]/50 animate-pulse text-xs uppercase tracking-widest border border-[#062B4A]/10 rounded-xl">Loading Map...</div> });

interface Property {
  id: string;
  title: string;
  type: string;
  price: string;
  size: string;
  location: [number, number];
  image: string;
  status?: 'available' | 'sold';
  isVerified?: boolean;
  isPremium?: boolean;
}

export default function AdminPropertyForm({ initialData }: { initialData?: Property }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState<[number, number] | null>(initialData?.location || null);

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
        location: location,
        status: "available",
        isVerified: formData.get("isVerified") === "on",
        isPremium: formData.get("isPremium") === "on"
      };

    const isEditing = !!initialData;
    const url = isEditing ? `/api/properties/${initialData.id}` : "/api/properties";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setMessage(`Property ${isEditing ? 'updated' : 'listed'} successfully!`);
        if (!isEditing) {
          (e.target as HTMLFormElement).reset();
          setLocation(null);
        }
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
      <div className="bg-white border border-[#062B4A]/10 p-12 rounded-[30px] flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto w-full shadow-[0_20px_50px_rgba(6,43,74,0.05)]">
        <div className="w-20 h-20 bg-[#A98B55]/10 text-[#A98B55] rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-medium text-[#062B4A] tracking-tight">Property Listed</h3>
        <p className="text-[#062B4A]/60 font-light text-lg">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
          <button 
            onClick={() => {
              setStatus("idle");
              if (!initialData) setLocation(null);
            }}
            className="px-8 py-3.5 bg-[#FAF9F6] text-[#062B4A] border border-[#062B4A]/10 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#062B4A]/5 transition-colors"
          >
            {initialData ? 'Continue Editing' : 'Add Another Listing'}
          </button>
          <Link 
            href="/admin"
            className="px-8 py-3.5 bg-[#A98B55] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#A98B55]/90 transition-colors inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#062B4A]/10 p-8 md:p-12 rounded-[30px] max-w-5xl mx-auto w-full relative overflow-hidden shadow-[0_20px_50px_rgba(6,43,74,0.05)]">
      <div className="relative z-10 mb-10">
        <h3 className="text-3xl md:text-5xl font-medium text-[#062B4A] tracking-tight mb-4">{initialData ? 'Edit Listing' : 'Add Listing'}</h3>
        <p className="text-[#062B4A]/60 font-light text-sm md:text-base">
          {initialData ? 'Update property details and location below.' : 'Enter property details and drop a pin on the map to publish it immediately.'}
        </p>
      </div>

      {status === "error" && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p>{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Form Fields */}
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={12} /> Property Title</label>
            <input required type="text" name="title" defaultValue={initialData?.title} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30" placeholder="e.g. Prime Industrial Plot" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Building2 size={12} /> Type</label>
              <select name="type" defaultValue={initialData?.type || "Industrial Land"} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A]/80 focus:outline-none focus:border-[#062B4A]/40 transition-colors appearance-none">
                <option value="Industrial Land" className="bg-white text-[#062B4A]">Industrial Land</option>
                <option value="Warehouse" className="bg-white text-[#062B4A]">Warehouse</option>
                <option value="Agricultural" className="bg-white text-[#062B4A]">Agricultural</option>
                <option value="Residential" className="bg-white text-[#062B4A]">Residential</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Price</label>
              <input required type="text" name="price" defaultValue={initialData?.price} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30" placeholder="e.g. ₹12 Cr" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Maximize size={12} /> Size</label>
            <input required type="text" name="size" defaultValue={initialData?.size} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30" placeholder="e.g. 5 Acres" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-6 h-6 rounded border border-[#062B4A]/20 bg-[#FAF9F6] group-hover:border-[#062B4A]/40 transition-colors">
                <input type="checkbox" name="isVerified" defaultChecked={initialData?.isVerified} className="peer opacity-0 absolute inset-0 cursor-pointer" />
                <CheckCircle2 size={14} className="text-[#A98B55] opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-[#062B4A]/80 text-[10px] font-bold uppercase tracking-widest">Verified Badge</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-6 h-6 rounded border border-[#062B4A]/20 bg-[#FAF9F6] group-hover:border-[#062B4A]/40 transition-colors">
                <input type="checkbox" name="isPremium" defaultChecked={initialData?.isPremium} className="peer opacity-0 absolute inset-0 cursor-pointer" />
                <CheckCircle2 size={14} className="text-[#A98B55] opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-[#062B4A]/80 text-[10px] font-bold uppercase tracking-widest">Premium Property</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12} /> Image URL</label>
            <input type="url" name="image" defaultValue={initialData?.image} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30" placeholder="Optional: https://..." />
          </div>
          
          <button 
            disabled={status === "loading"}
            type="submit" 
            className="w-full bg-[#A98B55] text-white font-bold uppercase tracking-[0.2em] text-[10px] py-5 rounded-xl hover:bg-[#A98B55]/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {status === "loading" ? "Saving..." : (
              <>{initialData ? 'Update Property' : 'Publish Property'} <Send size={14} /></>
            )}
          </button>
        </div>

        {/* Right Column: Map Locator */}
        <div className="flex flex-col gap-4 h-[500px] lg:h-auto">
          <div className="space-y-1">
            <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Location Coordinates</label>
            <p className="text-[#062B4A]/60 text-xs font-light">Click anywhere on the map to set the exact location pin, or paste coordinates below.</p>
            <input 
              type="text" 
              placeholder="e.g. 19.9975, 73.7898" 
              className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors mt-2 text-sm font-mono"
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
            
            <div className="mt-4 border-t border-[#062B4A]/10 pt-4">
              <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Extract from Google Maps Link</label>
              <input 
                type="url" 
                placeholder="Paste Google Maps URL here... (e.g. https://www.google.com/maps/place/.../@19.99,73.78)" 
                className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors mt-2 text-xs"
                onChange={(e) => {
                  const url = e.target.value;
                  // Regex to match @lat,lng from Google Maps Long URLs
                  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
                  if (match) {
                    const lat = parseFloat(match[1]);
                    const lng = parseFloat(match[2]);
                    if (!isNaN(lat) && !isNaN(lng)) {
                      setLocation([lat, lng]);
                      // Flash success feedback visually by clearing and showing coordinates
                      e.target.value = '';
                      setMessage("Coordinates successfully extracted from link!");
                    }
                  } else if (url.includes("goo.gl") || url.includes("maps.app.goo.gl")) {
                    setMessage("Short links (goo.gl) require you to open them first. Please open the link in your browser, and paste the FULL expanded URL here.");
                  }
                }}
              />
              <p className="text-[#062B4A]/40 text-[10px] mt-2 leading-tight">
                Tip: If using a short link (goo.gl), open it in your browser first and copy the full URL containing the "@" coordinates.
              </p>
            </div>
          </div>
          <div className={`flex-1 rounded-xl overflow-hidden border transition-colors min-h-[300px] ${location ? 'border-[#062B4A]/40 shadow-[0_0_20px_rgba(6,43,74,0.08)]' : 'border-[#062B4A]/10'}`}>
            <LocationPickerMap 
              onLocationSelect={(lat, lng) => setLocation([lat, lng])} 
              location={location}
            />
          </div>
          {location && (
            <div className="flex justify-between items-center bg-[#062B4A]/5 p-3 rounded-lg border border-[#062B4A]/10 text-xs text-[#062B4A]/80 font-mono">
              <span>Lat: {location[0].toFixed(6)}</span>
              <span>Lng: {location[1].toFixed(6)}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
