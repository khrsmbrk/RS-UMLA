import React, { useState } from "react";
import { Library, LayoutDashboard, Search, BookOpen, CheckCircle, Clock, BookMarked } from "lucide-react";

export default function OfficeLibrary() {
  const [searchTerm, setSearchTerm] = useState("");

  const loans = [
    { id: "B-2601", title: "Harrison's Principles of Internal Medicine", borrower: "dr. Andi (Residen)", date: "10 Jun 2026", due: "24 Jun 2026", status: "Dipinjam" },
    { id: "B-2602", title: "Jurnal Medis Internasional (Vol 45)", borrower: "Ns. Rina", date: "05 Jun 2026", due: "12 Jun 2026", status: "Terlambat" },
    { id: "B-2603", title: "Atlas Anatomi Manusia Netter", borrower: "Dr. Budi", date: "01 Jun 2026", due: "15 Jun 2026", status: "Dikembalikan" },
    { id: "B-2604", title: "Buku Ajar Ilmu Bedah de Jong", borrower: "dr. Citra (Koas)", date: "14 Jun 2026", due: "28 Jun 2026", status: "Dipinjam" },
  ];

  const filtered = loans.filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.borrower.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Library className="w-6 h-6 text-fuchsia-600" /> Perpustakaan Medis
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen koleksi buku, sirkulasi peminjaman, dan akses jurnal medis elektronik.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-fuchsia-900 border border-fuchsia-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Library className="w-20 h-20 absolute -right-4 -bottom-4 text-fuchsia-800/80" />
              <span className="text-fuchsia-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Koleksi Fisik</span>
              <span className="text-3xl font-black text-white relative z-10">2,450 <span className="text-sm opacity-50 text-fuchsia-400">Buku/Jurnal</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Buku Sedang Dipinjam</span>
              <span className="text-3xl font-black text-slate-800">125 <span className="text-sm opacity-50 text-slate-500">Eksemplar</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Pengunjung Hari Ini</span>
              <span className="text-3xl font-black text-slate-800">42 <span className="text-sm opacity-50 text-slate-500">Tenaga Medis</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Keterlambatan</span>
              <span className="text-3xl font-black text-rose-800">8 <span className="text-sm opacity-50 text-rose-600">Peminjaman</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <BookOpen className="w-5 h-5 text-slate-400" /> Sirkulasi Peminjaman Aktif
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Buku / Peminjam..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Buku / ID</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Nama Peminjam</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Tgl Pinjam & Kembali</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((l, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top w-1/3">
                                <div className="font-bold text-slate-800 break-words whitespace-normal">{l.title}</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mt-1 bg-slate-100 text-slate-500 border-slate-200">
                                    {l.id}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 w-max">{l.borrower}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-medium">Pinjam: {l.date}</div>
                                <div className={`text-xs font-bold mt-0.5 ${l.status === 'Terlambat' ? 'text-rose-600' : 'text-slate-500'}`}>Tenggat: {l.due}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      l.status === "Dikembalikan"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : l.status === "Dipinjam"
                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                          : "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                                    }`}
                                  >
                                    {l.status === "Dikembalikan" && <CheckCircle className="w-3 h-3" />}
                                    {l.status === "Dipinjam" && <BookMarked className="w-3 h-3" />}
                                    {l.status === "Terlambat" && <Clock className="w-3 h-3" />}
                                    {l.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada catatan peminjaman ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
