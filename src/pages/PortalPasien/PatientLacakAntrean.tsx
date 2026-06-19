import React, { useState } from "react";
import { Map, Clock, ArrowRight } from "lucide-react";

export default function PatientLacakAntrean() {
  const [kodeBooking, setKodeBooking] = useState("");
  const [isTracked, setIsTracked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLacak = () => {
    if (!kodeBooking) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsTracked(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
          <Map className="w-6 h-6 mr-3 text-orange-600" />
          Peta Kiosk & Lacak Antrean
        </h2>
        <p className="text-slate-500 mb-6">
          Pindai kode booking Anda untuk melihat denah lantai RS dan estimasi
          waktu antrean.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center min-h-[320px] shadow-sm border border-slate-200">
            <Map className="w-20 h-20 text-slate-200 mb-6" />
            <p className="text-slate-600 font-bold mb-3 text-center text-lg">
              Denah Rumah Sakit
            </p>
            <div className="flex gap-2">
              <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-bold shadow-sm">
                Lantai 1
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full font-bold shadow-sm">
                Lantai 2
              </span>
            </div>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <h4 className="font-bold text-slate-800 mb-4 px-2">
                Lacak Posisi Antrean
              </h4>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="lacakKode"
                  value={kodeBooking}
                  onChange={(e) => setKodeBooking(e.target.value)}
                  className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white border border-slate-300 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="lacakKode"
                  className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                >
                  Masukkan Kode Booking / RM
                </label>
              </div>
              <button
                onClick={handleLacak}
                disabled={!kodeBooking || isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? "Mencari..." : "Lacak Status"}
              </button>
            </div>

            {isTracked && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm mt-6">
                <p className="text-xs text-orange-600 font-bold mb-1 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                  Estimasi Waktu
                </p>
                <p className="text-4xl font-black text-orange-800 mt-2">
                  12{" "}
                  <span className="text-xl font-medium text-orange-600">
                    Menit
                  </span>
                </p>
                <p className="text-sm text-orange-700 mt-3 font-medium bg-white/50 p-2 rounded-lg inline-block border border-orange-100">
                  Poli Gigi - Antrean Saat Ini: B10
                  <br />
                  Nomor Anda: B14 (Terdapat 3 antrean sebelum Anda).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
