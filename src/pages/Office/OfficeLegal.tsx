import React, { useState } from "react";
import { Scale, Shield, Search, FileText, FileSignature, AlertCircle, CheckCircle } from "lucide-react";

export default function OfficeLegal() {
  const [searchTerm, setSearchTerm] = useState("");

  const cases = [
    { id: "LGL-2026-05", type: "Draft Perjanjian Vendor Alkes", parties: "PT Medika Jaya ABadi", status: "Review Draft", prio: "Tinggi", updated: "10 Jun 2026" },
    { id: "LGL-2026-06", type: "Mediasi Keluhan Pasien", parties: "Keluarga Tn. Abdul", status: "Proses Mediasi", prio: "Tinggi", updated: "11 Jun 2026" },
    { id: "LGL-2026-07", type: "Perpanjangan MoU Asuransi", parties: "Asuransi Sehat Bersama", status: "Selesai (Ttd)", prio: "Sedang", updated: "08 Jun 2026" },
    { id: "LGL-2026-08", type: "Pembaruan Izin Operasional", parties: "Dinkes Provinsi", status: "Menunggu Jawaban", prio: "Kritis", updated: "01 Jun 2026" },
  ];

  const filtered = cases.filter(c => c.type.toLowerCase().includes(searchTerm.toLowerCase()) || c.parties.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Scale className="w-6 h-6 text-slate-700" /> Hukum & Advokasi (Legal)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen dokumen hukum rs, review kontrak vendor, perizinan, dan pendampingan mediasi.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Scale className="w-20 h-20 absolute -right-4 -bottom-4 text-slate-700/50" />
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Berkas Aktif</span>
              <span className="text-3xl font-black text-white relative z-10">16 <span className="text-sm opacity-50 text-slate-400">Dokumen</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Kasus & Mediasi</span>
              <span className="text-3xl font-black text-rose-800">2 <span className="text-sm opacity-50 text-rose-600">Berjalan</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Review Kontrak</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Draft</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Perizinan RS</span>
              <span className="text-3xl font-black text-slate-800">3 <span className="text-sm opacity-50 text-slate-500">Dalam Proses</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileSignature className="w-5 h-5 text-slate-400" /> Agenda Advokasi & Legal Drafting
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Dokumen / Pihak..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">ID Berkas & Perihal</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Pihak Berelasi (Klien/Vendor)</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Update Terakhir</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Prioritas & Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mb-1.5 bg-slate-100 text-slate-500 border-slate-200">{c.id}</span>
                                <div className="font-black text-slate-800 text-base">{c.type}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{c.parties}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-medium">{c.updated}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right flex flex-col items-end gap-1.5">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      c.status.includes("Selesai")
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : c.status === "Proses Mediasi"
                                          ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                                          : c.status === "Review Draft"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-blue-50 text-blue-700 border-blue-200"
                                    }`}
                                  >
                                    {c.status.includes("Selesai") && <CheckCircle className="w-3 h-3" />}
                                    {c.status}
                                  </span>
                                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${c.prio === 'Kritis' ? 'bg-red-50 text-red-600 border-red-200' : c.prio === 'Tinggi' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                      Prio: {c.prio}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada kasus atau dokumen legal aktif ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
