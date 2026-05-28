import React, { useState } from "react";
import {
  Package,
  Search,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Plus,
  Filter,
  Download,
} from "lucide-react";

export default function OfficeInventory() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-600" /> Gudang Farmasi &
            Alkes
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem informasi manajemen inventaris medis, stok opname, dan
            peringatan kedaluwarsa.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Inbound/Outbound Baru
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Item Aktif",
            val: "2,451",
            icon: Package,
            col: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Stok Kritis (Low)",
            val: "18",
            icon: TrendingUp,
            col: "text-rose-600",
            bg: "bg-rose-50",
          },
          {
            label: "Akan Kedaluwarsa",
            val: "43",
            icon: AlertCircle,
            col: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Permintaan Unit",
            val: "12",
            icon: CheckCircle,
            col: "text-emerald-600",
            bg: "bg-emerald-50",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-slate-300 transition-colors"
          >
            <div
              className={`absolute top-0 right-0 w-20 h-20 ${c.bg} rounded-bl-[100px] z-0 opacity-50`}
            ></div>
            <div className="flex justify-between items-center mb-3 relative z-10">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest max-w-[80%] leading-tight">
                {c.label}
              </div>
              <div
                className={`p-2 rounded-lg bg-white shadow-sm border border-slate-100 ${c.bg}`}
              >
                <c.icon className={`w-4 h-4 ${c.col}`} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-800 tracking-tight relative z-10">
              {c.val}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Daftar Stok Kritis & Expiring
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama obat/alkes..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
            <button className="bg-white border border-slate-200 text-slate-600 p-2 rounded-lg hover:bg-slate-50 shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                  SKU / Nama Item
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                  Kategori
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                  Stok Teresedia
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                  Tgl Kedaluwarsa
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  sku: "MED-092",
                  name: "Paracetamol Infus 10ml",
                  cat: "Obat Keras",
                  stock: "12 Box",
                  exp: "12 Jul 2026",
                  stat: "Kritis",
                },
                {
                  sku: "MED-114",
                  name: "Spuit 5cc (Syringe)",
                  cat: "BHP Medis",
                  stock: "500 Pcs",
                  exp: "05 Ags 2027",
                  stat: "Aman",
                },
                {
                  sku: "MED-254",
                  name: "Amoxicillin 500mg",
                  cat: "Antibiotik",
                  stock: "5 Box",
                  exp: "10 Jun 2026",
                  stat: "Kritis",
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-5">
                    <div className="font-bold text-slate-800 text-base">
                      {item.name}
                    </div>
                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
                      {item.sku}
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-bold border border-slate-200">
                      {item.cat}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <div
                      className={`font-black text-lg ${item.stat === "Kritis" ? "text-rose-600" : "text-slate-700"}`}
                    >
                      {item.stock}
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="text-sm font-bold text-slate-600">
                      {item.exp}
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <button className="text-indigo-600 font-bold text-xs uppercase tracking-wider hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg">
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
