import React from "react";
import { Box, PlayCircle, Plus, CheckCircle, RefreshCcw, Bell } from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeCSSD() {
  const { cssdMachines: machines, cssdBatches: batches, updateCssdMachineStatus, updateCssdBatchStatus } = useOfficeStore();

  const startMachine = (batchId: string) => {
      // Dummy logic to move a batch into an available machine
      const standbyMachineIndex = machines.findIndex((m: any) => m.status === "Standby");
      if (standbyMachineIndex === -1) {
          alert("Semua mesin sedang berjalan atau penuh.");
          return;
      }
      const standby = machines[standbyMachineIndex];
      updateCssdMachineStatus(standby.id, "Running");
      // As a shortcut, we mark batch as Proses so it disappears from the pending list
      updateCssdBatchStatus(batchId, "Proses");
  };


  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Box className="w-6 h-6 text-fuchsia-600" /> CSSD & Sterilisasi Alat
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
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
              Status Mesin Autoclave & Sterilizer
            </h3>
            <button className="text-slate-400 hover:text-fuchsia-600 transition-colors">
                 <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="p-5 space-y-4 max-h-[600px] overflow-y-auto">
            {machines.map((m) => (
              <div
                key={m.id}
                className={`border p-4 rounded-xl shadow-sm bg-white transition-colors ${m.status === 'Running' ? 'border-fuchsia-200' : 'border-slate-100 hover:border-slate-300'}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-lg">
                        {m.machine}
                      </span>
                      {m.status === 'Standby' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm border rounded-md ${
                      m.status === "Running"
                        ? "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-800 animate-pulse"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                {m.status === "Running" && (
                  <div className="space-y-2">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                      <div
                        className="bg-fuchsia-500 h-full rounded-full transition-all duration-1000 relative"
                        style={{ width: m.progress }}
                      >
                          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] items-center font-bold text-slate-500 uppercase tracking-wider">
                      <span>Suhu: <span className="text-slate-700">{m.temp}</span></span>
                      <span>Sisa Waktu: <span className="text-slate-700">{m.time}</span></span>
                    </div>
                  </div>
                )}
                {m.status === "Standby" && (
                    <div className="text-xs text-slate-400 italic flex items-center gap-1">
                        Menunggu beban kerja baru...
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
              Batch Antrean (Tunggu Proses)
            </h3>
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs font-bold">{batches.filter((b: any) => b.status !== "Proses").length} Batch</span>
          </div>
          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[600px]">
            {batches.filter((b: any) => b.status !== "Proses").map((item: any) => (
              <div
                key={item.id}
                className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center group"
              >
                <div>
                  <div className="font-bold text-slate-800">{item.type}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <Box className="w-3 h-3"/> {item.from} • <span className="text-fuchsia-600 font-mono">{item.id}</span>
                  </div>
                </div>
                <button 
                  onClick={() => startMachine(item.id)}
                  title="Mulai Sterilisasi"
                  disabled={!machines.some(m => m.status === 'Standby')}
                  className="p-2 text-fuchsia-600 bg-fuchsia-50 hover:bg-fuchsia-600 hover:text-white rounded-lg transition-colors border border-fuchsia-100 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-110 active:scale-95"
                >
                  <PlayCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
            {batches.length === 0 && (
                <div className="p-12 text-center text-slate-500 italic flex flex-col items-center">
                    <CheckCircle className="w-12 h-12 text-emerald-200 mb-3" />
                    Semua batch telah diproses.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
