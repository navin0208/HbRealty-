"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
}


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
  const center: [number, number] = selectedProperty ? selectedProperty.location : [19.9975, 73.7898];
  const zoom = selectedProperty ? 15 : 12;

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full rounded-[20px] overflow-hidden border border-white/10"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme map
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
              <div className="w-[200px] overflow-hidden rounded-xl bg-zinc-900 border border-white/10 text-white p-0 m-0 shadow-2xl">
                <img src={prop.image} alt={prop.title} className="w-full h-[120px] object-cover" />
                <div className="p-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500">{prop.type}</span>
                  <h4 className="text-sm font-bold mt-1 line-clamp-1">{prop.title}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/60 text-xs font-mono">{prop.size}</span>
                    <span className="text-white font-bold">{prop.price}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .leaflet-popup-tip {
          background: #18181b !important; /* bg-zinc-900 */
          border: 1px solid rgba(255,255,255,0.1);
        }
        .leaflet-container {
          background: #000;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}

