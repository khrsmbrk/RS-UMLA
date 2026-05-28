import React from "react";
import {
  CreditCard,
  FileSearch,
  CheckSquare,
  AlertTriangle,
  FileText,
} from "lucide-react";

export default function OfficeCasemix() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" /> Casemix / Klaim
            BPJS
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem informasi manajemen INA-CBG dan monitoring pending klaim.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
            <FileText className="w-5 h-5" /> Export Laporan Berkas
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Tasklist Koding & Grouper
          </h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                No. RM / Data Pasien
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Poliklinik / Perawatan
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Diagnosa Medis (ICD-10)
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Tindakan (ICD-9CM)
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Tarif INA-CBG
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Status Berkas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              {
                rm: "RM-20918",
                name: "Bapak Sudarjo",
                poli: "Penyakit Dalam",
                icd10: "E11.9 (Type 2 DM)",
                icd9: "-",
                tarif: "Menunggu",
                stat: "Perlu Koding",
              },
              {
                rm: "RM-28834",
                name: "Ny. Warsi",
                poli: "Rawat Inap Bedah",
                icd10: "K35.8 (Appendicitis)",
                icd9: "47.0 (Appendectomy)",
                tarif: "Rp 6,500,000",
                stat: "Selesai Grouper",
              },
            ].map((c, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-5 align-top">
                  <div className="font-bold text-slate-800 text-base mb-1">
                    {c.name}
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {c.rm}
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-slate-600 align-top">
                  {c.poli}
                </td>
                <td className="px-5 py-5 align-top">
                  <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded text-xs font-bold">
                    {c.icd10}
                  </span>
                </td>
                <td className="px-5 py-5 align-top">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                    {c.icd9}
                  </span>
                </td>
                <td className="px-5 py-5 align-top font-black text-slate-800">
                  {c.tarif}
                </td>
                <td className="px-5 py-5 align-top">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      c.stat === "Perlu Koding"
                        ? "bg-rose-100 text-rose-700 border-rose-200 animate-pulse"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {c.stat}
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
