import React, { useMemo } from "react";
import { Droplet, Search, Box, Thermometer, UserPlus } from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeBloodBank() {
  const patients = useSRMStore((state) => state.patients);

  const requests = useMemo(() => {
    return patients.slice(0, 4).map((p, i) => {
      const isReady = i % 2 === 0;
      return {
        p: p.namaLengkap,
        r: i === 0 ? "ICU" : i === 1 ? "Kamar Bersalin" : "Instalasi Bedah",
        c: i % 2 === 0 ? "Packed Red Cell (PRC)" : "Whole Blood (WB)",
        g: i % 3 === 0 ? "O (+)" : "B (+)",
        n: (i % 3) + 1,
        stat: isReady ? "Siap Diambil" : "Proses Crossmatch",
      };
    });
  }, [patients]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Droplet className="w-6 h-6 text-rose-600" /> BDRS / Bank Darah
            Rumah Sakit
          </h1>
          <p className="text-slate-500 mt-1">
            Manajemen stok darah (PRC, TC, FFP, WB) dan donor konvalesen /
            pengganti.
          </p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <UserPlus className="w-5 h-5" /> Reg. Donor Baru
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["A (+)", "B (+)", "AB (+)", "O (+)"].map((goldar, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Droplet className="w-24 h-24 text-rose-600" />
            </div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest relative z-10">
              Stok Gol. Darah {goldar}
            </div>
            <div className="text-4xl font-black text-rose-600 relative z-10">
              {Math.floor(Math.random() * 20 + 2)}{" "}
              <span className="text-sm font-bold opacity-50">Kantong</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>{" "}
            Permintaan Transfusi Aktif
          </h3>
          <span className="text-[10px] font-black tracking-widest uppercase bg-rose-100 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
            Live Data
          </span>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Pasien & Ruang
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jenis Komponen
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Golongan Darah
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jumlah Kantong
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Status Crossmatch
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-5">
                  <div className="font-bold text-slate-800">{req.p}</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                    Ruang: {req.r}
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-slate-600">{req.c}</td>
                <td className="px-5 py-5">
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 font-black text-lg rounded-lg border border-rose-200 shadow-sm">
                    {req.g}
                  </span>
                </td>
                <td className="px-5 py-5 font-black text-slate-800 text-xl">
                  {req.n}
                </td>
                <td className="px-5 py-5">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      req.stat === "Siap Diambil"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {req.stat}
                  </span>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-slate-500 italic"
                >
                  Tidak ada permintaan aktif.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
