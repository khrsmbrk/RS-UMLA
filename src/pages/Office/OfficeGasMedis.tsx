import React from "react";
import { Wind, Cylinder, Gauge, AlertTriangle } from "lucide-react";

export default function OfficeGasMedis() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Wind className="w-6 h-6 text-sky-500" /> Instalasi Gas Medis
          </h1>
          <p className="text-slate-500 mt-1">
            Stok persediaan tabung O2, O2 Sentral (Liquid), N2O, Vacuum, &
            Kompresor udara medis.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 flex items-center gap-4 shadow-sm">
          <div className="bg-sky-100 p-4 rounded-full text-sky-600">
            <Gauge className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">
              Tekanan Tangki O2 Sentral
            </div>
            <div className="text-3xl font-black text-sky-800">
              4.5 <span className="text-sm">bar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
