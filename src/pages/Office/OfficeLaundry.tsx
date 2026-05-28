import React from "react";
import { Shirt, ArrowRightLeft, Droplet, CheckCircle } from "lucide-react";

export default function OfficeLaundry() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Shirt className="w-6 h-6 text-sky-500" /> Instalasi Linen & Laundry
          </h1>
          <p className="text-slate-500 mt-1">
            Siklus distribusi linen bersih dan pencucian linen kotor /
            infeksius.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-sky-100 rounded-full text-sky-600">
            <Droplet className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">
              Proses Cuci
            </div>
            <div className="text-3xl font-black text-sky-800">
              124 <span className="text-sm font-bold opacity-75">kg</span>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-100 rounded-full text-emerald-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">
              Linen Bersih
            </div>
            <div className="text-3xl font-black text-emerald-800">
              350 <span className="text-sm font-bold opacity-75">pcs</span>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-100 rounded-full text-amber-600">
            <ArrowRightLeft className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">
              Distribusi Pending
            </div>
            <div className="text-3xl font-black text-amber-800">
              3 <span className="text-sm font-bold opacity-75">unit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Log Pendistribusian Linen
          </h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Unit Tujuan
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Daftar Item
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jadwal Pengiriman
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              {
                unit: "Ruang ICU",
                items: "20 Sprei, 15 Selimut",
                time: "10:00 WIB",
                status: "Selesai",
              },
              {
                unit: "IGD & Triage",
                items: "30 Sprei, 10 Baju Pasien",
                time: "11:30 WIB",
                status: "Sedang Diantar",
              },
              {
                unit: "Kamar Mandi VIP",
                items: "15 Handuk Mandi",
                time: "14:00 WIB",
                status: "Menunggu",
              },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-5 font-bold text-slate-800 text-base">
                  {row.unit}
                </td>
                <td className="px-5 py-5 text-slate-600 font-medium">
                  {row.items}
                </td>
                <td className="px-5 py-5 font-bold text-slate-600">
                  {row.time}
                </td>
                <td className="px-5 py-5">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      row.status === "Selesai"
                        ? "bg-emerald-50 text-emerald-700"
                        : row.status === "Menunggu"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {row.status}
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
