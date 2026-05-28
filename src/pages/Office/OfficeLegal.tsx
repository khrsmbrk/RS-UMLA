import React from "react";
import { Scale, FileSignature, AlertCircle, Shield } from "lucide-react";

export default function OfficeLegal() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Scale className="w-6 h-6 text-slate-700" /> Hukum & Advokasi
            (Legal)
          </h1>
          <p className="text-slate-500 mt-1">
            Review kontrak vendor, sengketa medis, advokasi pasien, dan mediasi
            klaim.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center">
        <Shield className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h3 className="text-lg font-black text-slate-800">
          Ruang Lingkup Advokasi Bersifat Rahasia
        </h3>
        <p className="text-slate-500 mt-2 font-medium">
          Beberapa kasus mediasi sedang berlangsung. Silakan hubungi Ka. Bagian
          Hukum untuk akses rekam advokasi terenkripsi.
        </p>
      </div>
    </div>
  );
}
