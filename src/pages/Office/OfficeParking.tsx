import React from "react";
import { Car, BadgeCent, Ticket, CheckCircle } from "lucide-react";

export default function OfficeParking() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Car className="w-6 h-6 text-emerald-700" /> Manajemen Parkir &
            Karcis
          </h1>
          <p className="text-slate-500 mt-1">
            Laporan pendapatan parkir, RFID parkir VIP/Dokter, dan kapasitas
            area basemen.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Slot Tersedia Area Basemen
          </div>
          <div className="text-3xl font-black text-emerald-600">
            45 <span className="text-sm font-bold text-slate-500">Mobil</span>
          </div>
        </div>
      </div>
    </div>
  );
}
