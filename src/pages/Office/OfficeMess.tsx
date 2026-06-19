import React, { useState } from "react";
import { Building, LayoutDashboard, Search, Key, CheckCircle, Clock } from "lucide-react";

export default function OfficeMess() {
  const [searchTerm, setSearchTerm] = useState("");

  const rooms = [
    { room: "A-101", type: "Paviliun Dokter", status: "Terisi", occupant: "dr. Andi, Sp.PD", checkout: "31 Des 2026" },
    { room: "A-102", type: "Paviliun Dokter", status: "Kosong (Siap Huni)", occupant: "-", checkout: "-" },
    { room: "B-201", type: "Asrama Perawat", status: "Terisi", occupant: "Ns. Siti & Ns. Ayu", checkout: "15 Jun 2026" },
    { room: "B-202", type: "Asrama Perawat", status: "Perbaikan", occupant: "-", checkout: "-" },
  ];

  const filtered = rooms.filter(r => r.room.toLowerCase().includes(searchTerm.toLowerCase()) || r.occupant.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-700" /> Mess Dokter & Asrama
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen fasilitas tempat tinggal staf, pemesanan kamar, dan status aset asrama.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-900 border border-blue-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Building className="w-20 h-20 absolute -right-4 -bottom-4 text-blue-800/50" />
              <span className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Kapasitas</span>
              <span className="text-3xl font-black text-white relative z-10">45 <span className="text-sm opacity-50 text-blue-400">Kamar</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Kamar Terisi</span>
              <span className="text-3xl font-black text-slate-800">38 <span className="text-sm opacity-50 text-slate-500">Kamar</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Tersedia Huni</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Kamar</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-1 block">Perbaikan / Maintenance</span>
              <span className="text-3xl font-black text-slate-800">2 <span className="text-sm opacity-50 text-slate-500">Kamar</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <Key className="w-5 h-5 text-slate-400" /> Daftar Kamar & Penghuni
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari No.Kamar / Penghuni..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">No. Kamar & Blok</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Penghuni</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Tenggat Waktu Keluar</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Hunian</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1 text-lg">{r.room}</div>
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{r.type}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className={`font-bold ${r.occupant === '-' ? 'text-slate-400 italic' : 'text-slate-700'}`}>{r.occupant}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-medium">{r.checkout}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      r.status === "Terisi"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : r.status === "Kosong (Siap Huni)"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                          : "bg-rose-50 text-rose-700 border-rose-200"
                                    }`}
                                  >
                                    {r.status === "Kosong (Siap Huni)" && <CheckCircle className="w-3 h-3" />}
                                    {r.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada kamar ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
