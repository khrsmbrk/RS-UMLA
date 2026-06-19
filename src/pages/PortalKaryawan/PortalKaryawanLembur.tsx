import React, { useState } from "react";
import {
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import { useHRStore } from "../../store/hrStore";

export default function PortalKaryawanLembur() {
  const [showForm, setShowForm] = useState(false);
  const { overtimes, addOvertime } = useHRStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const hours = Number(formData.get("hours"));
    const reason = formData.get("reason") as string;

    const newOvt = {
      id: `OVT-NEW-${Date.now()}`,
      date,
      hours,
      reason,
      status: "Menunggu",
      approvedBy: null,
    };

    addOvertime(newOvt);
    setShowForm(false);
    toast.success(
      "Pengajuan lembur berhasil dikirim dan menunggu persetujuan.",
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Manajemen Lembur
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Ajukan dan pantau status kerja lembur Anda
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl shadow-sm font-bold text-sm transition-colors flex items-center gap-2 justify-center w-full md:w-auto"
        >
          {showForm ? (
            <XCircle className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          {showForm ? "Batal" : "Ajukan Lembur Baru"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Form Pengajuan Lembur
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Tanggal Lembur
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Durasi (Jam)
                </label>
                <input
                  type="number"
                  name="hours"
                  min="1"
                  max="12"
                  required
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Misal: 3"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Alasan Lembur / Pekerjaan yang Dilakukan
              </label>
              <textarea
                name="reason"
                rows={3}
                required
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jelaskan secara singkat..."
              ></textarea>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors"
              >
                Kirim Pengajuan
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Riwayat Lembur</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Cari data..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <button className="p-2 border border-slate-300 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  ID Pengajuan
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  Tanggal
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  Durasi
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest min-w-[200px]">
                  Alasan Lembur
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  Status
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overtimes.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-4 text-sm font-medium text-slate-700 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="p-4 text-sm text-slate-600 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-bold">
                    {item.hours} Jam
                  </td>
                  <td className="p-4 text-sm text-slate-600 max-w-xs truncate">
                    {item.reason}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {item.status === "Disetujui" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" /> Disetujui
                      </span>
                    ) : item.status === "Ditolak" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-700">
                        <XCircle className="w-3 h-3" /> Ditolak
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700">
                        <Clock className="w-3 h-3" /> Menunggu
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => toast("Menampilkan detail lembur.")}
                      className="text-blue-600 hover:text-blue-800 text-sm font-bold"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {overtimes.length === 0 && (
            <div className="p-10 text-center text-slate-500">
              <Clock className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <p className="font-medium">Belum ada riwayat pengajuan lembur.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
