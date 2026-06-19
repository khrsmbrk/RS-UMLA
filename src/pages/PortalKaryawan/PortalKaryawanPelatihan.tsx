import React, { useState } from "react";
import {
  Award,
  BookOpen,
  Clock,
  Download,
  CheckCircle,
  Video,
} from "lucide-react";
import toast from "react-hot-toast";
import { TRAININGS } from "../../data/trainings";

export default function PortalKaryawanPelatihan() {
  const [activeTab, setActiveTab] = useState("tersedia");

  const handleDaftar = (title: string) => {
    toast.success(`Berhasil mendaftar untuk pelatihan: ${title}`);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          E-Learning & Pelatihan
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Tingkatkan kompetensi Anda melalui modul pelatihan internal rumah
          sakit.
        </p>
      </div>

      <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1 w-full sm:w-max">
        <button
          onClick={() => setActiveTab("tersedia")}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-colors flex-1 sm:flex-none ${activeTab === "tersedia" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Katalog Pelatihan
        </button>
        <button
          onClick={() => setActiveTab("riwayat")}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-colors flex-1 sm:flex-none ${activeTab === "riwayat" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Riwayat & Sertifikat
        </button>
      </div>

      {activeTab === "tersedia" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAININGS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:border-blue-300 transition-colors"
            >
              <div className="h-32 bg-slate-100 relative pt-4 px-4 flex items-center justify-center">
                <Video className="w-12 h-12 text-slate-300" />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-slate-700">
                  {item.organizer}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex gap-2 items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Wajib
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2 leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  Peserta: {item.targetUnit}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Hingga {item.date}</span>
                  </div>
                  <button
                    onClick={() => handleDaftar(item.name)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
                  >
                    Daftar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "riwayat" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">
              Sertifikat & Pencapaian
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border border-emerald-200 bg-emerald-50 rounded-xl mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">
                  Bantuan Hidup Dasar (BHD)
                </h4>
                <p className="text-sm text-slate-600">
                  Diselesaikan pada: 10 Maret 2026
                </p>
              </div>
              <button
                onClick={() =>
                  toast.success("Sertifikat sedang diunduh (Simulasi)")
                }
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center shadow-sm"
              >
                <Download className="w-4 h-4" /> Unduh Sertifikat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
