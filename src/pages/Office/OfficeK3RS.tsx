import React from "react";
import { HardHat, Flame, Stethoscope, AlertOctagon } from "lucide-react";

export default function OfficeK3RS() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <HardHat className="w-6 h-6 text-amber-600" /> Komite K3RS
          </h1>
          <p className="text-slate-500 mt-1">
            Kesehatan & Keselamatan Kerja RS (Jadwal MCU Karyawan, Inspeksi
            APAR, Spill Kit, Kecelakaan Kerja).
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-500" /> Inspeksi APAR Bulanan
            (Kadaluwarsa/Tekanan)
          </h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Lokasi APAR / Titik
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Timbangan / Tekanan
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Kadaluwarsa
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100/50 hover:bg-slate-50">
              <td className="px-5 py-5 font-bold text-slate-800">
                Koridor IGD (A-01)
              </td>
              <td className="px-5 py-5 font-bold text-slate-600">
                Normal (Hijau)
              </td>
              <td className="px-5 py-5 text-slate-600 font-bold">
                10 Des 2027
              </td>
              <td className="px-5 py-5">
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                  Aman
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
