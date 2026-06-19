import React, { useState, useMemo } from "react";
import {
  CreditCard,
  FileSearch,
  CheckSquare,
  AlertTriangle,
  FileText,
  Search
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeCasemix() {
  const [searchTerm, setSearchTerm] = useState("");
  const patients = useSRMStore(state => state.patients);

  const casemixList = useMemo(() => {
    return patients.slice(0, 10).map((p, i) => {
        let poli = "Penyakit Dalam";
        let icd10 = "E11.9 (Type 2 DM)";
        let icd9 = "-";
        let tarif = "Menunggu";
        let stat = "Perlu Koding";

        if (i % 2 === 0) {
            poli = "Rawat Inap Bedah";
            icd10 = "K35.8 (Appendicitis)";
            icd9 = "47.0 (Appendectomy)";
            tarif = "Rp 6,500,000";
            stat = "Selesai Grouper";
        }

        return {
            rm: p.id,
            name: p.namaLengkap,
            poli,
            icd10,
            icd9,
            tarif,
            stat
        }
    });

  }, [patients]);

  const filteredCasemix = useMemo(() => {
      return casemixList.filter(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          c.rm.toLowerCase().includes(searchTerm.toLowerCase())
      )
  }, [casemixList, searchTerm]);


  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" /> Casemix / Klaim
            BPJS
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Sistem informasi manajemen INA-CBG dan monitoring pending klaim.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
            <FileText className="w-4 h-4" /> Export Laporan Berkas
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Tasklist Koding & Grouper
          </h3>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari RM atau Nama..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                No. RM / Data Pasien
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Poliklinik / Perawatan
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Diagnosa Medis (ICD-10)
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Tindakan (ICD-9CM)
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Tarif INA-CBG
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-center">
                Status Berkas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCasemix.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-5 align-top">
                  <div className="font-bold text-slate-800 text-base mb-1">
                    {c.name}
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {c.rm}
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-slate-600 align-top">
                  {c.poli}
                </td>
                <td className="px-5 py-5 align-top">
                  <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md text-[11px] font-bold border border-rose-200/50">
                    {c.icd10}
                  </span>
                </td>
                <td className="px-5 py-5 align-top">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold border border-blue-200/50">
                    {c.icd9}
                  </span>
                </td>
                <td className="px-5 py-5 align-top font-black text-slate-800">
                  {c.tarif}
                </td>
                <td className="px-5 py-5 align-top text-center">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      c.stat === "Perlu Koding"
                        ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {c.stat}
                  </span>
                </td>
              </tr>
            ))}
             {filteredCasemix.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada data casemix ditemukan.</td>
                </tr>
             )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
