import React from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, UserCircle, Users } from "lucide-react";
import { SHIFTS } from "../../data/portalData";
import toast from "react-hot-toast";

export default function PortalKaryawanJadwal() {
  const { user } = useOutletContext<{ user: any }>();
  // We'll generate some dummy shifts to show alongside the logged in user
  const userShifts = SHIFTS.filter((s) => s.employeeId === user.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" /> Jadwal Dinas /
            Shift
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Jadwal mingguan Anda di unit {user?.unit}.
          </p>
        </div>
        <button
          onClick={() =>
            toast(
              "Fitur Tukar Shift dapat diakses melalui portal Office. Mengarahkan ke sana...",
            )
          }
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-colors flex items-center gap-2"
        >
          <Users className="w-4 h-4" /> Tukar Shift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(7)].map((_, i) => {
          const date = new Date(2026, 4, 24 + i); // start from Mon 24 May 2026
          const isToday = i === 1; // simulation today is 25th
          return (
            <div
              key={i}
              className={`rounded-xl border shadow-sm p-4 ${isToday ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500 ring-opacity-20" : "bg-white border-slate-200"}`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                {date.toLocaleDateString("id-ID", { weekday: "long" })}
              </div>
              <div
                className={`text-xl font-black ${isToday ? "text-indigo-900" : "text-slate-800"}`}
              >
                {date.getDate()} Mei
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100/50">
                {i === 6 ? (
                  <div className="text-sm font-bold text-rose-500 bg-rose-50 px-3 py-2 rounded-lg text-center">
                    LIBUR
                  </div>
                ) : (
                  <div
                    className={`p-3 rounded-lg ${i % 2 === 0 ? "bg-sky-50 border border-sky-100 text-sky-800" : "bg-amber-50 border border-amber-100 text-amber-800"}`}
                  >
                    <div className="text-xs font-black uppercase tracking-widest opacity-80">
                      {i % 2 === 0 ? "SHIFT PAGI" : "SHIFT SORE"}
                    </div>
                    <div className="font-bold mt-1 text-sm">
                      {i % 2 === 0 ? "07:00 - 14:00" : "14:00 - 21:00"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
