import React, { useState } from "react";
import { BookOpen, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficeResearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const researches = [
    { id: "RES-26-001", title: "Efektivitas Obat X pada Pasien Hipertensi Gejala Lanjut", lead: "Dr. Budi Santoso, Sp.PD", due: "15 Jan 2027", status: "Pengumpulan Data" },
    { id: "RES-26-002", title: "Korelasi Genetik Mutasi BRCA dengan Tingkat Kesintasan Ca Mammae", lead: "Dr. Siti Aminah, Sp.B(K)Onk", due: "20 Mei 2027", status: "Review Proposal" },
    { id: "RES-26-003", title: "Profil Penggunaan Antibiotik Profilaksis Operasi Sesar", lead: "Dr. Lina, Sp.OG", due: "30 Des 2026", status: "Penyusunan Laporan" },
  ];

  const filtered = researches.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.lead.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-700" /> Hibah Penelitian & Publikasi
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Tata kelola usulan riset klinis, pembiayaan hibah, dan progres publikasi karya ilmiah RS.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-indigo-900 border border-indigo-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <BookOpen className="w-20 h-20 absolute -right-4 -bottom-4 text-indigo-800/80" />
              <span className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Riset Aktif</span>
              <span className="text-3xl font-black text-white relative z-10">18 <span className="text-sm opacity-50 text-indigo-400">Judul</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Review Komite Etik</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Proposal</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Dalam Tahap Studi</span>
              <span className="text-3xl font-black text-slate-800">10 <span className="text-sm opacity-50 text-slate-500">Penelitian</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Publikasi Selesai (2026)</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Jurnal Medis</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Katalog Penelitian RS
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Judul / Peneliti Utama..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">ID & Judul Penelitian</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Peneliti Utama</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Estimasi Selesai</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Evaluasi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top max-w-sm">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mb-1.5 bg-slate-100 text-slate-500 border-slate-200">{r.id}</span>
                                <div className="font-bold text-slate-800 break-words whitespace-normal">{r.title}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 w-max">{r.lead}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-medium">{r.due}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      r.status === "Review Proposal"
                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                        : r.status === "Penyusunan Laporan"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse"
                                          : "bg-blue-50 text-blue-700 border-blue-200"
                                    }`}
                                  >
                                    {r.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada usulan / data penelitian ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
