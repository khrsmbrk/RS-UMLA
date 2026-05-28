import React from "react";
import { useOutletContext } from "react-router-dom";
import { Wallet, Download, Lock } from "lucide-react";

export default function PortalKaryawanGaji() {
  const { user } = useOutletContext<{ user: any }>();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-purple-600" /> Slip Gaji
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Unduh rincian slip gaji, tunjangan, dan potongan bulanan
            terenkripsi.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 flex items-start gap-4">
        <Lock className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-purple-900">Keamanan Dokumen</h3>
          <p className="text-sm text-purple-700 mt-1">
            Gunakan 6 digit terakhir NIP Anda (
            <span className="font-mono bg-purple-200 px-1 rounded">
              {user?.nip?.slice(-6) || "******"}
            </span>
            ) sebagai password untuk membuka file PDF Slip Gaji.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Periode
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Total Penerimaan (Netto)
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {["April 2026", "Maret 2026", "Februari 2026"].map((period, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-5 font-bold text-slate-800">{period}</td>
                <td className="px-5 py-5 text-slate-600 font-mono">
                  Rp ********
                </td>
                <td className="px-5 py-5 text-right">
                  <button className="text-xs font-black uppercase tracking-widest border border-slate-300 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 text-slate-700 bg-white inline-flex items-center gap-2 transition-colors">
                    <Download className="w-4 h-4" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
