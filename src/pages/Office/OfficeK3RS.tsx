import React, { useState } from "react";
import { HardHat, Flame, Stethoscope, AlertOctagon, Search } from "lucide-react";

export default function OfficeK3RS() {
  const [searchTerm, setSearchTerm] = useState("");

  const apars = [
    { loc: "Koridor IGD (A-01)", status: "Aman", pressure: "Normal (Hijau)", exp: "10 Des 2027" },
    { loc: "Gudang Farmasi (A-02)", status: "Aman", pressure: "Normal (Hijau)", exp: "15 Jan 2028" },
    { loc: "Dapur Gizi (A-03)", status: "Periksa Ulang", pressure: "Turun (Kuning)", exp: "01 Nov 2026" },
    { loc: "Laboratorium (A-04)", status: "Expired", pressure: "Normal (Hijau)", exp: "05 Mey 2026" },
  ];

  const filtered = apars.filter(a => a.loc.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <HardHat className="w-6 h-6 text-amber-600" /> Komite K3RS
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Kesehatan & Keselamatan Kerja RS (Jadwal MCU Karyawan, Inspeksi APAR, Spill Kit, Kecelakaan Kerja).
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-amber-900 border border-amber-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <HardHat className="w-20 h-20 absolute -right-4 -bottom-4 text-amber-800/50" />
              <span className="text-amber-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Insiden Kecelakaan Kerja</span>
              <span className="text-3xl font-black text-white relative z-10">0 <span className="text-sm opacity-50 text-amber-400">Bulan Ini</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Jadwal MCU Karyawan</span>
              <span className="text-3xl font-black text-slate-800">145 <span className="text-sm opacity-50 text-slate-500">Staf Terjadwal</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Inspeksi Spill Kit</span>
              <span className="text-3xl font-black text-slate-800">100<span className="text-xl font-bold">%</span> <span className="text-sm opacity-50 text-slate-500">Bulan Ini</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Isu APAR / Fasilitas</span>
              <span className="text-3xl font-black text-rose-800">2 <span className="text-sm opacity-50 text-rose-600">Perlu Dicek</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" /> Inspeksi APAR Bulanan
            </h3>
             <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Lokasi APAR..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-slate-500 border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-100">
               {filtered.map((a, i) => (
                <tr key={i} className="border-b border-slate-100/50 hover:bg-slate-50">
                  <td className="px-5 py-5 font-bold text-slate-800">
                    {a.loc}
                  </td>
                  <td className="px-5 py-5 font-bold text-slate-600">
                    {a.pressure}
                  </td>
                  <td className="px-5 py-5 text-slate-600 font-bold">
                    {a.exp}
                  </td>
                  <td className="px-5 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border inline-flex ${
                        a.status === 'Aman' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        a.status === 'Expired' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
               ))}
               {filtered.length === 0 && (
                   <tr>
                       <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada APAR ditemukan di lokasi ini.</td>
                   </tr>
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
