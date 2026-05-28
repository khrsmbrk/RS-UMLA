import React from "react";
import { Activity, Thermometer, AlertTriangle, Plus } from "lucide-react";

export default function OfficeBiomedical() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600" /> Biomedik &
            Kalibrasi Alkes
          </h1>
          <p className="text-slate-500 mt-1">
            Manajemen jadwal preventative maintenance (PM) dan kalibrasi alat
            kesehatan.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Jadwal Maintenance
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Daftar Jadwal Kalibrasi Mendekati Expired
          </h3>
        </div>
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Nama Alat & Nomor Seri
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Lokasi / Unit
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Sertifikat Terakhir
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jadwal Kalibrasi
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              {
                name: "Patient Monitor Philips",
                sn: "PM-PH-0220",
                loc: "ICU Bed 2",
                last: "12 Jun 2025",
                next: "12 Jun 2026",
                stat: "Due Soon",
              },
              {
                name: "USG Mindray 4D",
                sn: "USG-MD-0988",
                loc: "Poliklinik Kandungan",
                last: "20 Jul 2025",
                next: "20 Jul 2026",
                stat: "Aman",
              },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-5 align-top">
                  <div className="font-bold text-slate-800 mb-1">
                    {item.name}
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    SN: {item.sn}
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-slate-700 align-top">
                  {item.loc}
                </td>
                <td className="px-5 py-5 font-medium text-slate-600 align-top">
                  {item.last}
                </td>
                <td className="px-5 py-5 font-medium text-slate-600 align-top">
                  {item.next}
                </td>
                <td className="px-5 py-5 align-top">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      item.stat === "Due Soon"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {item.stat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
