import React, { useState } from "react";
import { Glasses, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficeOptic() {
   const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    { id: "OPT-2606-01", patient: "Tn. Ridwan", rm: "RM-08291", item: "Lensa Progresif + Frame Metal", date: "10 Jun 2026", status: "Sedang Dikerjakan" },
    { id: "OPT-2606-02", patient: "Ny. Salma", rm: "RM-10293", item: "Alat Bantu Dengar (BTE)", date: "09 Jun 2026", status: "Siap Diambil" },
    { id: "OPT-2606-03", patient: "An. Dika", rm: "RM-20911", item: "Kacamata Minus Remaja", date: "11 Jun 2026", status: "Menunggu Lensa" },
    { id: "OPT-2606-04", patient: "Tn. Hakim", rm: "RM-00122", item: "Softlens Toric Bulanan", date: "12 Jun 2026", status: "Selesai & Diambil" },
  ];

  const filtered = orders.filter(o => o.patient.toLowerCase().includes(searchTerm.toLowerCase()) || o.item.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Glasses className="w-6 h-6 text-sky-700" /> Optik & Audiologi
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen pelayanan kacamata, lensa kontak, dan alat bantu dengar (hearing aid).
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-sky-900 border border-sky-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <Glasses className="w-20 h-20 absolute -right-4 -bottom-4 text-sky-800/80" />
              <span className="text-sky-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Order Bulan Ini</span>
              <span className="text-3xl font-black text-white relative z-10">128 <span className="text-sm opacity-50 text-sky-400">Pesanan</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Sedang Diproses</span>
              <span className="text-3xl font-black text-slate-800">14 <span className="text-sm opacity-50 text-slate-500">Antrean</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Awaiting Pickup</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Siap Ambil</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Stok Frame Menipis</span>
              <span className="text-3xl font-black text-slate-800">12 <span className="text-sm opacity-50 text-slate-500">SKU</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Daftar Pekerjaan Optik
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pesanan / Pasien..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Pemesan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Pesanan & Tipe Barang</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Tanggal Input</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Fabrikasi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((o, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mb-1.5 bg-slate-100 text-slate-500 border-slate-200">{o.id}</span>
                                <div className="font-bold text-slate-800 text-base">{o.patient}</div>
                                <div className="text-slate-500 text-xs font-bold tracking-widest">{o.rm}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-sky-700">{o.item}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-600 font-medium">{o.date}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      o.status.includes("Selesai") || o.status === "Siap Diambil"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : o.status === "Sedang Dikerjakan"
                                          ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {(o.status.includes("Selesai") || o.status === "Siap Diambil") && <CheckCircle className="w-3 h-3" />}
                                    {o.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada pesanan aktif ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
