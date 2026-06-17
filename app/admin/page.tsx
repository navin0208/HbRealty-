"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, Shield, ExternalLink, RefreshCw, AlertCircle, Building2, MapPin, CheckCircle, XCircle, Edit, CheckCircle2, Sparkles, FileText } from "lucide-react";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/map/PropertyMap"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-100 rounded-3xl animate-pulse text-xs uppercase tracking-widest text-zinc-400">Loading Map...</div> 
});

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

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Fetch properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data = await res.json();
      setProperties(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Unable to load properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Toggle status
  const handleToggleStatus = async (id: string, currentStatus?: 'available' | 'sold') => {
    const nextStatus = currentStatus === 'sold' ? 'available' : 'sold';
    setActionId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });

      if (!res.ok) throw new Error("Failed to update property status");
      
      // Update state locally
      setProperties(prev => prev.map(p => p.id === id ? { ...p, status: nextStatus } : p));
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setActionId(null);
    }
  };

  // Delete property
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setActionId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete property");
      
      // Update state locally
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setActionId(null);
    }
  };

  // Helper stats
  const totalListings = properties.length;
  const soldCount = properties.filter(p => p.status === 'sold').length;
  const availableCount = totalListings - soldCount;

  return (
    <main className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#062B4A] selection:text-white text-[#062B4A]">
      
      {/* ═══ ADMIN NAVBAR ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#062B4A]/10 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#062B4A] flex items-center justify-center text-white">
                <Shield size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#062B4A]">HB Realty Admin</span>
            </div>
            
            <div className="hidden md:flex items-center gap-2 border-l border-[#062B4A]/10 pl-6">
              <Link href="/admin" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg bg-[#062B4A]/5 text-[#062B4A] transition-colors">Properties</Link>
              <Link href="/admin/blogs" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg text-[#062B4A]/60 hover:bg-[#062B4A]/5 transition-colors">Blogs</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/properties" 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#062B4A]/60 hover:text-[#062B4A] transition-colors"
            >
              Public Portal <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto space-y-12">
        
        {/* Header Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#062B4A]/10 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#A98B55]/10 border border-[#A98B55]/20 px-3 py-1 rounded-full text-[#A98B55] text-[9px] font-bold uppercase tracking-widest">
              Overview & Control
            </div>
            <h1 className="text-4xl md:text-[54px] font-medium tracking-tight leading-none text-[#062B4A]">
              Property <span className="font-serif italic text-[#A98B55]">Console</span>
            </h1>
            <p className="text-[#062B4A]/60 font-light text-base max-w-xl">
              Create, update, delete, or change availability flags for listings inside the database. Real-time updates automatically publish across the portal map.
            </p>
          </div>
          <Link
            href="/admin/add-property"
            className="inline-flex items-center gap-3 bg-[#A98B55] text-white hover:bg-[#A98B55]/90 transition-colors font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-4 rounded-xl shadow-lg shadow-[#A98B55]/10"
          >
            <Plus size={14} /> Add Property
          </Link>
        </div>

        {/* Map View */}
        <div className="h-[400px] w-full bg-white border border-[#062B4A]/10 rounded-[30px] p-2 shadow-[0_10px_30px_rgba(6,43,74,0.02)]">
          <PropertyMap 
            properties={properties} 
            selectedProperty={selectedProperty} 
            onPropertySelect={(p) => setSelectedProperty(p)} 
          />
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-[#062B4A]/10 p-6 rounded-2xl flex flex-col justify-between shadow-[0_10px_30px_rgba(6,43,74,0.02)]">
            <span className="text-[#062B4A]/40 text-[10px] font-bold uppercase tracking-wider">Total Listings</span>
            <span className="text-4xl font-light text-[#062B4A] mt-4">{loading ? "..." : totalListings}</span>
          </div>
          <div className="bg-white border border-[#062B4A]/10 p-6 rounded-2xl flex flex-col justify-between shadow-[0_10px_30px_rgba(6,43,74,0.02)]">
            <span className="text-[#062B4A]/40 text-[10px] font-bold uppercase tracking-wider">Active Available</span>
            <span className="text-4xl font-light text-[#062B4A] mt-4">{loading ? "..." : availableCount}</span>
          </div>
          <div className="bg-white border border-[#062B4A]/10 p-6 rounded-2xl flex flex-col justify-between shadow-[0_10px_30px_rgba(6,43,74,0.02)]">
            <span className="text-[#062B4A]/40 text-[10px] font-bold uppercase tracking-wider">Marked Sold</span>
            <span className="text-4xl font-light text-[#A98B55] mt-4">{loading ? "..." : soldCount}</span>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <p>{error}</p>
            <button onClick={fetchProperties} className="ml-auto text-xs font-bold underline uppercase tracking-wider flex items-center gap-1.5 hover:text-red-950">
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {/* Listings Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-[#062B4A]/10 border-t-[#A98B55] animate-spin" />
            <span className="text-xs uppercase tracking-widest text-[#062B4A]/50">Loading database entries...</span>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#062B4A]/10 rounded-[30px] flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#062B4A]/40">
              <Building2 size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-[#062B4A]">No Listings Found</h3>
              <p className="text-[#062B4A]/60 font-light text-sm max-w-sm">The properties database is currently empty. Get started by adding your first listing.</p>
            </div>
            <Link
              href="/admin/add-property"
              className="inline-flex items-center gap-2 bg-[#062B4A] text-white hover:bg-[#062B4A]/90 transition-colors font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-3.5 rounded-xl"
            >
              Add Property
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-[#062B4A]/10 rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(6,43,74,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#062B4A]/10 bg-[#062B4A]/5 text-[#062B4A]/60 text-[10px] font-bold uppercase tracking-widest">
                    <th className="py-5 px-6">Image</th>
                    <th className="py-5 px-6">Property Detail</th>
                    <th className="py-5 px-6">Type & Size</th>
                    <th className="py-5 px-6">Price</th>
                    <th className="py-5 px-6">Status</th>
                    <th className="py-5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#062B4A]/5">
                  {properties.map((p) => {
                    const isUpdating = actionId === p.id;
                    const isSold = p.status === 'sold';
                    return (
                      <tr key={p.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 border border-[#062B4A]/10 shadow-inner">
                            <Image 
                              src={p.image} 
                              alt={p.title} 
                              fill 
                              className="object-cover" 
                              unoptimized
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-[#062B4A] truncate" title={p.title}>{p.title}</div>
                            {p.isVerified && <span title="Verified"><CheckCircle2 size={12} className="text-blue-500 shrink-0" /></span>}
                            {p.isPremium && <span title="Premium"><Sparkles size={12} className="text-[#A98B55] shrink-0" /></span>}
                          </div>
                          <div className="flex items-center gap-1 text-[#062B4A]/40 text-xs font-mono mt-1">
                            <MapPin size={10} />
                            <span>{p.location ? `${p.location[0].toFixed(4)}, ${p.location[1].toFixed(4)}` : "No Coordinates"}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block px-2.5 py-1 bg-[#062B4A]/5 text-[#062B4A]/80 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            {p.type}
                          </span>
                          <div className="text-xs font-light text-[#062B4A]/60 mt-1">{p.size}</div>
                        </td>
                        <td className="py-4 px-6 font-bold text-[#062B4A]">{p.price}</td>
                        <td className="py-4 px-6">
                          {isSold ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              Sold
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Available
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              disabled={isUpdating}
                              onClick={() => handleToggleStatus(p.id, p.status)}
                              className={`px-4 py-2 border rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50 ${
                                isSold 
                                  ? 'border-[#062B4A]/20 hover:bg-[#062B4A] hover:text-white text-[#062B4A]/80' 
                                  : 'border-[#A98B55] hover:bg-[#A98B55] hover:text-white text-[#A98B55]'
                              }`}
                            >
                              {isUpdating ? "Updating..." : (isSold ? "Mark Available" : "Mark Sold")}
                            </button>
                            <Link
                              href={`/admin/proposal/${p.id}`}
                              className="p-2 border border-[#A98B55]/20 hover:border-[#A98B55] hover:bg-[#A98B55] text-[#A98B55] hover:text-white rounded-lg transition-colors"
                              title="Generate Proposal PDF"
                            >
                              <FileText size={14} />
                            </Link>
                            <Link
                              href={`/admin/edit-property/${p.id}`}
                              className="p-2 border border-[#062B4A]/20 hover:border-[#062B4A] hover:bg-[#062B4A] text-[#062B4A]/80 hover:text-white rounded-lg transition-colors"
                              title="Edit Listing"
                            >
                              <Edit size={14} />
                            </Link>
                            <button
                              disabled={isUpdating}
                              onClick={() => handleDelete(p.id, p.title)}
                              className="p-2 border border-red-200 hover:border-red-500 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete Listing"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
