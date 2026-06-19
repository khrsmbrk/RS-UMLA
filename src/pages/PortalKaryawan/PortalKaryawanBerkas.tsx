import { useOutletContext } from '../../utils/OutletContext';
import React, { useState } from "react";

import {
  FileText,
  Search,
  Plus,
  FileBadge2,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Filter,
  UploadCloud,
  Folder,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PortalKaryawanBerkas() {
  const { user } = useOutletContext<{ user: any }>();
  const [activeTab, setActiveTab] = useState("wajib");

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-fuchsia-100 text-fuchsia-600 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            Employee Management
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-lg">
            Kelola dokumen kepegawaian Anda secara digital. Pastikan dokumen
            wajib seperti STR dan SIP selalu aktif.
          </p>
        </div>
        <button
          onClick={() =>
            toast(
              "Maaf, kuota penyimpanan berkas Anda telah penuh. Silakan hubungi tim HR.",
              { icon: "⚠️" },
            )
          }
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2.5 rounded-xl shadow-sm shadow-fuchsia-200 font-bold text-sm transition-all hover:-translate-y-0.5 flex items-center gap-2"
        >
          <UploadCloud className="w-5 h-5" /> Unggah Dokumen
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border text-left border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Terverifikasi
            </p>
            <p className="text-2xl font-black text-slate-800 mt-0.5">12</p>
          </div>
        </div>
        <div className="bg-white border text-left border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Menunggu
            </p>
            <p className="text-2xl font-black text-slate-800 mt-0.5">2</p>
          </div>
        </div>
        <div className="bg-white border text-left border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-xl animate-pulse">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kadaluarsa
            </p>
            <p className="text-2xl font-black text-rose-600 mt-0.5">1</p>
          </div>
        </div>
        <div className="bg-slate-800 text-left border border-slate-700 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-700 text-white rounded-xl">
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Berkas
            </p>
            <p className="text-2xl font-black text-white mt-0.5">15</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm inline-flex gap-1 w-full overflow-x-auto">
        <button
          onClick={() => setActiveTab("wajib")}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "wajib" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          Dokumen Wajib (Klinis)
        </button>
        <button
          onClick={() => setActiveTab("pribadi")}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "pribadi" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          Data Pribadi & Pendidikan
        </button>
        <button
          onClick={() => setActiveTab("sertifikat")}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "sertifikat" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          Sertifikat Pelatihan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Card list of documents */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl shrink-0">
                <FileBadge2 className="w-8 h-8" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-extrabold text-slate-800 truncate text-lg">
                    Surat Tanda Registrasi (STR)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-700">
                    Expired
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 truncate mb-1">
                  STR_Medis_Andi_2023.pdf
                </p>
                <div className="text-xs text-rose-600 font-bold border-l-2 border-rose-500 pl-2">
                  Telah berakhir pada 01 Jan 2026. Mohon segera perbarui dokumen
                  Anda.
                </div>
              </div>
            </div>
            <div className="w-full sm:w-auto flex sm:flex-col gap-2">
              <button
                onClick={() =>
                  toast("Izin pembaruan terkunci. STR Anda sedang dalam proses verifikasi pusat.", {
                    icon: "🔒",
                  })
                }
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm"
              >
                Perbarui Sekarang
              </button>
              <button
                onClick={() =>
                  toast("Akses file sumber ditolak.")
                }
                className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-lg font-bold text-xs transition-colors"
              >
                Lihat Detail
              </button>
            </div>
          </div>

          <div className="bg-white border border-emerald-500/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <div className="flex items-start gap-4 pl-2">
              <div className="p-3 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl shrink-0">
                <FileBadge2 className="w-8 h-8" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-extrabold text-slate-800 truncate text-lg">
                    Surat Izin Praktik (SIP)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Aktif
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 truncate mb-2">
                  Scan_SIP_2024_Update.pdf
                </p>
                <div className="w-full max-w-sm bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[45%]"></div>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  Sisa masa berlaku: 450 Hari (s/d 10 Okt 2027)
                </div>
              </div>
            </div>
            <div className="w-full sm:w-auto flex sm:flex-col gap-2">
              <button
                onClick={() => toast("File SIP sedang diunduh...")}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs transition-colors"
              >
                Lihat File
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl shrink-0">
                <FileBadge2 className="w-8 h-8" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-extrabold text-slate-800 truncate text-lg">
                    Sertifikat ACLS
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Hampir Habis
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 truncate mb-2">
                  Sertifikat_ACLS_2023.pdf
                </p>
                <div className="w-full max-w-sm bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[90%]"></div>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  Sisa masa berlaku: 32 Hari (s/d 15 Jul 2026)
                </div>
              </div>
            </div>
            <div className="w-full sm:w-auto flex sm:flex-col gap-2">
              <button
                onClick={() =>
                  toast("Koneksi ke sistem sertifikasi pusat gagal. Silakan coba lagi nanti.", {
                    icon: "❌",
                  })
                }
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm"
              >
                Perbarui
              </button>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="font-black text-slate-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Proses
              Verifikasi
            </h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Setiap dokumen yang diunggah akan melalui proses verifikasi oleh
              tim HR & Diklat maksimal{" "}
              <span className="font-bold text-slate-800">2x24 Jam</span> kerja.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 py-1 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 z-10"></div>
                  <div className="w-px h-full bg-emerald-200 -my-1 relative z-0"></div>
                </div>
                <div className="pb-3 text-sm">
                  <span className="font-bold text-slate-800 block">
                    Dokumen Diunggah
                  </span>
                  <span className="text-xs text-slate-500 flex justify-between">
                    Oleh Anda <span>12 Mei</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 py-1 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 z-10 animate-pulse"></div>
                  <div className="w-px h-full bg-slate-200 -my-1 relative z-0"></div>
                </div>
                <div className="pb-3 text-sm">
                  <span className="font-bold text-slate-800 block">
                    Review HR
                  </span>
                  <span className="text-xs text-slate-500 flex justify-between">
                    Menunggu antrian <span>...</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 py-1 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 bg-white z-10"></div>
                </div>
                <div className="pb-3 text-sm">
                  <span className="font-medium text-slate-400 block">
                    Terverifikasi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
