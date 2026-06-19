import React, { useState } from "react";
import { Scale, LayoutDashboard, Search, FileSignature, AlertTriangle, MessageSquare } from "lucide-react";

export default function OfficeEthics() {
  const [searchTerm, setSearchTerm] = useState("");

  const cases = [
    { id: "ETH-001", type: "Dugaan Malpraktik", reporter: "Pasien", date: "10 Jun 2026", status: "Investigasi", details: "Komplain penanganan IGD terlambat lebih dari 2 jam." },
    { id: "ETH-002", type: "Pelanggaran Kode Etik", reporter: "Perawat", date: "08 Jun 2026", status: "Sidang Etik", details: "Tindakan indisipliner dan komunikasi tidak pantas antar staf." },
    { id: "ETH-003", type: "Persetujuan Tindakan", reporter: "Dokter Bedah", date: "05 Jun 2026", status: "Selesai", details: "Review second opinion bedah invasif." },
    { id: "ETH-004", type: "Gratifikasi", reporter: "Vendor RS", date: "12 Jun 2026", status: "Menunggu", details: "Pemberian hadiah di luar ketentuan kepatuhan." },
  ];

  const filtered = cases.filter(c => c.type.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Scale className="w-6 h-6 text-slate-800" /> Komite Etik & Hukum RS
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen pelaporan pelanggaran etik, disiplin pegawai, dan aduan malpraktik.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm p-4 relative overflow-hidden">
              <Scale className="w-20 h-20 absolute -right-4 -bottom-4 text-white/10" />
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Aduan Masuk</span>
              <span className="text-3xl font-black text-white relative z-10">14 <span className="text-sm opacity-50 text-slate-400">Kasus</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Proses Investigasi</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Aduan</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Pelanggaran Berat</span>
              <span className="text-3xl font-black text-rose-800">1 <span className="text-sm opacity-50 text-rose-600">Terbukti</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-1 block">Kasus Ditutup</span>
              <span className="text-3xl font-black text-slate-800">8 <span className="text-sm opacity-50 text-slate-500">Selesai</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileSignature className="w-5 h-5 text-slate-400" /> Daftar Pelaporan Etik & Disiplin
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari ID / Tipe Kasus..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">ID Kasus & Tipe</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Pelapor & Tanggal</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Ringkasan Aduan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Kasus</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{c.id}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block ${c.type.includes('Etik') ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                    {c.type}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700 mb-1">{c.reporter}</div>
                                <div className="text-slate-500 text-xs">Masuk: {c.date}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <p className="text-slate-600 max-w-sm whitespace-normal text-xs leading-relaxed">{c.details}</p>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      c.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : c.status === "Investigasi"
                                          ? "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
                                          : c.status === "Sidang Etik"
                                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                  >
                                    {c.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada kasus etik ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
