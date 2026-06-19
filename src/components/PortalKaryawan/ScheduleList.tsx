import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const ScheduleList = ({ shifts }: { shifts: any[] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black text-slate-800">Jadwal Shift</h3>
        <button
          onClick={() => toast("Menampilkan semua jadwal shift... (Simulasi)")}
          className="text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-widest transition-colors flex items-center gap-1"
        >
          Lihat Semua <Calendar className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-4">
        {shifts.length === 0 ? (
          <p className="text-sm border border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-center py-6 font-medium">
            Tidak ada jadwal shift dalam waktu dekat.
          </p>
        ) : (
          shifts.map((shift) => {
            const isToday =
              shift.date === new Date().toISOString().split("T")[0];

            return (
              <div
                key={shift.id}
                className={`p-4 rounded-xl border relative overflow-hidden transition-colors ${isToday ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:border-emerald-200"}`}
              >
                {isToday && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100/50 rounded-bl-full -z-0"></div>
                )}
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div className="flex items-center">
                    <span
                      className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md mb-2 ${isToday ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600"}`}
                    >
                      {isToday ? "Hari Ini" : shift.date}
                    </span>
                  </div>
                </div>

                <h4
                  className={`text-base font-black tracking-tight mb-2 relative z-10 ${isToday ? "text-blue-900" : "text-slate-800"}`}
                >
                  {shift.roleDescription}
                </h4>

                <div
                  className={`flex flex-wrap gap-y-2 gap-x-4 text-[11px] font-bold relative z-10 ${isToday ? "text-blue-700" : "text-slate-500"}`}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock
                      className={`w-3.5 h-3.5 ${isToday ? "text-blue-500" : "text-slate-400"}`}
                    />
                    <span className="font-mono">
                      {shift.startTime} - {shift.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin
                      className={`w-3.5 h-3.5 ${isToday ? "text-blue-500" : "text-slate-400"}`}
                    />
                    <span>{shift.unit}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
