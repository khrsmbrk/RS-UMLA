import React from "react";
import { HeartHandshake, Users, ArrowRight, Heart } from "lucide-react";

export default function OfficeSpiritual() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-teal-600" /> Bimbingan
            Rohani (Bintal)
          </h1>
          <p className="text-slate-500 mt-1">
            Jadwal asuhan rohani pasien rawat inap, konseling keluarga, dan
            manajemen masjid RS.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Jadwal Kunjungan Rohaniwan Hari Ini
          </h3>
        </div>
        <div className="p-6 text-center py-12">
          <Heart className="w-16 h-16 text-teal-100 mx-auto mb-4" />
          <h4 className="font-bold text-slate-700 text-lg">
            Konseling sedang dijadwalkan
          </h4>
          <p className="text-slate-500 text-sm mt-2">
            Daftar permintaan bimbingan rohani dari pasien ICU / HCU akan muncul
            di sini.
          </p>
        </div>
      </div>
    </div>
  );
}
