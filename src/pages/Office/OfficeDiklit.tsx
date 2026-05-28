import React from "react";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

export default function OfficeDiklit() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-800" /> Pendidikan &
            Penelitian (Diklit)
          </h1>
          <p className="text-slate-500 mt-1">
            Koordinasi mahasiswa klinik, residen bedah, praktik
            kebidanan/perawat, dan perizinan penelitian ilmiah.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 min-h-[300px] flex justify-center items-center">
        <div className="text-center">
          <Award className="w-16 h-16 text-blue-100 mx-auto mb-4" />
          <h3 className="text-lg font-black text-slate-800">
            Portal Diklit RS Pendidikan
          </h3>
          <p className="text-slate-500 mt-2 font-medium">
            Buku log klinis mahasiswa dan kuota rotasi stase tercatat di sistem
            akademik external (tersinkronisasi malam hari).
          </p>
        </div>
      </div>
    </div>
  );
}
