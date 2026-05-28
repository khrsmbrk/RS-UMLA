import React from "react";
import { useOutletContext } from "react-router-dom";
import { Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import { ATTENDANCES } from "../../data/portalData";

export default function PortalKaryawanAbsensi() {
  const { user } = useOutletContext<{ user: any }>();
  const userAttendances = ATTENDANCES.filter((a) => a.employeeId === user.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" /> Histori Absensi
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Log kehadiran, clock-in, dan clock-out harian.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-colors">
          Catat Kehadiran (GPS)
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Tanggal
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Clock In
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Clock Out
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Lokasi GPS
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {userAttendances.length > 0 ? (
              userAttendances.map((att, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-5 py-5 font-bold text-slate-800">
                    {new Date(att.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-5 text-slate-600 font-medium">
                    {att.checkInTime}
                  </td>
                  <td className="px-5 py-5 text-slate-600 font-medium">
                    {att.checkOutTime || "-"}
                  </td>
                  <td className="px-5 py-5 text-slate-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-500" />{" "}
                    Terverifikasi
                  </td>
                  <td className="px-5 py-5 text-right">
                    <span className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  Belum ada riwayat absensi bulan ini.
                </td>
              </tr>
            )}
            <tr className="hover:bg-slate-50">
              <td className="px-5 py-5 font-bold text-slate-800">
                Senin, 24 Mei 2026
              </td>
              <td className="px-5 py-5 text-slate-600 font-medium">06:45</td>
              <td className="px-5 py-5 text-slate-600 font-medium">14:10</td>
              <td className="px-5 py-5 text-slate-500 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-500" /> Terverifikasi
              </td>
              <td className="px-5 py-5 text-right">
                <span className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                  Hadir
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
