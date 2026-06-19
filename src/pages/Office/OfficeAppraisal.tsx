import React, { useState } from "react";
import {
  Target,
  Star,
  Award,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";

export default function OfficeAppraisal() {
  const [searchTerm, setSearchTerm] = useState("");

  const staff = [
      {
        name: "Ns. Ayu Lestari, S.Kep",
        role: "Perawat Pelaksana IGD",
        score: 92,
        status: "Di Atas Ekspektasi",
      },
      {
        name: "Budi Santoso",
        role: "Staf Pendaftaran",
        score: 85,
        status: "Memenuhi Ekspektasi",
      },
      {
        name: "Dr. Cipto Mangunkusumo",
        role: "Dokter Jaga",
        score: 78,
        status: "Perlu Perbaikan",
      },
  ];

  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.role.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500" /> Penilaian Kinerja
            Karyawan (KPI)
          </h1>
          <p className="text-slate-500 mt-1">
            Evaluasi performa berkala, penilaian 360 derajat, dan target
            indikator mutu unit.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-6 text-white shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full z-0 group-hover:bg-white/20 transition-colors"></div>
            <h3 className="font-black flex items-center gap-2 mb-3 relative z-10 text-sm tracking-widest uppercase">
              <Target className="w-5 h-5 text-indigo-200" /> KPI Saya (Bulan
              Ini)
            </h3>
            <div className="text-5xl font-black mb-3 relative z-10 tracking-tight">
              88.5
              <span className="text-xl font-bold opacity-70 ml-1">/100</span>
            </div>
            <div className="text-indigo-100 text-sm font-medium relative z-10">
              Status Kinerja:{" "}
              <strong className="text-white font-black bg-white/20 px-2 py-0.5 rounded ml-1">
                Memenuhi Ekspektasi
              </strong>
            </div>
            <div className="mt-6 pt-5 border-t border-indigo-400/30 flex flex-col gap-3 relative z-10">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-indigo-100">
                  Kehadiran & Kedisiplinan
                </span>
                <span className="bg-white text-indigo-700 px-2.5 py-0.5 rounded shadow-sm">
                  95%
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-indigo-100">Capaian Indikator</span>
                <span className="bg-white text-indigo-700 px-2.5 py-0.5 rounded shadow-sm">
                  85%
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-indigo-100">Penilaian Atasan</span>
                <span className="bg-white text-indigo-700 px-2.5 py-0.5 rounded shadow-sm">
                  80%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm bg-gradient-to-br from-white to-emerald-50">
            <h4 className="font-black text-emerald-800 mb-3 text-sm flex items-center gap-2 uppercase tracking-widest">
              <Award className="w-5 h-5 text-emerald-500" /> Milestone & Reward
            </h4>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Nilai KPI Anda stabil di atas 85 selama 3 bulan berturut-turut.
              Anda masuk nominasi{" "}
              <strong className="text-emerald-700 font-black relative before:absolute before:inset-0 before:bg-emerald-100/50 before:-skew-x-12 before:-z-10">
                Employee of the Month
              </strong>
              .
            </p>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <div className="flex flex-col gap-2">
                <h3 className="font-black text-slate-800 text-lg">
                  Evaluasi Tim (Tugas Kepala Ruangan / Manajer)
                </h3>
                <p className="text-sm font-medium text-slate-500">
                  Mohon selesaikan form penilaian untuk tim di bawah jajaran Anda
                  sebelum tanggal 30 bulan berjalan.
                </p>
             </div>
              <div className="relative w-full sm:w-64 shrink-0">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Pegawai..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Nama Pegawai / Jabatan
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">
                    Skor KPI
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">
                    Status Evaluasi
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStaff.map((s, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-800 text-base mb-1 group-hover:text-indigo-700 transition-colors">
                        {s.name}
                      </div>
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                        {s.role}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="font-black text-2xl text-slate-700">
                        {s.score}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm inline-block ${
                          s.status === "Di Atas Ekspektasi"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : s.status === "Memenuhi Ekspektasi"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700 px-4 py-2.5 rounded-lg transition-colors shadow-sm focus:ring-4 focus:ring-indigo-600/20 active:scale-95">
                        Isi Form Evaluasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
