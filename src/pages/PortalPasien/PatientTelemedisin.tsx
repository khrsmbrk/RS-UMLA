import React, { useState } from "react";
import {
  Video,
  Calendar,
  Clock,
  CreditCard,
  ChevronRight,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

export default function PatientTelemedisin() {
  const [showBooking, setShowBooking] = useState(false);

  const handleBook = () => {
    setShowBooking(true);
  };

  const handleJoinVirtual = () => {
    alert("Simulasi: Masuk ke ruang virtual telekonsultasi. Harap izinkan akses kamera dan mikrofon.");
  };

  if (showBooking) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Permintaan Telekonsultasi Terkirim!
        </h2>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Tim medis kami akan memverifikasi jadwal Anda dan mengirimkan tautan pembayaran via WhatsApp.
        </p>
        <button
          onClick={() => setShowBooking(false)}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-md text-sm font-bold transition"
        >
          Kembali ke Jadwal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-600" /> Layanan Telekonsultasi
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Jadwal konsultasi online via Video Call dengan dokter spesialis.
          </p>
        </div>
        <button 
          onClick={handleBook}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg shadow-sm transition-colors text-sm"
        >
          Buat Janji Telemedisin
        </button>
      </div>

      {/* Upcoming Telemedicine */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <PhoneCall className="w-32 h-32 text-blue-900" />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <h3 className="text-sm font-bold text-slate-800">
            Sesi Mendatang Hari Ini
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-slate-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-3xl font-black text-slate-300 overflow-hidden shrink-0">
            <img
              src="https://ui-avatars.com/api/?name=Siti+Rahma&background=0D8ABC&color=fff&size=128"
              alt="Dr. Siti Rahma"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-slate-800">
              dr. Siti Rahma, Sp.PD
            </h4>
            <p className="text-sm text-slate-500">Spesialis Penyakit Dalam</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-400" /> 26 Mei 2026
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                <Clock className="w-4 h-4 text-amber-500" /> 14:00 - 14:20 WIB
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500 flex items-center gap-2">
            Status Pembayaran:{" "}
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Lunas
            </span>
          </div>
          <button 
            onClick={handleJoinVirtual}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" /> Masuk Ruang Virtual
          </button>
        </div>
      </div>

      {/* History */}
      <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">
        Riwayat Telekonsultasi
      </h3>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-slate-100">
          <li className="p-4 hover:bg-slate-50 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0">
                <img
                  src="https://ui-avatars.com/api/?name=Andi+Fajar&background=random&color=fff&size=64"
                  alt="Doctor"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-800">
                  dr. Andi Fajar, Sp.JP
                </h4>
                <p className="text-xs text-slate-500">
                  12 Feb 2026 • 10:00 WIB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-block text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                Selesai
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
