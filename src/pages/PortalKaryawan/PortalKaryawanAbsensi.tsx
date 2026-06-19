import { useOutletContext } from '../../utils/OutletContext';
import React, { useState } from "react";

import {
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CalendarDays,
  Search,
  BarChart3,
  Filter,
} from "lucide-react";
import { ATTENDANCES } from "../../data/portalData";
import toast from "react-hot-toast";

export default function PortalKaryawanAbsensi() {
  const { user } = useOutletContext<{ user: any }>();
  const userAttendances = ATTENDANCES.filter((a) => a.employeeId === user.id);
  const [filterMonth, setFilterMonth] = useState("05-2026");

  // Mock summary
  const summary = {
    hadir: 20,
    telat: 2,
    izin: 1,
    alpha: 0,
    totalJam: "168j 45m",
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            Digital Attendance
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-lg">
            Monitor log kehadiran, jam kerja, dan lokasi absen secara real-time.
            Disiplin waktu mencerminkan profesionalisme Anda.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold transition-colors">
            <CalendarDays className="w-4 h-4" /> Mei 2026
          </button>
          <button
            onClick={() =>
              toast.success(
                "Berhasil merekam kehadiran (Clock In)! Lokasi GPS terekam.",
              )
            }
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl shadow-sm shadow-blue-200 font-bold transition-all hover:-translate-y-0.5"
          >
            Clock In Sekarang
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Total Hadir
          </p>
          <p className="text-3xl font-black text-emerald-600">
            {summary.hadir}
          </p>
          <p className="text-xs text-slate-400 mt-1">Hari</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Terlambat
          </p>
          <p className="text-3xl font-black text-amber-500">{summary.telat}</p>
          <p className="text-xs text-slate-400 mt-1">Hari</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Izin / Cuti
          </p>
          <p className="text-3xl font-black text-blue-500">{summary.izin}</p>
          <p className="text-xs text-slate-400 mt-1">Hari</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Alpha
          </p>
          <p className="text-3xl font-black text-red-500">{summary.alpha}</p>
          <p className="text-xs text-slate-400 mt-1">Hari</p>
        </div>
        <div className="bg-slate-800 text-white border border-slate-700 p-5 rounded-2xl shadow-sm text-center flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Total Jam Kerja
          </p>
          <p className="text-2xl font-black text-white">{summary.totalJam}</p>
          <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-400 mt-1 font-bold">
            <BarChart3 className="w-3 h-3" /> +12% vs Bulan Lalu
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">
            Riwayat Kehadiran Bulan Ini
          </h2>
          <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari tanggal..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 bg-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] w-48">
                  Tanggal
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                  Jadwal Shift
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                  In / Out
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                  Durasi
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">
                  Lokasi GPS
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {userAttendances.length > 0
                ? userAttendances.map((att, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">
                          {new Date(att.date).toLocaleDateString("id-ID", {
                            weekday: "long",
                          })}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(att.date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex py-1 px-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold leading-none">
                          07:00 - 14:00
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              In
                            </span>
                            <span className="font-mono font-medium text-slate-700">
                              {att.checkInTime}
                            </span>
                          </div>
                          <div className="w-px h-6 bg-slate-200"></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Out
                            </span>
                            <span className="font-mono font-medium text-slate-700">
                              {att.checkOutTime || "--:--"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium font-mono text-xs">
                        {att.checkOutTime ? "7j 15m" : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="truncate max-w-[120px]">
                            RS UMLA lt. 2
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {att.status === "Hadir" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700">
                            <CheckCircle className="w-3 h-3" /> Tepat Waktu
                          </span>
                        )}
                        {att.status === "Terlambat" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-amber-200 bg-amber-50 text-amber-700">
                            <AlertTriangle className="w-3 h-3" /> Terlambat
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                : null}
              {/* Dummy row for demonstration */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">Senin</div>
                  <div className="text-xs text-slate-500">24 Mei 2026</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex py-1 px-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold leading-none">
                    07:00 - 14:00
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        In
                      </span>
                      <span className="font-mono font-medium text-rose-600">
                        07:15
                      </span>
                    </div>
                    <div className="w-px h-6 bg-slate-200"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Out
                      </span>
                      <span className="font-mono font-medium text-slate-700">
                        14:10
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium font-mono text-xs">
                  6j 55m
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="truncate max-w-[120px]">
                      RS UMLA lt. 1
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-amber-200 bg-amber-50 text-amber-700">
                    <AlertTriangle className="w-3 h-3" /> Telat 15m
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">Selasa</div>
                  <div className="text-xs text-slate-500">25 Mei 2026</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex py-1 px-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold leading-none">
                    14:00 - 21:00
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        In
                      </span>
                      <span className="font-mono font-medium text-slate-700">
                        13:50
                      </span>
                    </div>
                    <div className="w-px h-6 bg-slate-200"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Out
                      </span>
                      <span className="font-mono font-medium text-slate-700">
                        21:05
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium font-mono text-xs">
                  7j 15m
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="truncate max-w-[120px]">RS UMLA IGD</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700">
                    <CheckCircle className="w-3 h-3" /> Tepat Waktu
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
