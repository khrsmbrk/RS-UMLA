import React from "react";
import { Trash2, Scale, AlertTriangle, Truck, Clock } from "lucide-react";

export default function OfficeWasteManagement() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-emerald-600" /> Sanitasi & Limbah
            Medis B3
          </h1>
          <p className="text-slate-500 mt-1">
            Pencatatan timbangan limbah B3, manifest pihak ke-3, dan limbah
            domestik.
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Scale className="w-5 h-5" /> Input Timbangan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Limbah Infeksius (Bulan Ini)",
            val: "1,420 kg",
            col: "text-rose-600",
            bg: "bg-rose-50",
          },
          {
            label: "Limbah Tajam",
            val: "430 kg",
            col: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Limbah Domestik",
            val: "3,210 kg",
            col: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Jadwal Ambil",
            val: "Besok",
            col: "text-blue-600",
            bg: "bg-blue-50",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              {c.label}
            </div>
            <div className={`text-2xl font-black tracking-tight ${c.col}`}>
              {c.val}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm text-center">
            Log Pengangkutan Pihak Ketiga
          </h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                ID Manifest
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Tanggal Angkut
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Vendor PT
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Total Berat
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              {
                id: "MNF-2605-01",
                date: "20 Mei 2026",
                pt: "PT. Arafah",
                weight: "450.5 kg",
                stat: "Selesai",
              },
              {
                id: "MNF-2605-02",
                date: "27 Mei 2026",
                pt: "PT. Arafah",
                weight: "-",
                stat: "Terjadwal",
              },
            ].map((m, i) => (
              <tr key={i}>
                <td className="px-5 py-5 font-black text-slate-700">{m.id}</td>
                <td className="px-5 py-5 font-medium text-slate-600">
                  {m.date}
                </td>
                <td className="px-5 py-5 font-bold text-slate-700">{m.pt}</td>
                <td className="px-5 py-5 text-slate-600 font-medium">
                  {m.weight}
                </td>
                <td className="px-5 py-5">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      m.stat === "Selesai"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {m.stat}
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
