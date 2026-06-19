import { useOutletContext } from '../../utils/OutletContext';
import { secureLocalStorage } from "../../utils/crypto";
import React, { useMemo, useState } from "react";
import { useNavigate } from '@tanstack/react-router';
import { DUMMY_VISITS } from "../../data/mockData";
import { useSRMStore } from "../../store/srmStore";
import toast from "react-hot-toast";
import {
  AlertCircle,
  Calendar,
  CreditCard,
  ChevronRight,
  Activity,
  FileText,
  Users,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  BookOpen,
  PlusCircle,
  ChevronDown,
  CheckCircle2,
  BellRing,
  Pill,
  Syringe,
  QrCode,
  X,
} from "lucide-react";

export default function PatientSummary() {
  const { patient } = useOutletContext<{ patient: any }>();
  const srmVisits = useSRMStore((state) => state.visits);

  const visits = useMemo(() => {
    const srmMapped = srmVisits
      .filter((v) => v.patientId === patient.mrn || v.patientId === patient.id)
      .map((v) => ({
        id: v.id,
        date: v.tanggalKunjungan,
        clinic: v.anamnesa.includes(":")
          ? v.anamnesa.split(":")[1].trim()
          : "Layanan Registrasi",
        doctor: v.dokterId,
        icd10: "-",
        diagnosis: v.diagnosis || "Menunggu Antrean",
        procedures: [],
        drugPrescription: [],
        adminFee: 0,
        status: v.status,
        paymentMethod: "Umum",
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Check if we have online visits in localStorage
    let onlineVisits: any[] = [];
    try {
      const saved = secureLocalStorage.getItem("riwayatAntreanUMLA");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter those matching patient name approximately (since online may not have MRN)
        onlineVisits = parsed
          .filter(
            (o: any) => o.nama.toLowerCase() === patient.name.toLowerCase(),
          )
          .map((o: any) => ({
            id: o.kodeBooking,
            date: o.tanggal,
            clinic: o.poli || o.layanan || "Layanan Medis",
            doctor: o.dokter,
            icd10: "-",
            diagnosis: "Pendaftaran Online / App",
            procedures: [],
            drugPrescription: [],
            adminFee: 0,
            status: "Menunggu",
            paymentMethod: o.penjaminan || "Umum",
          }));
      }
    } catch (e) {}

    // Merge all sources eliminating duplicates by date + clinic
    const dummyToUse =
      patient.mrn === "RM-10293" || patient.id === "RM-10293"
        ? DUMMY_VISITS
        : [];
    const merged = [...onlineVisits, ...srmMapped, ...dummyToUse];
    const unique = merged.filter(
      (v, i, a) =>
        a.findIndex((t) => t.date === v.date && t.clinic === v.clinic) === i,
    );
    return unique.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [srmVisits, patient.mrn, patient.id, patient.name]);

  const navigate = useNavigate();

  const [expandedVisit, setExpandedVisit] = useState<string | null>(
    visits[0]?.id || null,
  );
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);

  const pendingBill = visits.find(
    (v) => v.status === "Menunggu" && v.paymentMethod === "Umum",
  );
  const bpjsActive = visits.some((v) => v.paymentMethod === "BPJS Kesehatan");

  const lastVisitCost = useMemo(() => {
    if (!pendingBill) return 0;
    const procedureTotal = pendingBill.procedures.reduce(
      (sum, p) => sum + p.tariff,
      0,
    );
    const drugTotal = pendingBill.drugPrescription.reduce(
      (sum, d) => sum + d.cost,
      0,
    );
    return procedureTotal + drugTotal + pendingBill.adminFee;
  }, [pendingBill]);

  const handleTopUp = () => {
    toast.success(
      "Simulasi: Mengarahkan ke halaman Pembayaran / Top Up Saldo RSUMLA Pay...",
    );
  };

  const handlePayBill = () => {
    toast.success(
      "Simulasi: Membuka opsi pembayaran Virtual Account(VA)/QRIS.",
    );
  };

  const handleViewDetails = () => {
    toast.success("Simulasi: Membuka rincian tagihan kunjungan terakhir...");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header: Profil Singkat & Family Link */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Assalamu'alaikum, {patient.name.split(" ")[0]}
          </h2>
          <p className="text-slate-500 text-sm">
            Semoga Anda dan keluarga selalu sehat sejahtera.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-700 font-bold text-xs z-20">
              AF
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-700 font-bold text-xs z-10">
              IF
            </div>
            <button
              onClick={() => setIsFamilyModalOpen(true)}
              className="w-10 h-10 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-300 transition-colors z-0"
              title="Tambah Anggota Keluarga"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setIsFamilyModalOpen(true)}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <Users className="w-4 h-4 text-emerald-600" />
            Family Link
          </button>
        </div>
      </div>

      {/* Grid: Peringatan Medis & Status Tagihan/Asuransi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Activity className="w-48 h-48 text-emerald-100" />
          </div>

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

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-[10px] text-emerald-200 uppercase tracking-wider">
                  Status BPJS
                </p>
                <p className="text-xs font-bold">
                  {bpjsActive ? "Aktif & Siap Digunakan" : "Tidak Aktif"}
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              <div>
                <p className="text-[10px] text-emerald-200 uppercase tracking-wider">
                  Golongan Darah
                </p>
                <p className="text-xs font-bold">{patient.bloodType || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Informasi Tagihan
              </p>
              {pendingBill ? (
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                  <BellRing className="w-3.5 h-3.5 animate-pulse" /> Belum
                  Dibayar
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
                </span>
              )}
            </div>
            {pendingBill ? (
              <>
                <p className="text-3xl font-black text-slate-800 tracking-tight">
                  Rp {lastVisitCost.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                  {pendingBill.clinic} -{" "}
                  {new Date(pendingBill.date).toLocaleDateString("id-ID")}
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-black text-slate-800">
                  Tidak ada tagihan
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Seluruh perawatan lunas.
                </p>
              </>
            )}
          </div>
          <div className="space-y-2 mt-6">
            {pendingBill && (
              <button
                onClick={handlePayBill}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-sm shadow-rose-200 text-sm flex justify-center items-center gap-2 active:scale-95"
              >
                <QrCode className="w-4 h-4" /> Bayar via VA / QRIS
              </button>
            )}
            <button
              onClick={handleTopUp}
              className={`w-full ${!pendingBill ? "bg-indigo-600 focus:ring-4 focus:ring-indigo-100" : "bg-indigo-50"} hover:bg-indigo-100 ${!pendingBill ? "text-white" : "text-indigo-700"} focus:ring-4 focus:ring-indigo-50 font-bold py-2.5 rounded-xl border ${!pendingBill ? "border-transparent hover:text-indigo-700 hover:border-indigo-200" : "border-indigo-200"} transition-all text-sm active:scale-95`}
            >
              Top Up RS UMLA Pay
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Rekam Jejak Kunjungan (Timeline) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Rekam Jejak
              Kunjungan
            </h3>
            <button
              onClick={() => navigate({ to: "/pasien/rme" })}
              className="text-xs font-bold text-blue-600 flex items-center hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Riwayat Lengkap <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
          <div className="p-6 flex-1">
            <div className="relative pl-8 space-y-6 sm:space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-[0.5px] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:to-transparent">
              {visits.length > 0 ? (
                visits.map((visit, index) => {
                  const isExpanded = expandedVisit === visit.id;
                  const isLatest = index === 0;
                  return (
                    <div key={visit.id} className="relative group">
                      {/* Timeline Marker */}
                      <div
                        className={`absolute -left-8 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${isLatest ? "bg-emerald-500" : "bg-slate-300"}`}
                      >
                        {isLatest && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>

                      <div
                        className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? "border-indigo-200 shadow-md ring-4 ring-indigo-50/50" : "border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md cursor-pointer"}`}
                      >
                        {/* Timeline Card Header */}
                        <div
                          className="p-4"
                          onClick={() =>
                            setExpandedVisit(isExpanded ? null : visit.id)
                          }
                        >
                          <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-md ${visit.status === "Selesai" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                            >
                              {visit.status}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(visit.date).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-2 group-hover:text-indigo-600 transition-colors">
                            <div>
                              <h4 className="font-bold text-slate-800 text-[15px]">
                                {visit.clinic}
                              </h4>
                              <p className="text-sm font-medium text-slate-500 mt-0.5">
                                {visit.doctor}
                              </p>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180 text-indigo-500" : ""}`}
                            />
                          </div>
                        </div>

                        {/* Expanded Content */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                        >
                          <div className="overflow-hidden">
                            <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-4">
                              <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                  <Stethoscope className="w-3.5 h-3.5" />{" "}
                                  Diagnosis
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {visit.diagnosis}{" "}
                                  <span className="text-slate-500 font-normal">
                                    ({visit.icd10})
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                  <Syringe className="w-3.5 h-3.5" /> Tindakan
                                </p>
                                <ul className="text-sm text-slate-700 space-y-1">
                                  {visit.procedures.map((p, i) => (
                                    <li
                                      key={i}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="w-1 h-1 bg-indigo-300 rounded-full"></div>{" "}
                                      {p.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                  <Pill className="w-3.5 h-3.5" /> Resep Obat
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                  {visit.drugPrescription.map((d, i) => (
                                    <span
                                      key={i}
                                      className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm"
                                    >
                                      {d.name}{" "}
                                      <span className="text-emerald-600 bg-emerald-50 px-1.5 rounded ml-1">
                                        {d.dosage}
                                      </span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 py-10">
                  <FileText className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm font-medium">
                    Belum ada jejak kunjungan terekam.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Artikel Edukatif */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-800">
              Saran Edukasi Kesehatan
            </h3>
          </div>

          <div className="flex-1 space-y-4">
            {patient.chronicConditions?.includes("Hipertensi") && (
              <div className="group cursor-pointer">
                <div className="h-28 bg-emerald-50 rounded-xl mb-3 overflow-hidden border border-emerald-100 relative">
                  <HeartPulse className="w-32 h-32 text-emerald-200 absolute -right-6 -bottom-6 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-emerald-900/40 to-transparent">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-emerald-600/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      Rekomendasi
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-emerald-700 transition-colors">
                  Tips Menjaga Tekanan Darah Tetap Normal di Usia Produktif
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Pola makan DASH dan rutinitas olahraga ringan bisa menjadi
                  kunci menjaga tekanan darah.
                </p>
              </div>
            )}

            <div className="group cursor-pointer mt-6 pt-6 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-emerald-700 transition-colors mb-1">
                Pentingnya Cek Rutin Gula Darah
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2">
                Penyakit diabetes sering tidak bergejala di awal. Kenali
                pentingnya deteksi dini.
              </p>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Baca selengkapnya <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div className="group cursor-pointer mt-4 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-emerald-700 transition-colors mb-1">
                Mengenal Gejala Alergi Obat
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2">
                Jika Anda memiliki riwayat alergi, perhatikan tanda-tanda
                berikut saat diresepkan obat baru.
              </p>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Baca selengkapnya <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <button className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm rounded-xl border border-slate-200 transition-colors">
            Lihat Semua Artikel
          </button>
        </div>
      </div>

      {isFamilyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFamilyModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 sm:p-8">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Family Link
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Kelola profil kesehatan anggota keluarga Anda dalam satu akun
                terpadu.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                      AF
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        Aisyah Fitri
                      </p>
                      <p className="text-xs text-slate-500">
                        Istri • BPJS Aktif
                      </p>
                    </div>
                  </div>
                  <button className="text-emerald-600 text-xs font-semibold hover:text-emerald-700">
                    Lihat Profil
                  </button>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                      IF
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        Ibrahim Faizan
                      </p>
                      <p className="text-xs text-slate-500">Anak • Umum</p>
                    </div>
                  </div>
                  <button className="text-emerald-600 text-xs font-semibold hover:text-emerald-700">
                    Lihat Profil
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <button
                  onClick={() => {
                    toast.success(
                      "Simulasi: Mengarahkan ke form pendaftaran anggota keluarga baru...",
                    );
                    setIsFamilyModalOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition-all"
                >
                  <PlusCircle className="w-5 h-5" /> Tambah Anggota Keluarga
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
