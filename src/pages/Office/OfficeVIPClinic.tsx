import React, { useState } from "react";
import { Star, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficeVIPClinic() {
  const [searchTerm, setSearchTerm] = useState("");

  const appointments = [
    { id: "VIP-26-001", patient: "Tn. Armand", doctor: "Prof. Dr. Anwar, Sp.PD-KGEH", time: "09:00", type: "Konsultasi Eksekutif", status: "Selesai" },
    { id: "VIP-26-002", patient: "Ny. Melati", doctor: "Dr. Citra, Sp.JP(K)", time: "10:30", type: "Pemeriksaan Premium", status: "Sedang Berlangsung" },
    { id: "VIP-26-003", patient: "Duta Besar X", doctor: "Dr. Budi, Sp.S", time: "13:00", type: "Konsultasi Khusus", status: "Menunggu" },
    { id: "VIP-26-004", patient: "CEO PT. Y", doctor: "Dr. Lina, Sp.OG", time: "15:00", type: "Pemeriksaan Eksekutif", status: "Terjadwal" },
  ];

  const filtered = appointments.filter(a => a.patient.toLowerCase().includes(searchTerm.toLowerCase()) || a.doctor.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-600" /> Klinik Eksekutif (VIP)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen layanan prioritas, booking poli eksekutif, dan pendampingan personal assistant.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-amber-900 border border-amber-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Star className="w-20 h-20 absolute -right-4 -bottom-4 text-amber-800/80" />
              <span className="text-amber-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Reservasi Hari Ini</span>
              <span className="text-3xl font-black text-white relative z-10">24 <span className="text-sm opacity-50 text-amber-400">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Pasien Menunggu</span>
              <span className="text-3xl font-black text-slate-800">3 <span className="text-sm opacity-50 text-slate-500">Orang</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Sedang Dilayani</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Poli Aktif</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Tingkat Kepuasan</span>
              <span className="text-3xl font-black text-slate-800">4.9<span className="text-xl font-bold">/5</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Agenda Layanan VIP
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Dokter..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Reg ID</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas VIP</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Dokter DPJP Layan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Layanan & Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((a, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{a.time} WIB</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200`}>
                                    {a.id}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{a.patient}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 w-max">{a.doctor}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <div className="text-slate-500 text-xs font-bold mb-1">{a.type}</div>
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      a.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : a.status === "Sedang Berlangsung"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse"
                                          : a.status === "Menunggu"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {a.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {a.status === "Sedang Berlangsung" && <Star className="w-3 h-3" />}
                                    {a.status === "Menunggu" && <Clock className="w-3 h-3" />}
                                    {a.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal VIP ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
