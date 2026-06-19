import React, { useState } from "react";
import { Search, Clock, ArrowRight, Monitor, Server, Wifi, CheckCircle, AlertTriangle } from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeITSupport() {
  const [searchTerm, setSearchTerm] = useState("");

  const storeTickets = useOfficeStore(state => state.tickets);
  const tickets = storeTickets.filter(t => t.id.startsWith("IT"));

  const filtered = tickets.filter(t => t.unit.toLowerCase().includes(searchTerm.toLowerCase()) || t.issue.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Server className="w-6 h-6 text-indigo-600" /> IT & Jaringan (NOC)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Monitoring server SIMRS, ketersediaan jaringan internet, dan maintenance hardware.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-transform active:scale-95 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4"/> Buat Pengumuman Gangguan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 border border-emerald-100 shadow-sm relative">
                    <Server className="w-8 h-8" />
                    <span className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping"></span>
                </div>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Main Server & Database
                    </div>
                    <div className="text-xl font-black text-emerald-600">
                    ONLINE (99.9%)
                    </div>
                </div>
            </div>
            <div className="text-xs text-slate-400 font-bold bg-slate-50 p-2 rounded border border-slate-100">Last backup: 1 hr ago, CPU: 32%</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-amber-50 rounded-full text-amber-600 border border-amber-100 shadow-sm">
                    <Wifi className="w-8 h-8" />
                </div>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Koneksi ISP Primary
                    </div>
                    <div className="text-xl font-black text-amber-600 flex items-center gap-2">
                    LATENCY (45ms)
                    </div>
                </div>
            </div>
            <div className="text-xs text-amber-600/70 font-bold bg-amber-50 p-2 rounded border border-amber-100">Packet loss: 0.1%, Failover ISP standby</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-rose-50 rounded-full text-rose-600 border border-rose-100 shadow-sm">
                    <Monitor className="w-8 h-8" />
                </div>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Tiket Trouble Hardware/App
                    </div>
                    <div className="text-xl font-black text-rose-600">12 Antrean</div>
                </div>
            </div>
             <div className="text-xs text-rose-600/70 font-bold bg-rose-50 p-2 rounded border border-rose-100">3 tiket prioritas Kritis/Tinggi</div>
        </div>
      </div>

       <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 Daftar Tiket IT Helpdesk
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Keluhan / Unit..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">ID Tiket & Prioritas</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Unit & Keluhan</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Teknisi (Assignee)</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">Status Penanganan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((t, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                            <td className="px-5 py-4 align-top">
                                <div className="font-black text-slate-800 mb-1">{t.id}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block mt-1 ${t.priority === 'Kritis' ? 'bg-rose-100 text-rose-700 border-rose-200' : t.priority === 'Tinggi' ? 'bg-amber-100 text-amber-700 border-amber-200' : t.priority === 'Sedang' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {t.priority}
                                </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <div className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 w-max mb-1.5">{t.unit}</div>
                                <div className="text-slate-600 font-medium whitespace-break-spaces min-w-[200px]">{t.issue}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                                <span className={`font-bold text-xs ${t.tech === 'Belum Ditugaskan' ? 'text-slate-400 italic' : 'text-indigo-700'}`}>{t.tech}</span>
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                                  <span
                                    className={`px-3 py-1.5 rounded-lg text-[10px] border font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                      t.status === "Selesai"
                                        ? "bg-slate-100 text-slate-500 border-slate-200"
                                        : t.status === "Sedang Dikerjakan"
                                          ? "bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse"
                                          : t.status === "Open"
                                          ? "bg-rose-50 text-rose-700 border-rose-200"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}
                                  >
                                    {t.status === 'Selesai' && <CheckCircle className="w-3 h-3"/>}
                                    {t.status === 'Open' && <AlertTriangle className="w-3 h-3"/>}
                                    {t.status !== 'Selesai' && t.status !== 'Open' && <Clock className="w-3 h-3"/>}
                                    {t.status}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 inline-block ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-500 italic">Tidak ada tiket ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
