"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Layers } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  location: [number, number] | null;
}

const MAP_LAYERS = {
  satellite: { name: "Satellite", url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" },
  terrain: { name: "Terrain", url: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" },
  standard: { name: "Standard", url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" },
  clean: { name: "Clean", url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" }
};

function LocationMarker({ position, onMapClick }: { position: L.LatLng | null, onMapClick: (pos: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon} />
  );
}

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMapEvents({});
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function LocationPickerMap({ onLocationSelect, location }: LocationPickerProps) {
  const [activeLayer, setActiveLayer] = useState<keyof typeof MAP_LAYERS>("satellite");
  const [layersOpen, setLayersOpen] = useState(false);

  const defaultCenter = location || [19.9975, 73.7898]; // Default Nashik
  const position = location ? new L.LatLng(location[0], location[1]) : null;

  const handlePositionChange = (pos: L.LatLng) => {
    onLocationSelect(pos.lat, pos.lng);
  };

  return (
    <div className="w-full h-full relative z-0 group">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        scrollWheelZoom={true} 
        className="w-full h-full rounded-xl overflow-hidden border border-black/5 z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          url={MAP_LAYERS[activeLayer].url}
          maxZoom={20}
        />
        <MapController center={location} />
        <LocationMarker position={position} onMapClick={handlePositionChange} />
      </MapContainer>

      {/* Custom Premium Layer Controls OVER the map */}
      <div className="absolute top-4 right-4 z-[9999] flex flex-col items-end gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={() => setLayersOpen(!layersOpen)}
          className={`w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center text-[#062B4A] border cursor-pointer transition-all ${
            layersOpen ? "border-[#062B4A]" : "border-black/10 hover:bg-white hover:border-black/20"
          }`}
        >
          <Layers size={20} />
        </button>

        {layersOpen && (
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-black/10 p-2 flex flex-col gap-1 w-36 overflow-hidden">
            {Object.entries(MAP_LAYERS).map(([key, layer]) => (
              <button
                type="button"
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
        .leaflet-container {
          background: #f4f4f5;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
