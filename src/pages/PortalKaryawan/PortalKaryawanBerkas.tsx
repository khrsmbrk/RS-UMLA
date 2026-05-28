import React from "react";
import { useOutletContext } from "react-router-dom";
import { FileText, Search, Plus, FileBadge2 } from "lucide-react";

export default function PortalKaryawanBerkas() {
  const { user } = useOutletContext<{ user: any }>();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-fuchsia-600" /> Berkas Kepegawaian
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Dokumen ijazah, sertifikat pelatihan, STR, SIP, dan kontrak kerja.
          </p>
        </div>
        <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Unggah Dokumen Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <FileBadge2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Ijazah Terakhir
            </div>
            <div className="font-bold text-slate-800 mt-1 cursor-pointer hover:underline decoration-slate-300">
              S1_Keperawatan_2015.pdf
            </div>
            <div className="text-xs text-emerald-600 font-bold mt-2">
              Terverifikasi HRD
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <FileBadge2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Sertifikat BTCLS
            </div>
            <div className="font-bold text-slate-800 mt-1 cursor-pointer hover:underline decoration-slate-300">
              Sert_BTCLS_2024.pdf
            </div>
            <div className="text-xs text-slate-500 font-medium mt-2">
              Berlaku s/d: 10 Okt 2029
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <FileBadge2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              STR / SIP
            </div>
            <div className="font-bold text-slate-800 mt-1 cursor-pointer hover:underline decoration-slate-300">
              Scan_SIP_2023.pdf
            </div>
            <div className="text-xs text-amber-600 font-bold mt-2 animate-pulse">
              Berlaku s/d: 01 Jan 2027
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
