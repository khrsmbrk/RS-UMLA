import React, { useState } from "react";
import { Home, LayoutDashboard, Search, MapPin, Activity, CheckCircle, Clock } from "lucide-react";

export default function OfficeHomecare() {
  const [searchTerm, setSearchTerm] = useState("");

  const visits = [
    { id: "HC-001", patient: "Tn. Surya (65th)", type: "Perawatan Luka", time: "09:00 WIB", status: "Sedang Kunjungan", team: "Ns. Eka, Amd.Kep", loc: "Kec. Blimbing" },
    { id: "HC-002", patient: "Ny. Wahyuni (70th)", type: "Fisioterapi", time: "11:00 WIB", status: "Selesai", team: "Budi, S.Ft", loc: "Kec. Lowokwaru" },
    { id: "HC-003", patient: "An. Bintang (5th)", type: "Terapi Wicara", time: "13:00 WIB", status: "Menuju Lokasi", team: "Dian, T.Wic", loc: "Kec. Sukun" },
    { id: "HC-004", patient: "Tn. Darmawan (72th)", type: "Pemasangan NGT", time: "15:00 WIB", status: "Terjadwal", team: "Ns. Sari, S.Kep", loc: "Kec. Klojen" },
  ];

  const filtered = visits.filter(v => v.patient.toLowerCase().includes(searchTerm.toLowerCase()) || v.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Home className="w-6 h-6 text-teal-600" /> Layanan Homecare
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen penjadwalan, penugasan tim medis, dan monitoring layanan perawatan di rumah pasien.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-teal-50 rounded-xl border border-teal-200 shadow-sm p-4 relative overflow-hidden">
              <Home className="w-20 h-20 absolute -right-4 -bottom-4 text-teal-500/20" />
              <span className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Kunjungan Hari Ini</span>
              <span className="text-3xl font-black text-teal-800 relative z-10">14 <span className="text-sm opacity-50 text-teal-600">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Telah Selesai</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Tim Aktif di Lapangan</span>
              <span className="text-3xl font-black text-slate-800">6 <span className="text-sm opacity-50 text-slate-500">Petugas</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Terjadwal Berikutnya</span>
              <span className="text-3xl font-black text-slate-800">3 <span className="text-sm opacity-50 text-slate-500">Kunjungan</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-slate-400" /> Dispatch & Monitoring Tim
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Tindakan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal & Area</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Pasien</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Layanan & Tim Medis</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Kunjungan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{v.time}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200`}>
                                    {v.loc}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{v.patient}</div>
                                <div className="text-slate-400 text-[10px] items-center uppercase font-black tracking-widest mt-1">ID: {v.id}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 w-max mb-1">{v.type}</div>
                                <div className="text-slate-500 text-xs">Petugas: {v.team}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      v.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : v.status === "Sedang Kunjungan"
                                          ? "bg-teal-50 text-teal-700 border-teal-200 animate-pulse"
                                          : v.status === "Menuju Lokasi"
                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                  >
                                    {v.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {v.status === "Sedang Kunjungan" && <Activity className="w-3 h-3" />}
                                    {v.status === "Menuju Lokasi" && <MapPin className="w-3 h-3" />}
                                    {v.status === "Terjadwal" && <Clock className="w-3 h-3" />}
                                    {v.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada jadwal homecare ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
