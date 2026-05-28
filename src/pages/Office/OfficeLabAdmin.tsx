import React from "react";
import {
  FlaskConical,
  Droplet,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function OfficeLabAdmin() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-fuchsia-600" /> Instalasi
            Laboratorium (Admin)
          </h1>
          <p className="text-slate-500 mt-1">
            Manajemen reagen laboratorium, quality control harian, dan order
            pemeriksaan.
          </p>
        </div>
        <span className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-sm rounded-lg border border-slate-200">
          Sistem LIS: Terhubung
        </span>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden">
        <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm mb-4">
          Stok Reagen Kritis
        </h3>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Nama Reagen
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Batas Kritis
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Sisa Stok
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50 border-b border-slate-100/50">
              <td className="px-5 py-5 font-bold text-slate-800">
                Reagen Hematology Sysmex (Diluent)
              </td>
              <td className="px-5 py-5 text-slate-500">2 Box</td>
              <td className="px-5 py-5 font-black text-rose-600">1 Box</td>
              <td className="px-5 py-5">
                <button className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border border-rose-200">
                  Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
