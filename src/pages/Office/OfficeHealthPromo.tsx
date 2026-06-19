import React, { useState } from "react";
import { Megaphone, LayoutDashboard, Search, FileImage, CheckCircle, Clock } from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeHealthPromo() {
  const [searchTerm, setSearchTerm] = useState("");
  const { pkrsCampaigns: campaigns, updatePkrsCampaignStatus } = useOfficeStore();

  const filtered = campaigns.filter((c: any) => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-orange-600" /> Promosi Kesehatan RS (PKRS)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen agenda penyuluhan, produksi konten edukasi, dan program kesehatan masyarakat.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-orange-50 rounded-xl border border-orange-200 shadow-sm p-4 relative overflow-hidden">
              <Megaphone className="w-20 h-20 absolute -right-4 -bottom-4 text-orange-500/20" />
              <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Kampanye Aktif</span>
              <span className="text-3xl font-black text-orange-800 relative z-10">12 <span className="text-sm opacity-50 text-orange-600">Program</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Jangkauan Edukasi</span>
              <span className="text-3xl font-black text-slate-800">4.2k <span className="text-sm opacity-50 text-slate-500">Pasien & Pengunjung</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Konten Digital</span>
              <span className="text-3xl font-black text-slate-800">45 <span className="text-sm opacity-50 text-slate-500">Aset</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1 block">Penyuluhan Berjalan</span>
              <span className="text-3xl font-black text-slate-800">2 <span className="text-sm opacity-50 text-slate-500">Hari Ini</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileImage className="w-5 h-5 text-slate-400" /> Agenda & Konten Edukasi
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Kampanye / Tipe..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Kegiatan / Program</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Tipe & Format</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Lokasi / Distribusi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{c.title}</div>
                                <div className="text-slate-500 text-xs">Jadwal: {c.date}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block ${c.type.includes('Penyuluhan') || c.type.includes('Massa') ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                    {c.type}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top flex items-center gap-2">
                                <span className="font-bold text-slate-700 text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">{c.loc}</span>
                            </td>
                            <td className="px-5 py-4 align-top text-right flex flex-col items-end gap-1.5">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      c.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : c.status === "Aktif"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                          : c.status === "Terjadwal"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {c.status === 'Aktif' && <CheckCircle className="w-3 h-3"/>}
                                    {c.status === 'Terjadwal' && <Clock className="w-3 h-3"/>}
                                    {c.status}
                                  </span>
                                  {c.status === 'Terjadwal' && (
                                     <button
                                        onClick={() => updatePkrsCampaignStatus(c.id, "Aktif")}
                                        className="text-[10px] bg-emerald-600 text-white px-2 py-1 flex items-center rounded"
                                     >
                                        Set Aktif
                                     </button>
                                  )}
                                  {c.status === 'Aktif' && (
                                     <button
                                        onClick={() => updatePkrsCampaignStatus(c.id, "Selesai")}
                                        className="text-[10px] bg-slate-800 text-white px-2 py-1 flex items-center rounded"
                                     >
                                        Set Selesai
                                     </button>
                                  )}
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada agenda PKRS ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
