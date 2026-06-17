"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Printer, ArrowLeft, Loader2, MapPin, Building2, Layers, IndianRupee } from "lucide-react";

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

export default function ProposalPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields state
  const [clientName, setClientName] = useState("Valued Client");
  const [customPrice, setCustomPrice] = useState("");
  const [customNotes, setCustomNotes] = useState("We are pleased to present this exclusive property proposal. Our team has carefully evaluated this listing and believes it perfectly aligns with your investment requirements.");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${params.id}`);
        if (!res.ok) throw new Error("Property not found");
        const data = await res.json();
        setProperty(data);
        setCustomPrice(data.price);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <Loader2 className="w-8 h-8 text-[#062B4A] animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
        <p className="text-xl text-[#062B4A]">Property not found</p>
        <button onClick={() => router.push('/admin')} className="mt-4 text-[#A98B55] underline text-sm font-bold uppercase tracking-wider">Back to Admin</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-200 py-10 font-sans print:py-0 print:bg-white text-[#062B4A]">
      {/* ═══ NON-PRINTABLE CONTROLS ═══ */}
      <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center print:hidden px-4 md:px-0">
        <button 
          onClick={() => router.push('/admin')}
          className="flex items-center gap-2 text-[#062B4A] hover:text-[#A98B55] transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#062B4A] text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-[#A98B55] transition-colors shadow-lg"
        >
          <Printer size={16} /> Download PDF
        </button>
      </div>

      <div className="max-w-[210mm] mx-auto mb-4 bg-yellow-50 text-yellow-800 text-xs p-3 rounded border border-yellow-200 print:hidden text-center mx-4 md:mx-auto">
        <strong>Tip:</strong> Click on the Client Name, Price, or the Notes paragraph below to edit them directly before saving the PDF.
      </div>

      {/* ═══ PRINTABLE A4 DOCUMENT ═══ */}
      <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none print:w-full print:h-screen relative overflow-hidden">
        
        {/* Header / Brand */}
        <div className="h-[20mm] bg-[#062B4A] flex items-center justify-between px-[15mm]">
          <div className="text-white font-serif italic text-2xl">HB Realty <span className="font-sans not-italic font-bold text-[#A98B55]">India</span></div>
          <div className="text-white/60 text-[10px] uppercase tracking-[0.3em]">Exclusive Property Proposal</div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[80mm]">
          <Image 
            src={property.image} 
            alt={property.title} 
            fill 
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A]/90 to-transparent flex flex-col justify-end p-[15mm]">
            <span className="text-[#A98B55] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{property.type}</span>
            <h1 className="text-4xl text-white font-medium leading-tight max-w-[80%]">{property.title}</h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-[15mm] py-[10mm]">
          
          {/* Greeting & Custom Notes */}
          <div className="mb-[10mm]">
            <p className="text-sm text-[#062B4A]/60 mb-2">Prepared Exclusively For:</p>
            <h2 
              className="text-2xl font-serif italic text-[#A98B55] outline-none border-b border-transparent focus:border-[#A98B55]/30 inline-block transition-colors"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setClientName(e.currentTarget.textContent || "")}
            >
              {clientName}
            </h2>
            
            <div className="mt-6">
              <p 
                className="text-[#062B4A]/80 leading-relaxed outline-none focus:bg-zinc-50 p-2 -ml-2 rounded transition-colors whitespace-pre-wrap"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setCustomNotes(e.currentTarget.textContent || "")}
              >
                {customNotes}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-[#062B4A]/10 my-[10mm]"></div>

          {/* Property Details Grid */}
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#062B4A]/40 mb-6">Property Overview</h3>
          
          <div className="grid grid-cols-2 gap-y-[8mm] gap-x-[10mm]">
            
            {/* Price (Editable) */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#A98B55] shrink-0">
                <IndianRupee size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#062B4A]/40">Proposed Price</p>
                <div 
                  className="text-2xl font-light text-[#062B4A] outline-none border-b border-transparent focus:border-[#A98B55]/30 inline-block transition-colors mt-1"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setCustomPrice(e.currentTarget.textContent || "")}
                >
                  {customPrice}
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#A98B55] shrink-0">
                <Layers size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#062B4A]/40">Total Area</p>
                <p className="text-xl font-light text-[#062B4A] mt-1">{property.size}</p>
              </div>
            </div>

            {/* Type */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#A98B55] shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#062B4A]/40">Property Class</p>
                <p className="text-xl font-light text-[#062B4A] mt-1 capitalize">{property.type}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#A98B55] shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#062B4A]/40">Coordinates</p>
                <p className="text-lg font-light text-[#062B4A] mt-1">
                  {property.location ? `${property.location[0].toFixed(4)}, ${property.location[1].toFixed(4)}` : "TBD"}
                </p>
              </div>
            </div>

          </div>

          <div className="w-full h-px bg-[#062B4A]/10 my-[10mm]"></div>

          {/* Contact / Footer Info */}
          <div className="mt-auto pt-[5mm]">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#062B4A] mb-4">Contact for Next Steps</h3>
            <div className="grid grid-cols-2 text-sm text-[#062B4A]/60 gap-4">
              <div>
                <p className="font-bold text-[#062B4A]">Krishnakant Ahire</p>
                <p>Lead Consultant</p>
                <p>+91 91758 48355</p>
              </div>
              <div>
                <p className="font-bold text-[#062B4A]">Office Location</p>
                <p>Samrat Qubism, Gangapur Road</p>
                <p>Nashik, Maharashtra 422013</p>
              </div>
            </div>
          </div>

        </div>

        {/* Print specific styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page { margin: 0; size: A4; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}} />
      </div>
    </div>
  );
}
