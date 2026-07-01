"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { MapPin, Maximize, ArrowRight, X, CheckCircle2, Sparkles, ChevronUp, GripHorizontal } from "lucide-react";
import type { Property } from "./PropertyMap";

// Dynamic import of the map to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-white/50"><div className="w-8 h-8 border-4 border-white/50/30 border-t-white rounded-full animate-spin" /></div> });

export default function MapWrapper() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [intentFilter, setIntentFilter] = useState<"All" | "Buy" | "Rent" | "Lease">("All");
  const dragControls = useDragControls();

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load properties", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[700px] lg:h-[800px] w-full bg-zinc-50 rounded-[40px] border border-[#062B4A]/10">
        <div className="text-[#062B4A]/50 animate-pulse text-sm tracking-widest uppercase">Loading Properties...</div>
      </div>
    );
  }

  const filteredProperties = intentFilter === "All" 
    ? properties 
    : properties.filter(p => (p as any).intent === intentFilter);

  const renderPropertyCard = (prop: Property) => (
    <motion.div 
      key={prop.id}
      whileHover={{ scale: 0.98 }}
      onClick={() => setSelectedProperty(prop)}
      className={`cursor-pointer rounded-[16px] md:rounded-[20px] overflow-hidden border transition-all duration-500 ease-out transform shrink-0 ${
        selectedProperty?.id === prop.id 
          ? prop.isPremium 
            ? 'border-[#A98B55] bg-gradient-to-b from-[#A98B55]/10 to-white shadow-[0_0_40px_rgba(169,139,85,0.4)] scale-[1.02]' 
            : 'border-[#062B4A] bg-white shadow-2xl scale-[1.02]' 
          : prop.isPremium
            ? 'border-[#A98B55]/30 bg-gradient-to-b from-[#A98B55]/5 to-white/90 hover:bg-white hover:border-[#A98B55]/60 hover:shadow-[0_10px_30px_rgba(169,139,85,0.15)]'
            : 'border-black/5 bg-white/90 hover:bg-white hover:border-black/10 hover:shadow-xl'
      }`}
    >
      <div className="h-[140px] md:h-[160px] w-full relative">
        <img 
          src={prop.image} 
          alt={prop.title} 
          className={`w-full h-full object-cover transition-all ${prop.status === 'sold' ? 'brightness-[0.4] grayscale' : ''}`} 
        />
        <div className="absolute top-3 md:top-4 left-3 md:left-4 px-2 md:px-3 py-1 bg-[#062B4A]/80 backdrop-blur-md rounded-full border border-white/10 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white/90">
          {prop.type}
        </div>
        {prop.isPremium && (
          <div className="absolute top-3 md:top-4 right-3 md:right-4 px-2 md:px-3 py-1 bg-gradient-to-r from-[#A98B55] to-[#BFA16B] rounded-full shadow-lg text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5 z-10 border border-white/20">
            <Sparkles size={10} className="text-white/90" /> Premium
          </div>
        )}
        {prop.status === 'sold' && (
          <div className={`absolute top-3 md:top-4 px-2 md:px-3 py-1 bg-red-600 rounded-full border border-white/10 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white z-10 ${prop.isPremium ? 'right-24 md:right-28' : 'right-3 md:right-4'}`}>
            SOLD
          </div>
        )}
      </div>
      <div className="p-3 md:p-6 relative">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[#062B4A] font-bold text-sm md:text-lg leading-tight line-clamp-1">{prop.title}</h3>
          {prop.isVerified && (
            <div className="flex items-center gap-1 shrink-0 px-1.5 py-0.5 bg-green-500/10 rounded border border-green-500/20" title="Verified Property">
              <CheckCircle2 size={12} className="text-green-500 md:w-3 md:h-3" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-green-600">Verified</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-[#062B4A]/60 text-[9px] md:text-xs mb-3 md:mb-5 font-medium">
          <div className="flex items-center gap-1.5"><Maximize size={12} className="text-[#A98B55]" /> {prop.size}</div>
          <div className="flex items-center gap-1.5"><MapPin size={12} className="text-[#A98B55]" /> Nashik</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#062B4A] text-base md:text-xl font-bold tracking-tight">{prop.price}</span>
          <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-100 border border-black/5 flex items-center justify-center text-[#062B4A] hover:bg-[#A98B55] hover:text-white transition-colors">
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative h-[65vh] min-h-[450px] lg:h-[800px] w-full bg-white/5 backdrop-blur-xl rounded-[24px] md:rounded-[40px] border border-white/10 shadow-2xl overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <PropertyMap properties={filteredProperties} onPropertySelect={setSelectedProperty} selectedProperty={selectedProperty} />
      </div>

      {/* Desktop Sidebar (lg and up) */}
      <div className="hidden lg:flex absolute left-4 top-4 bottom-4 w-[450px] flex-col gap-4 overflow-hidden z-10 pointer-events-none">
        <div className="p-6 pb-4 bg-[#06111C]/90 backdrop-blur-md rounded-[20px] border border-white/10 shrink-0 shadow-2xl pointer-events-auto">
          <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">Available Listings</h2>
          <p className="text-[#A98B55] text-xs mt-1 tracking-widest uppercase font-bold mb-4">Browse our exclusive verified properties</p>
          <div className="flex bg-white/10 p-1 rounded-xl">
            {["All", "Buy", "Rent", "Lease"].map(filter => (
              <button
                key={filter}
                onClick={() => setIntentFilter(filter as any)}
                className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-colors ${
                  intentFilter === filter ? "bg-white text-[#06111C]" : "text-white/60 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar pointer-events-auto">
          {filteredProperties.map(renderPropertyCard)}
        </div>
      </div>

      {/* Mobile Bottom Sheet (up to lg) */}
      <motion.div 
        drag="y"
        dragControls={dragControls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y < -50) setIsMobileListOpen(true);
          if (info.offset.y > 50) setIsMobileListOpen(false);
        }}
        initial={{ y: "calc(100% - 90px)" }}
        animate={{ y: isMobileListOpen ? 0 : "calc(100% - 90px)" }}
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        className="lg:hidden absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-2xl rounded-t-[30px] border-t border-[#062B4A]/10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[85%]"
      >
        {/* Drag Handle & Header */}
        <div 
          className="p-4 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border-b border-[#062B4A]/5 shrink-0"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <GripHorizontal size={24} className="text-[#062B4A]/20 mb-2" />
          <div className="flex items-center justify-between w-full px-2">
            <div>
              <h2 className="text-lg font-bold text-[#062B4A] tracking-tighter uppercase leading-none">Available Listings</h2>
              <p className="text-[#A98B55] text-[9px] mt-1 tracking-widest uppercase font-bold">{filteredProperties.length} Properties Found</p>
            </div>
            <button 
              onClick={() => setIsMobileListOpen(!isMobileListOpen)}
              className="w-8 h-8 bg-[#062B4A]/5 rounded-full flex items-center justify-center text-[#062B4A]"
            >
              <ChevronUp size={16} className={`transition-transform duration-300 ${isMobileListOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="flex w-full mt-3 bg-[#062B4A]/5 p-1 rounded-xl">
            {["All", "Buy", "Rent", "Lease"].map(filter => (
              <button
                key={filter}
                onClick={() => setIntentFilter(filter as any)}
                className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-colors ${
                  intentFilter === filter ? "bg-[#062B4A] text-white" : "text-[#062B4A]/60 hover:text-[#062B4A]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-zinc-50/50">
          {filteredProperties.map(renderPropertyCard)}
        </div>
      </motion.div>
        
        {/* Floating Contact CTA if a property is selected */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl border border-black/10 p-3 lg:p-4 rounded-2xl flex items-center gap-4 lg:gap-6 shadow-2xl z-[1000] w-[90%] max-w-[400px] lg:max-w-max lg:w-auto"
            >
              <div className="text-[#062B4A] flex-1 min-w-0">
                <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-[#A98B55] mb-0.5 lg:mb-1">
                  {selectedProperty.status === 'sold' ? 'Sold Out' : 'Interested?'}
                </p>
                <p className="text-xs lg:text-sm font-medium truncate">{selectedProperty.title}</p>
              </div>
              {selectedProperty.status === 'sold' ? (
                <button disabled className="px-4 lg:px-6 py-2 lg:py-2.5 bg-black/5 border border-black/10 text-black/40 text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-xl cursor-not-allowed shrink-0">
                  Sold Out
                </button>
              ) : (
                <button className="px-4 lg:px-6 py-2 lg:py-2.5 bg-[#A98B55] text-white text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#A98B55]/90 transition-colors shrink-0">
                  Contact Agent
                </button>
              )}
              <button 
                onClick={() => setSelectedProperty(null)}
                className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/50 hover:text-red-500 transition-colors absolute -top-3 -right-3 border border-black/10 shadow-sm"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(169, 139, 85, 0.5);
        }
      `}</style>
    </div>
  );
}
