import React from "react";
import { BedDouble, MoveRight, Users, CheckCircle } from "lucide-react";

export default function OfficeBedManagement() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BedDouble className="w-6 h-6 text-blue-600" /> Bed Management
            Center
          </h1>
          <p className="text-slate-500 mt-1">
            Pusat kendali ketersediaan TT rawat inap, mutasi pasien, dan
            antiloket IGD.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Total Bed Tersedia
          </div>
          <div className="text-4xl font-black text-white">
            45<span className="text-sm font-bold text-slate-500">/250</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 mt-4 rounded-full">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
