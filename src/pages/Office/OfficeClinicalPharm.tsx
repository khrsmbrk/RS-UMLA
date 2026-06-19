import React, { useState } from "react";
import { Pill, Search, Syringe, ClipboardList, ShieldAlert, CheckCircle } from "lucide-react";

export default function OfficeClinicalPharm() {
  const [searchTerm, setSearchTerm] = useState("");

  const tasks = [
    { ptoId: "PTO-001", patient: "Tn. Rahmat", room: "ICU Bed 01", type: "Rekonsiliasi Obat", time: "09:00", status: "Selesai", notes: "Lanjutkan terapi OAT." },
    { ptoId: "PTO-002", patient: "Ny. Sari", room: "Ruang Melati", type: "Pemantauan Terapi", time: "10:30", status: "Perlu Review", notes: "Kadar ureum kreatinin naik, evaluasi dosis antibiotik." },
    { ptoId: "PTO-003", patient: "An. Bintang", room: "NICU", type: "Konseling Pasien", time: "13:00", status: "Menunggu", notes: "Pemberian informasi cara pakai inhaler pulang." },
    { ptoId: "PTO-004", patient: "Tn. Ahmad", room: "Ruang Anggrek", type: "Visite Bangsal", time: "14:15", status: "Menunggu", notes: "Interaksi obat potensial: Warfarin dan Omeprazole." },
  ];

  const filteredTasks = tasks.filter(t => t.patient.toLowerCase().includes(searchTerm.toLowerCase()) || t.type.toLowerCase().includes(searchTerm.toLowerCase()) || t.room.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Pill className="w-6 h-6 text-emerald-700" /> Pelayanan Farmasi Klinis (PTO)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pemantauan Terapi Obat (PTO), rekonsiliasi, visite bangsal, dan konseling apoteker.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm p-4 relative overflow-hidden">
              <ClipboardList className="w-20 h-20 absolute -right-4 -bottom-4 text-emerald-500/20" />
              <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Target PTO Hari Ini</span>
              <span className="text-3xl font-black text-emerald-800 relative z-10">24 <span className="text-sm opacity-50 text-emerald-700">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1 block">Telah Direview</span>
              <span className="text-3xl font-black text-slate-800">12 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-4">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Perlu Evaluasi (Kritis)</span>
              <span className="text-3xl font-black text-amber-800">3 <span className="text-sm opacity-50 text-amber-600">Kasus</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1 block">Konseling Pasien Pulang</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Antrean</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <Syringe className="w-5 h-5 text-slate-400" /> Jadwal Kegiatan Farmasi Klinis
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Ruangan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Target</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Aktivitas PTO</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Catatan Klinis</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredTasks.map((t, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{t.time} WIB</div>
                                <div className="font-bold text-slate-700 text-base">{t.patient}</div>
                                <div className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 inline-block mt-1">{t.room}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <span className="font-bold text-slate-700">{t.type}</span>
                                <div className="text-slate-400 text-[10px] uppercase tracking-widest font-black mt-1">ID: {t.ptoId}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <p className="text-slate-600 max-w-sm whitespace-normal text-xs leading-relaxed">{t.notes}</p>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      t.status === "Selesai"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : t.status === "Perlu Review"
                                          ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {t.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {t.status === "Perlu Review" && <ShieldAlert className="w-3 h-3" />}
                                    {t.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filteredTasks.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal PTO ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
