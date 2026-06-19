import React, { useState } from "react";
import { Search, LayoutDashboard, Activity, CheckCircle, Clock } from "lucide-react";

export default function OfficeEndoscopy() {
  const [searchTerm, setSearchTerm] = useState("");

  const schedules = [
    { time: "08:00 - 09:00", patient: "Tn. Rahmat (54th)", action: "Gastroskopi", status: "Selesai", doctor: "dr. Hendra, Sp.PD-KGEH", ruang: "Ruang 1" },
    { time: "09:30 - 10:30", patient: "Ny. Lilis (45th)", action: "Kolonoskopi", status: "Berlangsung", doctor: "dr. Hendra, Sp.PD-KGEH", ruang: "Ruang 1" },
    { time: "11:00 - 12:00", patient: "Tn. Budi (60th)", action: "ERCP", status: "Persiapan", doctor: "dr. Budi, Sp.PD-KGEH", ruang: "Ruang 2" },
    { time: "13:00 - 14:00", patient: "Ny. Siti (50th)", action: "Gastroskopi", status: "Menunggu", doctor: "dr. Santi, Sp.PD", ruang: "Ruang 1" },
  ];

  const filtered = schedules.filter(s => s.patient.toLowerCase().includes(searchTerm.toLowerCase()) || s.action.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-600" /> Pusat Endoskopi
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen penjadwalan dan pelaporan tindakan endoskopi diagnostik & terapeutik.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 shadow-sm p-4 relative overflow-hidden">
              <Search className="w-20 h-20 absolute -right-4 -bottom-4 text-indigo-500/20" />
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Tindakan (Hari Ini)</span>
              <span className="text-3xl font-black text-indigo-800 relative z-10">12 <span className="text-sm opacity-50 text-indigo-600">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Telah Selesai</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Tindakan</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Menunggu Antrean</span>
              <span className="text-3xl font-black text-slate-800">7 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-sky-600 font-bold uppercase tracking-widest text-xs mb-1 block">Status Ruangan Aktif</span>
              <span className="text-xl font-black text-sky-800 pt-2 flex items-center gap-2 block"><Activity className="w-5 h-5 text-sky-500" /> 2 Ruang (In Use)</span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <Clock className="w-5 h-5 text-slate-400" /> Jadwal Tindakan Hari Ini
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Tindakan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Ruangan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Pasien</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Rencana Tindakan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{s.time} WIB</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200`}>
                                    {s.ruang}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{s.patient}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{s.action}</div>
                                <div className="text-slate-500 text-xs mt-1">Operator: {s.doctor}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      s.status === "Selesai"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : s.status === "Berlangsung"
                                          ? "bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse"
                                          : s.status === "Persiapan"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {s.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {s.status === "Berlangsung" && <Activity className="w-3 h-3" />}
                                    {s.status === "Persiapan" && <Clock className="w-3 h-3" />}
                                    {s.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal tindakan ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
