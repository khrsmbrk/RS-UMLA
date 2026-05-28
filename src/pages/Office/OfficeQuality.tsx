import React from "react";
import { LineChart, Star, Medal, CheckCircle } from "lucide-react";

export default function OfficeQuality() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-purple-600" /> Komite Mutu (PMKP)
          </h1>
          <p className="text-slate-500 mt-1">
            Peningkatan Mutu dan Keselamatan Pasien (Indikator Mutu Nasional/RS,
            validasi data, PDSA).
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 min-h-[300px] flex justify-center items-center">
        <div className="text-center">
          <Medal className="w-16 h-16 text-purple-200 mx-auto mb-4" />
          <h3 className="text-lg font-black text-slate-800">
            Ruang Data Indikator Mutu Nasional (INM)
          </h3>
          <p className="text-slate-500 mt-2">
            Menunggu entry bulan berjalan dari seluruh penanggung jawab
            pengumpul data unit.
          </p>
        </div>
      </div>
    </div>
  );
}
