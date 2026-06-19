import React, { useState } from "react";
import { Baby, LayoutDashboard, Search, FileText, CheckCircle, Clock, Activity } from "lucide-react";

export default function OfficeNICU() {
  const [searchTerm, setSearchTerm] = useState("");

  const infants = [
    { bed: "Incubator-01", name: "By. Ny. Dita", diag: "Prematuritas 32 Minggu", status: "Kritis", cpap: "Aktif" },
    { bed: "Incubator-02", name: "By. Ny. Sarah", diag: "Asfiksia Sedang", status: "Stabil (Observasi)", cpap: "Off" },
    { bed: "Box-03 (Perinatologi)", name: "By. Ny. Rina", diag: "Hiperbilirubinemia", status: "Fototerapi", cpap: "Off" },
    { bed: "Incubator-04", name: "By. Ny. Dina", diag: "BBLSR", status: "Stabil (Perawatan Intensif)", cpap: "Evaluasi" },
  ];

  const filtered = infants.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.diag.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Baby className="w-6 h-6 text-pink-600" /> NICU & Perinatologi
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Monitoring perawatan intensif neonatus, manajemen inkubator, fototerapi, dan alat bantu napas.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-pink-900 border border-pink-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Baby className="w-20 h-20 absolute -right-4 -bottom-4 text-pink-800/80" />
              <span className="text-pink-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Pasien Rawat</span>
              <span className="text-3xl font-black text-white relative z-10">14 <span className="text-sm opacity-50 text-pink-400">Bayi</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Pasien Kritis (NICU)</span>
              <span className="text-3xl font-black text-rose-800">3 <span className="text-sm opacity-50 text-rose-600">Terpantau</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Pemakaian Ventilator/CPAP</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Unit Aktif</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Rawat Perinatologi (Box)</span>
              <span className="text-3xl font-black text-slate-800">11 <span className="text-sm opacity-50 text-slate-500">Kapasitas Sisa 2</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Bed Monitoring System Aktif
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Identitas Bayi..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Posisi Bed & Dukungan Nafas</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas & Orang Tua</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Diagnosa Keperawatan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Kondisi Klinis</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((b, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{b.bed}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block ${b.cpap === 'Aktif' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                    CPAP: {b.cpap}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{b.name}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-medium bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md w-max">{b.diag}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      b.status === "Kritis"
                                        ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                                        : b.status.includes("Stabil")
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                          : "bg-blue-50 text-blue-700 border-blue-200"
                                    }`}
                                  >
                                    {b.status === "Kritis" && <Activity className="w-3 h-3" />}
                                    {b.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada data bayi ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
