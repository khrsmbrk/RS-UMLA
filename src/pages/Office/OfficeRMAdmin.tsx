import React from "react";
import { Files, Archive, FolderSymlink, CheckCircle } from "lucide-react";

export default function OfficeRMAdmin() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Files className="w-6 h-6 text-orange-600" /> Rekam Medis &
            Assembling (Admin)
          </h1>
          <p className="text-slate-500 mt-1">
            Pelacakan berkas rekam medis fisik, manajemen inaktif, assembling
            kelengkapan (KLPCM).
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center">
          <FolderSymlink className="w-16 h-16 text-orange-200 mx-auto mb-4" />
          <div className="font-black text-slate-800 text-lg">
            Peminjaman Berkas Fisik
          </div>
          <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-widest">
            3 Berkas sedang ada di poli
          </p>
        </div>
      </div>
    </div>
  );
}
