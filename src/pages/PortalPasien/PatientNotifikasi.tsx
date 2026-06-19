import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function PatientNotifikasi() {
  const [notifState, setNotifState] = useState({
    jadwal: true,
    obat: false,
    antrean: true,
  });

  const toggle = (key: keyof typeof notifState) => {
    setNotifState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
          <Bell className="w-6 h-6 mr-3 text-green-600" />
          Pengaturan Notifikasi
        </h2>
        <p className="text-slate-500 mb-6">
          Atur pengingat otomatis untuk jadwal RS, minum obat, dan antrean.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl relative overflow-hidden">
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${notifState.jadwal ? "bg-green-500" : "bg-slate-300"}`}
            ></div>
            <div>
              <strong className="block text-slate-800">
                Notifikasi Jadwal Berobat (H-1)
              </strong>
              <span className="text-xs text-slate-500">
                Menerima WhatsApp/Email H-1 sebelum jadwal kunjungan.
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle w-12 h-6 bg-slate-300 rounded-full appearance-none checked:bg-green-500 relative cursor-pointer outline-none border-0 transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all checked:after:left-7"
              checked={notifState.jadwal}
              onChange={() => toggle("jadwal")}
            />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl relative overflow-hidden">
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${notifState.obat ? "bg-green-500" : "bg-slate-300"}`}
            ></div>
            <div>
              <strong className="block text-slate-800">
                Pengingat Minum Obat
              </strong>
              <span className="text-xs text-slate-500">
                Dapatkan notifikasi harian untuk minum obat resep Anda.
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle w-12 h-6 bg-slate-300 rounded-full appearance-none checked:bg-green-500 relative cursor-pointer outline-none border-0 transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all checked:after:left-7"
              checked={notifState.obat}
              onChange={() => toggle("obat")}
            />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl relative overflow-hidden">
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${notifState.antrean ? "bg-green-500" : "bg-slate-300"}`}
            ></div>
            <div>
              <strong className="block text-slate-800">
                Notifikasi Antrean Panggilan
              </strong>
              <span className="text-xs text-slate-500">
                Kirim notifikasi saat antrean poli tinggal 3 orang terakhir.
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle w-12 h-6 bg-slate-300 rounded-full appearance-none checked:bg-green-500 relative cursor-pointer outline-none border-0 transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all checked:after:left-7"
              checked={notifState.antrean}
              onChange={() => toggle("antrean")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
