import React, { useState } from "react";
import { LogOut, LayoutDashboard, Search, UserCheck, Clock, CheckCircle } from "lucide-react";

export default function OfficeDischarge() {
  const [searchTerm, setSearchTerm] = useState("");

  const plans = [
    { id: "DP-001", patient: "Tn. Abdullah", room: "Ruang Anggrek", date: "Hari Ini", time: "14:00 WIB", status: "Proses Edukasi", pic: "Ns. Sari" },
    { id: "DP-002", patient: "Ny. Ratna", room: "Kamar Bersalin", date: "Besok", time: "10:00 WIB", status: "Persiapan Berkas", pic: "Ns. Eka" },
    { id: "DP-003", patient: "An. Bintang", room: "NICU", date: "Hari Ini", time: "16:30 WIB", status: "Siap Pulang", pic: "dr. Siska, Sp.A" },
    { id: "DP-004", patient: "Tn. Herman", room: "Ruang Bedah", date: "Hari Ini", time: "11:00 WIB", status: "Selesai", pic: "Ns. Budi" },
  ];

  const filteredPlans = plans.filter(p => p.patient.toLowerCase().includes(searchTerm.toLowerCase()) || p.room.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <LogOut className="w-6 h-6 text-rose-600" /> Discharge Planning
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Perencanaan pemulangan pasien, edukasi perawatan di rumah, dan sinkronisasi administrasi.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4 relative overflow-hidden">
              <LogOut className="w-20 h-20 absolute -right-4 -bottom-4 text-rose-500/20" />
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Rencana Pulang (Hari Ini)</span>
              <span className="text-3xl font-black text-rose-800 relative z-10">14 <span className="text-sm opacity-50 text-rose-600">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Telah Dibebaskan / Selesai</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Menunggu Obat Keluar</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Antrean</span></span>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-4">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-1 block">Follow Up (Homecare)</span>
              <span className="text-3xl font-black text-blue-800">2 <span className="text-sm opacity-50 text-blue-600">Terjadwal</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <UserCheck className="w-5 h-5 text-slate-400" /> Daftar Pasien Rencana Pulang
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Ruangan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Pasien</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal Kepulangan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">PIC Edukasi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Checklist</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredPlans.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{p.patient}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200`}>
                                    {p.room}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{p.date}</div>
                                <div className="text-slate-500 text-xs mt-1">Estimasi: {p.time}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-700 font-bold">{p.pic}</div>
                                 <div className="text-slate-400 text-[10px] uppercase font-black tracking-widest mt-1">ID: {p.id}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      p.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : p.status === "Siap Pulang"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                          : p.status === "Proses Edukasi"
                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                  >
                                    {p.status === 'Siap Pulang' && <CheckCircle className="w-3 h-3"/>}
                                    {p.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filteredPlans.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada rencana pemulangan ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
