import React from "react";
import { Megaphone, LayoutDashboard } from "lucide-react";

export default function OfficeHealthPromo() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-orange-600" /> Promosi Kesehatan
            (PKRS)
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem informasi untuk pengelolaan dan monitoring unit Promosi
            Kesehatan (PKRS).
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 min-h-[300px] flex justify-center items-center">
        <div className="text-center">
          <LayoutDashboard className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-black text-slate-800">
            Modul Promosi Kesehatan (PKRS)
          </h3>
          <p className="text-slate-500 mt-2 font-medium">
            Dalam tahap pengembangan sinkronisasi lanjutan dengan HIS/SIMRS
            inti.
          </p>
        </div>
      </div>
    </div>
  );
}
