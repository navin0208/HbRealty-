"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building, UserPlus, Map } from "lucide-react";
import MapWrapper from "@/components/map/MapWrapper";
import PropertyInquiryForm from "@/components/forms/PropertyInquiryForm";

type Tab = "buy" | "sell" | "developers";

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("buy");

  const tabs = [
    { id: "buy", label: "Buy Properties", icon: <Map size={16} /> },
    { id: "sell", label: "Sell Your Property", icon: <Building size={16} /> },
    { id: "developers", label: "For Developers", icon: <UserPlus size={16} /> },
  ] as const;

  return (
    <main className="min-h-screen bg-[#031525] font-sans selection:bg-white text-[#062B4A]/30 selection:text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#062B4A]/50 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 text-white/50 hover:text-[#A98B55] transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Back to Main</span>
          </Link>
          <div className="flex items-center gap-3">
             <div className="h-1.5 w-1.5 rounded-full bg-white text-[#062B4A] animate-pulse" />
             <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">Real Estate Portal</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto min-h-screen flex flex-col">
        
        {/* Page Header & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Property <br/>
              <span className="font-serif italic font-normal text-zinc-500 lowercase">Exchange</span>
            </h1>
            <p className="text-white/40 text-lg max-w-xl font-light">
              Explore premium grade-A warehousing, industrial land, or connect with us to list your property or form strategic developer partnerships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`relative px-6 py-3 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab.id ? "text-black" : "text-white/60 hover:text-[#A98B55]"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-white rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon} {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              {activeTab === "buy" && (
                <div className="w-full h-full min-h-[600px]">
                  <MapWrapper />
                </div>
              )}
              
              {activeTab === "sell" && (
                <div className="py-12">
                  <PropertyInquiryForm type="sell" />
                </div>
              )}

              {activeTab === "developers" && (
                <div className="py-12">
                  <PropertyInquiryForm type="developer" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
