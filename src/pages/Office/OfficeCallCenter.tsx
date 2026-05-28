import React from "react";
import { Headset, PhoneCall, History, Headphones } from "lucide-react";

export default function OfficeCallCenter() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Headset className="w-6 h-6 text-blue-700" /> Call Center (PKRS)
          </h1>
          <p className="text-slate-500 mt-1">
            Pusat panggilan informasi rumah sakit, penanganan keluhan cepat
            (non-medis), dan penjadwalan via telepon.
          </p>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6 min-h-[300px] flex justify-center items-center text-slate-300">
        <div className="text-center">
          <PhoneCall className="w-16 h-16 text-blue-500/50 mx-auto mb-4 animate-bounce" />
          <h3 className="text-lg font-black text-white">
            Saluran Telepon VoIP Aktif
          </h3>
          <p className="text-slate-400 mt-2 font-medium">
            Ready menerima routing API PABX dari EXT: 100.
          </p>
        </div>
      </div>
    </div>
  );
}
