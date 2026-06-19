import React, { useState } from "react";
import { ShieldCheck, LayoutDashboard, Search, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function OfficeInsurance() {
  const [searchTerm, setSearchTerm] = useState("");

  const claims = [
    { id: "CLM-BPJS-01", patient: "Tn. Ahmad (50th)", provider: "BPJS Kesehatan", amount: "Rp 5.200.000", status: "Klaim Diajukan", date: "Hari Ini" },
    { id: "CLM-IN-02", patient: "Ny. Sari (45th)", provider: "Asuransi Mandiri Inhealth", amount: "Rp 12.500.000", status: "Dalam Proses Klaim", date: "Hari Ini" },
    { id: "CLM-BPJS-03", patient: "Tn. Budi (62th)", provider: "BPJS Kesehatan", amount: "Rp 8.000.000", status: "Pending Kelengkapan Berkas", date: "Kemarin" },
    { id: "CLM-PR-04", patient: "Ny. Rita (55th)", provider: "Prudential", amount: "Rp 15.000.000", status: "Disetujui", date: "10 Jun 2026" },
  ];

  const filtered = claims.filter(c => c.patient.toLowerCase().includes(searchTerm.toLowerCase()) || c.provider.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-600" /> Portal Asuransi RS
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen klaim asuransi BPJS, inhealth, dan asuransi swasta lainnya.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-900 border border-purple-800 shadow-sm p-4 rounded-xl relative overflow-hidden">
              <ShieldCheck className="w-20 h-20 absolute -right-4 -bottom-4 text-purple-800/50" />
              <span className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total Pencairan Bulan Ini</span>
              <span className="text-2xl font-black text-white relative z-10">Rp 1.45 M</span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-1 block">Klaim Diajukan (BPJS)</span>
              <span className="text-3xl font-black text-slate-800">450 <span className="text-sm opacity-50 text-slate-500">Berkas</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Klaim Swasta Disetujui</span>
              <span className="text-3xl font-black text-slate-800">125 <span className="text-sm opacity-50 text-slate-500">Berkas</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Pending / Dispute</span>
              <span className="text-3xl font-black text-rose-800">12 <span className="text-sm opacity-50 text-rose-600">Berkas Berobat</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <FileText className="w-5 h-5 text-slate-400" /> Antrean Verifikasi & Pengajuan Klaim
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari ID / Pasien / Provider..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">ID Klaim & Tgl Masuk</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Pasien & Nilai Klaim</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Provider Asuransi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Berkas</th>
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
                                <div className="font-bold text-slate-800 text-base">{c.patient}</div>
                                <div className="font-bold text-slate-500 mt-1">{c.amount}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block ${c.provider === 'BPJS Kesehatan' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                    {c.provider}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      c.status === "Disetujui"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : c.status === "Dalam Proses Klaim" || c.status === "Klaim Diajukan"
                                          ? "bg-purple-50 text-purple-700 border-purple-200 animate-pulse"
                                          : c.status.includes('Pending')
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                  >
                                    {c.status === "Disetujui" && <CheckCircle className="w-3 h-3" />}
                                    {(c.status === "Dalam Proses Klaim" || c.status === "Klaim Diajukan") && <Clock className="w-3 h-3" />}
                                    {c.status.includes('Pending') && <AlertTriangle className="w-3 h-3" />}
                                    {c.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada klaim ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
