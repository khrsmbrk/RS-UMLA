import React, { useState } from "react";
import { Plane, LayoutDashboard, Search, FileText, CheckCircle, Clock, Check } from "lucide-react";

export default function OfficeMedicalTourism() {
  const [searchTerm, setSearchTerm] = useState("");

  const tourismData = [
    { reqId: "MT-1290", name: "Mr. John Smith", country: "Australia", arrival: "15 Jun 2026", package: "Cardiac Surgery Package", status: "Kedatangan Dikonfirmasi" },
    { reqId: "MT-1291", name: "Mrs. Lim Wei", country: "Singapore", arrival: "20 Jun 2026", package: "Executive Health Screening", status: "Menunggu Jadwal Penerbangan" },
    { reqId: "MT-1292", name: "Mr. Ahmad F.", country: "Malaysia", arrival: "05 Jun 2026", package: "Orthopedic Joint Replacement", status: "Dalam Perawatan" },
    { reqId: "MT-1293", name: "Ms. Sarah K.", country: "UK", arrival: "28 Jun 2026", package: "Dental Implants (Full Mouth)", status: "Review Medis" },
  ];

  const filtered = tourismData.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.package.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Plane className="w-6 h-6 text-sky-600" /> Medical Tourism
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen pasien internasional, koordinasi penerbangan, penjemputan bandara, dan paket perawatan eksklusif.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Plane className="w-20 h-20 absolute -right-4 -bottom-4 text-slate-700/50" />
              <span className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Kunjungan Bulan Ini</span>
              <span className="text-3xl font-black text-white relative z-10">45 <span className="text-sm opacity-50 text-slate-400">Pasien Asing</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Terkonfirmasi</span>
              <span className="text-3xl font-black text-slate-800">12 <span className="text-sm opacity-50 text-slate-500">Pasien Baru</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Review Medis / Konsul</span>
              <span className="text-3xl font-black text-slate-800">8 <span className="text-sm opacity-50 text-slate-500">Kasus</span></span>
          </div>
          <div className="bg-sky-50 rounded-xl border border-sky-200 shadow-sm p-4">
              <span className="text-sky-600 font-bold uppercase tracking-widest text-xs mb-1 block">Dalam Perawatan</span>
              <span className="text-3xl font-black text-sky-800">25 <span className="text-sm opacity-50 text-sky-600">Bed Aktif</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Agenda Layanan Internasional
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Paket..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas & Kewarganegaraan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Jadwal Kedatangan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Paket Medis</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Koordinasi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((d, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 text-base mb-1">{d.name}</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-500 border-slate-200">{d.reqId}</span>
                                    <span className="text-xs font-bold text-sky-700">{d.country}</span>
                                </div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{d.arrival}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-medium bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md w-max">{d.package}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      d.status === "Kedatangan Dikonfirmasi"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : d.status === "Dalam Perawatan"
                                          ? "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                  >
                                    {d.status === "Kedatangan Dikonfirmasi" && <Check className="w-3 h-3" />}
                                    {d.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada data medical tourism ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
