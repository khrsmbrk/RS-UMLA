import React, { useState } from "react";
import {
  FileText,
  Download,
  Wallet,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  X,
  Plus,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";
import toast from "react-hot-toast";

export default function OfficeESS() {
  const { userRole, currentUser, leaveRequests, addLeaveRequest } = useOfficeStore();
  const [isCutiModalOpen, setIsCutiModalOpen] = useState(false);

  // Filter leaveRequests for current user mock (for ESS view)
  const cutiRequests = leaveRequests.filter(r => currentUser ? r.userId === currentUser.id : true).map(r => ({
    id: r.id,
    type: r.type,
    startDate: r.duration.split(' - ')[0] || r.startDate || r.submittedDate,
    endDate: r.duration.split(' - ')[1] || r.endDate || r.submittedDate,
    status: r.status,
    approver: r.approver || "Menunggu HRD",
  }));

  const [formData, setFormData] = useState({
    type: "Cuti Tahunan",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleAjukanCuti = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.reason) {
      return toast.error("Mohon lengkapi semua field!");
    }
    const newRequest = {
      id: `CT-${Date.now()}`,
      userId: currentUser?.id || "KARYAWAN-ESS",
      userName: currentUser?.name || "Pegawai Cuti",
      submittedDate: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }),
      type: formData.type,
      duration: `${formData.startDate} - ${formData.endDate}`,
      days: 1, // simplified
      reason: formData.reason,
      status: "Menunggu",
      approver: "Menunggu Kepala Ruang",
    };
    addLeaveRequest(newRequest);
    setIsCutiModalOpen(false);
    setFormData({
      type: "Cuti Tahunan",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const remainingLeave =
    8 -
    cutiRequests.filter(
      (r) =>
        r.type === "Cuti Tahunan" &&
        (r.status === "Disetujui" || r.status === "Selesai"),
    ).length *
      2; // Simulated calculation

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-600" /> Portal Cuti &
            Remunerasi (ESS)
          </h1>
          <p className="text-slate-500 mt-1">
            Employee Self-Service terpadu untuk pengajuan cuti, klaim lembur,
            dan slip gaji.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Leave Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full opacity-50 pointer-events-none"></div>
            <div className="relative z-10 w-full md:w-auto">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-2 uppercase tracking-widest">
                <Calendar className="w-5 h-5 text-emerald-600" /> Sisa Cuti
                Tahunan Anda
              </h3>
              <p className="text-sm font-medium text-slate-500 max-w-sm leading-relaxed">
                Jatah cuti akan direset otomatis pada akhir tahun. Pastikan Anda
                telah mendiskusikan jadwal dengan tim.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-xl border border-emerald-100 min-w-[140px] relative z-10 shadow-inner w-full md:w-auto">
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-black text-emerald-700 tracking-tighter">
                  {Math.max(0, remainingLeave)}
                </span>
                <span className="text-sm font-black text-emerald-500 uppercase">
                  Hari
                </span>
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 mt-2 bg-white px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                Sisa Kuota
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-5 border-b border-slate-100 bg-slate-50/50 gap-4">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
                Riwayat Pengajuan Cuti
              </h3>
              <button
                onClick={() => setIsCutiModalOpen(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" /> Ajukan Cuti Baru
              </button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                      ID & Jenis Cuti
                    </th>
                    <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                      Periode Cuti
                    </th>
                    <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs text-right">
                      Status & Verifikator
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cutiRequests.map((r, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-5 py-5 align-top">
                        <div className="font-bold text-slate-800 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                          {r.type}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded border border-slate-200">
                          {r.id}
                        </div>
                      </td>
                      <td className="px-5 py-5 align-top">
                        <div className="font-bold text-slate-700 flex flex-col gap-1">
                          <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-xs w-max">
                            {r.startDate}
                          </span>
                          <span className="text-slate-400 font-bold text-[10px] uppercase ml-1">
                            sampai
                          </span>
                          <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-xs w-max">
                            {r.endDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-right align-top">
                        <div className="flex justify-end mb-2">
                          <span
                            className={`px-3 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-widest shadow-sm border ${
                              r.status === "Disetujui" || r.status === "Selesai"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {r.status}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-500">
                          {r.approver}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {cutiRequests.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-12 text-center text-slate-500"
                      >
                        <CheckCircle className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                        <div className="font-bold">
                          Belum ada riwayat pengajuan cuti.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-widest">
              <Briefcase className="w-5 h-5 text-blue-600" /> Klaim Shift
              Tambahan / Lembur
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-slate-200 rounded-xl shadow-sm hover:border-blue-200 hover:shadow-md transition-all gap-4">
                <div>
                  <div className="font-bold text-slate-800 text-base">
                    Shift Malam (Ganti Jaga Ns. Siti)
                  </div>
                  <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                    Dilaksanakan: 12 Mei 2026
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black shadow-sm rounded-md uppercase tracking-widest mb-1.5 inline-block">
                    Verifikasi Karu
                  </span>
                  <div className="text-sm font-black text-slate-700">
                    Rp 150.000
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-5 text-sm font-black text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 w-full text-center border border-blue-200 py-3 rounded-lg shadow-sm transition-colors">
              + Buat Form Klaim Lembur Baru
            </button>
          </div>
        </div>

        {/* Right Column - Payroll & Payslips */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6 text-white relative flex flex-col overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-slate-800 rounded-bl-[100px] z-0 opacity-50"></div>
            <div className="relative z-10 w-full">
              <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
                Estimasi Gaji & Remunerasi Bulan Ini
              </div>
              <div className="text-4xl font-black text-white flex items-baseline gap-1 tracking-tighter">
                <span className="text-xl text-slate-500 font-bold mr-1">
                  Rp
                </span>{" "}
                6.850<span className="text-slate-500 font-bold">.000</span>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-slate-700/50 space-y-3 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Gaji Pokok</span>
                <span className="font-bold tracking-wider text-slate-200">
                  Rp 4.500.000
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">
                  Tunjangan Fungsional
                </span>
                <span className="font-bold tracking-wider text-slate-200">
                  Rp 1.500.000
                </span>
              </div>
              <div className="flex justify-between items-center text-sm bg-slate-800/50 p-2 rounded-lg -mx-2">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  Insentif & Shift
                </span>
                <span className="font-black text-emerald-400 tracking-wider">
                  + Rp 850.000
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest">
              <FileText className="w-5 h-5 text-indigo-600" /> Arsip Slip Gaji
            </h3>
            <p className="text-[10px] uppercase font-black tracking-widest text-amber-700 mb-5 bg-amber-50 p-3 rounded-lg border border-amber-100 shadow-sm leading-relaxed">
              PDF Dienkripsi. Masukkan NIK Anda saat membuka file.
            </p>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {[
                {
                  id: "PAY-0426",
                  month: "April",
                  year: "2026",
                  total: "Rp 6.850.000",
                },
                {
                  id: "PAY-0326",
                  month: "Maret",
                  year: "2026",
                  total: "Rp 6.420.000",
                },
                {
                  id: "PAY-0226",
                  month: "Februari",
                  year: "2026",
                  total: "Rp 6.500.000",
                },
                {
                  id: "PAY-0126",
                  month: "Januari",
                  year: "2026",
                  total: "Rp 6.300.000",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 hover:bg-slate-50 border border-slate-200 rounded-xl group transition-all cursor-pointer hover:border-indigo-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-black border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors shrink-0">
                      {p.month.substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 mb-0.5">
                        Slip {p.month} {p.year}
                      </div>
                      <div className="text-xs font-bold text-slate-500">
                        {p.total}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toast(
                        `Mengunduh Slip Gaji ${p.month} ${p.year} PDF terenkripsi NIK.`,
                      )
                    }
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg border border-transparent hover:border-indigo-200 transition-colors shadow-sm"
                    title="Unduh Slip Gaji PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCutiModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" /> Form Pengajuan
                Cuti
              </h2>
              <button
                onClick={() => setIsCutiModalOpen(false)}
                className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={handleAjukanCuti}
              className="p-6 overflow-y-auto space-y-5 bg-white"
            >
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  Pilih Jenis Cuti
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white shadow-sm"
                >
                  <option>Cuti Tahunan</option>
                  <option>Cuti Sakit</option>
                  <option>Cuti Melahirkan</option>
                  <option>Cuti Alasan Penting</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    Tgl Mulai
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    Tgl Berakhir
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  Alasan Pengajuan
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm resize-none placeholder-slate-400"
                  placeholder="Tuliskan keterangan detail..."
                ></textarea>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-4 shadow-sm">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-amber-100 shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-xs font-bold text-amber-800 leading-relaxed">
                  Pengajuan Anda akan diteruskan ke Kepala Ruang/Bidang untuk
                  disetujui, lalu divalidasi oleh HRD. Harap tunggu 1x24 jam.
                </p>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCutiModalOpen(false)}
                  className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200 shadow-sm"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center min-w-[150px]"
                >
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
