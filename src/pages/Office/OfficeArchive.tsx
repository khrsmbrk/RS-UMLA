import React, { useState } from "react";
import {
  Archive,
  Folder,
  FileText,
  Search,
  Download,
  Clock,
} from "lucide-react";

export default function OfficeArchive() {
  const categories = [
    "SPO Keperawatan",
    "SPO Medis",
    "Kebijakan Direktur",
    "SK Komite",
    "Pedoman Pelayanan",
    "Dokumen Akreditasi",
  ];

  const documents = [
    {
      id: "SPO-KPR-012",
      title: "SPO Pemasangan Infus Dewasa",
      rev: "Rev 02",
      date: "10 Jan 2026",
      cat: "SPO Keperawatan",
    },
    {
      id: "SPO-MED-045",
      title: "SPO Triase IGD",
      rev: "Rev 03",
      date: "14 Feb 2026",
      cat: "SPO Medis",
    },
    {
      id: "SK-DIR-2026-05",
      title: "SK Pengangkatan Komite Etik",
      rev: "Rev 00",
      date: "01 Mar 2026",
      cat: "Kebijakan Direktur",
    },
    {
      id: "PDM-YAN-001",
      title: "Pedoman Pelayanan Pendaftaran",
      rev: "Rev 01",
      date: "15 Jan 2026",
      cat: "Pedoman Pelayanan",
    },
  ];

  const [activeCat, setActiveCat] = useState("Semua");

  return (
    <div className="space-y-6 flex flex-col h-[85vh] max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Archive className="w-6 h-6 text-fuchsia-600" /> Arsip Digital &
            Regulasi
          </h1>
          <p className="text-slate-500 mt-1">
            Sentralisasi dokumen Standard Procedure Operational (SPO), SK,
            Pedoman, dan Panduan RS.
          </p>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        <div className="w-72 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col hidden lg:flex shrink-0">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest text-xs">
              <Folder className="w-4 h-4 text-slate-400" /> Kategori Arsip
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <button
              onClick={() => setActiveCat("Semua")}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeCat === "Semua" ? "bg-fuchsia-50 text-fuchsia-700 shadow-sm border border-fuchsia-100" : "text-slate-600 hover:bg-slate-50 border border-transparent"}`}
            >
              Semua Dokumen
            </button>
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveCat(c)}
                className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeCat === c ? "bg-fuchsia-50 text-fuchsia-700 shadow-sm border border-fuchsia-100" : "text-slate-600 hover:bg-slate-50 border border-transparent"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex gap-4 items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari judul dokumen atau nomor registrasi..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {documents
              .filter((d) => activeCat === "Semua" || d.cat === activeCat)
              .map((doc, i) => (
                <div
                  key={i}
                  className="group border border-slate-200 rounded-xl p-5 hover:border-fuchsia-300 hover:shadow-md transition-all bg-white flex items-start sm:items-center flex-col sm:flex-row gap-5"
                >
                  <div className="w-14 h-14 bg-fuchsia-50 rounded-xl flex items-center justify-center flex-shrink-0 text-fuchsia-600 border border-fuchsia-100 group-hover:scale-105 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h4 className="font-bold text-slate-800 text-lg truncate group-hover:text-fuchsia-600 transition-colors cursor-pointer">
                        {doc.title}
                      </h4>
                      <span className="text-[10px] font-black bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-500 w-max tracking-widest">
                        {doc.id}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-wider">
                      <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                        {doc.cat}
                      </span>
                      <span className="text-fuchsia-700 bg-fuchsia-50 px-2.5 py-1 rounded border border-fuchsia-100">
                        {doc.rev}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Berlaku: {doc.date}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center justify-center w-12 h-12 rounded-xl text-slate-400 hover:text-white hover:bg-fuchsia-600 border border-transparent hover:border-fuchsia-600 transition-colors shadow-sm ml-auto sm:ml-0 shrink-0 self-end sm:self-auto">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
