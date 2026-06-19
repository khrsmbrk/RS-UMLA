import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Wallet,
  Download,
  Lock,
  Calculator,
  PieChart,
  Info,
  FileText,
} from "lucide-react";

export default function PortalKaryawanGaji() {
  const { user } = useOutletContext<{ user: any }>();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
            Payroll & Slip Gaji
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-lg">
            Unduh rincian slip gaji bulanan, tunjangan kinerja, dan potongan.
            Seluruh file PDF dienkripsi untuk privasi Anda.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <Lock className="w-6 h-6 text-purple-600 shrink-0 mt-1 animate-pulse" />
        <div>
          <h3 className="font-extrabold text-purple-900 text-lg">
            Keamanan Dokumen Slip Gaji (Penting)
          </h3>
          <p className="text-sm text-purple-800 mt-1 leading-relaxed">
            Gunakan kombinasi 6 digit terakhir NIP Anda dan tanggal lahir
            (format:{" "}
            <span className="font-mono bg-purple-200 px-1.5 py-0.5 rounded font-bold">
              NIP6-DDMM
            </span>
            ) sebagai password untuk membuka file PDF Slip Gaji yang Anda unduh.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" /> Riwayat Slip
                Gaji Terbaru
              </h2>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                      Periode
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-right">
                      Gaji Pokok / THP
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-center">
                      Status
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { period: "Mei 2026", status: "Sudah Ditransfer" },
                    { period: "April 2026", status: "Sudah Ditransfer" },
                    { period: "Maret 2026", status: "Sudah Ditransfer" },
                    { period: "Februari 2026", status: "Sudah Ditransfer" },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5">
                        <span className="font-bold text-slate-800">
                          {item.period}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right flex flex-col items-end">
                        <span className="font-mono text-slate-400 text-xs line-through mb-0.5">
                          Rp ••••••••
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          Rp ••••••••
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700 w-max inline-block shadow-sm">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-[11px] font-black uppercase tracking-widest border border-slate-300 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 hover:border-purple-300 hover:text-purple-700 text-slate-700 bg-white inline-flex items-center gap-2 transition-all">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
              <button className="text-sm font-bold text-blue-600 hover:underline">
                Tampilkan Arsip Gaji Sebelumnya...
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-sm text-white">
            <h3 className="font-bold text-slate-300 flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-emerald-400" /> Year-to-Date
              (YTD) 2026
            </h3>

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                  Estimasi Total Pendapatan
                </p>
                <p className="text-3xl font-black font-mono">Rp •••.•••.•••</p>
              </div>

              <div className="h-px bg-slate-700 my-2"></div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">
                  Total Potongan (Pajak, BPJS)
                </span>
                <span className="font-mono text-sm text-rose-400 font-bold">
                  Rp •••.•••
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">
                  Total Take Home Pay (Net)
                </span>
                <span className="font-mono text-sm text-emerald-400 font-bold">
                  Rp •••.•••
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-blue-500" /> Komponen Gaji
              Standard
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-emerald-700">
                    Penerimaan
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded font-black max-w-max">
                    90%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-[90%]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  Gaji Pokok, Tunjangan Kinerja, Transport, Makan.
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-rose-700">
                    Potongan
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 rounded font-black max-w-max">
                    10%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-rose-500 h-1.5 rounded-full w-[10%]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  PPH 21, BPJS Kesehatan, BPJS TK, Zakat.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 text-[11px] text-slate-500">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                Komposisi bersifat estimasi. Rincian detail hanya dapat dilihat
                pada dokumen PDF yang diunduh.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
