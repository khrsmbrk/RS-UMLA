import React from "react";
import {
  Monitor,
  Server,
  Wifi,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function OfficeITSupport() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Server className="w-6 h-6 text-indigo-600" /> IT & Jaringan (NOC)
          </h1>
          <p className="text-slate-500 mt-1">
            Monitoring server SIMRS, ketersediaan jaringan internet, dan
            maintenance hardware.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-transform active:scale-95">
          Restart Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 border border-emerald-100">
            <Server className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Main Server Status
            </div>
            <div className="text-xl font-black text-emerald-600">
              ONLINE (99.9%)
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-4 bg-amber-50 rounded-full text-amber-600 border border-amber-100">
            <Wifi className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Koneksi ISP
            </div>
            <div className="text-xl font-black text-amber-600">
              LATENCY (45ms)
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-4 bg-rose-50 rounded-full text-rose-600 border border-rose-100">
            <Monitor className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Tiket Trouble Hardware
            </div>
            <div className="text-xl font-black text-rose-600">12 Antrean</div>
          </div>
        </div>
      </div>
    </div>
  );
}
