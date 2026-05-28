import React, { useState } from "react";
import { CalendarPlus, CheckCircle } from "lucide-react";
import { POLIKLINIK, DOKTER } from "../../data/mockData";

export default function PatientRegistration() {
  const [poli, setPoli] = useState("");
  const [dokter, setDokter] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!poli || !dokter || !tanggal) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (tanggal < today) {
      setError("Tanggal periksa tidak boleh di masa lalu.");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
    }, 500);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Anda telah terdaftar untuk kunjungan ke <strong>{poli}</strong> dengan{" "}
          <strong>{dokter}</strong> pada tanggal <strong>{tanggal}</strong>.
        </p>
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg inline-block mb-6 text-left">
          <p className="text-emerald-800 font-medium text-sm mb-1">
            Nomor Antrian: <span className="text-lg font-bold">A-012</span>
          </p>
          <p className="text-[11px] text-emerald-600">
            Detail antrian telah dikirimkan ke WhatsApp Anda. Tunjukkan nomor
            ini saat kedatangan.
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              setIsSuccess(false);
              setPoli("");
              setDokter("");
              setTanggal("");
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md text-sm font-medium transition"
          >
            Daftar Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Pendaftaran Berobat Online
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Pilih poliklinik, dokter, dan tanggal untuk membuat janji temu baru.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 border border-red-100 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Poliklinik Tujuan
          </label>
          <select
            value={poli}
            onChange={(e) => {
              setPoli(e.target.value);
              setDokter("");
            }}
            className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
            required
          >
            <option value="">-- Pilih Poliklinik --</option>
            {POLIKLINIK.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Dokter Spesialis
          </label>
          <select
            value={dokter}
            onChange={(e) => setDokter(e.target.value)}
            className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400"
            disabled={!poli}
            required
          >
            <option value="">-- Pilih Dokter --</option>
            {poli &&
              DOKTER[poli]?.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Tanggal Periksa
          </label>
          <input
            type="date"
            value={tanggal}
            min={today}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-md text-sm transition flex items-center justify-center"
          >
            <CalendarPlus className="w-4 h-4 mr-2" /> Buat Janji Temu
          </button>
        </div>
      </form>
    </div>
  );
}
