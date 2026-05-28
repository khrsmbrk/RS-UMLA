import React from "react";
import {
  ShoppingCart,
  Package,
  Building,
  CheckCircle,
  Clock,
  Plus,
  Search,
} from "lucide-react";

export default function OfficeProcurement() {
  const purchaseOrders = [
    {
      id: "PO-2605-01",
      vendor: "PT. Mensa Binasukses",
      items: "Obat-obatan Injeksi",
      total: "Rp 45.000.000",
      status: "Approved",
      date: "2026-05-24",
    },
    {
      id: "PO-2605-02",
      vendor: "PT. Global Medika",
      items: "Alkes Habis Pakai (Syringe, Kasa)",
      total: "Rp 12.500.000",
      status: "Pending Direksi",
      date: "2026-05-25",
    },
    {
      id: "PO-2605-03",
      vendor: "CV. Maju Jaya IT",
      items: "Tinta Printer & Kertas HVS",
      total: "Rp 3.200.000",
      status: "Draft",
      date: "2026-05-25",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-teal-600" /> Pengadaan &
            E-Procurement
          </h1>
          <p className="text-slate-500 mt-1">
            Manajemen Purchase Order (PO), tender vendor, dan pengadaan
            barang/jasa.
          </p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Buat PO Baru
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total PO (Bulan Ini)",
            val: "124",
            icon: Package,
            col: "text-teal-600",
            bg: "bg-teal-50",
          },
          {
            label: "Nilai Pengadaan",
            val: "Rp 1.2M",
            icon: Building,
            col: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Menunggu Approval",
            val: "5",
            icon: Clock,
            col: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "PO Selesai",
            val: "98",
            icon: CheckCircle,
            col: "text-emerald-500",
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
            Daftar Purchase Order Aktif
          </h3>
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari No PO / Vendor..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
            />
          </div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                  No. PO & Tanggal
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                  Vendor
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                  Deskripsi Barang
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                  Total Nilai
                </th>
                <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {purchaseOrders.map((po, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <td className="px-5 py-5 align-top">
                    <div className="font-bold text-slate-800 text-base mb-1 group-hover:text-teal-700 transition-colors">
                      {po.id}
                    </div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded border border-slate-200">
                      {po.date}
                    </div>
                  </td>
                  <td className="px-5 py-5 font-bold text-slate-700 align-top">
                    {po.vendor}
                  </td>
                  <td className="px-5 py-5 text-slate-600 font-medium align-top leading-relaxed max-w-xs">
                    {po.items}
                  </td>
                  <td className="px-5 py-5 font-black text-slate-800 text-right align-top tracking-tight">
                    {po.total}
                  </td>
                  <td className="px-5 py-5 text-center align-top">
                    <span
                      className={`text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg border shadow-sm ${
                        po.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : po.status === "Draft"
                            ? "bg-slate-50 text-slate-600 border-slate-200"
                            : "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                      }`}
                    >
                      {po.status}
                    </span>
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
