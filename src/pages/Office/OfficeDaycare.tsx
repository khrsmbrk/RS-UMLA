import React, { useState } from "react";
import { Smile, User, Clock, CalendarDays, Search } from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeDaycare() {
  const [searchTerm, setSearchTerm] = useState("");
  const { daycareKids: kids, updateDaycareKidStatus } = useOfficeStore();

  const filteredKids = kids.filter((k: any) => k.name.toLowerCase().includes(searchTerm.toLowerCase()) || k.parent.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Smile className="w-6 h-6 text-pink-500" /> Penitipan Anak (Daycare Pegawai)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen penitipan anak untuk fasilitas pegawai rumah sakit.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-pink-50 rounded-xl border border-pink-200 shadow-sm p-4 relative overflow-hidden">
              <User className="w-20 h-20 absolute -right-4 -bottom-4 text-pink-500/20" />
              <span className="text-pink-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Anak Terdaftar</span>
              <span className="text-3xl font-black text-pink-800 relative z-10">45 <span className="text-sm opacity-50 text-pink-600">Anak</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Hadir Hari Ini</span>
              <span className="text-3xl font-black text-slate-800">22 <span className="text-sm opacity-50 text-slate-500">Anak</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1 block">Sudah Dijemput</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Anak</span></span>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-4">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Overtime Care (&gt;17:00)</span>
              <span className="text-3xl font-black text-amber-800">2 <span className="text-sm opacity-50 text-amber-600">Anak</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <CalendarDays className="w-5 h-5 text-slate-400" /> Presensi Hari Ini
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Nama Anak / Orang Tua..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Anak</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Orang Tua (Pegawai)</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Waktu Penitipan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredKids.map((k, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{k.name}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200`}>
                                    Usia: {k.age}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{k.parent}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 text-xs"><span className="text-slate-400 font-bold uppercase tracking-widest">Drop-off:</span> {k.dropTime}</div>
                                <div className="text-slate-600 text-xs mt-1"><span className="text-slate-400 font-bold uppercase tracking-widest">Pick-up:</span> {k.pickupTime}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                <div className="flex flex-col items-end gap-2">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-block ${
                                      k.status === "Pulang"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : k.status === "Hadir"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                  >
                                    {k.status}
                                  </span>
                                  {k.status === 'Hadir' && (
                                     <button
                                        onClick={() => updateDaycareKidStatus(k.id, "Pulang")}
                                        className="text-[10px] bg-slate-800 text-white px-2 py-1 flex items-center rounded"
                                     >
                                        Set Pulang
                                     </button>
                                  )}
                                  {k.status === 'Izin' && (
                                     <button
                                        onClick={() => updateDaycareKidStatus(k.id, "Hadir")}
                                        className="text-[10px] bg-emerald-600 text-white px-2 py-1 flex items-center rounded"
                                     >
                                        Set Hadir
                                     </button>
                                  )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredKids.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada data presensi ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
