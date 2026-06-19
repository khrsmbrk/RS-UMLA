import React, { useState, useEffect } from "react";
import { WifiOff, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

const AttendanceModule = ({
  attendances,
  employeeId,
}: {
  attendances: any[];
  employeeId: string;
}) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [localQueue, setLocalQueue] = useState<any[]>([]);
  const [history, setHistory] = useState(
    attendances.filter((a) => a.employeeId === employeeId),
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Sync local queue
      if (localQueue.length > 0) {
        setHistory((prev) => [
          ...localQueue.map((q) => ({ ...q, isSynced: true })),
          ...prev,
        ]);
        setLocalQueue([]);
        toast.success("Data absensi offline berhasil disinkronisasi!");
      }
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [localQueue]);

  const handleCheckIn = () => {
    const now = new Date();
    const newRecord = {
      id: `ATT-NEW-${Date.now()}`,
      employeeId,
      date: now.toISOString().split("T")[0],
      checkInTime: now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Hadir",
      isSynced: !isOffline,
    };

    if (isOffline) {
      setLocalQueue((prev) => [newRecord, ...prev]);
    } else {
      setHistory((prev) => [newRecord, ...prev]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0"></div>
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-lg font-black text-slate-800">Kehadiran Harian</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`text-[10px] px-3 py-1.5 rounded-md font-bold uppercase tracking-widest border transition-colors shadow-sm ${
              isOffline
                ? "bg-amber-50 text-amber-600 border-amber-200"
                : "bg-emerald-50 text-emerald-600 border-emerald-200"
            }`}
          >
            {isOffline ? "Offline Mode" : "Online Mode"}
          </button>
        </div>
      </div>

      {isOffline && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start relative z-10 animate-pulse">
          <WifiOff className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-amber-800 leading-relaxed">
            Koneksi terputus. Absensi tetap dapat dilakukan (Offline Mode) dan
            akan disinkronkan otomatis saat online.
          </p>
        </div>
      )}

      <div className="flex justify-center mb-8 relative z-10">
        <button
          onClick={handleCheckIn}
          className="w-48 h-48 rounded-full bg-blue-600 border-[8px] border-blue-50 hover:border-blue-100 hover:bg-blue-700 text-white shadow-[0_0_40px_rgba(37,99,235,0.2)] hover:shadow-[0_0_60px_rgba(37,99,235,0.3)] transition-all flex flex-col items-center justify-center active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <span className="text-4xl font-black font-mono tracking-tight mb-1 relative z-10">
            {new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest relative z-10">
            Tekan untuk Presensi
          </span>
        </button>
      </div>

      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 relative z-10">
        Aktivitas Terakhir
      </h4>
      <div className="space-y-3 relative z-10">
        {localQueue.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl border-dashed"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mr-3 border border-amber-200">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {record.date}
                </p>
                <p className="text-xs font-medium text-slate-500 font-mono mt-0.5">
                  Check-In: {record.checkInTime}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-black tracking-widest uppercase rounded-md shadow-sm">
              Pending
            </span>
          </div>
        ))}

        {history.slice(0, 3).map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-4 bg-white border border-slate-100 hover:border-emerald-200 transition-colors rounded-xl shadow-sm"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mr-3 border border-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {record.date}
                </p>
                <p className="text-xs font-medium text-slate-500 font-mono mt-0.5">
                  Check-In: {record.checkInTime}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-md border border-emerald-100 shadow-sm">
              {record.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceModule;
