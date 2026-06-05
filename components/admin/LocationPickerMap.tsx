"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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
  const defaultCenter = location || [19.9975, 73.7898]; // Default Nashik
  const position = location ? new L.LatLng(location[0], location[1]) : null;

  const handlePositionChange = (pos: L.LatLng) => {
    onLocationSelect(pos.lat, pos.lng);
  };

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        scrollWheelZoom={true} 
        className="w-full h-full rounded-xl overflow-hidden border border-white/10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapController center={location} />
        <LocationMarker position={position} onMapClick={handlePositionChange} />
      </MapContainer>
      
      <style jsx global>{`
        .leaflet-container {
          background: #f4f4f5;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
