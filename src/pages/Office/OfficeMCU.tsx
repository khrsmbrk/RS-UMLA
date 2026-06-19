import React, { useState } from "react";
import { Stethoscope, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficeMCU() {
  const [searchTerm, setSearchTerm] = useState("");

  const mcuData = [
    { id: "MCU-26-001", patient: "Tn. Anwar (45th)", package: "Silver / Eksekutif A", date: "10 Jun 2026", time: "08:00", status: "Selesai (Menunggu Hasil)" },
    { id: "MCU-26-002", patient: "Ny. Ratna (38th)", package: "Gold / Eksekutif B", date: "10 Jun 2026", time: "09:30", status: "Sedang Berjalan" },
    { id: "MCU-26-003", patient: "Tn. Yudi (50th)", package: "Platinum / Eksekutif C", date: "11 Jun 2026", time: "08:00", status: "Terjadwal" },
    { id: "MCU-26-004", patient: "PT. Maju Mundur (Corporate)", package: "Basic Employee MCU", date: "15 Jun 2026", time: "07:00", status: "Terjadwal" },
  ];

  const filtered = mcuData.filter(m => m.patient.toLowerCase().includes(searchTerm.toLowerCase()) || m.package.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-emerald-600" /> Medical Check Up (MCU)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen penjadwalan MCU korporat & personal, paket pemeriksaan, dan cetak hasil.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-emerald-900 border border-emerald-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Stethoscope className="w-20 h-20 absolute -right-4 -bottom-4 text-emerald-800/80" />
              <span className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Jadwal Hari Ini</span>
              <span className="text-3xl font-black text-white relative z-10">15 <span className="text-sm opacity-50 text-emerald-400">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Dalam Pemeriksaan</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Hasil Selesai</span>
              <span className="text-3xl font-black text-slate-800">10 <span className="text-sm opacity-50 text-slate-500">Dokumen</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">MCU Perusahaan</span>
              <span className="text-3xl font-black text-slate-800">3 <span className="text-sm opacity-50 text-slate-500">Kontrak Aktif</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Agenda Pemeriksaan MCU
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Paket..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Reg ID</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Peserta / Klien</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Paket Pemeriksaan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Progress</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((m, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{m.date} - {m.time}</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200">
                                    {m.id}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className={`font-bold text-base ${m.patient.includes('Corporate') ? 'text-blue-700' : 'text-slate-800'}`}>{m.patient}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 w-max">{m.package}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      m.status.includes("Selesai")
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : m.status === "Sedang Berjalan"
                                          ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {m.status.includes("Selesai") && <CheckCircle className="w-3 h-3" />}
                                    {m.status === "Sedang Berjalan" && <Clock className="w-3 h-3" />}
                                    {m.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal MCU ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
