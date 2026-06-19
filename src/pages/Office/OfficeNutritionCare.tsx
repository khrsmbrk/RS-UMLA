import React, { useState } from "react";
import { Apple, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficeNutritionCare() {
  const [searchTerm, setSearchTerm] = useState("");

  const dietPlans = [
    { bed: "Melati-101", patient: "Tn. Joko", diet: "Rendah Garam & Gula", status: "Sedang Disiapkan", allergies: "Seafood" },
    { bed: "Mawar-203", patient: "Ny. Siska", diet: "Lunak / Bubur Saring", status: "Menunggu Jadwal", allergies: "Tidak Ada" },
    { bed: "ICU-Bed-03", patient: "Tn. Ari", diet: "Cair (NGT High Protein)", status: "Sedang Disiapkan", allergies: "Kacang" },
    { bed: "Anggrek-05", patient: "Ny. Lina", diet: "Biasa / Nasi", status: "Terkirim", allergies: "Tidak Ada" },
  ];

  const filtered = dietPlans.filter(d => d.patient.toLowerCase().includes(searchTerm.toLowerCase()) || d.bed.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Apple className="w-6 h-6 text-green-600" /> Asuhan Gizi Klinis
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen diet harian pasien rawat inap, perhitungan kalori, dan distribusi makanan.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50/50 rounded-xl border border-green-200 shadow-sm p-4 relative overflow-hidden">
              <Apple className="w-20 h-20 absolute -right-4 -bottom-4 text-green-500/20" />
              <span className="text-green-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Porsi Hari Ini</span>
              <span className="text-3xl font-black text-green-800 relative z-10">350 <span className="text-sm opacity-50 text-green-600">Porsi</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Dalam Persiapan</span>
              <span className="text-3xl font-black text-slate-800">120 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Terkirim Bangsal</span>
              <span className="text-3xl font-black text-slate-800">85 <span className="text-sm opacity-50 text-slate-500">Pasien</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 border-l-4 border-l-rose-500">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Diet Khusus / Alergi</span>
              <span className="text-3xl font-black text-slate-800">42 <span className="text-sm opacity-50 text-slate-500">Orang</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Daftar Preskripsi Diet (Jadwal Makan Siang)
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pasien / Kamar..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Lokasi & Identitas</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Instruksi Diet</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Peringatan Alergi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Dapur</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((d, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-max mb-1.5 text-xs tracking-wider">{d.bed}</div>
                                <div className="font-black text-slate-700">{d.patient}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-green-700">{d.diet}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block ${d.allergies !== 'Tidak Ada' ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                    {d.allergies}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      d.status === "Terkirim"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : d.status === "Sedang Disiapkan"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {d.status === "Terkirim" && <CheckCircle className="w-3 h-3" />}
                                    {d.status !== "Terkirim" && <Clock className="w-3 h-3" />}
                                    {d.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada preskripsi diet ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
