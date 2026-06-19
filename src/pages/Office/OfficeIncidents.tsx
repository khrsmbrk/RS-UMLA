import React, { useState, useMemo } from "react";
import { ShieldAlert, Plus, Layers, AlertCircle, Search } from "lucide-react";

import { useOfficeStore } from "./store/officeStore";

export default function OfficeIncidents() {
  const [searchTerm, setSearchTerm] = useState("");

  const storeIncidents = useOfficeStore(state => state.incidents);

  const incidents = useMemo(() => [
    ...storeIncidents.map((i: any) => ({
      id: i.id,
      date: i.date,
      type: i.type,
      desc: i.desc,
      grade: i.risk === 'High' ? "Kuning (Tinggi)" : "Biru (Rendah)",
      status: i.status
    })),
    {
      id: "IKP-2605-03",
      date: "26 Mei 2026 10:00",
      type: "KTC (Kejadian Tidak Cedera)",
      desc: "Pemberian obat salah dosis, meminum air lebih banyak.",
      grade: "Hijau (Sedang)",
      status: "Investigasi Awal",
    }
  ], [storeIncidents]);

  const filteredIncidents = useMemo(() => {
     return incidents.filter(i => 
         i.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
         i.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
         i.type.toLowerCase().includes(searchTerm.toLowerCase())
     )
  }, [incidents, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" /> Insiden
            Keselamatan Pasien (IKP)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pelaporan insiden KTD, KNC, KTC, KPC, dan form RCA (Root Cause
            Analysis).
          </p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Lapor Insiden Baru
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col text-slate-700">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Log Insiden Bulan Ini
          </h3>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari ID atau Keterangan..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                ID & Tanggal Kejadian
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jenis IKP
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Keterangan Singkat
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Grading / Risiko
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredIncidents.map((inc, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-5 font-medium align-top">
                  <div className="font-black text-slate-800 mb-1">{inc.id}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {inc.date}
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-slate-700 align-top max-w-[200px] leading-snug whitespace-normal">
                  {inc.type}
                </td>
                <td className="px-5 py-5 font-medium text-slate-600 align-top max-w-[300px] leading-relaxed whitespace-normal gap-1">
                  <div className="line-clamp-2">{inc.desc}</div>
                </td>
                <td className="px-5 py-5 align-top">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      inc.grade.includes("Kuning")
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : inc.grade.includes("Hijau") ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {inc.grade}
                  </span>
                </td>
                <td className="px-5 py-5 text-right align-top text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {inc.status}
                </td>
              </tr>
            ))}
            {filteredIncidents.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada log insiden ditemukan.</td>
                </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
