import React, { useState } from "react";
import {
  CreditCard,
  Receipt,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PatientTagihan() {
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = () => {
    setIsPaid(true);
    toast.success(
      "Simulasi: Pembayaran berhasil dilakukan via saldo RSUMLA Pay.",
    );
  };

  const handleDownload = () => {
    toast.success("Simulasi: Mengunduh Bukti Kwitansi (PDF)...");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" /> Informasi Tagihan &
            Pembayaran
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Riwayat tagihan biaya perawatan, obat, dan tindakan medis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!isPaid ? (
          <div className="bg-white rounded-xl border border-rose-100 shadow-sm p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Clock className="w-24 h-24 text-rose-900" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              Tagihan Belum Dibayar
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Konsultasi Poli Penyakit Dalam - 26 Mei 2026
            </p>
            <div className="text-3xl font-black text-rose-600 mb-4">
              Rp 125.000
            </div>

            <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">Konsultasi Dokter Sp.PD</span>
                <span className="font-semibold">Rp 90.000</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">Pemeriksaan Tanda Vital</span>
                <span className="font-semibold">Rp 20.000</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">Biaya Administrasi</span>
                <span className="font-semibold">Rp 15.000</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Bayar Sekarang
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-emerald-100 shadow-sm p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Semua Tagihan Lunas
            </h3>
            <p className="text-sm text-slate-500">
              Terima kasih. Anda tidak memiliki tagihan aktif saat ini.
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
            <h3 className="text-sm font-bold text-slate-800">
              Riwayat Pembayaran
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-0">
            <ul className="divide-y divide-slate-100">
              {isPaid && (
                <li className="p-4 bg-emerald-50/50 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm text-slate-800">
                      Konsultasi Poli Penyakit Dalam
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      26 Mei 2026 • RSUMLA Pay
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">Rp 125.000</div>
                    <div className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" /> LUNAS
                    </div>
                  </div>
                </li>
              )}
              <li className="p-4 hover:bg-slate-50 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm text-slate-800">
                    Tindakan Laboratorium (Darah Rutin)
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    20 Mar 2026 • VA Bank BRI
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">Rp 150.000</div>
                  <div className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> LUNAS
                  </div>
                </div>
              </li>
              <li className="p-4 hover:bg-slate-50 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm text-slate-800">
                    Tebus Obat Farmasi Rawat Jalan
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    15 Mar 2026 • QRIS
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">Rp 85.000</div>
                  <div className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> LUNAS
                  </div>
                </div>
              </li>
              <li className="p-4 hover:bg-slate-50 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm text-slate-800">
                    Konsultasi Poli Umum
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    15 Mar 2026 • Tunai Kasir
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">Rp 50.000</div>
                  <div className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> LUNAS
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="p-3 border-t border-slate-100 bg-slate-50 text-center shrink-0">
            <button
              onClick={handleDownload}
              className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mx-auto hover:text-emerald-800"
            >
              <FileText className="w-4 h-4" /> Unduh Bukti Kwitansi (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
