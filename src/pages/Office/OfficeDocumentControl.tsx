import React, { useState } from "react";
import { BookOpen, FileCheck, Search, Users, ExternalLink, Clock, FolderOpen } from "lucide-react";

export default function OfficeDocumentControl() {
  const [searchTerm, setSearchTerm] = useState("");

  const drafts = [
    {
      id: "SOP-001",
      name: "SOP Pemberian Obat High Alert",
      type: "SPO Medis",
      init: "Kepala Instalasi Farmasi",
      cur: "Wadir Medis",
      status: "Review",
    },
    {
      id: "PDM-021",
      name: "Pedoman Keselamatan Pasien",
      type: "Pedoman",
      init: "Komite Mutu (PMKP)",
      cur: "Direktur Utama",
      status: "Waiting Approval",
    },
    {
      id: "KEP-104",
      name: "SK Komite Etika Penelitian",
      type: "SK Direktur",
      init: "Bagian Diklit",
      cur: "Bagian Hukum",
      status: "Drafting",
    },
  ];

  const filteredDrafts = drafts.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" /> Document Control & Regulasi
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            E-Library untuk standar prosedur rumah sakit, surat keputusan, dan pedoman praktik klinis.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-xl border border-purple-200 shadow-sm p-4 relative overflow-hidden">
              <FolderOpen className="w-20 h-20 absolute -right-4 -bottom-4 text-purple-500/20" />
              <span className="text-purple-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Dokumen Aktif</span>
              <span className="text-3xl font-black text-purple-800 relative z-10">1,240 <span className="text-sm opacity-50 text-purple-600">File</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Valid & Disahkan</span>
              <span className="text-3xl font-black text-slate-800">1,215 <span className="text-sm opacity-50 text-slate-500">Dokumen</span></span>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-4">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-1 block">Draft Berjalan (WIP)</span>
              <span className="text-3xl font-black text-amber-800">18 <span className="text-sm opacity-50 text-amber-600">Draft</span></span>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-200 shadow-sm p-4">
              <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-1 block">Mendekati Kadaluwarsa</span>
              <span className="text-3xl font-black text-red-800">7 <span className="text-sm opacity-50 text-red-600">Dokumen</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
             <FileCheck className="w-5 h-5 text-purple-500" /> Draft Berjalan (Menunggu Persetujuan Direksi)
          </h3>
          <div className="relative w-full sm:w-64">
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Cari Dokumen..."
               className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
             />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredDrafts.map((d, i) => (
            <div
              key={i}
              className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="bg-purple-100 text-purple-700 font-bold uppercase tracking-widest text-[10px] px-2.5 py-0.5 rounded border border-purple-200">
                    {d.type}
                  </span>
                  <span className="font-bold text-slate-800 text-base sm:text-lg">
                    {d.name}
                  </span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{d.id}</span>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 flex-wrap">
                  Pemohon: {d.init} <span className="opacity-50">→</span> Reviu
                  Aktif: <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {d.cur}</span>
                </div>
              </div>
              <button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors border border-slate-200 shadow-sm shrink-0">
                Buka Draft <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
           {filteredDrafts.length === 0 && (
              <div className="p-12 text-center text-slate-500 italic">Tidak ada draft berjalan yang ditemukan.</div>
          )}
        </div>
      </div>
    </div>
  );
}
