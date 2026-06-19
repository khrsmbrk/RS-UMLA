import React, { useState } from "react";
import { HeartHandshake, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficePalliative() {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    { rm: "RM-00123", name: "Tn. Hartono (68th)", bed: "Paliatif-01", diag: "Ca Paru Stadium Akhir", phase: "End-of-Life Care", status: "Kondisi Menurun" },
    { rm: "RM-00124", name: "Ny. Lasmi (55th)", bed: "Paliatif-02", diag: "Ca Serviks IV B", phase: "Manajemen Nyeri", status: "Stabil" },
    { rm: "RM-00125", name: "Tn. Basuki (70th)", bed: "Kunjungan Rumah", diag: "Gagal Jantung Terminal", phase: "Homecare Paliatif", status: "Jadwal Kunjungan" },
    { rm: "RM-00126", name: "Ny. Erna (60th)", bed: "Paliatif-04", diag: "ALS", phase: "Dukungan Psikososial", status: "Stabil" },
  ];

  const filtered = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.diag.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-rose-500" /> Perawatan Paliatif
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen asuhan pasien terminal, pendampingan psikososial, dan homecare paliatif.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-rose-900 border border-rose-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <HeartHandshake className="w-20 h-20 absolute -right-4 -bottom-4 text-rose-800/80" />
              <span className="text-rose-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Pasien Aktif</span>
              <span className="text-3xl font-black text-white relative z-10">24 <span className="text-sm opacity-50 text-rose-400">Jiwa</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Manajemen Nyeri</span>
              <span className="text-3xl font-black text-slate-800">15 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Homecare Paliatif</span>
              <span className="text-3xl font-black text-slate-800">6 <span className="text-sm opacity-50 text-slate-500">Scheduled</span></span>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1 block">Dukungan Keluarga</span>
              <span className="text-3xl font-black text-slate-800">100<span className="text-xl font-bold">%</span> <span className="text-sm opacity-50 text-slate-500">Terjangkau</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Daftar Pasien Paliatif Aktif
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Diagnosa..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas & Kamar/Lokasi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Diagnosa Utama</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Fase Perawatan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Klinis</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 text-base mb-1">{p.name}</div>
                                <div className="flex gap-2 items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-500 border-slate-200">
                                        {p.rm}
                                    </span>
                                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{p.bed}</span>
                                </div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{p.diag}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 text-sm font-medium">{p.phase}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      p.status === "Kondisi Menurun"
                                        ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                                        : p.status === "Stabil"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                          : "bg-blue-50 text-blue-700 border-blue-200"
                                    }`}
                                  >
                                    {p.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada data pasien ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
