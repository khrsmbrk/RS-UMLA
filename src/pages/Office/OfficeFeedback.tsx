import React, { useState } from "react";
import {
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Flag,
  ArrowRight,
  Activity,
  MessageSquare,
  TrendingDown,
  Search
} from "lucide-react";

export default function OfficeFeedback() {
  const [searchTerm, setSearchTerm] = useState("");

  const feedbacks = [
    {
      id: "FB-012",
      type: "Komplain",
      title: "Antrean Farmasi Rawat Jalan Terlalu Lama",
      desc: "Saya menunggu obat racikan sampai 2 jam lebih di farmasi.",
      SLA: "1 Jam Tersisa",
      risk: "Tinggi",
      status: "Open",
      unit: "Instalasi Farmasi",
    },
    {
      id: "FB-011",
      type: "Saran",
      title: "Penambahan Kursi Roda",
      desc: "Di lobi depan sering kehabisan kursi roda pagi hari.",
      SLA: "-",
      risk: "Rendah",
      status: "Dalam Kajian",
      unit: "Fasilitas & Aset",
    },
    {
      id: "FB-010",
      type: "Apresiasi",
      title: "Pelayanan Perawat IGD Ramah",
      desc: "Terima kasih atas pelayanan Ns. Ayu di IGD yang sangat cepat.",
      SLA: "-",
      risk: "Rendah",
      status: "Selesai",
      unit: "Instalasi Gawat Darurat",
    },
  ];

  const filtered = feedbacks.filter(fb => fb.title.toLowerCase().includes(searchTerm.toLowerCase()) || fb.unit.toLowerCase().includes(searchTerm.toLowerCase()) || fb.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-rose-600" /> Patient Feedback
            & Penanganan
          </h1>
          <p className="text-slate-500 mt-1">
            Pusat penerimaan komplain, saran, dan eskalasi penanganan (VOC)
            berbasis SLA.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto">
          <Activity className="w-5 h-5" /> Export Laporan VOC
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Tiket Open",
            val: "5",
            trend: "Naik 2 Tiket",
            icon: AlertTriangle,
            color: "text-rose-600",
            bg: "bg-rose-50",
          },
          {
            label: "Mendekati Batas SLA",
            val: "2",
            trend: "Perlu Aksi",
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Eskalasi ke Direksi",
            val: "1",
            trend: "Sedang Berjalan",
            icon: Flag,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Selesai (Bulan Ini)",
            val: "142",
            trend: "+15 Kasus",
            icon: CheckCircle,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-colors"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${card.bg} rounded-bl-[100px] z-0 opacity-50`}
            ></div>
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {card.label}
              </div>
              <div
                className={`p-2 rounded-lg bg-white shadow-sm border border-slate-100 ${card.bg}`}
              >
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-3xl font-black text-slate-800 tracking-tight">
                {card.val}
              </div>
              <div className="text-slate-500 text-xs font-bold flex items-center gap-1 mt-1 uppercase tracking-wider">
                {card.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 border border-rose-200 rounded-xl flex justify-between items-center shadow-[0_4px_15px_-4px_rgba(244,63,94,0.1)] cursor-pointer">
            <span className="font-bold text-rose-700 text-sm flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Inbox Utama
            </span>
            <span className="bg-rose-100 text-rose-700 text-xs font-black px-2.5 py-0.5 rounded-md border border-rose-200 shadow-sm">
              5
            </span>
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:bg-slate-50 hover:border-slate-300 shadow-sm cursor-pointer transition-all">
            <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
              <Flag className="w-5 h-5 text-indigo-500" /> Tickets Escalated
            </span>
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:bg-slate-50 hover:border-slate-300 shadow-sm cursor-pointer transition-all">
            <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" /> Review Saran
              Poliklinik
            </span>
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:bg-slate-50 hover:border-slate-300 shadow-sm cursor-pointer transition-all">
            <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> Arsip Selesai
              (Resolved)
            </span>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
              Daftar Feedback & Antrean Aksi
            </h3>
            <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Tiket / Unit / Judul..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filtered.map((fb, i) => (
              <div
                key={i}
                className="p-5 hover:bg-slate-50 transition-colors flex items-start gap-5 group cursor-pointer"
              >
                <div
                  className={`p-3 rounded-xl border shrink-0 ${
                    fb.type === "Komplain"
                      ? "bg-rose-50 text-rose-700 border-rose-200 shadow-sm"
                      : fb.type === "Apresiasi"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"
                        : "bg-amber-50 text-amber-700 border-amber-200 shadow-sm"
                  }`}
                >
                  {fb.type === "Komplain" ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : fb.type === "Apresiasi" ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <MessageCircle className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div className="font-bold text-slate-800 text-lg group-hover:text-rose-700 transition-colors">
                      {fb.title}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md tracking-widest uppercase shrink-0">
                      {fb.id}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {fb.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                    <span className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md border border-slate-200">
                      REF: {fb.unit}
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-md border shadow-sm flex items-center gap-1.5 ${fb.SLA !== "-" ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse" : "bg-slate-50 text-slate-400 border-slate-200"}`}
                    >
                      <Clock className="w-3.5 h-3.5" /> SLA: {fb.SLA}
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-md border shadow-sm ${fb.risk === "Tinggi" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}
                    >
                      RISK: {fb.risk}
                    </span>
                  </div>
                </div>
                <button className="h-full px-4 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-center border border-transparent hover:border-indigo-100 shrink-0 self-center">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
             {filtered.length === 0 && (
                <div className="p-12 text-center text-slate-500 italic">Tidak ada feedback ditemukan.</div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
