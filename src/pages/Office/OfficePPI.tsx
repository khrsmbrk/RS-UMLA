import React from "react";
import { Microscope, AlertTriangle, Activity, BarChart4 } from "lucide-react";

export default function OfficePPI() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Microscope className="w-6 h-6 text-rose-500" /> Komite PPI
          </h1>
          <p className="text-slate-500 mt-1">
            Pencegahan dan Pengendalian Infeksi, audit hand hygiene, bundle
            surveilans CAUTI, VAP, ILO.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-rose-50 border border-rose-200 rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
          <AlertTriangle className="w-8 h-8 text-rose-600 mb-3" />
          <div className="text-[10px] font-black uppercase tracking-widest text-rose-800 mb-2">
            Kasus Phlebitis Bulan Ini
          </div>
          <div className="text-3xl font-black text-rose-700">
            12 <span className="text-sm font-bold opacity-75">kejadian</span>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
          <Activity className="w-8 h-8 text-emerald-600 mb-3" />
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800 mb-2">
            Kepatuhan Hand Hygiene
          </div>
          <div className="text-3xl font-black text-emerald-700">
            86%{" "}
            <span className="text-sm font-bold opacity-75">rata-rata RS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
