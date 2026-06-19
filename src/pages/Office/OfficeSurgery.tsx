import React, { useState } from "react";
import { Scissors, Search, Clock, CheckCircle } from "lucide-react";

export default function OfficeSurgery() {
  const [searchTerm, setSearchTerm] = useState("");

  const schedules = [
    {
       room: "OK 1",
       patient: "Tn. Abdullah",
       procedure: "Appendectomy",
       surgeon: "Dr. Budi, Sp.B",
       anesthesia: "Dr. Sarah, Sp.An",
       time: "08:00 - 10:00",
       status: "Selesai", 
    },
    {
       room: "OK 2",
       patient: "Ny. Ratna",
       procedure: "Sectio Caesarea",
       surgeon: "Dr. Kartini, Sp.OG",
       anesthesia: "Dr. Anton, Sp.An",
       time: "10:30 - 12:00",
       status: "Sedang Berlangsung", 
    },
    {
       room: "OK 3",
       patient: "Tn. Herman",
       procedure: "Herniotomy",
       surgeon: "Dr. Budi, Sp.B",
       anesthesia: "Dr. Sarah, Sp.An",
       time: "13:00 - 15:00",
       status: "Persiapan", 
    }
  ];

  const filtered = schedules.filter(s => s.patient.toLowerCase().includes(searchTerm.toLowerCase()) || s.procedure.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Scissors className="w-6 h-6 text-red-600" /> Instalasi Bedah Sentral
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen penjadwalan kamar operasi, tim medis, dan pemantauan status operasi.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">Total Operasi Hari Ini</span>
              <span className="text-3xl font-black text-slate-800">8 <span className="text-sm opacity-50">Tindakan</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-100 shadow-sm p-4 flex flex-col">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1">Sedang Berlangsung</span>
              <span className="text-3xl font-black text-rose-800">2 <span className="text-sm opacity-50">Kamar</span></span>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm p-4 flex flex-col">
              <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs mb-1">Selesai & Pemulihan</span>
              <span className="text-3xl font-black text-emerald-800">3 <span className="text-sm opacity-50">Pasien</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Jadwal Kamar Operasi</h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Tindakan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Ruang</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Pasien & Tindakan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Tim Medis</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{s.time}</div>
                                <div className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 inline-block">{s.room}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{s.patient}</div>
                                <div className="text-slate-600 text-sm mt-0.5">{s.procedure}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-700 font-bold text-xs"><span className="text-slate-400 font-medium">Operator:</span> {s.surgeon}</div>
                                <div className="text-slate-700 font-bold text-xs mt-1"><span className="text-slate-400 font-medium">Anestesi:</span> {s.anesthesia}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      s.status === "Selesai"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : s.status === "Sedang Berlangsung"
                                          ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                                          : "bg-blue-50 text-blue-700 border-blue-200"
                                    }`}
                                  >
                                    {s.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {s.status === "Sedang Berlangsung" && <Clock className="w-3 h-3" />}
                                    {s.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal operasi ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>

    </div>
  );
}
