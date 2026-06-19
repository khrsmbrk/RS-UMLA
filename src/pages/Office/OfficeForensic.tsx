import React, { useState } from "react";
import { Microscope, LayoutDashboard, Search, FileText, CheckCircle, Clock } from "lucide-react";

export default function OfficeForensic() {
  const [searchTerm, setSearchTerm] = useState("");

  const cases = [
    { id: "FOR-26-001", type: "Visum et Repertum", patient: "Kepolisian Resor Kota", priority: "Tinggi", date: "Hari Ini", status: "Proses Pemeriksaan", doctor: "dr. Andi, Sp.FM" },
    { id: "FOR-26-002", type: "Otopsi Klinis", patient: "Keluarga Tn. Budi", priority: "Sedang", date: "Hari Ini", status: "Menunggu Jadwal", doctor: "dr. Santi, Sp.FM" },
    { id: "FOR-26-003", type: "Pemeriksaan Korban Hidup", patient: "An. Citra", priority: "Tinggi", date: "Kemarin", status: "Selesai", doctor: "dr. Andi, Sp.FM" },
    { id: "FOR-26-004", type: "Konsultasi Forensik", patient: "Penyidik Polsek", priority: "Rendah", date: "10 Jun 2026", status: "Selesai", doctor: "dr. Santi, Sp.FM" },
  ];

  const filtered = cases.filter(c => c.patient.toLowerCase().includes(searchTerm.toLowerCase()) || c.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Microscope className="w-6 h-6 text-slate-900" /> Kedokteran Forensik & Medikolegal
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen Visum et Repertum, Otopsi, dan Pelayanan Medikolegal lainnya.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm p-4 relative overflow-hidden">
              <Microscope className="w-20 h-20 absolute -right-4 -bottom-4 text-white/10" />
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Kasus Aktif</span>
              <span className="text-3xl font-black text-white relative z-10">8 <span className="text-sm opacity-50 text-slate-400">Kasus</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Proses Pemeriksaan</span>
              <span className="text-3xl font-black text-slate-800">2 <span className="text-sm opacity-50 text-slate-500">Pasien/Jenazah</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1 block">Draft VeR / Laporan</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Dokumen</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Selesai (Bulan Ini)</span>
              <span className="text-3xl font-black text-slate-800">15 <span className="text-sm opacity-50 text-slate-500">Kasus</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Antrean Kasus & Pelayanan Forensik
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Tipe / Pemohon..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">ID Kasus & Waktu</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Tipe Pelayanan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Pemohon / Instansi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{c.id}</div>
                                <div className="text-slate-500 text-xs">Masuk: {c.date}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800">{c.type}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mt-1 ${c.priority === 'Tinggi' ? 'bg-rose-50 text-rose-700 border-rose-200' : c.priority === 'Sedang' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    Prioritas {c.priority}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{c.patient}</div>
                                <div className="text-slate-500 text-xs mt-1">DPJP: {c.doctor}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      c.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : c.status === "Proses Pemeriksaan"
                                          ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                                          : c.status === "Menunggu Jadwal"
                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {c.status === 'Selesai' && <CheckCircle className="w-3 h-3"/>}
                                    {c.status !== 'Selesai' && <Clock className="w-3 h-3"/>}
                                    {c.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada kasus forensik ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
