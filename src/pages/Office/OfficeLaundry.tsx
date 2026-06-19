import React, { useState, useMemo } from "react";
import { Shirt, ArrowRightLeft, Droplet, CheckCircle, Search, Truck } from "lucide-react";

export default function OfficeLaundry() {
  const [searchTerm, setSearchTerm] = useState("");

  const distLogs = useMemo(() => [
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
       {
        unit: "Ruang Bersalin (VK)",
        items: "10 Selimut, 10 Baju Ganti",
        time: "15:00 WIB",
        status: "Menunggu",
      },
  ], []);

  const filteredLogs = useMemo(() => {
      return distLogs.filter(log => 
          log.unit.toLowerCase().includes(searchTerm.toLowerCase()) || 
          log.items.toLowerCase().includes(searchTerm.toLowerCase())
      )
  }, [distLogs, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Shirt className="w-6 h-6 text-sky-500" /> Instalasi Linen & Laundry
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
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
              {distLogs.filter(d => d.status === "Menunggu").length} <span className="text-sm font-bold opacity-75">antrean</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Log Pendistribusian Linen
          </h3>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Unit / Item..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Unit Tujuan
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Daftar Item
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jadwal / Waktu
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Status Pengiriman
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-5 font-bold text-slate-800 text-base align-middle">
                  {row.unit}
                </td>
                <td className="px-5 py-5 text-slate-600 font-medium align-middle">
                  {row.items}
                </td>
                <td className="px-5 py-5 font-bold text-slate-600 align-middle">
                  {row.time}
                </td>
                <td className="px-5 py-5 text-right align-middle">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                      row.status === "Selesai"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : row.status === "Menunggu"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {row.status === "Sedang Diantar" && <Truck className="w-3 h-3" />}
                    {row.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada log distribusi ditemukan.</td>
                </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
