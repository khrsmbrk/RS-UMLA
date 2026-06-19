import React, { useState } from "react";
import { Settings, Droplet, Clock, UserCheck, Search, Activity, CheckCircle } from "lucide-react";

export default function OfficeHemodialysisAdmin() {
  const [searchTerm, setSearchTerm] = useState("");

  const schedules = [
    { id: "HD-001", patient: "Tn. Ahmad (50th)", shift: "Pagi (07:00)", machine: "Mesin 01", status: "Sedang HD", bloodPressure: "120/80" },
    { id: "HD-002", patient: "Ny. Sari (45th)", shift: "Pagi (07:00)", machine: "Mesin 02", status: "Selesai", bloodPressure: "110/75" },
    { id: "HD-003", patient: "Tn. Budi (62th)", shift: "Siang (13:00)", machine: "Mesin 03", status: "Menunggu", bloodPressure: "-" },
    { id: "HD-004", patient: "Ny. Rita (55th)", shift: "Sore (18:00)", machine: "Mesin 01", status: "Terjadwal", bloodPressure: "-" },
  ];

  const filtered = schedules.filter(s => s.patient.toLowerCase().includes(searchTerm.toLowerCase()) || s.machine.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-sky-600" /> Instalasi Hemodialisa (HD)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Penjadwalan mesin HD berkala, sistem RO (Reverse Osmosis), dan reuse dializer.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-sky-50 rounded-xl border border-sky-200 shadow-sm p-4 relative overflow-hidden">
              <Droplet className="w-20 h-20 absolute -right-4 -bottom-4 text-sky-500/20" />
              <span className="text-sky-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Kapasitas Harian</span>
              <span className="text-3xl font-black text-sky-800 relative z-10">45 <span className="text-sm opacity-50 text-sky-600">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Pasien Selesai</span>
              <span className="text-3xl font-black text-slate-800">12 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Menunggu Antrean</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 border-l-4 border-l-emerald-500">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-2 block">Status Sistem RO</span>
              <span className="text-sm font-black text-emerald-800 flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg w-max"><CheckCircle className="w-4 h-4 text-emerald-500" /> Optimal & Normal</span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <UserCheck className="w-5 h-5 text-slate-400" /> Jadwal Hemodialisa Hari Ini
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Mesin..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal Shift</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Pasien</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Mesin & Tensi Target</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Tindakan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{s.shift}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200`}>
                                    ID: {s.id}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800">{s.patient}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 w-max mb-1">{s.machine}</div>
                                <div className="text-slate-500 text-xs">TD Akhir: {s.bloodPressure}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      s.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : s.status === "Sedang HD"
                                          ? "bg-sky-50 text-sky-700 border-sky-200 animate-pulse"
                                          : s.status === "Menunggu"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {s.status === 'Selesai' && <CheckCircle className="w-3 h-3"/>}
                                    {s.status === 'Sedang HD' && <Activity className="w-3 h-3"/>}
                                    {s.status === 'Menunggu' && <Clock className="w-3 h-3"/>}
                                    {s.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal hemodialisa ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
