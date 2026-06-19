import React from "react";
import { Target, TrendingUp, Award, Activity, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function PortalKaryawanKinerja() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Kinerja & Evaluasi
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Rapor kinerja, indikator utama, dan umpan balik (360 Review).
          </p>
        </div>
        <button
          onClick={() => toast.success("Mengunduh Rapor Kinerja PDF...")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
        >
          Cetak Rapor Kinerja
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" /> Detail Target
              Indikator (KPI)
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700">
                    Disiplin Waktu (Kehadiran)
                  </span>
                  <span className="text-emerald-600">95%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: "95%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500">
                  Batas toleransi keterlambatan terpenuhi. Kehadiran sangat
                  baik.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700">
                    Penyelesaian Tugas (SLA)
                  </span>
                  <span className="text-blue-600">88%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: "88%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500">
                  Tugas diselesaikan tepat waktu sesuai Service Level Agreement.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700">
                    Pelayanan & Sikap (360 Review)
                  </span>
                  <span className="text-amber-500">75%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500">
                  Cukup baik, perlu peningkatan dalam komunikasi
                  inter-departemen.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" /> Catatan Umpan
              Balik (Feedback)
            </h3>
            <div className="space-y-4">
              <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                    Positif
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Dari: Kepala Ruangan
                  </span>
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  "Sangat sigap dalam menangani keluhan pasien di UGD pada shift
                  malam."
                </p>
              </div>
              <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-1 rounded">
                    Evaluasi
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Dari: HRD
                  </span>
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  "Pastikan selalu melengkapi form lembur pada hari yang sama
                  untuk mempermudah perhitungan payroll."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 text-white rounded-2xl shadow-sm p-6 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-indigo-200" />
            <h2 className="text-xl font-black mb-1">Skor Akhir: 86.0</h2>
            <p className="text-indigo-200 font-medium mb-4">
              Predikat B - Sangat Baik
            </p>
            <div className="inline-block bg-white/20 px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm">
              Periode: Q2 2026
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">
              Grafik Trend (Simulasi)
            </h3>
            <div className="h-48 flex items-end justify-between gap-2">
              <div className="w-full bg-slate-100 rounded-t-sm h-[70%] relative group">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                  70
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-t-sm h-[75%] relative group">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                  75
                </span>
              </div>
              <div className="w-full bg-indigo-500 rounded-t-sm h-[86%] relative group">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-indigo-600 transition-colors">
                  86
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-slate-100 text-xs font-medium text-slate-400">
              <span>Q4 '25</span>
              <span>Q1 '26</span>
              <span className="text-indigo-600 font-bold">Q2 '26</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
