import React, { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { DUMMY_VISITS } from "../../data/mockData";
import {
  AlertCircle,
  Calendar,
  CreditCard,
  ChevronRight,
  Activity,
  FileText,
} from "lucide-react";

export default function PatientSummary() {
  const { patient } = useOutletContext<{ patient: any }>();
  const visits = DUMMY_VISITS;
  const lastVisit = visits[visits.length - 1];
  const navigate = useNavigate();

  const lastVisitCost = useMemo(() => {
    if (!lastVisit) return 0;
    const procedureTotal = lastVisit.procedures.reduce(
      (sum, p) => sum + p.tariff,
      0,
    );
    const drugTotal = lastVisit.drugPrescription.reduce(
      (sum, d) => sum + d.cost,
      0,
    );
    return procedureTotal + drugTotal + lastVisit.adminFee;
  }, [lastVisit]);

  const handleTopUp = () => {
    alert("Simulasi: Mengarahkan ke halaman Top Up Saldo RSUMLA Pay...");
  };

  const handleViewDetails = () => {
    alert("Simulasi: Membuka rincian tagihan kunjungan terakhir...");
  };

  const handleDownload = () => {
    alert("Simulasi: Mengunduh Kwitansi Kunjungan Terakhir (PDF)...");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Profil Singkat & Peringatan Medis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Activity className="w-48 h-48 text-emerald-100" />
          </div>
          <h2 className="text-xl font-bold mb-1">
            Halo, Bapak {patient.name.split(" ")[0]}
          </h2>
          <p className="text-emerald-100 text-sm mb-6">
            Semoga Anda selalu dalam keadaan sehat wal afiat.
          </p>

          <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm inline-block">
            <p className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> Peringatan Medis Penting
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div>
                <p className="text-[10px] text-emerald-300 uppercase tracking-wider">
                  Alergi Terdaftar
                </p>
                <p className="font-semibold">
                  {patient.allergies?.join(", ") || "-"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-300 uppercase tracking-wider">
                  Kondisi Kronis
                </p>
                <p className="font-semibold">
                  {patient.chronicConditions?.join(", ") || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Saldo RSUMLA Pay
              </p>
              <CreditCard className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">Rp 450.000</p>
          </div>
          <button 
            onClick={handleTopUp}
            className="w-full mt-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2.5 rounded-lg border border-indigo-200 transition-colors text-sm"
          >
            Top Up Saldo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kunjungan Terakhir */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Kunjungan Terakhir
            </h3>
            <button 
              onClick={() => navigate('/portal/pendaftaran/rme')}
              className="text-xs font-bold text-blue-600 flex items-center hover:text-blue-700"
            >
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-5 flex-1">
            {lastVisit ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">
                      {lastVisit.clinic}
                    </h4>
                    <p className="text-sm text-slate-600">{lastVisit.doctor}</p>
                  </div>
                  <span className="inline-flex items-center rounded text-[10px] font-bold px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 uppercase tracking-wider">
                    {lastVisit.status}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                  <p className="text-xs text-slate-500 mb-1">Diagnosis Utama</p>
                  <p className="font-semibold text-slate-800">
                    {lastVisit.diagnosis}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    ICD-10: {lastVisit.icd10}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{" "}
                    {new Date(lastVisit.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> {lastVisit.paymentMethod}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <FileText className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-sm">Belum ada riwayat kunjungan.</p>
              </div>
            )}
          </div>
        </div>

        {/* Ringkasan Biaya Terakhir */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-600" /> Biaya Perawatan
              Terakhir
            </h3>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center">
            {lastVisit ? (
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-2">
                  Total tagihan kunjungan terakhir (tindakan, obat, admin)
                </p>
                <p className="text-4xl font-black text-slate-800 mb-6">
                  Rp {lastVisitCost.toLocaleString("id-ID")}
                </p>
                <div className="flex justify-center gap-3">
                  <button 
                    onClick={handleViewDetails}
                    className="bg-rose-50 text-rose-700 border border-rose-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-rose-100 transition-colors"
                  >
                    Lihat Rincian
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    Unduh Kwitansi PDF
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-center text-slate-500">
                Belum ada data biaya.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
