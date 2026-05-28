import React from "react";
import {
  Utensils,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
} from "lucide-react";

export default function OfficeDietitian() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-orange-500" /> Instalasi Gizi &
            Katering
          </h1>
          <p className="text-slate-500 mt-1">
            Manajemen diet pasien rawat inap, restriksi alergi, dan distribusi
            makanan.
          </p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          Cetak Label Diet Hari Ini
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
                Daftar Distribusi Makanan (Siang)
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                {
                  room: "Mawar 01 (VIP)",
                  name: "Tn. Budi Santoso",
                  diet: "Rendah Garam, DM",
                  allergy: "Seafood",
                  status: "Persiapan",
                },
                {
                  room: "Melati 04",
                  name: "Ny. Siti Aminah",
                  diet: "Lunak",
                  allergy: "-",
                  status: "Diantar",
                },
                {
                  room: "ICU Bed 2",
                  name: "Tn. Ahmad",
                  diet: "Sonde / Cair (NGT)",
                  allergy: "-",
                  status: "Selesai",
                },
              ].map((d, i) => (
                <div
                  key={i}
                  className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded font-black text-[10px] uppercase tracking-widest shadow-sm">
                        {d.room}
                      </span>
                      <span className="font-bold text-slate-800 text-lg">
                        {d.name}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-600 flex items-center gap-4 mt-2">
                      <span>
                        <strong className="text-slate-500 uppercase text-[10px] tracking-wider block">
                          Jenis Diet
                        </strong>{" "}
                        {d.diet}
                      </span>
                      {d.allergy !== "-" && (
                        <span>
                          <strong className="text-rose-500 uppercase text-[10px] tracking-wider block">
                            Alergi
                          </strong>{" "}
                          <span className="text-rose-600 font-bold">
                            {d.allergy}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest border shadow-sm ${
                        d.status === "Selesai"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : d.status === "Diantar"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-4">
              Statistik Diet (Hari Ini)
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">
                  Biasa (Nasi)
                </span>
                <span className="text-lg font-black text-slate-800">45</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">
                  Lunak (Bubur)
                </span>
                <span className="text-lg font-black text-slate-800">32</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">
                  Cair / Sonde
                </span>
                <span className="text-lg font-black text-slate-800">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
