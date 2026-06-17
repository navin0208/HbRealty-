"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Layers, Sparkles, CheckCircle2 } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path issues in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface Property {
  id: string;
  title: string;
  type: string;
  price: string;
  size: string;
  location: [number, number];
  image: string;
  status?: "available" | "sold";
  isVerified?: boolean;
  isPremium?: boolean;
}

const MAP_LAYERS = {
  satellite: { name: "Satellite", url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" },
  terrain: { name: "Terrain", url: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" },
  standard: { name: "Standard", url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" },
  clean: { name: "Clean", url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" }
};

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5,
    });
  }, [center, zoom, map]);
  return null;
}

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect: (p: Property) => void;
  selectedProperty: Property | null;
}

export default function PropertyMap({ properties, onPropertySelect, selectedProperty }: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);
  const [activeLayer, setActiveLayer] = useState<keyof typeof MAP_LAYERS>("satellite");
  const [layersOpen, setLayersOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const center: [number, number] = selectedProperty ? selectedProperty.location : [19.9975, 73.7898];
  const zoom = selectedProperty ? 15 : 12;

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative z-0 group">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full rounded-[20px] overflow-hidden border border-black/5 z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          url={MAP_LAYERS[activeLayer].url}
          maxZoom={20}
        />
        <MapController center={center} zoom={zoom} />

        {properties.map((prop) => (
          <Marker
            key={prop.id}
            position={prop.location}
            icon={customIcon}
            eventHandlers={{
              click: () => onPropertySelect(prop)
            }}
          >
            <Popup className="custom-popup">
              <div className={`w-[200px] overflow-hidden rounded-xl bg-white/95 backdrop-blur-md border ${prop.isPremium ? 'border-[#A98B55] shadow-[0_10px_30px_rgba(169,139,85,0.2)]' : 'border-black/5 shadow-2xl'} text-[#062B4A] p-0 m-0 relative`}>
                <div className="relative">
                  <img src={prop.image} alt={prop.title} className={`w-full h-[120px] object-cover ${prop.status === 'sold' ? 'brightness-[0.7] grayscale' : ''}`} />
                  {prop.isPremium && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-gradient-to-r from-[#A98B55] to-[#BFA16B] rounded shadow-lg text-[8px] font-bold uppercase tracking-widest text-white flex items-center gap-1 z-10">
                      <Sparkles size={8} /> Premium
                    </div>
                  )}
                  {prop.status === 'sold' && (
                    <div className={`absolute top-2 px-2 py-0.5 bg-red-600 text-white text-[8px] font-bold uppercase tracking-widest rounded z-10 ${prop.isPremium ? 'left-2' : 'right-2'}`}>
                      SOLD
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A98B55]">{prop.type}</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <h4 className="text-sm font-bold line-clamp-1 text-[#062B4A]">{prop.title}</h4>
                    {prop.isVerified && <CheckCircle2 size={12} className="text-blue-500 shrink-0" />}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#062B4A]/50 text-xs font-mono">{prop.size}</span>
                    <span className="text-[#062B4A] font-bold text-sm">{prop.price}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom Premium Layer Controls OVER the map */}
      <div className="absolute top-4 right-4 z-[9999] flex flex-col items-end gap-2 pointer-events-auto">
        <button
          onClick={() => setLayersOpen(!layersOpen)}
          className={`w-10 h-10 md:w-11 md:h-11 bg-white/95 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center text-[#062B4A] border cursor-pointer transition-all ${
            layersOpen ? "border-[#062B4A]" : "border-black/10 hover:bg-white hover:border-black/20"
          }`}
        >
          <Layers size={20} />
        </button>

        {layersOpen && (
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-black/10 p-2 flex flex-col gap-1 w-36 overflow-hidden">
            {Object.entries(MAP_LAYERS).map(([key, layer]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveLayer(key as keyof typeof MAP_LAYERS);
                  setLayersOpen(false);
                }}
                className={`px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                  activeLayer === key
                    ? "bg-[#062B4A] text-white"
                    : "text-[#062B4A] hover:bg-black/5"
                }`}
              >
                {layer.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .leaflet-popup-tip {
          background: white !important;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .leaflet-container {
          background: #f8fafc;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}

