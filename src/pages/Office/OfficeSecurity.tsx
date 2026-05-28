import React from "react";
import { Shield, Videotape, UserX, UserCheck } from "lucide-react";

export default function OfficeSecurity() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-slate-800" /> Security & Visitor
            Management
          </h1>
          <p className="text-slate-500 mt-1">
            Kontrol akses pengunjung rawat inap, log CCTV, dan posko keamanan
            satpam.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col text-slate-300">
          <div className="p-5 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
            <h3 className="font-black text-slate-100 uppercase tracking-widest text-sm flex items-center gap-2">
              <Videotape className="w-5 h-5 text-red-500" /> Live Feed Status
            </h3>
            <span className="animate-pulse bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-black">
              REC
            </span>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="aspect-video bg-black rounded-lg border border-slate-700 flex items-center justify-center font-bold text-slate-600 text-xs">
              CCTV IGD Depan
            </div>
            <div className="aspect-video bg-black rounded-lg border border-slate-700 flex items-center justify-center font-bold text-slate-600 text-xs">
              CCTV Lobi Utama
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
