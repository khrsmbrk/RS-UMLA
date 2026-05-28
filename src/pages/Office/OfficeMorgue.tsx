import React from "react";
import { Biohazard, Clock, BookUser, ThermometerSnowflake } from "lucide-react";

export default function OfficeMorgue() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <ThermometerSnowflake className="w-6 h-6 text-indigo-900" /> Kamar
          Jenazah (Mortuary)
        </h1>
        <p className="text-slate-500 mt-1">
          Manajemen penerimaan jenazah, penyimpanan cold storage, dan
          pemulasaraan.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg text-white">
          <h3 className="font-black text-slate-300 uppercase tracking-widest text-sm mb-4">
            Status Lemari Es Jenazah
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-black text-slate-200">
                1<span className="text-sm font-bold text-slate-500">/4</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mt-1">
                Terisi
              </div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-black text-slate-200">
                2.4<span className="text-sm font-bold text-slate-500">°C</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mt-1">
                Suhu Rata-rata
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
