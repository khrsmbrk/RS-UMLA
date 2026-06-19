import React, { useState } from "react";
import { GraduationCap, BookOpen, Users, Award, Search, CheckCircle, Clock } from "lucide-react";

export default function OfficeDiklit() {
  const [searchTerm, setSearchTerm] = useState("");

  const logs = [
    { mhs: "Satria Bima", inst: "FK Universitas Brawijaya", stase: "Ilmu Penyakit Dalam", tgl: "10 Jun - 24 Jun 2026", status: "Aktif", mentor: "dr. Ahmad, Sp.PD" },
    { mhs: "Alya Nabila", inst: "Poltekkes Kemenkes", stase: "Keperawatan Anak", tgl: "01 Jun - 14 Jun 2026", status: "Aktif", mentor: "Ns. Sinta, S.Kep" },
    { mhs: "Kevin", inst: "FK Universitas Brawijaya", stase: "Ilmu Bedah", tgl: "05 Mei - 05 Jun 2026", status: "Selesai", mentor: "dr. Budi, Sp.B" },
    { mhs: "Rina Sari", inst: "FKM Universitas Airlangga", stase: "K3RS", tgl: "15 Jun - 15 Jul 2026", status: "Menunggu Jadwal", mentor: "Tim K3RS" },
  ];

  const filteredLogs = logs.filter(l => l.mhs.toLowerCase().includes(searchTerm.toLowerCase()) || l.inst.toLowerCase().includes(searchTerm.toLowerCase()) || l.stase.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-800" /> Pendidikan & Penelitian (Diklit)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Koordinasi mahasiswa klinik, residen bedah, praktik kebidanan/perawat, dan perizinan penelitian ilmiah.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-4 relative overflow-hidden">
              <Users className="w-20 h-20 absolute -right-4 -bottom-4 text-blue-500/20" />
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Mahasiswa Aktif</span>
              <span className="text-3xl font-black text-blue-800 relative z-10">84 <span className="text-sm opacity-50 text-blue-600">Orang</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Institusi Kerjasama</span>
              <span className="text-3xl font-black text-slate-800">12 <span className="text-sm opacity-50 text-slate-500">Kampus</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Penelitian Berjalan</span>
              <span className="text-3xl font-black text-slate-800">5 <span className="text-sm opacity-50 text-slate-500">Studi</span></span>
          </div>
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 shadow-sm p-4">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1 block">Evaluasi / Selesai (Bulan Ini)</span>
              <span className="text-3xl font-black text-indigo-800">22 <span className="text-sm opacity-50 text-indigo-600">Mahasiswa</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <BookOpen className="w-5 h-5 text-slate-400" /> Log Mahasiswa & Rotasi Stase
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Mahasiswa / Institusi..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Identitas Mahasiswa</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Rotasi Stase & Mentor</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Periode</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredLogs.map((l, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{l.mhs}</div>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded border inline-block bg-slate-100 text-slate-600 border-slate-200`}>
                                    {l.inst}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-700">{l.stase}</div>
                                <div className="text-slate-500 text-xs mt-1">Mentor Pembimbing: {l.mentor}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="text-slate-700 font-bold text-xs">{l.tgl}</div>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      l.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : l.status === "Aktif"
                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                  >
                                    {l.status === 'Aktif' && <CheckCircle className="w-3 h-3"/>}
                                    {l.status === 'Menunggu Jadwal' && <Clock className="w-3 h-3"/>}
                                    {l.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filteredLogs.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada data mahasiswa ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
