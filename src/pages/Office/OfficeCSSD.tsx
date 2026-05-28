import React from "react";
import { Box, PlayCircle, Plus, CheckCircle } from "lucide-react";

export default function OfficeCSSD() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Box className="w-6 h-6 text-fuchsia-600" /> CSSD & Sterilisasi Alat
          </h1>
          <p className="text-slate-500 mt-1">
            Central Sterile Supply Department - Pelacakan instrumen bedah dan
            autoklaf.
          </p>
        </div>
        <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Terima Alat Kotor Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
              Status Mesin Autoclave
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              {
                machine: "Autoclave A-01",
                temp: "134°C",
                time: "15 Menit",
                status: "Running",
                progress: "65%",
              },
              {
                machine: "Autoclave A-02",
                temp: "-",
                time: "-",
                status: "Standby",
                progress: "0%",
              },
              {
                machine: "EO Gas Sterilizer",
                temp: "55°C",
                time: "120 Menit",
                status: "Running",
                progress: "12%",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="border border-slate-100 p-4 rounded-xl shadow-sm bg-white hover:border-fuchsia-200 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-slate-800 text-lg">
                    {m.machine}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm border rounded-md ${
                      m.status === "Running"
                        ? "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-800 animate-pulse"
                        : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                {m.status === "Running" && (
                  <div className="space-y-2">
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-fuchsia-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: m.progress }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] items-center font-bold text-slate-500 uppercase tracking-wider">
                      <span>Suhu: {m.temp}</span>
                      <span>Sisa Waktu: {m.time}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
              Batch Antrean (Tunggu Proses)
            </h3>
          </div>
          <div className="divide-y divide-slate-100 overflow-y-auto">
            {[
              {
                id: "SET-BD-09",
                from: "Instalasi Bedah Sentral",
                type: "Set Mayor Bedah Umum",
              },
              { id: "SET-IGD-02", from: "IGD", type: "Set Hecting Kecil" },
              {
                id: "SET-VK-05",
                from: "Kamar Bersalin (VK)",
                type: "Set Partus",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-slate-800">{item.type}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Asal: {item.from} • {item.id}
                  </div>
                </div>
                <button className="p-2 text-fuchsia-600 bg-fuchsia-50 hover:bg-fuchsia-600 hover:text-white rounded-lg transition-colors border border-fuchsia-100 shadow-sm">
                  <PlayCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
