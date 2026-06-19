import React, { useState } from "react";
import { Activity, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficePhysiotherapy() {
   const [searchTerm, setSearchTerm] = useState("");

  const sessions = [
    { id: "RM-001", time: "08:00", patient: "Tn. Surya (65th)", type: "Terapi Pasca Stroke", therapist: "Budi, S.Ft", status: "Selesai" },
    { id: "RM-002", time: "10:00", patient: "Ny. Ayu (30th)", type: "Fisioterapi Cidera Olahraga", therapist: "Citra, S.Ft", status: "Sedang Berlangsung" },
    { id: "RM-003", time: "13:00", patient: "An. Bintang (7th)", type: "Terapi Okupasi", therapist: "Dian, A.Md.OT", status: "Menunggu" },
    { id: "RM-004", time: "15:00", patient: "Tn. Darmawan (72th)", type: "Terapi Nyeri Sendi", therapist: "Budi, S.Ft", status: "Terjadwal" },
  ];

  const filtered = sessions.filter(s => s.patient.toLowerCase().includes(searchTerm.toLowerCase()) || s.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600" /> Rehabedik & Fisioterapi
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen penjadwalan terapi, monitoring sesi fisioterapi, dan terapi okupasi.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-emerald-900 border border-emerald-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Activity className="w-20 h-20 absolute -right-4 -bottom-4 text-emerald-800/80" />
              <span className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Sesi Terapi Hari Ini</span>
              <span className="text-3xl font-black text-white relative z-10">45 <span className="text-sm opacity-50 text-emerald-400">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Sedang Berlangsung</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Bed Aktif</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Menunggu Antrean</span>
              <span className="text-3xl font-black text-slate-800">12 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Terapi Selesai</span>
              <span className="text-3xl font-black text-slate-800">15 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Jadwal Harian Terapis
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Jenis Terapi..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Waktu</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Pasien Terjadwal</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Program & Terapis</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Sesi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{s.time} WIB</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200`}>
                                    ID: {s.id}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{s.patient}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 w-max mb-1">{s.type}</div>
                                <div className="text-slate-500 text-xs font-medium">Terapis: {s.therapist}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      s.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : s.status === "Sedang Berlangsung"
                                          ? "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
                                          : s.status === "Menunggu"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {s.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {s.status === "Sedang Berlangsung" && <Activity className="w-3 h-3" />}
                                    {s.status === "Menunggu" && <Clock className="w-3 h-3" />}
                                    {s.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal rehabilitasi ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
