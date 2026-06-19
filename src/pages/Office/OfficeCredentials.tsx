import React, { useState } from "react";
import { FileBadge, ScrollText, CheckCircle, ShieldCheck, Search, AlertCircle, FileClock } from "lucide-react";

export default function OfficeCredentials() {
  const [searchTerm, setSearchTerm] = useState("");

  const staff = [
    { name: "dr. Ahmad, Sp.PD", unit: "Penyakit Dalam", type: "Dokter Spesialis", expire: "12 Ags 2026", status: "Aktif", spkId: "SPK/001/V/2023" },
    { name: "dr. Siska, Sp.OG", unit: "Kebidanan", type: "Dokter Spesialis", expire: "05 Jul 2026", status: "Mendekati Expired", spkId: "SPK/124/V/2023" },
    { name: "Ns. Budi Santoso, S.Kep", unit: "ICU", type: "Perawat Klinis", expire: "01 Sep 2026", status: "Aktif", spkId: "SPK/201/IX/2023" },
    { name: "drg. Fitri", unit: "Poli Gigi", type: "Dokter Gigi", expire: "10 Jun 2026", status: "Expired", spkId: "SPK/302/VI/2023" },
    { name: "Dina Mariana, Amd.Keb", unit: "Kamar Bersalin", type: "Bidan", expire: "22 Okt 2026", status: "Aktif", spkId: "SPK/089/X/2023" },
  ];

  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.unit.toLowerCase().includes(searchTerm.toLowerCase()) || s.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileBadge className="w-6 h-6 text-indigo-800" /> Komite Medik & Keperawatan
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen kredensial staf klinis, Rincian Kewenangan Klinis (RKK), dan Surat Penugasan Klinis (SPK).
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 shadow-sm p-4 relative overflow-hidden">
              <ShieldCheck className="w-20 h-20 absolute -right-4 -bottom-4 text-indigo-500/20" />
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Total SPK Aktif</span>
              <span className="text-3xl font-black text-indigo-800 relative z-10">342 <span className="text-sm opacity-50 text-indigo-600">Dokumen</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Komite Medik (Reguler)</span>
              <span className="text-3xl font-black text-slate-800">86 <span className="text-sm opacity-50 text-slate-500">Dokter</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-1 block">Komite Keperawatan</span>
              <span className="text-3xl font-black text-slate-800">210 <span className="text-sm opacity-50 text-slate-500">Perawat</span></span>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-4">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-1"><FileClock className="w-3 h-3"/> Re-Kredensial (Q3)</span>
              <span className="text-3xl font-black text-amber-800">12 <span className="text-sm opacity-50 text-amber-600">Terjadwal</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
             <ScrollText className="w-5 h-5 text-slate-400" /> Database Kewenangan Klinis
          </h3>
           <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Nama / Unit..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
           </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Nama Staf Klinis / Tipe
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Unit Kompetensi
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Masa Berlaku SPK
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStaff.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 align-top">
                    <div className="font-bold text-slate-800 text-base mb-1 object-contain">{s.name}</div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{s.type}</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-700 align-top">
                    {s.unit}
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">No: {s.spkId}</div>
                  </td>
                  <td className="px-5 py-4 align-top">
                      <div className="font-bold flex items-center gap-2 mb-1 text-slate-700">
                          {s.expire}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-flex items-center gap-1 w-max ${s.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : s.status === 'Expired' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                           {s.status === 'Expired' && <AlertCircle className="w-3 h-3" />}
                           {s.status === 'Aktif' && <CheckCircle className="w-3 h-3" />}
                           {s.status}
                      </span>
                  </td>
                  <td className="px-5 py-4 text-right align-top">
                    <button className="text-xs font-black uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-white bg-slate-50 text-slate-700 transition-colors">
                      Detail RKK
                    </button>
                  </td>
                </tr>
            ))}
             {filteredStaff.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada staf klinis ditemukan.</td>
                </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
