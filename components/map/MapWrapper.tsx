"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Maximize, ArrowRight, X } from "lucide-react";
import type { Property } from "./PropertyMap";

// Dynamic import of the map to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-white/50"><div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div> });

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
      <div className="flex items-center justify-center h-[800px] w-full bg-black rounded-[40px] border border-white/5">
        <div className="text-white/50 animate-pulse text-sm tracking-widest uppercase">Loading Properties...</div>
      </div>
    );
  }


  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[800px] w-full bg-black p-4 rounded-[40px] border border-white/5">
      
      {/* Sidebar: Property List */}
      <div className="w-full lg:w-[400px] h-full flex flex-col gap-4 overflow-hidden relative">
        <div className="p-6 pb-2 bg-zinc-950 rounded-[20px] border border-white/5 shrink-0">
          <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">Available Listings</h2>
          <p className="text-white/40 text-xs mt-1">Browse our exclusive verified properties</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {properties.map((prop) => (
            <motion.div 
              key={prop.id}
              whileHover={{ scale: 0.98 }}
              onClick={() => setSelectedProperty(prop)}
              className={`cursor-pointer rounded-[20px] overflow-hidden border transition-all duration-300 ${selectedProperty?.id === prop.id ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-zinc-950 hover:bg-zinc-900'}`}
            >
              <div className="h-[160px] w-full relative">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-amber-400">
                  {prop.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg leading-tight mb-3">{prop.title}</h3>
                <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
                  <div className="flex items-center gap-1.5"><Maximize size={14} /> {prop.size}</div>
                  <div className="flex items-center gap-1.5"><MapPin size={14} /> Nashik</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-xl font-bold tracking-tight">{prop.price}</span>
                  <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-colors">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Area: Map */}
      <div className="flex-1 h-full relative rounded-[30px] overflow-hidden">
        <PropertyMap properties={properties} onPropertySelect={setSelectedProperty} selectedProperty={selectedProperty} />
        
        {/* Floating Contact CTA if a property is selected */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-amber-500/30 p-4 rounded-2xl flex items-center gap-6 shadow-2xl z-[1000]"
            >
              <div className="text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-1">Interested?</p>
                <p className="text-sm font-medium">{selectedProperty.title}</p>
              </div>
              <button className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-colors shrink-0">
                Contact Agent
              </button>
              <button 
                onClick={() => setSelectedProperty(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors absolute -top-3 -right-3 border border-white/20"
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
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
