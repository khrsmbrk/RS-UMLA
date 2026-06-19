import React, { useState, useMemo } from "react";
import {
  FileSearch,
  Search,
  AlertCircle,
  FileCheck,
  Target,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeAudit() {
  const [searchTerm, setSearchTerm] = useState("");
  const storeAudits = useOfficeStore(state => state.audits);
  const { addAudit } = useOfficeStore();

  const audits = useMemo(() => [
      ...storeAudits.map((a: any) => ({
        id: a.id,
        dept: a.unit,
        risk: a.score < 70 ? "Tinggi" : a.score < 90 ? "Sedang" : "Rendah",
        desc: `${a.type} - Skor: ${a.score} (Auditor: ${a.auditor})`
      })),
      {
        id: "SPI-26-041",
        dept: "Instalasi Farmasi",
        risk: "Tinggi",
        desc: "Selisih stok fisik vs sistem pada lemari obat Narkotika.",
      },
      {
        id: "SPI-26-039",
        dept: "Bagian Keuangan",
        risk: "Sedang",
        desc: "Klaim BPJS bulan Februari telat disubmit melewati batas maksimal h+4.",
      },
      {
        id: "SPI-26-042",
        dept: "Pengadaan/Logistik",
        risk: "Tinggi",
        desc: "Tender pengadaan alkes 500jt+ tanpa 3 vendor pembanding.",
      },
      {
        id: "SPI-26-038",
        dept: "Pendaftaran Rawat Jalan",
        risk: "Rendah",
        desc: "Waktu tunggu antrean pendaftaran rata-rata > 15 menit pada jam sibuk (08:00 - 10:00).",
      },
      {
        id: "SPI-26-035",
        dept: "HRD / SDM",
        risk: "Sedang",
        desc: "STR Perawat a.n Sari Lestari expired, belum ada bukti pengurusan SIP baru.",
      },
  ], [storeAudits]);

  const filteredAudits = audits.filter(a => a.dept.toLowerCase().includes(searchTerm.toLowerCase()) || a.desc.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleTambahTemuan = () => {
    addAudit({
      id: `SPI-NEW-${Date.now().toString().slice(-4)}`,
      type: "Temuan Ekstra",
      unit: "Rekam Medis",
      date: new Date().toISOString().split('T')[0],
      auditor: "Anda",
      score: 65,
      status: "New"
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 flex flex-col h-[85vh]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-indigo-600" /> Audit SPI &
            Kanban Akreditasi
          </h1>
          <p className="text-slate-500 mt-1">
            Monitoring temuan audit internal (SPI) dan tracking kesiapan dokumen
            Pokja Akreditasi STARKES.
          </p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 w-full sm:w-auto px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-colors">
            <FileCheck className="w-5 h-5" /> Export Laporan
          </button>
          <button 
            onClick={handleTambahTemuan}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-colors focus:ring-4 focus:ring-indigo-600/20"
          >
            Tambah Temuan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Kanban Board untuk Akreditasi */}
        <div className="xl:col-span-2 flex flex-col min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-widest text-sm">
            <Target className="w-5 h-5 text-indigo-500" /> STARKES Document
            Pipeline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 min-h-0 overflow-y-auto">
            {/* Kolom 1 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col h-max md:h-full">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h4 className="font-black text-sm text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>{" "}
                  To-Do
                </h4>
                <span className="bg-white text-slate-700 text-xs font-black px-2.5 py-0.5 rounded-md shadow-sm border border-slate-200">
                  3
                </span>
              </div>
              <div className="space-y-3 overflow-y-auto pr-1">
                <KanbanCard
                  pokja="SKP"
                  title="SPO Pemasangan Gelang Pasien"
                  desc="Perlu direvisi menyesuaikan regulasi terbaru Kemenkes."
                  due="30 Mei 26"
                  status="todo"
                />
                <KanbanCard
                  pokja="HPK"
                  title="Formulir Persetujuan Tindakan (Informed Consent)"
                  desc="Format lama, logo RS belum diupdate di footer."
                  due="28 Mei 26"
                  status="todo"
                />
                <KanbanCard
                  pokja="TKRS"
                  title="Struktur Tata Kelola Komite Medis"
                  desc="SK Kadaluarsa perlu disahkan ulang oleh pimpinan."
                  due="01 Jun 26"
                  status="todo"
                />
              </div>
            </div>

            {/* Kolom 2 */}
            <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 flex flex-col h-max md:h-full">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h4 className="font-black text-sm text-indigo-800 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>{" "}
                  In Review
                </h4>
                <span className="bg-white text-indigo-700 text-xs font-black px-2.5 py-0.5 rounded-md shadow-sm border border-indigo-200">
                  2
                </span>
              </div>
              <div className="space-y-3 overflow-y-auto pr-1">
                <KanbanCard
                  pokja="KPS"
                  title="File Kepegawaian (Kredensial)"
                  desc="Dalam proses validasi oleh sub komite kredensial."
                  due="Reviewing"
                  status="review"
                />
                <KanbanCard
                  pokja="PPK"
                  title="Panduan Praktik Klinis PD"
                  desc="Diperiksa oleh KMKK dan Tim Medis."
                  due="Reviewing"
                  status="review"
                />
              </div>
            </div>

            {/* Kolom 3 */}
            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 flex flex-col h-max md:h-full">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h4 className="font-black text-sm text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>{" "}
                  Done (Valid)
                </h4>
                <span className="bg-white text-emerald-700 text-xs font-black px-2.5 py-0.5 rounded-md shadow-sm border border-emerald-200">
                  28
                </span>
              </div>
              <div className="space-y-3 overflow-y-auto pr-1 opacity-75 hover:opacity-100 transition-opacity">
                <KanbanCard
                  pokja="MFK"
                  title="Sertifikat Kalibrasi Radiologi"
                  desc="Lengkap dan diverifikasi sistem."
                  due="Done"
                  status="done"
                />
                <KanbanCard
                  pokja="PMKP"
                  title="Laporan Indikator Mutu Q1"
                  desc="Selesai disahkan Direktur Utama."
                  due="Done"
                  status="done"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Audit SPI Sidebar */}
        <div className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm min-h-0 h-full">
          <div className="p-5 border-b border-rose-100 bg-rose-50/50 flex flex-col gap-3 shrink-0 rounded-t-xl">
            <h3 className="font-black text-rose-800 flex items-center gap-2 uppercase tracking-widest text-sm">
              <AlertCircle className="w-5 h-5" /> Active Findings (SPI)
            </h3>
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Temuan..."
                className="w-full pl-9 pr-4 py-2 border border-rose-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {filteredAudits.map((audit, i) => (
              <div
                key={i}
                className="p-5 hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {audit.id}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-black px-2.5 py-1 rounded shadow-sm border ${
                      audit.risk === "Tinggi"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : audit.risk === "Sedang"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    {audit.risk}
                  </span>
                </div>
                <div className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wider">
                  {audit.dept}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed max-w-[95%]">
                  {audit.desc}
                </p>
                <button className="mt-4 text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded border border-indigo-100 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 hover:bg-indigo-600 hover:text-white">
                  Submit CAPA Action <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanCard({
  pokja,
  title,
  desc,
  due,
  status,
}: {
  pokja: string;
  title: string;
  desc: string;
  due: string;
  status?: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab hover:border-indigo-300 hover:shadow-md transition-all active:cursor-grabbing group">
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
            status === "todo"
              ? "bg-slate-100 text-slate-600 border-slate-200"
              : status === "review"
                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          {pokja}
        </span>
      </div>
      <div className="font-bold text-slate-800 text-sm leading-tight mb-2 group-hover:text-indigo-700 transition-colors">
        {title}
      </div>
      <div className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
        {desc}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-100 pt-3 flex items-center gap-1.5">
        <Clock className="w-3 h-3" /> {due}
      </div>
    </div>
  );
}
