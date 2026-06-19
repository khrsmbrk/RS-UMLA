import React, { useState } from "react";
import {
  BookOpen,
  Video,
  Award,
  CheckCircle,
  Clock,
  PlayCircle,
  FileText,
  Download,
  Search,
} from "lucide-react";

export default function OfficeELearning() {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      title: "Pencegahan & Pengendalian Infeksi (PPI) Dasar",
      cat: "Mandatory",
      time: "120 Menit",
    },
    {
      title: "Komunikasi Efektif (SBAR) Antar PPA",
      cat: "Soft Skill",
      time: "90 Menit",
    },
    {
      title: "Manajemen Nyeri Terpadu & Farmakoterapi",
      cat: "Klinis",
      time: "150 Menit",
    },
    {
      title: "Peningkatan Mutu & Keselamatan Pasien (PMKP)",
      cat: "Mandatory",
      time: "180 Menit",
    },
  ];

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.cat.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" /> E-Learning & CME
            (Diklat RS)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pusat pelatihan internal, peningkatan kompetensi, dan sertifikat
            Nakes (Mandatory Training).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6 flex flex-col min-w-0">
          {/* Featured Training Card */}
          <div className="bg-white p-6 justify-between flex-col md:flex-row rounded-xl border border-slate-200 shadow-sm flex gap-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full z-0 pointer-events-none group-hover:bg-indigo-100/50 transition-colors"></div>

            <div className="w-full md:w-5/12 shrink-0 aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden group/video cursor-pointer z-10 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173ff9e5fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="BHD Training"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/video:opacity-80 group-hover/video:scale-105 transition-all duration-500"
              />
              <PlayCircle className="w-14 h-14 text-white relative z-10 opacity-90 group-hover/video:scale-110 shadow-sm transition-transform" />
              <div className="absolute inset-0 border-2 border-transparent group-hover/video:border-white/20 transition-colors z-20 rounded-xl"></div>
            </div>
            <div className="flex-1 flex flex-col justify-center relative z-10 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm border border-rose-200">
                  Wajib Tahunan
                </span>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm border border-slate-200">
                  BHD & PPI
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">
                Pelatihan Bantuan Hidup Dasar (BHD) 2026
              </h3>
              <p className="text-sm font-medium text-slate-500 mb-5 line-clamp-2 leading-relaxed max-w-lg">
                Modul wajib tahunan untuk seluruh tenaga medis dan non-medis
                terkait penanganan gawat darurat henti jantung mendadak di
                lingkungan rumah sakit.
              </p>
              <div className="flex flex-wrap items-center gap-5 text-xs font-black uppercase tracking-widest text-slate-400 mb-5">
                <span className="flex items-center gap-1.5 text-indigo-500">
                  <Video className="w-4 h-4" /> 4 Modul Interaktif
                </span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <FileText className="w-4 h-4" /> Post-Test 20 Soal
                </span>
              </div>
              <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm text-sm font-bold inline-flex items-center gap-2 transition-colors focus:ring-4 focus:ring-indigo-600/20 w-max active:scale-95">
                Lanjutkan (Progress 45%) <PlayCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2 uppercase tracking-widest text-xs">
                  <BookOpen className="w-5 h-5 text-slate-400" /> Katalog Pelatihan Internal
                </h3>
               <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Cari Pelatihan..."
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCourses.map((c, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col group/card"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm border ${c.cat === "Mandatory" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-sky-50 text-sky-700 border-sky-200"}`}
                    >
                      {c.cat}
                    </span>
                    <span className="text-[10px] font-black tracking-widest text-slate-400 flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      <Clock className="w-3 h-3" /> {c.time}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base leading-snug mb-5 flex-1 group-hover/card:text-indigo-700 transition-colors">
                    {c.title}
                  </h4>
                  <button className="w-full py-2 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-indigo-700 hover:border-indigo-200 rounded-lg text-sm font-bold transition-colors shadow-sm">
                    Daftar Modul
                  </button>
                </div>
              ))}
               {filteredCourses.length === 0 && (
                  <div className="col-span-2 p-12 bg-white rounded-xl border border-slate-200 text-center text-slate-500 italic shadow-sm">
                      Pelatihan tidak ditemukan.
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-b from-amber-50 to-transparent z-0 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <div className="flex flex-col items-center pb-6 border-b border-slate-100 relative z-10 shrink-0">
              <div className="w-20 h-20 bg-amber-100 border-4 border-white shadow-sm rounded-full flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-widest">
                Sertifikasi Anda
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-2 max-w-xs leading-relaxed">
                Capaian Anda ditautkan otomatis ke sistem Kredensial KPI &
                e-File SDM.
              </p>
            </div>

            <div className="pt-5 space-y-3 flex-1 overflow-y-auto relative z-10 text-left">
              {[
                {
                  name: "Sertifikat Peningkatan Mutu RS 2026",
                  date: "10 Feb 2026",
                  valid: true,
                },
                {
                  name: "Pelatihan APAR Bersertifikat Damkar",
                  date: "05 Jan 2025",
                  valid: true,
                },
                {
                  name: "Kewaspadaan Isolasi (PPI Dasar)",
                  date: "12 Mei 2024",
                  valid: false,
                }, // Expired
              ].map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all group/cert"
                >
                  <div className="pr-4">
                    <div className="font-bold text-sm text-slate-800 leading-snug mb-1 group-hover/cert:text-indigo-700 transition-colors">
                      {cert.name}
                    </div>
                    <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      Lulus: {cert.date}
                    </div>
                  </div>
                  {cert.valid ? (
                    <button
                      className="text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white p-2.5 rounded-lg border border-emerald-100 transition-colors shrink-0 shadow-sm"
                      title="Unduh E-Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-widest bg-rose-100 border border-rose-200 shadow-sm text-rose-700 px-2.5 py-1 rounded shrink-0">
                      Expired
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
