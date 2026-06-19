import React, { useState, useMemo } from "react";
import { LineChart, Star, Medal, CheckCircle, Search, TrendingUp, AlertTriangle } from "lucide-react";

export default function OfficeQuality() {
  const [searchTerm, setSearchTerm] = useState("");

  const indicators = useMemo(() => [
      {
          id: "INM-01",
          name: "Kepatuhan Kebersihan Tangan",
          target: "≥ 85%",
          current: "88.5%",
          trend: "up",
          status: "Achieved",
      },
      {
          id: "INM-02",
          name: "Kepatuhan Penggunaan APD",
          target: "100%",
          current: "95%",
          trend: "down",
          status: "Below Target",
      },
      {
          id: "INM-03",
          name: "Kepatuhan Identifikasi Pasien",
          target: "100%",
          current: "100%",
          trend: "flat",
          status: "Achieved",
      },
      {
          id: "INM-04",
          name: "Waktu Tanggap Seksio Sesarea Emergensi",
          target: "≤ 30 Menit",
          current: "35 Menit",
          trend: "down",
          status: "Below Target",
      },
      {
          id: "INM-05",
          name: "Waktu Tunggu Rawat Jalan",
          target: "≤ 60 Menit",
          current: "45 Menit",
          trend: "up",
          status: "Achieved",
      }
  ], []);

  const filteredIndicators = useMemo(() => {
     return indicators.filter(i => 
         i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         i.id.toLowerCase().includes(searchTerm.toLowerCase())
     )
  }, [indicators, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-purple-600" /> Komite Mutu (PMKP)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Peningkatan Mutu dan Keselamatan Pasien (Indikator Mutu Nasional/RS,
            validasi data, PDSA).
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 flex flex-col items-center justify-center text-center">
              <Medal className="w-10 h-10 text-purple-600 mb-2"/>
              <div className="text-sm font-bold text-slate-800">Akreditasi Paripurna</div>
              <div className="text-xs text-slate-500">Berlaku s/d 2029</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 flex flex-col items-center justify-center text-center">
             <div className="text-3xl font-black text-emerald-600 mb-1">85%</div>
             <div className="text-sm font-bold text-slate-800">Target INM Tercapai</div>
             <div className="text-xs text-slate-500">Bulan Ini</div>
          </div>
           <div className="bg-rose-50 rounded-xl p-5 border border-rose-100 flex flex-col items-center justify-center text-center">
             <div className="text-3xl font-black text-rose-600 mb-1">2</div>
             <div className="text-sm font-bold text-slate-800">Indikator Merah</div>
             <div className="text-xs text-slate-500">Perlu Evaluasi PDSA</div>
          </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Indikator Mutu Nasional (INM)
          </h3>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Indikator..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Kode
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Nama Indikator Mutu
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Target Standar
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Pencapaian
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredIndicators.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-5 font-bold text-slate-600 align-middle">
                   <div className="text-[10px] font-black bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block uppercase tracking-widest">
                    {item.id}
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-slate-800 align-middle">
                  {item.name}
                </td>
                <td className="px-5 py-5 font-medium text-slate-600 align-middle">
                  {item.target}
                </td>
                <td className="px-5 py-5 font-bold align-middle">
                  <div className="flex items-center gap-2">
                     <span className={item.status === 'Achieved' ? "text-emerald-600" : "text-rose-600"}>{item.current}</span>
                     {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                     {item.trend === 'down' && <TrendingUp className="w-4 h-4 text-rose-500 rotate-180" />}
                  </div>
                </td>
                <td className="px-5 py-5 text-right align-middle">
                   <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      item.status === "Below Target"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredIndicators.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada indikator mutu ditemukan.</td>
                </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
