import React, { useState } from "react";
import { FileSearch, LayoutDashboard, Search, FileText, CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react";

export default function OfficeInternalAudit() {
  const [searchTerm, setSearchTerm] = useState("");

  const audits = [
    { id: "AUD-26-001", unit: "Instalasi Farmasi", type: "Audit Finansial", status: "Sedang Berjalan", date: "10-15 Jun 2026", auditor: "Tim Auditor A" },
    { id: "AUD-26-002", unit: "Rekam Medis", type: "Audit Kepatuhan", status: "Selesai (Menunggu Laporan)", date: "01-05 Jun 2026", auditor: "Tim Auditor B" },
    { id: "AUD-26-003", unit: "Poli Rawat Jalan", type: "Audit Operasional", status: "Terjadwal", date: "20-25 Jun 2026", auditor: "Tim Auditor C" },
    { id: "AUD-26-004", unit: "Gizi & Tata Boga", type: "Audit Investigasi", status: "Laporan Final", date: "May 2026", auditor: "Tim Khusus SPI" },
  ];

  const filtered = audits.filter(a => a.unit.toLowerCase().includes(searchTerm.toLowerCase()) || a.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-slate-700" /> Satuan Pemeriksa Internal (SPI)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen agenda audit internal, kepatuhan (compliance), dan laporan investigasi.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <FileSearch className="w-20 h-20 absolute -right-4 -bottom-4 text-slate-700/50" />
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Audit Tahunan</span>
              <span className="text-2xl font-black text-white relative z-10">24 <span className="text-sm opacity-50 text-slate-400">Agenda</span></span>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-4">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-1 block">Audit Berjalan</span>
              <span className="text-3xl font-black text-amber-800">2 <span className="text-sm opacity-50 text-amber-600">Unit</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-1 block">Temuan Kritis (Tahun Ini)</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Temuan</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Rekomendasi Ditutup</span>
              <span className="text-3xl font-black text-slate-800">85<span className="text-xl font-bold">%</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Agenda Pemeriksaan & Laporan
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Unit / Tipe Audit..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">ID Audit & Tipe</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Unit Terperiksa</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Tim SPI</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Pemeriksaan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((a, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{a.id}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block ${a.type === 'Audit Investigasi' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {a.type}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{a.unit}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700 mb-1">{a.date}</div>
                                <div className="text-slate-500 text-xs">{a.auditor}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      a.status === "Laporan Final"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : a.status === "Sedang Berjalan"
                                          ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                                          : a.status.includes('Selesai')
                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {a.status === "Laporan Final" && <CheckCircle className="w-3 h-3" />}
                                    {a.status === "Sedang Berjalan" && <Clock className="w-3 h-3" />}
                                    {a.status.includes('Selesai') && <FileText className="w-3 h-3" />}
                                    {a.status}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 inline-block ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada agenda audit ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
