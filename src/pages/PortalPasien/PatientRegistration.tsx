import { useOutletContext } from '../../utils/OutletContext';
import React, { useState } from "react";
import { secureLocalStorage } from "../../utils/crypto";
import {
  CalendarPlus,
  CheckCircle,
  UserCircle2,
  Stethoscope,
  Microscope,
  HeartPulse,
  Video,
  Pill,
  FileText,
  Activity,
} from "lucide-react";
import { POLIKLINIK, DOKTER } from "../../data/mockData";
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useSRMStore } from "../../store/srmStore";

const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  min,
  max,
  readOnly,
  disabled,
  className = "",
  placeholder = " ",
}: any) => (
  <div className={`relative ${className} mt-2`}>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      readOnly={readOnly || disabled}
      required={required}
      placeholder={placeholder}
      className={`block px-3 pb-2.5 pt-4 w-full text-sm text-slate-900 ${readOnly || disabled ? "bg-slate-50" : "bg-white"} rounded-lg border border-slate-300 appearance-none focus:outline-none focus:ring-1 focus:border-emerald-500 focus:ring-emerald-500 peer`}
    />
    <label
      htmlFor={id}
      className={`absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 left-2 cursor-text ${readOnly || disabled ? "bg-transparent" : "bg-white peer-focus:text-emerald-600"} ${
        type === "date" || value || readOnly || disabled
          ? ""
          : "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2"
      } peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
    >
      {label}
    </label>
  </div>
);

const FloatingSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  required,
  disabled,
}: any) => (
  <div className="relative mt-2">
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="block px-3 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-300 appearance-none focus:outline-none focus:ring-1 focus:border-emerald-500 focus:ring-emerald-500 peer disabled:bg-slate-50 disabled:opacity-75"
    >
      <option value="" disabled hidden></option>
      {options}
    </select>
    <label
      htmlFor={id}
      className={`absolute text-sm duration-300 transform top-2 z-10 origin-[0] bg-white px-2 left-2 pointer-events-none ${disabled ? "text-slate-400" : "text-slate-500 peer-focus:text-emerald-600"} ${
        value
          ? "-translate-y-4 scale-75"
          : "-translate-y-1/2 scale-100 top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
      }`}
    >
      {label}
    </label>
    <div
      className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 ${disabled ? "text-slate-400" : "text-slate-500"}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  </div>
);

export default function PatientRegistration() {
  const { patient } = useOutletContext<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const addQueue = useSRMStore((state) => state.addQueue);
  const addVisit = useSRMStore((state) => state.addVisit);
  const queueToday = useSRMStore((state) => state.queueToday);

  const [serviceType, setServiceType] = useState<string | null>(
    (location.state as any)?.serviceType || null,
  );

  const [poli, setPoli] = useState("");
  const [dokter, setDokter] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [penjaminan, setPenjaminan] = useState("Umum / Biaya Sendiri");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [queueNumber, setQueueNumber] = useState("");
  const [opsional, setOpsional] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!tanggal) {
      setError("Tanggal wajib diisi.");
      return;
    }

    if (tanggal < today) {
      setError("Tanggal periksa tidak boleh di masa lalu.");
      return;
    }

    if (serviceType === "Rawat Jalan" || serviceType === "Telemedisin") {
      if (!poli || !dokter) {
        setError("Poli dan Dokter wajib dipilih.");
        return;
      }
    }

    // Add to SRM Queue Store
    addQueue(patient.mrn, patient.name);

    // Add to SRM Visits
    const doctorId = dokter ? dokter.split("-")[0] || "DR-001" : "DR-001"; // basic mapping
    addVisit({
      id: `VST-${Date.now()}`,
      patientId: patient.mrn || patient.id,
      tanggalKunjungan: tanggal,
      dokterId: doctorId,
      operatorId: "OP-001",
      anamnesa: "Keluhan pasien online",
      pemeriksaanFisik: "",
      pemeriksaanPenunjang: "",
      diagnosis: "",
      terapi: "",
      tindakan: "",
      status: "Menunggu",
      totalBiaya: 0,
    } as any);

    // Determine queue number visually
    const newNomor = queueToday.totalHariIni + 1;
    let prefix = "A";
    if (serviceType === "MCU") prefix = "M";
    if (serviceType === "Lab/Rad") prefix = "L";
    if (serviceType === "Telemedisin") prefix = "T";
    const newQueueNumber = `${prefix}-${newNomor.toString().padStart(3, "0")}`;
    setQueueNumber(newQueueNumber);

    // Sync with PendaftaranOnline History
    const generatedKode = `BKG-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    const syncData = {
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString(),
      kodeBooking: generatedKode,
      noAntrian: newQueueNumber,
      nama: patient.name,
      poli: poli || serviceType,
      dokter: dokter || "-",
      tanggal,
      penjaminan,
      layanan: serviceType,
    };

    try {
      const saved = secureLocalStorage.getItem("riwayatAntreanUMLA");
      const parsed = saved ? JSON.parse(saved) : [];
      const updated = [syncData, ...parsed];
      secureLocalStorage.setItem("riwayatAntreanUMLA", JSON.stringify(updated));
    } catch (e) {}

    // Sync with SRM Store Visits
    addVisit({
      id: Date.now().toString(),
      patientId: patient.id || patient.mrn,
      tanggalKunjungan: tanggal,
      dokterId: dokter || "DOK-UNKNOWN",
      operatorId: "SYSTEM",
      anamnesa: "Dari Portal Pasien: " + (opsional || serviceType || ""),
      pemeriksaanFisik: "",
      pemeriksaanPenunjang: serviceType === "Lab/Rad" ? opsional : "",
      diagnosis: "",
      terapi: "",
      tindakan: "",
      status: "Menunggu",
      totalBiaya: 0,
    });

    // Simulate API call delay
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
          Sdr/i <strong>{patient.name}</strong> telah terdaftar untuk layanan{" "}
          <strong>{serviceType}</strong>.
          {(serviceType === "Rawat Jalan" || serviceType === "Telemedisin") && (
            <span>
              <br />
              Kunjungan ke <strong>{poli}</strong> bersama{" "}
              <strong>{dokter}</strong>
            </span>
          )}
          <br />
          Pada tanggal <strong>{tanggal}</strong>.
        </p>
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl inline-block mb-8 text-left shadow-sm">
          <p className="text-emerald-800 font-medium text-sm mb-1">
            Nomor Antrian:
          </p>
          <p className="text-3xl font-black text-emerald-700 mb-2">
            {queueNumber}
          </p>
          <p className="text-xs text-emerald-600 border-t border-emerald-200/60 pt-2">
            Detail antrian telah dikirimkan ke WhatsApp Anda.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setIsSuccess(false);
              setServiceType(null);
              setPoli("");
              setDokter("");
              setTanggal("");
            }}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-lg text-sm font-semibold transition"
          >
            Kembali
          </button>

          <button
            onClick={() => {
              navigate({ to: "/pasien/dashboard" });
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
          >
            Ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarPlus className="w-6 h-6 text-emerald-600" /> Form Pendaftaran
          Berobat Online
        </h2>
        <p className="text-sm text-slate-500 mt-1 pb-4 border-b border-slate-100">
          Buat janji temu untuk berbagai layanan kesehatan secara online yang
          terintegrasi dengan Rekam Medis Anda.
        </p>
      </div>

      {!serviceType ? (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Pilih Jenis Layanan:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                id: "Rawat Jalan",
                icon: <Stethoscope className="w-6 h-6" />,
                desc: "Poli Spesialis & Umum",
                color: "text-emerald-600",
                bg: "bg-emerald-100",
              },
              {
                id: "Telemedisin",
                icon: <Video className="w-6 h-6" />,
                desc: "Konsultasi Online",
                color: "text-indigo-600",
                bg: "bg-indigo-100",
              },
              {
                id: "Lab/Rad",
                icon: <Microscope className="w-6 h-6" />,
                desc: "Laboratorium & Radiologi",
                color: "text-amber-600",
                bg: "bg-amber-100",
              },
              {
                id: "MCU",
                icon: <Activity className="w-6 h-6" />,
                desc: "Medical Check Up",
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                id: "Resep Iter",
                icon: <Pill className="w-6 h-6" />,
                desc: "Pengambilan Obat Rutin",
                color: "text-purple-600",
                bg: "bg-purple-100",
              },
              {
                id: "Home Care",
                icon: <HeartPulse className="w-6 h-6" />,
                desc: "Layanan ke Rumah",
                color: "text-rose-600",
                bg: "bg-rose-100",
              },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setServiceType(s.id)}
                className="bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all p-5 rounded-2xl text-left flex flex-col items-start gap-4 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${s.bg} ${s.color}`}
                >
                  {s.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{s.id}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Form Pendaftaran{" "}
              {serviceType}
            </h3>
            <button
              onClick={() => setServiceType(null)}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold hover:underline bg-emerald-50 px-3 py-1.5 rounded-lg"
            >
              Ganti Layanan
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 border border-red-100 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
              <FloatingSelect
                label="Penjaminan / Cara Bayar"
                value={penjaminan}
                onChange={(e: any) => setPenjaminan(e.target.value)}
                options={
                  <>
                    <option value="BPJS Kesehatan">BPJS Kesehatan</option>
                    <option value="Umum / Biaya Sendiri">
                      Umum / Biaya Sendiri
                    </option>
                    <option value="Asuransi Swasta">Asuransi Swasta</option>
                    <option value="Perusahaan">Perusahaan Mitra</option>
                  </>
                }
                required
              />

              {(serviceType === "Rawat Jalan" ||
                serviceType === "Telemedisin") && (
                <>
                  <FloatingSelect
                    label="Poliklinik Tujuan"
                    value={poli}
                    onChange={(e: any) => {
                      setPoli(e.target.value);
                      setDokter("");
                    }}
                    options={
                      <>
                        <option value="">-- Pilih Poliklinik --</option>
                        {POLIKLINIK.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </>
                    }
                    required
                  />

                  <FloatingSelect
                    label="Dokter Spesialis"
                    value={dokter}
                    onChange={(e: any) => setDokter(e.target.value)}
                    options={
                      <>
                        <option value="">-- Pilih Dokter --</option>
                        {poli &&
                          DOKTER[poli]?.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                      </>
                    }
                    disabled={!poli}
                    required
                  />
                </>
              )}

              {serviceType === "Lab/Rad" && (
                <FloatingInput
                  label="Jenis Pemeriksaan (Opsional)"
                  value={opsional}
                  onChange={(e: any) => setOpsional(e.target.value)}
                  placeholder="Contoh: Tes Darah Rutin, Rontgen Thorax, dll"
                />
              )}

              {serviceType === "MCU" && (
                <FloatingSelect
                  label="Paket MCU"
                  value={poli} /* Re-use poli state for this */
                  onChange={(e: any) => setPoli(e.target.value)}
                  options={
                    <>
                      <option value="">-- Pilih Paket --</option>
                      <option value="dasar">Paket Dasar (Basic)</option>
                      <option value="lengkap">
                        Paket Lengkap (Comprehensive)
                      </option>
                      <option value="jantung">Paket MCU Jantung</option>
                      <option value="karyawan">MCU Calon Karyawan</option>
                    </>
                  }
                  required
                />
              )}

              <FloatingInput
                label={`Tanggal ${serviceType === "Telemedisin" ? "Konsultasi" : "Pemeriksaan"}`}
                type="date"
                value={tanggal}
                min={today}
                onChange={(e: any) => setTanggal(e.target.value)}
                required
              />
            </div>

            <div className="pt-2 pb-2 text-center text-[11px] text-slate-500 px-4">
              Dengan mendaftar, Anda menyetujui{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Syarat, Ketentuan
              </a>{" "}
              dan{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Kebijakan Privasi
              </a>{" "}
              Layanan Medis RS UMLA.
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center shadow-sm active:scale-[0.98]"
              >
                <CalendarPlus className="w-5 h-5 mr-2" /> Konfirmasi Pendaftaran
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
