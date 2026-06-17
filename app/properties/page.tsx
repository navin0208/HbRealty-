"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building, UserPlus, Map, Menu, X } from "lucide-react";
import MapWrapper from "@/components/map/MapWrapper";
import PropertyInquiryForm from "@/components/forms/PropertyInquiryForm";

type Tab = "buy" | "sell" | "developers";

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("buy");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "buy", label: "Buy Properties", icon: <Map size={16} /> },
    { id: "sell", label: "Sell Your Property", icon: <Building size={16} /> },
    { id: "developers", label: "For Developers", icon: <UserPlus size={16} /> },
  ] as const;

  return (
    <main className="min-h-screen bg-[#06111C] font-sans selection:bg-[#A98B55] selection:text-white text-white/60">
      {/* Navigation Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#06111C]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center relative">
          <Link href="/" className="flex items-center gap-4 text-white/60 hover:text-[#A98B55] transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] hidden sm:block">Back to Main</span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] sm:hidden">Back</span>
          </Link>

          {/* Desktop Badge */}
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
             <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
             <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.4em]">Real Estate Portal</span>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden relative">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            
            {/* Mobile Dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-14 right-0 w-[220px] bg-[#06111C]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 overflow-hidden z-50"
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as Tab);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-xl flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        activeTab === tab.id ? "bg-white text-[#06111C]" : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-28 md:pt-32 pb-20 px-4 md:px-6 max-w-[1600px] mx-auto min-h-screen flex flex-col">
        
        {/* Page Header & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Property <br/>
              <span className="font-serif italic font-normal text-[#A98B55] lowercase">Exchange</span>
            </h1>
            <p className="text-white/60 text-sm md:text-lg max-w-xl font-light">
              Explore premium grade-A warehousing, industrial land, or connect with us to list your property or form strategic developer partnerships.
            </p>
          </div>

          <div className="hidden md:flex flex-row overflow-x-auto no-scrollbar w-auto items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`relative px-4 md:px-6 py-3 rounded-xl flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "text-[#06111C]" : "text-white/60 hover:text-white"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.4)]"
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
                <div className="w-full h-full md:min-h-[600px]">
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
