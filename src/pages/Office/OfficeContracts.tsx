import React from "react";
import {
  Briefcase,
  FileSignature,
  AlertCircle,
  Building,
  Search,
  Download,
} from "lucide-react";

export default function OfficeContracts() {
  const contracts = [
    {
      partner: "BPJS Kesehatan",
      type: "MoU Pelayanan JKN",
      expiry: "31 Des 2026",
      status: "Aktif",
      category: "Asuransi Negara",
    },
    {
      partner: "PT. Jasa Raharja",
      type: "PKS Jaminan Laka Lantas",
      expiry: "15 Nov 2026",
      status: "Aktif",
      category: "Asuransi Negara",
    },
    {
      partner: "Asuransi Mandiri Inhealth",
      type: "PKS Provider",
      expiry: "30 Mei 2026",
      status: "Mendekati Expired",
      category: "Asuransi Swasta",
    },
    {
      partner: "PT. Pertamina EP",
      type: "MCU & Rawat Jalan Karyawan",
      expiry: "10 Jan 2026",
      status: "Expired",
      category: "Perusahaan",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-sky-600" /> B2B & Manajemen
            Kontrak (PKS)
          </h1>
          <p className="text-slate-500 mt-1">
            Tracking masa aktif kerja sama dengan asuransi, perusahaan, dan
            vendor outsourcing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Kontrak Aktif",
            val: "45",
            color: "text-sky-600",
            bg: "bg-sky-50",
          },
          {
            label: "Asuransi Swasta & BUMN",
            val: "28",
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Perlu Extended (H-30)",
            val: "3",
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Kontrak Telah Expired",
            val: "1",
            color: "text-rose-500",
            bg: "bg-rose-50",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-slate-300 transition-colors"
          >
            <div
              className={`absolute right-0 top-0 w-20 h-20 ${c.bg} rounded-bl-[100px] z-0 opacity-50`}
            ></div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 relative z-10">
              {c.label}
            </div>
            <div className={`text-4xl font-black relative z-10 ${c.color}`}>
              {c.val}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
            <FileSignature className="w-5 h-5 text-sky-500" /> Database
            Perjanjian Kerja Sama
          </h3>
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari mitra / asuransi..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Nama Instansi / Mitra
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Jenis Layanan / Kontrak
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Kategori Mitra
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Berlaku Hingga
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">
                  Status Validitas
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">
                  Berkas File
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contracts.map((c, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800 flex items-center gap-3 text-base">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                        <Building className="w-4 h-4" />
                      </div>
                      {c.partner}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-medium">
                    {c.type}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
                      {c.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-700">
                    {c.expiry}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full border flex items-center justify-center gap-1.5 w-max mx-auto shadow-sm ${
                        c.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : c.status === "Mendekati Expired"
                            ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {c.status !== "Aktif" && (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}{" "}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button
                      className="w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-sky-600 border border-transparent hover:border-sky-600 transition-colors inline-flex items-center justify-center shadow-sm"
                      title="Unduh PKS Digital (PDF)"
                    >
                      <Download className="w-5 h-5 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
