import React, { useState } from "react";
import { Calendar, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { useOfficeStore } from "./store/officeStore";
import toast from "react-hot-toast";

export default function OfficeShift() {
  const { shifts, addShift } = useOfficeStore();
  const [formData, setFormData] = useState({
    date: "",
    toShift: "Shift Pagi (07:00 - 14:00)",
    partner: "Ns. Dewi Sartika, S.Kep",
    reason: ""
  });

  const handleSubmit = () => {
    if(!formData.date || !formData.reason) return toast.error("Lengkapi semua field ajuan!");
    addShift({
      id: `SHF-${Date.now()}`,
      employee: "Anda",
      unit: "IGD",
      date: formData.date,
      shiftStr: formData.toShift,
      status: "Menunggu"
    });
    toast.success("Pengajuan Tukar Shift berhasil dikirim!");
  };
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" /> Penjadwalan & Tukar
            Shift
          </h1>
          <p className="text-slate-500 mt-1">
            Melihat roster matrix jadwal dinas bulanan dan pengajuan rotasi
            mandiri antar perawat/medis.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Roster Jadwal Anda (Mei 2026)
          </h3>
          <div className="flex flex-wrap gap-2 text-[10px] uppercase font-black tracking-widest">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 flex items-center gap-2 rounded-md border border-blue-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>Pagi
            </span>
            <span className="px-3 py-1.5 bg-amber-50 text-amber-700 flex items-center gap-2 rounded-md border border-amber-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>Sore
            </span>
            <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 flex items-center gap-2 rounded-md border border-indigo-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>Malam
            </span>
            <span className="px-3 py-1.5 bg-rose-50 text-rose-700 flex items-center gap-2 rounded-md border border-rose-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div>Libur
            </span>
          </div>
        </div>
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-7 gap-3 mb-3">
              {[
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu",
                "Minggu",
              ].map((d) => (
                <div
                  key={d}
                  className="text-center font-black uppercase tracking-widest text-slate-400 text-[10px]"
                >
                  {d}
                </div>
              ))}

              {/* Dummy Calendar Grid for illustration */}
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const type = [7, 14, 21, 28].includes(day)
                  ? "Libur"
                  : day % 3 === 0
                    ? "Sore"
                    : day % 4 === 0
                      ? "Malam"
                      : "Pagi";

                const colorClass =
                  type === "Libur"
                    ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                    : type === "Pagi"
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      : type === "Sore"
                        ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";

                const initial =
                  type === "Libur"
                    ? "LBR"
                    : type === "Pagi"
                      ? "PAGI"
                      : type === "Sore"
                        ? "SORE"
                        : "MLM";

                return (
                  <div
                    key={i}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center min-h-[90px] transition-colors cursor-default shadow-sm ${colorClass}`}
                  >
                    <div className="text-xs font-black opacity-60 w-full text-left font-mono">
                      {day}
                    </div>
                    <div className="font-black text-sm mt-auto w-full text-center tracking-widest">
                      {initial}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2 uppercase tracking-widest">
            <RotateCcw className="w-5 h-5 text-indigo-600" /> Pengajuan Tukar
            Shift
          </h3>
          <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
            Pengajuan hanya bisa dilakukan minimal H-1 sebelum jadwal dinas.
            Membutuhkan izin Kepala Ruangan.
          </p>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">
                  Jadwal Asal
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">
                  Tukar Shift Menjadi
                </label>
                <select 
                  value={formData.toShift}
                  onChange={(e) => setFormData({ ...formData, toShift: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                >
                  <option>Shift Pagi (07:00 - 14:00)</option>
                  <option>Shift Sore (14:00 - 21:00)</option>
                  <option>Shift Malam (21:00 - 07:00)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">
                Rekan Pengganti (Wajib)
              </label>
              <select 
                value={formData.partner}
                onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-3 text-sm font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              >
                <option>Ns. Dewi Sartika, S.Kep</option>
                <option>Ns. Ahmad Fauzi, S.Kep</option>
                <option>Ns. Nurul Hidayah, AMd.Kep</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">
                Alasan Pertukaran
              </label>
              <textarea
                rows={2}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-3 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm placeholder-slate-400"
                placeholder="Jelaskan alasan pertukaran shift..."
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-transform active:scale-95 border border-indigo-700/20 flex items-center justify-center gap-2"
            >
              Kirim Pengajuan Tukar
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">
              Riwayat Status Tukar Shift
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-2">
              Daftar permohonan pertukaran dinas yang Anda ajukan.
            </p>
          </div>

          <div className="p-6 space-y-4 flex-1">
            {shifts.map((s: any) => (
              <div key={s.id} className="p-4 border justify-between flex-col sm:flex-row border-slate-200 rounded-xl flex sm:items-center gap-4 hover:border-amber-200 hover:shadow-sm transition-all group">
                <div className="flex-1">
                  <div className="font-bold text-slate-800 text-base mb-1">
                    Tukar ke {s.shiftStr}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Pengganti: {s.partner || s.employee}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 inline-block px-2 py-0.5 rounded border border-slate-200">
                    {s.date}
                  </div>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border shadow-sm rounded-md block mb-1.5 text-center ${s.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {s.status}
                  </span>
                  {s.status !== "Completed" && (
                     <span className="text-[10px] font-bold text-amber-600 block text-center">
                       Menunggu Acc
                     </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
