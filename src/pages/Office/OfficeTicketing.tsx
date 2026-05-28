import React, { useState } from "react";
import {
  AlertCircle,
  Plus,
  Search,
  CheckCircle,
  Clock,
  UploadCloud,
  RefreshCcw,
  Filter,
  User,
  BarChart,
  Server,
  Wrench,
  QrCode,
  HardDrive,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";
import { getAccessToken } from "./store/auth";

export default function OfficeTicketing() {
  const { userRole } = useOfficeStore();
  const [activeTab, setActiveTab] = useState<"insiden" | "preventive">(
    "insiden",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [kategori, setKategori] = useState("IT (Software/Hardware)");
  const [prioritas, setPrioritas] = useState("Normal");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");

  const isHandler = [
    "adm_it",
    "pelaksana",
    "wadir_admin",
    "kasubag_aset",
  ].includes(userRole);

  const [tickets, setTickets] = useState([
    {
      id: "TKT-2605-01",
      req: "Ns. Siti",
      cat: "IT",
      desc: "Printer di IGD tidak bisa cetak label",
      status: "Pending",
      prio: "Tinggi",
      date: "Hari Ini",
    },
    {
      id: "TKT-2605-02",
      req: "Dr. Ahmad",
      cat: "IPSRS",
      desc: "AC Ruang Poli VIP 3 Bocor",
      status: "In Progress",
      prio: "Normal",
      date: "Kemarin",
    },
    {
      id: "TKT-2605-03",
      req: "Farmasi",
      cat: "IT",
      desc: "Aplikasi SIMRS lambat saat bridging",
      status: "Resolved",
      prio: "Tinggi",
      date: "2 Hari Lalu",
    },
  ]);

  const preventiveData = [
    {
      id: "AST-MED-001",
      name: "MRI Scanner (Philips 1.5T)",
      location: "Instalasi Radiologi",
      lastPM: "10 Feb 2026",
      nextPM: "10 Ags 2026",
      status: "Aman",
      type: "Medis Khusus",
    },
    {
      id: "AST-IT-122",
      name: "Server Database Core",
      location: "Ruang Server Lt. 3",
      lastPM: "02 Mei 2026",
      nextPM: "02 Jun 2026",
      status: "Perlu Cek",
      type: "IT Infrastruktur",
    },
    {
      id: "AST-IPSRS-41",
      name: "Genset Utama 500kVA",
      location: "Gedung Power House",
      lastPM: "15 Jan 2026",
      nextPM: "15 Jul 2026",
      status: "Aman",
      type: "Fasilitas",
    },
  ];

  const handleSimpanKeDrive = async () => {
    if (!deskripsi || !lokasi) return alert("Lengkapi deskripsi dan lokasi!");

    setIsUploading(true);
    try {
      const newTicket = {
        id: `TKT-NEW-${Math.floor(Math.random() * 1000)}`,
        req: "Anda",
        cat: kategori.substring(0, 3).toUpperCase() === "IT " ? "IT" : "IPSRS",
        desc: deskripsi,
        status: "Pending",
        prio: prioritas,
        date: "Baru Saja",
      };

      setTickets([newTicket, ...tickets]);
      setIsModalOpen(false);
      setDeskripsi("");
      setLokasi("");
      alert(`Tiket berhasil dibuat!`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-indigo-600" /> Facility Care & IT
            Service
          </h1>
          <p className="text-slate-500 mt-1">
            Insiden Helpdesk dan Preventive Maintenance (PM) berbasis aset QR
            code.
          </p>
        </div>
        {!isHandler && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" /> Buat Laporan WO
          </button>
        )}
      </div>

      <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm overflow-x-auto w-max">
        <button
          onClick={() => setActiveTab("insiden")}
          className={`px-6 py-2.5 rounded-lg text-sm font-black flex items-center gap-2 transition-all shrink-0 ${activeTab === "insiden" ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}
        >
          <AlertCircle className="w-4 h-4" /> Insiden / Kerusakan Ruangan
        </button>
        <button
          onClick={() => setActiveTab("preventive")}
          className={`px-6 py-2.5 rounded-lg text-sm font-black flex items-center gap-2 transition-all shrink-0 ${activeTab === "preventive" ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}
        >
          <QrCode className="w-4 h-4" /> QR Asset & Preventive Maintenance
        </button>
      </div>

      {activeTab === "insiden" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isHandler && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden group hover:bg-slate-900 transition-colors cursor-pointer">
                <Server className="w-24 h-24 absolute -right-4 -bottom-4 text-slate-700 opacity-40 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 relative z-10">
                  Total WO Aktif
                </div>
                <div className="text-4xl font-black text-white relative z-10">
                  17
                </div>
              </div>
              {[
                {
                  label: "Unassigned",
                  val: "5",
                  color: "text-rose-500",
                  bg: "bg-rose-50",
                },
                {
                  label: "Dalam Pengerjaan",
                  val: "8",
                  color: "text-amber-500",
                  bg: "bg-amber-50",
                },
                {
                  label: "Selesai / Closed",
                  val: "142",
                  color: "text-emerald-500",
                  bg: "bg-emerald-50",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-hidden relative group hover:border-slate-300 transition-colors"
                >
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 ${item.bg} rounded-bl-[100px] -z-0 opacity-50`}
                  ></div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">
                    {item.label}
                  </div>
                  <div
                    className={`text-3xl font-black relative z-10 ${item.color}`}
                  >
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                <button className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-lg shadow-sm shrink-0">
                  Semua Kategori
                </button>
                <button className="px-4 py-2 bg-white text-slate-500 border border-slate-200 hover:text-slate-700 text-xs font-bold rounded-lg focus:outline-none shrink-0 transition-colors">
                  IT Support
                </button>
                <button className="px-4 py-2 bg-white text-slate-500 border border-slate-200 hover:text-slate-700 text-xs font-bold rounded-lg focus:outline-none shrink-0 transition-colors">
                  IPSRS / Gedung
                </button>
              </div>
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Cari keluhan atau ID WO..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs w-16">
                      STS
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                      Detail Work Order
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                      Pelapor
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs hidden md:table-cell">
                      Area / Kategori
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((t, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-5 align-top">
                        <div className="flex justify-center">
                          <div
                            className={`w-3 h-3 rounded-full mt-1.5 ${
                              t.status === "Resolved"
                                ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                                : t.status === "In Progress"
                                  ? "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-pulse"
                                  : "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
                            }`}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-black text-slate-800">
                            {t.id}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded shadow-sm shrink-0 border ${
                              t.prio === "Tinggi"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {t.prio} Priority
                          </span>
                        </div>
                        <div className="text-slate-600 font-medium line-clamp-2 leading-relaxed max-w-md">
                          {t.desc}
                        </div>
                        <div className="text-[11px] font-bold text-slate-400 gap-1.5 mt-3 uppercase tracking-wider">
                          Dilaporkan: {t.date}
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="font-bold text-slate-700 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 uppercase shrink-0">
                            {t.req.charAt(0)}
                          </div>
                          {t.req}
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top hidden md:table-cell">
                        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-black text-slate-600 shadow-sm">
                          {t.cat === "IT" ? (
                            <Server className="w-3.5 h-3.5 text-indigo-500" />
                          ) : (
                            <Wrench className="w-3.5 h-3.5 text-amber-500" />
                          )}{" "}
                          {t.cat}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right align-top">
                        {isHandler ? (
                          <button className="text-slate-600 font-bold text-xs bg-white px-4 py-2 rounded-lg border border-slate-300 shadow-sm hover:!bg-slate-800 hover:text-white hover:border-slate-800 transition-colors focus:ring-4 focus:ring-slate-800/20">
                            Tindak Lanjuti
                          </button>
                        ) : (
                          <button className="text-indigo-600 font-bold text-xs bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 shadow-sm hover:bg-indigo-600 hover:text-white transition-colors focus:ring-4 focus:ring-indigo-600/20">
                            Lacak WO
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "preventive" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-indigo-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg border border-indigo-800">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-800 to-transparent"></div>
            <HardDrive className="w-48 h-48 absolute -right-10 -bottom-10 text-indigo-800 opacity-50" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-black mb-3 flex items-center gap-2">
                <QrCode className="w-6 h-6" /> Asset Lifecycle & Preventive
                Maintenance (PM)
              </h2>
              <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                Pindai QR Core Aset untuk melihat jadwal pemeliharaan
                (kalibrasi/servis), histori log WO, dan siklus downtime.
                Prioritaskan alat medis kritikal untuk menjaga standar
                akreditasi.
              </p>
              <button className="bg-white text-indigo-900 font-black px-6 py-3 rounded-lg shadow-xl hover:bg-indigo-50 transition-transform active:scale-95 flex items-center gap-2 focus:ring-4 focus:ring-white/20">
                <QrCode className="w-5 h-5" /> Launch QR Scanner Camera
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preventiveData.map((ast, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {ast.status === "Perlu Cek" && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-[100px] z-0"></div>
                )}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 ring-1 ring-indigo-200 px-2 py-0.5 rounded tracking-widest">
                    {ast.id}
                  </span>
                  {ast.status === "Perlu Cek" ? (
                    <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 ring-1 ring-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> PM Due
                    </span>
                  ) : (
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1 relative z-10">
                  {ast.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-6 truncate">
                  {ast.location} &bull; {ast.type}
                </p>

                <div className="space-y-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500">Last PM</span>
                    <span className="font-bold text-slate-800">
                      {ast.lastPM}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500">
                      Next Scheduled PM
                    </span>
                    <span
                      className={`font-black ${ast.status === "Perlu Cek" ? "text-amber-600" : "text-indigo-600"}`}
                    >
                      {ast.nextPM}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
                    Histori WO
                  </button>
                  <button className="py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-100 shadow-sm transition-colors">
                    Isi Checklist PM
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-indigo-600" /> Form Work
                Order (WO)
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-slate-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Kategori Layanan
                  </label>
                  <div className="relative">
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none shadow-sm"
                    >
                      <option>IT (Software/Hardware)</option>
                      <option>IPSRS (Gedung, Air, Listrik, AC)</option>
                      <option>Alat Medis / Elektromedik</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Tingkat Prioritas
                  </label>
                  <div className="relative">
                    <select
                      value={prioritas}
                      onChange={(e) => setPrioritas(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none shadow-sm"
                    >
                      <option>Normal</option>
                      <option>Tinggi (Cito / Gangguan Layanan Pasien)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                  Lokasi Detail Ruangan
                </label>
                <input
                  type="text"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  placeholder="Cth: IGD Bedah / Farmasi Rawat Jalan Lt. 1"
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                  Deskripsi Kerusakan / Masalah
                </label>
                <textarea
                  rows={4}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm bg-white resize-none"
                  placeholder="Jelaskan masalah secara mendetail, apa yang terjadi dan sejak kapan..."
                ></textarea>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 border-dashed hover:border-indigo-300 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-700">
                    Pilih file foto bukti (Opsional)
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">
                    PNG, JPG up to 5MB
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg mt-2 cursor-pointer border border-indigo-100"
                >
                  Browse Files
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-slate-200 bg-white text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 shadow-sm transition-colors"
              >
                Batalkan
              </button>
              <button
                onClick={handleSimpanKeDrive}
                disabled={isUploading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 min-w-[160px]"
              >
                {isUploading ? (
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                ) : (
                  <UploadCloud className="w-5 h-5" />
                )}
                Kirim WO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
