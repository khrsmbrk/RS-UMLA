import React from "react";
import { Radiation, Camera, HardDrive, Shield } from "lucide-react";

export default function OfficeRadiologyAdmin() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Radiation className="w-6 h-6 text-amber-500" /> Instalasi Radiologi
            (Admin/PACS)
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem manajemen film rontgen, kontras, serta rekam pembacaan TLD
            (Dosimetri).
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm mb-4">
            Penggunaan Dosimetri TLD Badge
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div>
                <div className="font-bold text-slate-800">
                  dr. Reza (Sp.Rad)
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">
                  Kumulatif Tahun 2026
                </div>
              </div>
              <div className="font-black text-emerald-600 text-lg">
                1.5 <span className="text-xs">mSv</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
