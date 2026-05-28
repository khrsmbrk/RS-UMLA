import React, { useState } from "react";
import {
  Truck,
  Search,
  MapPin,
  Clock,
  Plus,
  CheckCircle,
  Car,
  AlertTriangle,
} from "lucide-react";

export default function OfficeFleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicles = [
    {
      id: "S-701",
      type: "Ambulans Rujukan",
      plate: "S 1902 AL",
      status: "Standby",
      loc: "IGD Utama",
    },
    {
      id: "S-702",
      type: "Ambulans Jenazah",
      plate: "S 1910 AL",
      status: "Sedang Tugas",
      loc: "Perjalanan ke Tuban",
    },
    {
      id: "S-703",
      type: "Mobil Dinas Direksi (Innova)",
      plate: "S 10 AL",
      status: "Standby",
      loc: "Parkir VIP",
    },
    {
      id: "S-704",
      type: "Mobil Operasional (Avanza)",
      plate: "S 1550 AL",
      status: "Maintenance",
      loc: "Bengkel Resmi",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-600" /> Fleet Management &
            Ambulans
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem pemesanan, jadwal bertugas, dan live monitoring kendaraan
            operasional rumah sakit.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" /> Request Booking Mobil
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6 flex flex-col">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
                <Car className="w-5 h-5 text-slate-500" /> Status Kendaraan Saat
                Ini
              </h3>
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Cari nopol atau jenis..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                      Tipe & Plat Nomor
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                      Status / Driver
                    </th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                      Lokasi Terakhir
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vehicles.map((v, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-base">
                          {v.type}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md inline-block mt-2 border border-slate-200">
                          {v.plate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm ${
                            v.status === "Standby"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : v.status === "Sedang Tugas"
                                ? "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {v.status}
                        </span>
                        <div className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wider">
                          {v.status === "Sedang Tugas"
                            ? "Driver: Budi S."
                            : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600 flex items-center gap-2 text-sm font-medium group-hover:text-emerald-700 transition-colors">
                          <MapPin className="w-4 h-4 text-slate-400" /> {v.loc}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 shrink-0">
            <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-widest text-sm">
              <Clock className="w-5 h-5 text-indigo-500" /> Log Perjalanan
              G-Maps Tracker (Dummy View)
            </h3>
            <div className="h-48 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors shadow-inner">
              <div className="absolute inset-0 bg-[url('https://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png')] opacity-30 group-hover:opacity-40 transition-opacity"></div>
              <div className="z-10 flex flex-col items-center bg-white/90 p-5 rounded-xl text-center backdrop-blur-md border border-white/60 shadow-lg group-hover:scale-105 transition-transform">
                <MapPin className="w-8 h-8 text-red-500 mb-2" />
                <p className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  Integrasi Google Maps Platform
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Live tracking unit ambulans rujukan akan ditampilkan pada
                  modul ini.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
            <h3 className="font-black text-slate-800 mb-5 text-lg uppercase tracking-widest border-b border-slate-100 pb-4">
              Daftar Jadwal Booking
            </h3>
            <div className="space-y-4">
              <div className="p-4 border border-amber-200 rounded-xl bg-amber-50 hover:bg-amber-100/50 transition-colors shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-amber-900 text-sm tracking-tight">
                    Mobil Dinas (S 1550 AL)
                  </div>
                  <span className="bg-white text-amber-700 text-[10px] uppercase font-black px-2.5 py-1 rounded shadow-sm border border-amber-200">
                    Besok 08:00
                  </span>
                </div>
                <div className="text-sm font-medium text-amber-800/80 leading-relaxed mb-3">
                  Rapat Koordinasi Dinas Kesehatan Kab. Lamongan
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black text-amber-600/70 pt-3 border-t border-amber-200/50">
                  User: Bagian Pelayanan
                </div>
              </div>

              <div className="p-4 border border-emerald-200 rounded-xl bg-emerald-50 hover:bg-emerald-100/50 transition-colors shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-emerald-500"></div>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-emerald-900 text-sm tracking-tight">
                    Ambulans (S 1902 AL)
                  </div>
                  <span className="bg-white text-emerald-700 text-[10px] uppercase font-black px-2.5 py-1 rounded shadow-sm border border-emerald-200">
                    Hari ini 14:00
                  </span>
                </div>
                <div className="text-sm font-medium text-emerald-800/80 leading-relaxed mb-3">
                  Rujukan Pasien ICU ke RSUD Dr. Soetomo Surabaya
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black text-emerald-600/70 pt-3 border-t border-emerald-200/50">
                  User: IGD Resusitasi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-black text-slate-800">
                Form Booking Kendaraan
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-5 bg-white">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                  Jenis Kendaraan
                </label>
                <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                  <option>Mobil Dinas Operasional</option>
                  <option>Mobil Dinas VIP (Direksi)</option>
                  <option>Ambulans Pasien</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                    Tanggal Mulai
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                    Sampai
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                  Tujuan Perjalanan / Deskripsi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dinas Kesehatan Provinsi..."
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert(
                    "Pengajuan berhasil! Menunggu persetujuan Bagian Umum.",
                  );
                  setIsModalOpen(false);
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 shadow-sm transition-transform active:scale-95 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Kirim Pengajuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
