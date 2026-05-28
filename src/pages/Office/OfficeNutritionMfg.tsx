import React from "react";
import { Milk, Baby, ClipboardList, CheckCircle } from "lucide-react";

export default function OfficeNutritionMfg() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Milk className="w-6 h-6 text-cyan-600" /> Dapur Susu & Formula
            Kusus
          </h1>
          <p className="text-slate-500 mt-1">
            Produksi gizi klinis enteral, susu formula bayi (NICU/Perina),
            persiapan steril.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 min-h-[300px] flex justify-center items-center">
        <div className="text-center">
          <Baby className="w-16 h-16 text-cyan-100 mx-auto mb-4" />
          <h3 className="text-lg font-black text-slate-800">
            Log Produksi Susu Formula (Hari Ini)
          </h3>
          <p className="text-slate-500 mt-2">
            Daftar permintaan dari Perinatologi dan NICU telah terdistribusi
            tahap pagi.
          </p>
        </div>
      </div>
    </div>
  );
}
