import React from "react";
import { BookOpen, FileCheck, Search, Users, ExternalLink } from "lucide-react";

export default function OfficeDocumentControl() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" /> Document Control &
            Regulasi
          </h1>
          <p className="text-slate-500 mt-1">
            E-Library untuk standar prosedur rumah sakit, surat keputusan, dan
            pedoman praktik klinis.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Draft Berjalan (Menunggu Persetujuan Direksi)
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            {
              name: "SOP Pemberian Obat High Alert",
              type: "SPO Medis",
              init: "Kepala Instalasi Farmasi",
              cur: "Wadir Medis",
            },
            {
              name: "Pedoman Keselamatan Pasien",
              type: "Pedoman",
              init: "Komite Mutu (PMKP)",
              cur: "Direktur Utama",
            },
          ].map((d, i) => (
            <div
              key={i}
              className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-purple-100 text-purple-700 font-bold uppercase tracking-widest text-[10px] px-2.5 py-0.5 rounded border border-purple-200">
                    {d.type}
                  </span>
                  <span className="font-bold text-slate-800 text-lg">
                    {d.name}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  Pemohon: {d.init} <span className="opacity-50">→</span> Reviu
                  Aktif: <span className="text-amber-600">{d.cur}</span>
                </div>
              </div>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border border-slate-200">
                Buka Draft <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
