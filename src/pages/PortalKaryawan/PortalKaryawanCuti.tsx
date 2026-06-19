import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Briefcase,
  CalendarPlus,
  CheckCircle,
  Clock,
  CalendarDays,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";

import { useOfficeStore } from "../Office/store/officeStore";

export default function PortalKaryawanCuti() {
  const { user } = useOutletContext<{ user: any }>();
  const [showForm, setShowForm] = useState(false);
  const [remainingLeave, setRemainingLeave] = useState(8);
  const addLeaveRequest = useOfficeStore(state => state.addLeaveRequest);
  const leaveRequests = useOfficeStore(state => state.leaveRequests);

  // For the current user
  const history = leaveRequests.filter(r => r.userId === user?.id || !user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const reason = formData.get("reason") as string;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (type === "Cuti Tahunan" && diffDays > remainingLeave) {
      toast.error("Kuot cuti tahunan tidak mencukupi!");
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      userId: user?.id || "KARYAWAN-001",
      userName: user?.name || "Karyawan",
      submittedDate: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      type,
      duration: `${start.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} - ${end.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`,
      days: diffDays,
      reason,
      status: "Menunggu",
    };

    addLeaveRequest(newRequest);
    setShowForm(false);

    if (type === "Cuti Tahunan") {
      setRemainingLeave(remainingLeave - diffDays);
    }

    toast.success(
      "Pengajuan Izin/Cuti berhasil dikirim dan menunggu persetujuan.",
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 p-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            Cuti & Izin
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-lg">
            Pantau sisa kuota cuti tahunan, riwayat pengajuan izin, dan ajukan
            cuti baru secara digital.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl shadow-sm shadow-emerald-200 font-bold text-sm transition-all flex items-center gap-2"
        >
          {showForm ? (
            <XCircle className="w-5 h-5" />
          ) : (
            <CalendarPlus className="w-5 h-5" />
          )}
          {showForm ? "Batal" : "Ajukan Cuti"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Formulir Pengajuan Cuti / Izin
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Jenis Pengajuan
                </label>
                <select
                  name="type"
                  required
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Cuti Tahunan">Cuti Tahunan</option>
                  <option value="Izin Sakit">Izin Sakit</option>
                  <option value="Izin Pribadi">Izin Pribadi (Lainnya)</option>
                </select>
              </div>
              <div></div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  name="endDate"
                  required
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Keterangan / Alasan
              </label>
              <textarea
                name="reason"
                rows={3}
                required
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                placeholder="Berikan alasan yang jelas..."
              ></textarea>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-700 shadow-sm"
              >
                Kirim Draft Pengajuan
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-600 border border-emerald-500 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <CalendarDays className="w-16 h-16 text-white" />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-2 relative z-10">
            Sisa Cuti Tahunan
          </div>
          <div className="text-5xl font-black text-white relative z-10">
            {remainingLeave}{" "}
            <span className="text-lg font-bold text-emerald-200 font-sans">
              Hari
            </span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-center">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            Cuti Terpakai
          </div>
          <div className="text-4xl font-black text-slate-800">
            {12 - remainingLeave}{" "}
            <span className="text-base font-bold text-slate-400 font-sans">
              Hari
            </span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-center">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            Izin Sakit Terpakai
          </div>
          <div className="text-4xl font-black text-rose-500">
            2{" "}
            <span className="text-base font-bold text-slate-400 font-sans">
              Hari
            </span>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-center text-white">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Status Terkini
          </div>
          <div className="mt-2 flex justify-center">
            <span className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm">
              <CheckCircle className="w-4 h-4" /> Aktif
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Riwayat Pengajuan</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari cuti..."
                className="w-48 pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] w-48">
                  Tanggal Pengajuan
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                  Jenis
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                  Durasi Cuti
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                  Keterangan
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-slate-600">
                    <div className="font-medium">{row.submittedDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-800 w-max inline-block px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200 text-xs">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700">
                      {row.duration}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {row.days} Hari
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <p className="truncate max-w-xs">{row.reason}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {row.status === "Disetujui" ? (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm flex items-center gap-1.5 justify-end w-max ml-auto">
                        <CheckCircle className="w-3.5 h-3.5" /> {row.status}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-amber-200 bg-amber-50 text-amber-700 shadow-sm flex items-center gap-1.5 justify-end w-max ml-auto">
                        <Clock className="w-3.5 h-3.5" /> {row.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {history.length === 0 && (
            <div className="p-10 text-center text-slate-500 font-medium">
              Belum ada riwayat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
