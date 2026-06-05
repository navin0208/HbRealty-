"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Maximize, ArrowRight, X } from "lucide-react";
import type { Property } from "./PropertyMap";

// Dynamic import of the map to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-white/50"><div className="w-8 h-8 border-4 border-white/50/30 border-t-white rounded-full animate-spin" /></div> });

export default function MapWrapper() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-center h-[800px] w-full bg-zinc-50 rounded-[40px] border border-[#062B4A]/10">
        <div className="text-[#062B4A]/50 animate-pulse text-sm tracking-widest uppercase">Loading Properties...</div>
      </div>
    );
  }


  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-[700px] lg:h-[800px] w-full bg-white/5 backdrop-blur-xl p-3 md:p-4 rounded-[24px] md:rounded-[40px] border border-white/10 shadow-2xl overflow-hidden relative">
      
      {/* Sidebar: Property List */}
      <div className="w-full lg:w-[450px] h-[300px] lg:h-full flex flex-col gap-4 overflow-hidden relative order-2 lg:order-1 shrink-0 z-10">
        <div className="p-4 md:p-6 pb-2 md:pb-4 bg-[#06111C]/80 backdrop-blur-md rounded-[16px] md:rounded-[20px] border border-white/10 shrink-0 shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tighter uppercase">Available Listings</h2>
          <p className="text-[#A98B55] text-[10px] md:text-xs mt-1 tracking-widest uppercase font-bold">Browse our exclusive verified properties</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {properties.map((prop) => (
            <motion.div 
              key={prop.id}
              whileHover={{ scale: 0.98 }}
              onClick={() => setSelectedProperty(prop)}
              className={`cursor-pointer rounded-[16px] md:rounded-[20px] overflow-hidden border transition-all duration-300 ${
                selectedProperty?.id === prop.id 
                  ? 'border-[#A98B55] bg-[#A98B55]/10' 
                  : 'border-white/5 bg-[#06111C]/50 hover:bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="h-[160px] w-full relative">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className={`w-full h-full object-cover transition-all ${prop.status === 'sold' ? 'brightness-[0.4] grayscale' : ''}`} 
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#062B4A]/80 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/90">
                  {prop.type}
                </div>
                {prop.status === 'sold' && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white">
                    SOLD
                  </div>
                )}
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-white font-bold text-base md:text-lg leading-tight mb-3">{prop.title}</h3>
                <div className="flex items-center gap-4 text-white/50 text-[10px] md:text-xs mb-4">
                  <div className="flex items-center gap-1.5"><Maximize size={14} className="text-[#A98B55]" /> {prop.size}</div>
                  <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#A98B55]" /> Nashik</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg md:text-xl font-bold tracking-tight">{prop.price}</span>
                  <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#A98B55] hover:border-[#A98B55] transition-colors">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Area: Map */}
      <div className="flex-1 w-full h-[400px] lg:h-full relative rounded-[20px] lg:rounded-[30px] overflow-hidden border border-white/10 shadow-inner order-1 lg:order-2">
        <PropertyMap properties={properties} onPropertySelect={setSelectedProperty} selectedProperty={selectedProperty} />
        
        {/* Floating Contact CTA if a property is selected */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-[#06111C]/95 backdrop-blur-xl border border-white/15 p-3 lg:p-4 rounded-2xl flex items-center gap-4 lg:gap-6 shadow-2xl z-[1000] w-[90%] max-w-[400px] lg:max-w-max lg:w-auto"
            >
              <div className="text-white flex-1 min-w-0">
                <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-[#A98B55] mb-0.5 lg:mb-1">
                  {selectedProperty.status === 'sold' ? 'Sold Out' : 'Interested?'}
                </p>
                <p className="text-xs lg:text-sm font-medium truncate">{selectedProperty.title}</p>
              </div>
              {selectedProperty.status === 'sold' ? (
                <button disabled className="px-4 lg:px-6 py-2 lg:py-2.5 bg-white/5 border border-white/10 text-white/40 text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-xl cursor-not-allowed shrink-0">
                  Sold Out
                </button>
              ) : (
                <button className="px-4 lg:px-6 py-2 lg:py-2.5 bg-[#A98B55] text-[#06111C] text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#A98B55]/90 transition-colors shrink-0">
                  Contact Agent
                </button>
              )}
              <button 
                onClick={() => setSelectedProperty(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-[#A98B55] transition-colors absolute -top-3 -right-3 border border-white/20"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
