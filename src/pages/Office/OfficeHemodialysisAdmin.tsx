import React from "react";
import { Settings, Droplet, Clock, UserCheck } from "lucide-react";

export default function OfficeHemodialysisAdmin() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-sky-600" /> Instalasi Hemodialisa
            (HD)
          </h1>
          <p className="text-slate-500 mt-1">
            Penjadwalan mesin HD berkala, sistem RO (Reverse Osmosis), dan reuse
            dializer.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center text-slate-500 font-bold py-12">
        <Settings className="w-16 h-16 mx-auto mb-4 text-slate-200" />
        Mesin RO dalam kondisi optimal. Modul jadwal rutin pasien sedang
        disinkronisasi dengan antrean rawat jalan BPJS.
      </div>
    </div>
  );
}
