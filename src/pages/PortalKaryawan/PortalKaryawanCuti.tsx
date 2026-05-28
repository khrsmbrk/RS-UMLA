import React from "react";
import { useOutletContext } from "react-router-dom";
import { Briefcase, CalendarPlus, CheckCircle, Clock } from "lucide-react";

export default function PortalKaryawanCuti() {
  const { user } = useOutletContext<{ user: any }>();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-600" /> Cuti & Izin
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Sisa kuota cuti tahunan dan pengajuan izin.
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-colors flex items-center gap-2">
          <CalendarPlus className="w-4 h-4" /> Ajukan Cuti
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Sisa Cuti Tahunan
          </div>
          <div className="text-4xl font-black text-emerald-600">
            8 <span className="text-sm">Hari</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Cuti Terpakai
          </div>
          <div className="text-4xl font-black text-slate-800">
            4 <span className="text-sm">Hari</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Riwayat Pengajuan
          </h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Jenis
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Tanggal
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Keterangan
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-5 py-4 font-bold text-slate-800">
                Cuti Tahunan
              </td>
              <td className="px-5 py-4 text-slate-600">12 Apr - 14 Apr 2026</td>
              <td className="px-5 py-4 text-slate-600">
                Acara keluarga di luar kota
              </td>
              <td className="px-5 py-4 text-right">
                <span className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm flex items-center gap-1 justify-end w-max ml-auto">
                  <CheckCircle className="w-3 h-3" /> Disetujui
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-5 py-4 font-bold text-slate-800">Izin Sakit</td>
              <td className="px-5 py-4 text-slate-600">2 Feb 2026</td>
              <td className="px-5 py-4 text-slate-600">
                Demam (Surat Dokter Tertaut)
              </td>
              <td className="px-5 py-4 text-right">
                <span className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm flex items-center gap-1 justify-end w-max ml-auto">
                  <CheckCircle className="w-3 h-3" /> Disetujui
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
