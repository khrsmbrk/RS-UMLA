import React, { useState } from "react";
import { Headset, PhoneCall, History, Headphones, PhoneMissed, PhoneForwarded, Search, PhoneIncoming } from "lucide-react";

export default function OfficeCallCenter() {
  const [activeTab, setActiveTab] = useState("Live Calls");

  const calls = [
      { id: "C-1001", ext: "081234567890", type: "Inbound", time: "09:12", dur: "4m 12s", status: "Selesai", agent: "Aulia" },
      { id: "C-1002", ext: "081198765432", type: "Inbound", time: "09:25", dur: "1m 30s", status: "Selesai", agent: "Bagas" },
      { id: "C-1003", ext: "085600112233", type: "Inbound", time: "09:30", dur: "-", status: "Missed", agent: "-" },
      { id: "C-1004", ext: "081344556677", type: "Inbound", time: "09:35", dur: "0m 45s", status: "Berlangsung", agent: "Aulia" },
      { id: "C-1005", ext: "R. Melati / Ext 201", type: "Internal", time: "09:40", dur: "1m 15s", status: "Berlangsung", agent: "Bagas" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Headset className="w-6 h-6 text-blue-700" /> Call Center (PKRS)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pusat panggilan informasi rumah sakit, penanganan keluhan cepat
            (non-medis), dan penjadwalan via telepon.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm p-4 relative overflow-hidden text-white">
              <PhoneIncoming className="w-20 h-20 absolute -right-4 -bottom-4 text-blue-500/20" />
              <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-1 block relative z-10">Panggilan Masuk</span>
              <span className="text-3xl font-black relative z-10">45</span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-1 block">Terjawab (SLA &lt;10s)</span>
              <span className="text-3xl font-black text-slate-800">42 <span className="text-sm opacity-50 text-slate-500">Panggilan</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-red-500 font-bold uppercase tracking-widest text-xs mb-1 block">Panggilan Tak Terjawab</span>
              <span className="text-3xl font-black text-slate-800">3 <span className="text-sm opacity-50 text-slate-500">Missed</span></span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-1 block">Agen Online Aktif</span>
              <span className="text-3xl font-black text-slate-800">4 <span className="text-sm opacity-50 text-slate-500">Operator</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <div className="flex bg-slate-200/50 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab("Live Calls")}
                    className={`px-4 py-2 font-bold text-sm rounded transition-colors ${activeTab === 'Live Calls' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >Live Calls & Queue</button>
                 <button
                    onClick={() => setActiveTab("History")}
                    className={`px-4 py-2 font-bold text-sm rounded transition-colors ${activeTab === 'History' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >Log Interaksi</button>
             </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Cari Nomor / Ext..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Penelepon / No. HP</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Waktu & Tipe</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Operator (Agen)</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Durasi</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {calls.filter(c => activeTab === 'Live Calls' ? c.status === 'Berlangsung' : true).map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 align-middle">
                                <div className="font-mono font-bold text-slate-800 text-sm tracking-wide">{c.ext}</div>
                                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">ID: {c.id}</div>
                            </td>
                            <td className="px-5 py-4 align-middle text-slate-600">
                                <div className="font-bold mb-1">{c.time} WIB</div>
                                <span className={`text-[10px] uppercase font-bold tracking-widest ${c.type === 'Internal' ? 'text-indigo-600' : 'text-slate-500'}`}>{c.type}</span>
                            </td>
                            <td className="px-5 py-4 align-middle font-bold text-slate-700">
                                {c.agent}
                            </td>
                            <td className="px-5 py-4 align-middle font-mono font-bold text-slate-500">
                                {c.dur}
                            </td>
                            <td className="px-5 py-4 align-middle text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      c.status === "Berlangsung"
                                        ? "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
                                        : c.status === "Missed"
                                          ? "bg-red-50 text-red-700 border-red-200"
                                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}
                                  >
                                    {c.status === "Berlangsung" && <PhoneCall className="w-3 h-3" />}
                                    {c.status === "Missed" && <PhoneMissed className="w-3 h-3" />}
                                    {c.status === "Selesai" && <History className="w-3 h-3" />}
                                    {c.status}
                                  </span>
                            </td>
                        </tr>
                    ))}
                     {calls.filter(c => activeTab === 'Live Calls' ? c.status === 'Berlangsung' : true).length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada antrian panggilan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
