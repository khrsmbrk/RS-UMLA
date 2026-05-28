import React from "react";
import {
  FileText,
  Search,
  Activity,
  Camera,
  Download,
  Filter,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function OfficePatrol() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Camera className="w-6 h-6 text-indigo-600" /> Log Patroli & PPI
            Checklist
          </h1>
          <p className="text-slate-500 mt-1">
            Pemindaian QR lokasi, inspeksi sarpras, dan monitoring kebersihan
            ruangan.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Search className="w-5 h-5" /> Scan QR Ruangan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[100px] z-0 opacity-50 group-hover:bg-emerald-100 transition-colors pointer-events-none"></div>
          <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 relative z-10 uppercase tracking-widest text-sm">
            <Activity className="w-5 h-5 text-emerald-500" /> Status Inspeksi
            Harian (Hari Ini)
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center relative z-10 mb-6">
            <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-sm flex flex-col items-center justify-center min-h-[100px]">
              <div className="text-4xl font-black text-emerald-600 tracking-tighter">
                24
              </div>
              <div className="text-[10px] font-black text-emerald-800 mt-1.5 uppercase tracking-widest px-2 py-1 bg-emerald-50 rounded-md">
                Titik Dipatroli
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-amber-100 shadow-sm flex flex-col items-center justify-center min-h-[100px]">
              <div className="text-4xl font-black text-amber-600 tracking-tighter">
                3
              </div>
              <div className="text-[10px] font-black text-amber-800 mt-1.5 uppercase tracking-widest px-2 py-1 bg-amber-50 rounded-md">
                Temuan Negatif
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-1">
            <h4 className="font-bold text-slate-800 text-sm mb-4">
              Tugas Patroli Anda (Shift Berjalan)
            </h4>
            <div className="space-y-3">
              {[
                {
                  rm: "Area Parkir Basemen",
                  status: "Selesai",
                  time: "08:15",
                  by: "Andi (Sec)",
                },
                {
                  rm: "IGD & Ruang Tunggu",
                  status: "Selesai",
                  time: "09:30",
                  by: "Andi (Sec)",
                },
                {
                  rm: "Gudang Farmasi Sentral",
                  status: "Pending",
                  time: "-",
                  by: "-",
                },
                {
                  rm: "Ruang Genset & Trafo",
                  status: "Pending",
                  time: "-",
                  by: "-",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${t.status === "Selesai" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-400 border border-slate-200"}`}
                    >
                      {t.status === "Selesai" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800 mb-0.5">
                        {t.rm}
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        {t.status === "Selesai"
                          ? `Dicek pd ${t.time} oleh ${t.by}`
                          : "Menunggu kunjungan"}
                      </div>
                    </div>
                  </div>
                  {t.status === "Pending" && (
                    <button className="text-white font-bold text-xs bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-transform active:scale-95 shrink-0 self-start sm:self-auto uppercase tracking-wider">
                      Mulai Cek
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
              <FileText className="w-5 h-5 text-slate-500" /> Log Temuan PPI &
              K3RS
            </h3>
            <button className="text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-sm transition-colors w-full sm:w-auto">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          <div className="p-0 flex-1 overflow-y-auto">
            <div className="divide-y divide-slate-100">
              {[
                {
                  loc: "Toilet Poli VIP",
                  desc: "Hand rub kosong, wastafel bocor",
                  date: "Hari ini 10:15",
                  reporter: "PPI-01",
                  risk: "Rendah",
                },
                {
                  loc: "Koridor OK",
                  desc: "Tutup tempat sampah kuning infeksius rusak",
                  date: "Kemarin 14:20",
                  reporter: "K3-04",
                  risk: "Tinggi",
                },
                {
                  loc: "Depan ICU",
                  desc: "Lantai licin tanpa tanda bahaya",
                  date: "Kemarin 09:00",
                  reporter: "Sec-02",
                  risk: "Sedang",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2 gap-4 flex-col sm:flex-row">
                    <div className="font-bold text-slate-800 text-base group-hover:text-amber-700 transition-colors">
                      {item.loc}
                    </div>
                    <span
                      className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md border shrink-0 ${
                        item.risk === "Tinggi"
                          ? "bg-red-50 text-red-700 border-red-200 shadow-sm"
                          : item.risk === "Sedang"
                            ? "bg-amber-50 text-amber-700 border-amber-200 shadow-sm"
                            : "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                      }`}
                    >
                      Resiko {item.risk}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-3 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest gap-2">
                    <div className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Lap. oleh: {item.reporter} &bull; {item.date}
                    </div>
                    <button className="text-indigo-600 hover:text-white hover:bg-indigo-600 transition-colors px-2 py-1 rounded bg-indigo-50 w-max border border-indigo-100">
                      Lampiran Foto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center shrink-0">
            <button className="text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-800 hover:text-white  hover:border-slate-800 rounded-xl py-3 px-4 transition-all w-full flex items-center justify-center gap-2 shadow-sm">
              <Download className="w-4 h-4" /> Unduh Laporan Audit (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
