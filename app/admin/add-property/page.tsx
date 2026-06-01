import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import AdminPropertyForm from "@/components/admin/AdminPropertyForm";

export default function AdminAddPropertyPage() {
  return (
    <main className="min-h-screen bg-[#031525] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Admin Navigation Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#062B4A]/50 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <Link href="/properties" className="flex items-center gap-4 text-white/50 hover:text-[#A98B55] transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Back to Portal</span>
          </Link>
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
             <Shield size={14} className="text-emerald-500" />
             <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.4em]">Admin Access Mode</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto min-h-screen flex flex-col items-center justify-center">
        <AdminPropertyForm />
      </div>
    </main>
  );
}
