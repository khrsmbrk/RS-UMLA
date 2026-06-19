import React, { useState } from "react";
import { Heart, HeartPulse, Activity, CalendarDays, Search, Clock, CheckCircle, Flame } from "lucide-react";

export default function OfficeCathlab() {
  const [searchTerm, setSearchTerm] = useState("");

  const schedules = [
    { time: "08:00 - 09:30", type: "Elektif", patient: "Tn. Rahmat (54th)", action: "Coronary Angiography (CAG)", status: "Selesai", doctor: "dr. Andi, Sp.JP(K)" },
    { time: "10:00 - 12:00", type: "Elektif", patient: "Ny. Siti (61th)", action: "PCI / Stent Placement", status: "Berlangsung", doctor: "dr. Andi, Sp.JP(K)" },
    { time: "13:00 - 14:00", type: "Elektif", patient: "Tn. Budi (48th)", action: "Pacemaker (PPM) Implantation", status: "Persiapan", doctor: "dr. Hasan, Sp.JP(K)" },
    { time: "15:00 - 16:30", type: "Cito", patient: "Tn. Surya (59th)", action: "Primary PCI", status: "Menunggu", doctor: "dr. Hasan, Sp.JP(K)" },
  ];

  const filtered = schedules.filter(s => s.patient.toLowerCase().includes(searchTerm.toLowerCase()) || s.action.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600" /> Cathlab & Pusat Jantung Terpadu
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen jadwal tindakan kateterisasi jantung dan pemantauan ketersediaan lab.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4 relative overflow-hidden">
              <HeartPulse className="w-20 h-20 absolute -right-4 -bottom-4 text-rose-500/20" />
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Tindakan (Bulan Ini)</span>
              <span className="text-3xl font-black text-rose-800 relative z-10">42 <span className="text-sm opacity-50 text-rose-600">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Pasien Elektif Hari Ini</span>
              <span className="text-3xl font-black text-slate-800">3 <span className="text-sm opacity-50 text-slate-500">Jadwal</span></span>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-200 shadow-sm p-4">
              <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><Flame className="w-3 h-3"/> Cito (Primary PCI)</span>
              <span className="text-3xl font-black text-red-800">1 <span className="text-sm opacity-50 text-red-600">Pasien</span></span>
          </div>
          <div className="bg-sky-50 rounded-xl border border-sky-200 shadow-sm p-4">
              <span className="text-sky-600 font-bold uppercase tracking-widest text-xs mb-1 block">Status Lab (Room A)</span>
              <span className="text-xl font-black text-sky-800 pt-2 flex items-center gap-2 block"><Activity className="w-5 h-5 text-sky-500" /> In Use</span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <CalendarDays className="w-5 h-5 text-slate-400" /> Jadwal Kateterisasi Hari Ini
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Tindakan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Tipe</th>
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
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block ${s.type === 'Cito' ? 'bg-red-50 text-red-600 border-red-200 flex items-center gap-1 w-max' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {s.type === 'Cito' && <Flame className="w-3 h-3" />}
                                    {s.type}
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
                                          ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
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
