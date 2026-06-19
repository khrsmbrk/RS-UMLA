import React from "react";
import { Target, TrendingUp, Award, AlertCircle } from "lucide-react";

const KPICard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:p-7 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" /> Key Performance
            Indicator
          </h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">
            Kuartal 2 - 2026
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg">
          <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">
            Predikat B
          </span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-600">Disiplin Waktu (Kehadiran)</span>
            <span className="text-emerald-600">95%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: "95%" }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-600">Penyelesaian Tugas (SLA)</span>
            <span className="text-blue-600">88%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "88%" }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-600">
              Pelayanan & Sikap (360 Review)
            </span>
            <span className="text-amber-500">75%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Total Skor
          </span>
          <span className="text-2xl font-black text-slate-800 tracking-tight">
            86.0
          </span>
        </div>
        <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
          <TrendingUp className="w-4 h-4" /> Detail Evaluasi
        </button>
      </div>
    </div>
  );
};

export default KPICard;
