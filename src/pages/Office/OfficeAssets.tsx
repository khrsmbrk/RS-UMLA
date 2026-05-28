import React from "react";
import {
  Settings,
  PenTool,
  Calendar,
  AlertCircle,
  Search,
  QrCode,
  ClipboardCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function OfficeAssets() {
  const assets = [
    {
      id: "MED-MRI-01",
      name: "MRI Scanner Philips 1.5T",
      loc: "Instalasi Radiologi",
      lastPM: "10 Apr 2026",
      nextPM: "10 Okt 2026",
      status: "Optimal",
    },
    {
      id: "MED-CT-02",
      name: "CT Scan GE 128 Slice",
      loc: "Instalasi Radiologi",
      lastPM: "05 Jan 2026",
      nextPM: "05 Jun 2026",
      status: "Perlu Kalibrasi",
    },
    {
      id: "MED-VR-10",
      name: "Ventilator Hamilton-C1",
      loc: "ICU Bed 4",
      lastPM: "15 Mar 2026",
      nextPM: "15 Sep 2026",
      status: "Optimal",
    },
  ];

  const data = [
    { name: "Optimal", value: 85 },
    { name: "Perlu Maintenance", value: 10 },
    { name: "Rusak / Perbaikan", value: 5 },
  ];
  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" /> Advanced Asset &
            Maintenance Tracker
          </h1>
          <p className="text-slate-500 mt-1">
            Jadwal Preventive Maintenance (PM) dan kalibrasi alat ukur medis
            kritis (KSO & Non-KSO).
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm w-full sm:w-auto transition-colors focus:ring-4 focus:ring-indigo-600/20">
          <QrCode className="w-4 h-4" /> Scan QR Aset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <PenTool className="w-5 h-5 text-indigo-500" /> Daftar Alkes
              Kritis
            </h3>
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ID aset atau nama..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium bg-white"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                    ID & Nama Aset
                  </th>
                  <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                    Terakhir PM
                  </th>
                  <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                    Jadwal PM/Kalibrasi
                  </th>
                  <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assets.map((a, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-5 py-5">
                      <div className="font-bold text-slate-800 text-base mb-1">
                        {a.name}
                      </div>
                      <div className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 inline-block tracking-widest">
                        {a.id}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                        {a.loc}
                      </div>
                    </td>
                    <td className="px-5 py-5 text-slate-600 font-bold align-top">
                      {a.lastPM}
                    </td>
                    <td className="px-5 py-5 align-top">
                      <span
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-black border flex items-center gap-1.5 w-max ${
                          a.status !== "Optimal"
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" /> {a.nextPM}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-right align-top">
                      <span
                        className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border shadow-sm ${
                          a.status === "Optimal"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-amber-50 text-amber-600 border-amber-200 animate-pulse"
                        }`}
                      >
                        {a.status}
                      </span>
                      {a.status !== "Optimal" && (
                        <button className="flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-600 mt-3 mx-auto hover:text-indigo-800 transition-colors">
                          Lacak <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 text-center">
              Tingkat Kesiapan Alat Medis Utama
            </h3>
            <div className="h-52 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    stroke="none"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      fontSize: "12px",
                      border: "none",
                      boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                    itemStyle={{ color: "#1e293b" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                <span className="text-3xl font-black text-slate-800">85%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Uptime
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-[10px] font-black uppercase text-slate-500 tracking-wider mt-4">
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-sm"></div>{" "}
                Optimal
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-sm"></div>{" "}
                Cek Kalibrasi
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-sm"></div>{" "}
                Rusak
              </span>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-rose-50 rounded-bl-[100px] z-0 opacity-50 group-hover:bg-rose-100 transition-colors"></div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5 text-sm relative z-10 uppercase tracking-widest">
              <AlertCircle className="w-4 h-4 text-rose-500" /> Peringatan
              Kalibrasi
            </h3>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-4 items-start relative z-10 shadow-sm">
              <div className="p-2 bg-white rounded-lg border border-amber-100 shadow-sm shrink-0">
                <ClipboardCheck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="font-black text-amber-800 text-sm leading-tight mb-1">
                  CT Scan Mendekati Jadwal
                </div>
                <div className="text-xs font-medium text-amber-700/80 leading-relaxed mb-4">
                  Buat Work Order (WO) untuk vendor GE Healthcare minggu depan.
                  Harus diurus sebelum lisensi operasional expired.
                </div>
                <button className="text-xs font-bold text-white bg-amber-600 px-4 py-2 rounded-lg shadow-sm hover:bg-amber-700 transition-transform active:scale-95 border border-amber-700/20 w-full sm:w-auto">
                  Buat Tiket WO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
