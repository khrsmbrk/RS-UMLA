import React, { useState } from "react";
import { Milk, Search, Baby, CheckCircle, Clock, Stethoscope } from "lucide-react";

export default function OfficeNutritionMfg() {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    { id: "MFG-1029", ward: "NICU (Incubator-01)", patient: "By. Ny. Dita", type: "Formula Prematur (20 Kkal/oz)", qty: "8 Botol @ 30ml", status: "Selesai", reqTime: "06:00" },
    { id: "MFG-1030", ward: "Perinatologi (Box-03)", patient: "By. Ny. Rina", type: "ASI Perah (Fortifikasi)", qty: "6 Botol @ 50ml", status: "Proses Sterilisasi", reqTime: "07:30" },
    { id: "MFG-1031", ward: "ICU Anak", patient: "An. Bima (5 Thn)", type: "Nutrisi Enteral Peptida", qty: "4 Kantong @ 200ml", status: "Menunggu Persiapan", reqTime: "08:00" },
  ];

  const filtered = orders.filter(o => o.patient.toLowerCase().includes(searchTerm.toLowerCase()) || o.ward.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Milk className="w-6 h-6 text-cyan-600" /> Dapur Susu & Formula Kusus
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Produksi gizi klinis enteral, susu formula bayi (NICU/Perina), persiapan steril.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-cyan-900 border border-cyan-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Milk className="w-20 h-20 absolute -right-4 -bottom-4 text-cyan-800/80" />
              <span className="text-cyan-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Produksi</span>
              <span className="text-3xl font-black text-white relative z-10">42 <span className="text-sm opacity-50 text-cyan-400">Batch Hari Ini</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Telah Distribusi</span>
              <span className="text-3xl font-black text-slate-800">28 <span className="text-sm opacity-50 text-slate-500">Permintaan</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Proses Sterilisasi</span>
              <span className="text-3xl font-black text-rose-800">5 <span className="text-sm opacity-50 text-rose-600">Batch</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Menunggu Re-Stock</span>
              <span className="text-3xl font-black text-slate-800">2 <span className="text-sm opacity-50 text-slate-500">Bahan Baku</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <Stethoscope className="w-5 h-5 text-slate-400" /> Antrean Produksi Klinis
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Ruangan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Waktu & Kode Produksi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Target Ruangan & Pasien</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Spesifikasi Formula</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Distribusi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((o, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mb-1 bg-slate-100 text-slate-500 border-slate-200">{o.id}</span>
                                <div className="font-black text-slate-800">{o.reqTime} WIB</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded inline-block border border-slate-200 mb-1">{o.ward}</div>
                                <div className="font-bold text-cyan-700">{o.patient}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800">{o.type}</div>
                                <div className="text-slate-500 text-xs font-medium mt-0.5">{o.qty}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      o.status === "Selesai"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : o.status === "Proses Sterilisasi"
                                          ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {o.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                    {o.status === "Proses Sterilisasi" && <Clock className="w-3 h-3" />}
                                    {o.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada permintaan formula ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
