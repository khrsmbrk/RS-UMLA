import React, { useState } from "react";
import { HeartHandshake, Heart, Search, CheckCircle, Clock } from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeSpiritual() {
  const [searchTerm, setSearchTerm] = useState("");
  const { spiritualSchedules: schedules, updateSpiritualScheduleStatus } = useOfficeStore();

  const filtered = schedules.filter((s: any) => s.patient.toLowerCase().includes(searchTerm.toLowerCase()) || s.ward.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-teal-600" /> Bimbingan Rohani (Bintal)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Jadwal asuhan rohani pasien rawat inap, konseling keluarga, dan pembinaan mental.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-teal-900 border border-teal-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <HeartHandshake className="w-20 h-20 absolute -right-4 -bottom-4 text-teal-800/80" />
              <span className="text-teal-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Agenda Hari Ini</span>
              <span className="text-3xl font-black text-white relative z-10">12 <span className="text-sm opacity-50 text-teal-400">Kunjungan</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Sedang Berlangsung</span>
              <span className="text-3xl font-black text-slate-800">2 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Telah Dilayani</span>
              <span className="text-3xl font-black text-slate-800">8 <span className="text-sm opacity-50 text-slate-500">Kunjungan</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Rohaniwan Aktif</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Petugas / Pemuka Agama</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <Heart className="w-5 h-5 text-slate-400" /> Jadwal Kunjungan Rohaniwan
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Ruangan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Tujuan Layanan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Nama Pasien / Keluarga</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Petugas / Rohaniwan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Kunjungan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mb-1.5 bg-slate-100 text-slate-500 border-slate-200">{s.id}</span>
                                <div className="font-black text-slate-800 text-base">{s.time} WIB</div>
                                <div className="font-medium text-slate-500 text-xs">{s.type}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 mb-1">{s.patient}</div>
                                <div className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded inline-block border border-teal-100 text-xs">{s.ward}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-bold">{s.counselor}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right flex flex-col items-end gap-1.5">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      s.status === "Selesai"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : s.status === "Terjadwal"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {s.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {s.status === "Terjadwal" && <Clock className="w-3 h-3" />}
                                    {s.status}
                                  </span>
                                  {s.status === "Terjadwal" && (
                                     <button
                                        onClick={() => updateSpiritualScheduleStatus(s.id, "Selesai")}
                                        className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 flex items-center rounded"
                                     >
                                        Selesaikan
                                     </button>
                                  )}
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal bimbingan rohani ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
