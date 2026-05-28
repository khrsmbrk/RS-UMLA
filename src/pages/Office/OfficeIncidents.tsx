import React from "react";
import { ShieldAlert, Plus, Layers, AlertCircle } from "lucide-react";

export default function OfficeIncidents() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" /> Insiden
            Keselamatan Pasien (IKP)
          </h1>
          <p className="text-slate-500 mt-1">
            Pelaporan insiden KTD, KNC, KTC, KPC, dan form RCA (Root Cause
            Analysis).
          </p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Lapor Insiden Baru
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col text-slate-700">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Log Insiden Bulan Ini
          </h3>
        </div>
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                ID & Tanggal Kejadian
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jenis IKP
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Keterangan Singkat
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Grading / Risiko
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              {
                id: "IKP-2605-01",
                date: "25 Mei 2026 14:30",
                type: "KNC (Kejadian Nyaris Cedera)",
                desc: "Kesalahan identifikasi obat namun disadari perawat sebelum diberikan",
                grade: "Biru (Rendah)",
                status: "Investigasi Selesai",
              },
              {
                id: "IKP-2605-02",
                date: "24 Mei 2026 09:15",
                type: "KTD (Kejadian Tidak Diharapkan)",
                desc: "Pasien jatuh dari tempat tidur IGD karena bed rail tidak dipasang",
                grade: "Kuning (Tinggi)",
                status: "RCA Berjalan",
              },
            ].map((inc, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-5 font-medium align-top">
                  <div className="font-black text-slate-800 mb-1">{inc.id}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {inc.date}
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-slate-700 align-top max-w-[200px] leading-snug">
                  {inc.type}
                </td>
                <td className="px-5 py-5 font-medium text-slate-600 align-top max-w-[300px] leading-relaxed">
                  {inc.desc}
                </td>
                <td className="px-5 py-5 align-top">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      inc.grade.includes("Kuning")
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {inc.grade}
                  </span>
                </td>
                <td className="px-5 py-5 text-right align-top text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {inc.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
