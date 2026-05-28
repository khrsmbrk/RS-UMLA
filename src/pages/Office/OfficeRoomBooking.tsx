import React from "react";
import {
  DoorOpen,
  Calendar,
  Clock,
  Users,
  Coffee,
  Plus,
  CheckCircle,
} from "lucide-react";

export default function OfficeRoomBooking() {
  const rooms = [
    {
      name: "Aula Serbaguna Lt. 4",
      capacity: 100,
      features: ["Proyektor", "Sound System", "AC Sentral"],
    },
    {
      name: "Ruang Rapat Direksi Lt. 2",
      capacity: 15,
      features: ['Smart TV 65"', "Videoconf Eq.", "Kopi/Teh"],
    },
    {
      name: "Ruang Rapat Komite Lt. 3",
      capacity: 25,
      features: ["Proyektor", "Whiteboard"],
    },
  ];

  const bookings = [
    {
      room: "Ruang Rapat Direksi Lt. 2",
      title: "Rapat Evaluasi Keuangan Bulanan",
      time: "09:00 - 11:00",
      host: "Bagian Keuangan",
    },
    {
      room: "Aula Serbaguna Lt. 4",
      title: "Orientasi Karyawan Baru Bacht 2",
      time: "13:00 - 16:00",
      host: "Diklat / SDM",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <DoorOpen className="w-6 h-6 text-orange-600" /> Booking Ruangan &
            Fasilitas
          </h1>
          <p className="text-slate-500 mt-1">
            Pemesanan ruang rapat, aula, dan permintaan konsumsi atau peralatan
            internal.
          </p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Pesan Ruangan
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
                Daftar Fasilitas Ruangan
              </h3>
            </div>
            <div className="p-5 space-y-4">
              {rooms.map((r, i) => (
                <div
                  key={i}
                  className="bg-white p-4 border border-slate-200 hover:border-orange-200 rounded-xl shadow-sm transition-colors group"
                >
                  <div className="font-bold text-slate-800 text-base mb-2 group-hover:text-orange-700 transition-colors">
                    {r.name}
                  </div>
                  <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-orange-500" /> Kapasitas{" "}
                      {r.capacity} org
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {r.features.map((f, j) => (
                      <span
                        key={j}
                        className="bg-slate-50 text-slate-600 text-[10px] uppercase font-black px-2.5 py-1 rounded-md border border-slate-200 shadow-sm"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
              <Calendar className="w-5 h-5 text-slate-500" /> Jadwal Ruangan
              (Hari Ini)
            </h3>
            <div className="text-xs font-black uppercase tracking-widest text-orange-700 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 shadow-sm text-center">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="p-6 space-y-4 flex-1">
            {bookings.length > 0 ? (
              bookings.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start gap-4 p-5 border border-slate-200 rounded-xl hover:bg-slate-50 border-l-4 border-l-orange-500 transition-colors group"
                >
                  <div className="bg-orange-50 text-orange-600 p-3 rounded-lg flex-shrink-0 text-center min-w-[120px] shadow-inner border border-orange-100">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80 flex justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="font-black text-sm tracking-widest">
                      {b.time}
                    </div>
                  </div>
                  <div className="flex-1 mt-2 sm:mt-0">
                    <h4 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-orange-700 transition-colors">
                      {b.title}
                    </h4>
                    <div className="text-sm font-medium text-slate-500 mt-1 mb-3">
                      {b.room}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md border border-slate-200">
                        Dipesan Oleh: {b.host}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5" /> Disetujui
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Coffee className="w-10 h-10 text-slate-300" />
                </div>
                <p className="font-bold text-slate-500 max-w-xs leading-relaxed">
                  Tidak ada jadwal pemesanan ruangan untuk hari ini.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
