import React, { useState, useEffect } from "react";
import { useSRMStore } from "../../store/srmStore";

const SRMAntrianTV = () => {
  const queueState = useSRMStore((state) => state.queueToday);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQueueItem = queueState.list.find((q) => q.status === "Sedang Diperiksa");
  const nextQueueItem = queueState.list.find((q) => q.status === "Menunggu");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden select-none">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 py-4 px-8 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">RS</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-white">RUMAH SAKIT UMUM</h1>
            <p className="text-sm text-slate-400">Sistem Antrian Poliklinik</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-mono font-bold text-emerald-400">
            {currentTime.toLocaleTimeString("id-ID")}
          </div>
          <div className="text-sm text-slate-400">
            {currentTime.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex p-6 gap-6">
        {/* Left Column - Current Call */}
        <div className="w-1/2 flex flex-col gap-6">
          <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-850 rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
            
            <h2 className="text-3xl font-medium text-slate-300 uppercase tracking-widest mb-4">
              Nomor Antrian
            </h2>
            
            <div className="text-[12rem] font-bold text-white leading-none my-6 drop-shadow-2xl">
              {currentQueueItem ? currentQueueItem.nomor : "-"}
            </div>
            
            <div className="text-4xl font-medium text-emerald-400 mt-4 text-center">
              {currentQueueItem ? currentQueueItem.nama : "Belum Ada"}
            </div>
            
            <div className="mt-12 py-4 px-12 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20">
              <span className="text-2xl font-bold uppercase tracking-widest text-white">
                Silahkan Menuju Ruang Periksa
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Media & Info */}
        <div className="w-1/2 flex flex-col gap-6">
          {/* Video Placeholder */}
          <div className="flex-[2] bg-black rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
            <div className="z-10 text-center">
              <p className="text-slate-400 text-lg mb-2">Video/Media Edukasi Pasien</p>
              <div className="w-16 h-16 border-4 border-slate-600 rounded-full flex items-center justify-center mx-auto mt-4">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-slate-400 border-b-[12px] border-b-transparent ml-2"></div>
              </div>
            </div>
          </div>
          
          {/* Next Queues */}
          <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col shadow-xl">
            <h3 className="text-xl font-medium text-slate-300 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">
              Antrian Berikutnya
            </h3>
            <div className="flex-1 flex flex-col justify-center">
              {nextQueueItem ? (
                <div className="flex items-center justify-between text-2xl px-6 py-4 bg-slate-700/50 rounded-xl">
                  <span className="font-bold text-white">{nextQueueItem.nomor}</span>
                  <span className="text-slate-300">{nextQueueItem.nama}</span>
                  <span className="text-slate-400 text-base">Menunggu</span>
                </div>
              ) : (
                <div className="text-center text-slate-500 text-xl">
                  Tidak ada antrian berikutnya
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Ticker */}
      <footer className="bg-slate-800 border-t border-slate-700 text-slate-300 text-lg py-3 overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] inline-block">
          * SELAMAT DATANG DI RUMAH SAKIT UMUM * TETAP PATUHI PROTOKOL KESEHATAN * JIKA ADA KELUHAN HUBUNGI PETUGAS KAMI * TERIMA KASIH ATAS KESABARAN ANDA MENUNGGU GILIRAN *
        </div>
      </footer>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default SRMAntrianTV;
