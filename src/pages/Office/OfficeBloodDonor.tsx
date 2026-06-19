import React from "react";
import { HeartPulse, Calendar, Bus, MapPin, Search } from "lucide-react";

export default function OfficeBloodDonor() {
  const events = [
      { id: "MU-001", date: "Besok, 28 Mei 2026", location: "Universitas Brawijaya", target: 150, signed: 120, status: "Persiapan", type: "Instansi Pendidikan" },
      { id: "MU-002", date: "30 Mei 2026", location: "Balaikota Malang", target: 200, signed: 80, status: "Terjadwal", type: "Pemerintahan" },
      { id: "MU-003", date: "Hari Ini, 27 Mei 2026", location: "Alun-Alun Kota", target: 100, signed: 85, status: "Berlangsung", type: "Umum" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-red-600" /> Mobile Unit Donor
            Darah & Afaresis
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen jadwal bus donor darah keliling dan target perolehan kantong darah.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-xl border border-red-200 shadow-sm p-5 flex items-center gap-4">
             <div className="bg-red-100 p-3 rounded-lg text-red-600">
                <HeartPulse className="w-8 h-8"/>
             </div>
             <div>
                <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1 block">Target Bulan Ini</div>
                <div className="text-3xl font-black text-red-800">1,500 <span className="text-sm opacity-50">Kantong</span></div>
             </div>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-5 flex items-center gap-4">
               <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
                <Calendar className="w-8 h-8"/>
             </div>
             <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1 block">Jadwal Event Aktif</div>
                <div className="text-3xl font-black text-amber-800">12 <span className="text-sm opacity-50">Kegiatan</span></div>
             </div>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-5 flex items-center gap-4">
               <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Bus className="w-8 h-8"/>
             </div>
             <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1 block">Armada Beroperasi</div>
                <div className="text-3xl font-black text-blue-800">3 <span className="text-sm opacity-50">Bus</span></div>
             </div>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Daftar Kegiatan Mobile Unit Terdekat</h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Cari Lokasi / ID..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Lokasi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Tipe Kegiatan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Target perolehan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {events.map((e, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-middle">
                                <div className="font-black text-slate-800 mb-1 text-base">{e.location}</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3 h-3"/> {e.date}</div>
                            </td>
                            <td className="px-5 py-4 align-middle">
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border border-slate-200">{e.type}</span>
                            </td>
                            <td className="px-5 py-4 align-middle">
                                <div className="flex items-center gap-3">
                                   <div className="flex-1 w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                                       <div className={`h-full rounded-full ${e.signed / e.target >= 1 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, (e.signed / e.target) * 100)}%` }}></div>
                                   </div>
                                   <span className="font-bold text-slate-700 text-xs">{e.signed} / {e.target}</span>
                                </div>
                            </td>
                            <td className="px-5 py-4 align-middle text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      e.status === "Berlangsung"
                                        ? "bg-red-50 text-red-700 border-red-200 animate-pulse"
                                        : e.status === "Persiapan"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-blue-50 text-blue-700 border-blue-200"
                                    }`}
                                  >
                                    {e.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
