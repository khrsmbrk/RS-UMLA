import React from "react";
import { FileBadge, ScrollText, CheckCircle, ShieldCheck } from "lucide-react";

export default function OfficeCredentials() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileBadge className="w-6 h-6 text-indigo-800" /> Komite Medik /
            Keperawatan
          </h1>
          <p className="text-slate-500 mt-1">
            Manajemen kredensial staf klinis, Rincian Kewenangan Klinis (RKK),
            dan Surat Penugasan Klinis (SPK).
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Status RKK Kadaluwarsa
          </h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Nama Spesialis / Nakes
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Unit Kompetensi
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Valid Sampai
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100/50 hover:bg-slate-50">
              <td className="px-5 py-5 font-bold text-slate-800">
                dr. Ahmad, Sp.PD
              </td>
              <td className="px-5 py-5 font-bold text-slate-600">
                Penyakit Dalam
              </td>
              <td className="px-5 py-5 text-rose-600 font-bold">12 Mei 2026</td>
              <td className="px-5 py-5 text-right">
                <button className="text-xs font-black uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 text-slate-600">
                  Re-Kredensial
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
