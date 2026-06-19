import { secureLocalStorage } from "../../utils/crypto";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from '@tanstack/react-router';
import {
  CalendarPlus,
  CheckCircle,
  User,
  Phone,
  MapPin,
  AlertCircle,
  FileText,
  XCircle,
  Printer,
  ArrowLeft,
  HeartPulse,
  CreditCard,
  Stethoscope,
  Star,
  History,
  X,
  LayoutDashboard,
  Bell,
  Video,
  Map,
} from "lucide-react";
import { POLIKLINIK, DOKTER } from "../../data/mockData";
import { QRCodeSVG } from "qrcode.react";
import { useSiteStore } from "../../store/siteStore";
import { useLangStore } from "../../store/langStore";
import { useSRMStore } from "../../store/srmStore";
import { t } from "../../utils/translations";

type MenuType =
  | "main"
  | "jkn"
  | "umum"
  | "eksekutif"
  | "batal"
  | "cetak"
  | "iter"
  | "mcu"
  | "donor"
  | "portal-pasien"
  | "notifikasi"
  | "telemedicine"
  | "peta-lacak";

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
  className = "",
  placeholder = " ",
}: any) => (
  <div className={`relative ${className}`}>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      readOnly={readOnly}
      required={required}
      placeholder={placeholder}
      className={`block px-3 pb-2.5 pt-4 w-full text-sm text-slate-900 ${readOnly ? "bg-slate-50" : "bg-white"} rounded-lg border border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer`}
    />
    <label
      htmlFor={id}
      className={`absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 left-2 cursor-text ${readOnly ? "bg-transparent" : "bg-white peer-focus:text-emerald-600"} ${
        type === "date" || value || readOnly
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
  <div className="relative">
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="block px-3 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer disabled:bg-slate-50 disabled:opacity-75"
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
  </div>
);

export default function PendaftaranOnline() {
  const { lang } = useLangStore();
  const { settings } = useSiteStore();
  const navigate = useNavigate();
  const srmDoctors = useSRMStore(state => state.doctors);
  const masterData = useSRMStore(state => state.masterData);

  const [activeMenu, setActiveMenu] = useState<MenuType>("main");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [historyAntrean, setHistoryAntrean] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = secureLocalStorage.getItem("riwayatAntreanUMLA");
    if (saved) {
      try {
        setHistoryAntrean(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const addToHistory = (data: any) => {
    const obj = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString(),
    };

    // Add to SRM Queue, Data Master & Visit as well if applicable
    if (data.nama) {
      const patientId =
        data.noBpjs ||
        data.identitas ||
        `RM-${Math.floor(1000 + Math.random() * 9000)}`;
      const srmState = useSRMStore.getState();

      // Auto-register patient to Master Data if not exists
      const existingPatient = srmState.patients.find(
        (p) => p.id === patientId || p.nik === patientId,
      );
      if (!existingPatient) {
        srmState.addPatient({
          id: patientId,
          nik: data.noBpjs || data.identitas || patientId.replace("RM-", ""),
          namaLengkap: data.nama,
          pekerjaan: "Belum bekerja / Lainnya",
          kotaLahir: "-",
          tanggalLahir: "1990-01-01",
          jenisKelamin: "L",
          statusPernikahan: "Belum Kawin",
          riwayatAlergi: "-",
          tanggalRegistrasi: new Date().toISOString().split("T")[0],
          jumlahKunjungan: 1,
        });
      }

      srmState.addQueue(patientId, data.nama);

      srmState.addVisit({
        id: Date.now().toString(),
        patientId: patientId,
        tanggalKunjungan:
          data.tanggal || new Date().toISOString().split("T")[0],
        dokterId: data.dokter || "DOK-UNKNOWN",
        operatorId: "SYSTEM",
        anamnesa:
          "Dari Pendaftaran Online: " +
          (data.layanan || data.jenis || data.poli || ""),
        pemeriksaanFisik: "",
        pemeriksaanPenunjang: "",
        diagnosis: "",
        terapi: "",
        tindakan: "",
        status: "Menunggu",
        totalBiaya: 0,
      });
    }

    setHistoryAntrean((prev) => {
      const updated = [obj, ...prev];
      secureLocalStorage.setItem("riwayatAntreanUMLA", JSON.stringify(updated));
      return updated;
    });
  };

  // Form States JKN
  const [noBpjs, setNoBpjs] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [asalRujukan, setAsalRujukan] = useState("");

  // Form States Umum/Non JKN
  const [identitas, setIdentitas] = useState("");
  const [penjaminan, setPenjaminan] = useState("");

  // Pasien Verification dummy state
  const [verifiedPatient, setVerifiedPatient] = useState<any>(null);

  // Layanan States
  const [poli, setPoli] = useState("");
  const [dokter, setDokter] = useState("");
  const [tanggal, setTanggal] = useState("");

  // Pembatalan
  const [alasanBatal, setAlasanBatal] = useState("");
  const [kodeBooking, setKodeBooking] = useState("");

  // Identitas & Status
  const [jenisIdentitas, setJenisIdentitas] = useState("RM");
  const [mcuPasienStatus, setMcuPasienStatus] = useState("lama");
  const [donorStatus, setDonorStatus] = useState("lama");

  // Additional Form Fields
  const [namaPasien, setNamaPasien] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [jk, setJk] = useState("LAKI-LAKI");
  const [pekerjaan, setPekerjaan] = useState("");
  const [wargaNegara, setWargaNegara] = useState("");
  const [agama, setAgama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [propinsi, setPropinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [noHp, setNoHp] = useState("");
  const [statusKawin, setStatusKawin] = useState("");
  const [jumlahAnak, setJumlahAnak] = useState("");
  const [golDarah, setGolDarah] = useState("");
  const [rhesus, setRhesus] = useState("Positif");
  const [tinggiBadan, setTinggiBadan] = useState("");
  const [beratBadan, setBeratBadan] = useState("");

  // Region Data
  const [provincesList, setProvincesList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);
  const [districtsList, setDistrictsList] = useState<any[]>([]);
  const [villagesList, setVillagesList] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((r) => r.json())
      .then((data) => setProvincesList(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (propinsi) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${propinsi}.json`,
      )
        .then((r) => r.json())
        .then((data) => setCitiesList(Array.isArray(data) ? data : []))
        .catch(console.error);
    } else {
      setCitiesList([]);
    }
  }, [propinsi]);

  useEffect(() => {
    if (kabupaten) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupaten}.json`,
      )
        .then((r) => r.json())
        .then((data) => setDistrictsList(Array.isArray(data) ? data : []))
        .catch(console.error);
    } else {
      setDistrictsList([]);
    }
  }, [kabupaten]);

  useEffect(() => {
    if (kecamatan) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan}.json`,
      )
        .then((r) => r.json())
        .then((data) => setVillagesList(Array.isArray(data) ? data : []))
        .catch(console.error);
    } else {
      setVillagesList([]);
    }
  }, [kecamatan]);

  // Date constraints
  const todayDate = new Date();
  const maxDate = new Date(todayDate);
  maxDate.setDate(todayDate.getDate() + 7);
  const minDateConfig = new Date(todayDate);
  minDateConfig.setDate(todayDate.getDate() + 1);

  const maxDateStr = maxDate.toISOString().split("T")[0];
  const minDateStr = minDateConfig.toISOString().split("T")[0];

  const resetState = () => {
    setStep(1);
    setError("");
    setIsSuccess(false);
    setVerifiedPatient(null);
    setSuccessData(null);
    setNoBpjs("");
    setTglLahir("");
    setAsalRujukan("");
    setIdentitas("");
    setPenjaminan("");
    setPoli("");
    setDokter("");
    setTanggal("");
    setAlasanBatal("");
    setKodeBooking("");
    setJenisIdentitas("RM");
    setMcuPasienStatus("lama");
    setDonorStatus("lama");
    setNamaPasien("");
    setTempatLahir("");
    setJk("LAKI-LAKI");
    setPekerjaan("");
    setWargaNegara("");
    setAgama("");
    setAlamat("");
    setPropinsi("");
    setKabupaten("");
    setKecamatan("");
    setKelurahan("");
    setNoHp("");
    setStatusKawin("");
    setJumlahAnak("");
    setGolDarah("");
    setRhesus("Positif");
    setTinggiBadan("");
    setBeratBadan("");
  };

  const handleMenuClick = (menu: MenuType) => {
    resetState();
    if (menu === "donor") {
      setJenisIdentitas("KTP");
    }
    setActiveMenu(menu);
  };

  const handleVerifyJKN = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!noBpjs || !tglLahir || !asalRujukan) {
      setError(
        t(
          lang,
          "Harap isi semua field pencarian.",
          "Please fill all search fields.",
        ),
      );
      return;
    }
    if (noBpjs.length !== 13) {
      setError(t(lang, "Nomor BPJS harus 13 digit angka.", "BPJS Number must be 13 digits."));
      return;
    }

    const patientsStore = useSRMStore.getState().patients;
    const found = patientsStore.find(p => p.id === noBpjs || p.nik === noBpjs);

    setVerifiedPatient({
      nama: found ? found.namaLengkap : "Pasien JKN (Data Sinkronisasi)",
      noBpjs,
      jenis: "Pasien Lama (Rujukan Lama)",
    });
    setStep(2);
  };

  const handleVerifyUmum = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!identitas || !tglLahir) {
      setError(
        t(
          lang,
          "Harap isi NIK/No.RM dan Tanggal Lahir.",
          "Please enter NIK/RM Number and Date of Birth.",
        ),
      );
      return;
    }

    if (jenisIdentitas === "KTP" && identitas.length !== 16) {
      setError(t(lang, "NIK KTP harus 16 digit angka.", "NIK KTP must be 16 digits."));
      return;
    }

    const patientsStore = useSRMStore.getState().patients;
    const found = patientsStore.find(p => p.id === identitas || p.nik === identitas);

    if (found) {
      setVerifiedPatient({
        nama: found.namaLengkap,
        identitas: found.id,
      });
      setStep(2);
    } else {
      setError(t(lang, "Data Pasien tidak ditemukan. Silakan periksa kembali.", "Patient data not found. Please check again."));
    }
  };

  const handleVerifyBatal = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!kodeBooking) {
      setError(
        t(
          lang,
          "Harap isi Nomor Booking / Rekam Medis.",
          "Please enter Booking / RM Number.",
        ),
      );
      return;
    }
    setVerifiedPatient({
      nama: "Budi Santoso",
      kodeBooking,
      poli: "Poli Penyakit Dalam",
      dokter: "dr. Dummy Sp.PD",
      tanggal: "2026-06-01",
    });
    setStep(2);
  };

  const handleVerifyCetak = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!kodeBooking) {
      setError(
        t(
          lang,
          "Harap isi Nomor Booking / Rekam Medis.",
          "Please enter Booking / RM Number.",
        ),
      );
      return;
    }
    setVerifiedPatient({
      nama: "Budi Santoso",
      kodeBooking,
      poli: "Poli Penyakit Dalam",
      dokter: "dr. Dummy Sp.PD",
      tanggal: "2026-06-01",
      noAntrian: "A-012",
    });
    setStep(2);
  };

  const handleSubmitDaftar = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (activeMenu === "umum" && !penjaminan) {
      setError(
        t(lang, "Harap pilih penjaminan.", "Please select payment method."),
      );
      return;
    }
    if (!tanggal || !poli || !dokter) {
      setError(
        t(
          lang,
          "Harap lengkapi tanggal, poli, dan dokter.",
          "Please complete date, clinic, and doctor.",
        ),
      );
      return;
    }
    if (tanggal < minDateStr || tanggal > maxDateStr) {
      setError(
        t(
          lang,
          "Tanggal berobat harus H-7 sampai H-1.",
          "Visit date must be D-7 to D-1.",
        ),
      );
      return;
    }

    // Success logic
    const generatedKode = `BKG-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    const generatedNoAntrian = `A-${Math.floor(Math.random() * 100)
      .toString()
      .padStart(3, "0")}`;

    const sData = {
      kodeBooking: generatedKode,
      noAntrian: generatedNoAntrian,
      nama: verifiedPatient.nama,
      identitas: verifiedPatient.identitas,
      noBpjs: verifiedPatient.noBpjs,
      poli,
      dokter,
      tanggal,
      penjaminan:
        activeMenu === "umum"
          ? penjaminan
          : activeMenu === "eksekutif"
            ? "Eksekutif"
            : "BPJS Kesehatan",
      layanan: "Rawat Jalan",
    };

    setSuccessData(sData);
    addToHistory(sData);
    setIsSuccess(true);
  };

  const handleSubmitBatal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alasanBatal) {
      setError(
        t(lang, "Pilih alasan pembatalan.", "Select cancellation reason."),
      );
      return;
    }
    setIsSuccess(true);
  };

  const submitIter = (e: React.FormEvent) => {
    e.preventDefault();
    addToHistory({
      kodeBooking: `ITR-${Math.floor(Math.random() * 10000)}`,
      nama: identitas || "Pasien Iter",
      jenis: "Resep Iter",
      tanggal: new Date().toISOString().split("T")[0],
    });
    setIsSuccess(true);
  };

  const submitMcuLama = (e: React.FormEvent) => {
    e.preventDefault();
    if (mcuPasienStatus === "baru") {
      setStep(2);
      return;
    }
    addToHistory({
      kodeBooking: `MCU-${Math.floor(Math.random() * 10000)}`,
      nama: identitas || "Pasien MCU",
      jenis: "Medical Check-Up",
      tanggal: new Date().toISOString().split("T")[0],
    });
    setIsSuccess(true);
  };

  const submitMcuBaru = (e: React.FormEvent) => {
    e.preventDefault();
    addToHistory({
      kodeBooking: `MCU-${Math.floor(Math.random() * 10000)}`,
      nama: namaPasien || "Pasien Baru MCU",
      jenis: "Medical Check-Up",
      tanggal: new Date().toISOString().split("T")[0],
    });
    setIsSuccess(true);
  };

  const submitDonorLama = (e: React.FormEvent) => {
    e.preventDefault();
    if (donorStatus === "baru") {
      setStep(2);
      return;
    }
    addToHistory({
      kodeBooking: `DNR-${Math.floor(Math.random() * 10000)}`,
      nama: identitas || "Pendonor Lama",
      jenis: "Donor Darah",
      tanggal: new Date().toISOString().split("T")[0],
    });
    setIsSuccess(true);
  };

  const submitDonorBaru = (e: React.FormEvent) => {
    e.preventDefault();
    addToHistory({
      kodeBooking: `DNR-${Math.floor(Math.random() * 10000)}`,
      nama: namaPasien || "Pendonor Baru",
      jenis: "Donor Darah",
      tanggal: new Date().toISOString().split("T")[0],
    });
    setIsSuccess(true);
  };

  const InfoTambahan = () => (
    <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
        {t(lang, "Informasi Tambahan", "Additional Information")}
      </h3>
      <ul className="space-y-3 text-sm text-slate-600 list-disc list-inside marker:text-emerald-500">
        <li>
          {t(
            lang,
            "Datang & check-in paling cepat 60 menit sebelum estimasi dilayani.",
            "Arrive & check-in at least 60 minutes before estimated service time.",
          )}
        </li>
        <li>
          {t(
            lang,
            "Gunakan mesin APM untuk check-in.",
            "Use the APM machine to check in.",
          )}
        </li>
        <li>
          {t(
            lang,
            "Pasien JKN wajib validasi biometrik (sidik jari/wajah).",
            "JKN patients must perform biometric validation (fingerprint/face).",
          )}
        </li>
        <li>
          {t(
            lang,
            "Pasien Asuransi validasi berkas di loket.",
            "Insurance patients validate documents at the counter.",
          )}
        </li>
        <li>
          {t(
            lang,
            "Pasien Umum tidak perlu validasi.",
            "General patients do not need validation.",
          )}
        </li>
        <li>
          {t(
            lang,
            "Jika kendala check-in → ke loket pendaftaran sesuai lantai poliklinik.",
            "If check-in issues arise → go to the registration counter on the respective clinic floor.",
          )}
        </li>
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {showHistory && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">
                Riwayat Nomor Antrean
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 -mr-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto bg-slate-50">
              {historyAntrean.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <span className="block text-4xl mb-2 opacity-50">📋</span>
                  Belum ada riwayat pendaftaran.
                </div>
              ) : (
                <div className="space-y-4">
                  {historyAntrean.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border text-left border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-slate-500 font-medium">
                            {item.createdAt}
                          </p>
                          <p className="font-bold text-slate-800">
                            {item.nama}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-emerald-600 font-bold uppercase mb-0.5">
                            {item.jenis || item.penjaminan || "Pendaftaran"}
                          </p>
                          {item.noAntrian && (
                            <span className="inline-block bg-rose-100 text-rose-700 font-black px-2 py-0.5 rounded text-sm font-mono">
                              {item.noAntrian}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 grid grid-cols-2 gap-y-1">
                        <div>
                          <span className="opacity-75">Booking:</span>{" "}
                          <span className="font-bold font-mono">
                            {item.kodeBooking}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="opacity-75">Tgl:</span>{" "}
                          <span className="font-bold">{item.tanggal}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="opacity-75">Klinik:</span>{" "}
                          {item.poli}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 text-center bg-white">
              <button
                onClick={() => setShowHistory(false)}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="py-6 px-6 w-full z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative min-h-[60px]">
          {activeMenu === "main" ? (
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-full bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium z-10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
            </Link>
          ) : (
            <button
              onClick={() => handleMenuClick("main")}
              className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-full bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium z-10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Pilihan Menu
            </button>
          )}
          <button
            onClick={() => setShowHistory(true)}
            className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-full bg-white text-slate-600 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm text-sm font-medium z-10"
          >
            <History className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Riwayat Antrean</span>
          </button>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-0 text-center flex flex-col items-center">
            {settings.logoPendaftaran && (
              <img
                src={settings.logoPendaftaran}
                alt="RS UMLA"
                className="h-14 md:h-16 object-contain mb-8"
              />
            )}
          </div>

          {activeMenu === "main" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  {t(
                    lang,
                    "Pilih Layanan Pendaftaran",
                    "Select Registration Service",
                  )}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => handleMenuClick("jkn")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Pasien JKN
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pasien lama dengan rujukan lama ke poli yang berbeda.
                  </p>
                </button>

                <button
                  onClick={() => handleMenuClick("umum")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Umum & Non JKN
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pendaftaran dengan biaya pribadi, asuransi lain, atau
                    tanggungan perusahaan.
                  </p>
                </button>

                <button
                  onClick={() => handleMenuClick("eksekutif")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Graha Amerta Eksekutif
                  </h3>
                  <p className="text-xs text-slate-500">
                    Layanan poliklinik eksekutif VVIP dan VIP.
                  </p>
                </button>

                <button
                  onClick={() => handleMenuClick("batal")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Pembatalan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Batalkan antrian yang sudah terdaftar.
                  </p>
                </button>

                <button
                  onClick={() => handleMenuClick("cetak")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Printer className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Cetak Nomor Antrian
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cetak ulang bukti pendaftaran dan antrian Anda.
                  </p>
                </button>

                <button
                  onClick={() => handleMenuClick("iter")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Resep Iter
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pendaftaran untuk pengambilan obat resep iteratif.
                  </p>
                </button>

                <button
                  onClick={() => handleMenuClick("mcu")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Pendaftaran MCU
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pendaftaran untuk Medical Check Up.
                  </p>
                </button>

                <button
                  onClick={() => handleMenuClick("donor")}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col h-full group"
                >
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    Pendaftaran Donor Darah
                  </h3>
                  <p className="text-xs text-slate-500">
                    Daftar secara online untuk melakukan donor darah.
                  </p>
                </button>
              </div>

              <InfoTambahan />
            </div>
          )}

          {/* Form JKN */}
          {activeMenu === "jkn" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <HeartPulse className="w-6 h-6 mr-3 text-emerald-600" />
                Pendaftaran Pasien JKN
              </h2>

              {!isSuccess ? (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}

                  {step === 1 && (
                    <form onSubmit={handleVerifyJKN} className="space-y-4">
                      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-4">
                        <strong>Perhatian:</strong> Pendaftaran ini hanya untuk
                        Pasien Lama (rujukan lama) ke poli berbeda. Untuk Pasien
                        Baru atau rujukan baru, silakan gunakan aplikasi{" "}
                        <strong>Mobile JKN</strong>.
                      </div>
                      <FloatingInput
                        id="noBpjs"
                        label="Nomor BPJS"
                        value={noBpjs}
                        onChange={(e: any) => setNoBpjs(e.target.value)}
                        required
                      />
                      <FloatingInput
                        id="tglLahirJkn"
                        label="Tanggal Lahir"
                        type="date"
                        value={tglLahir}
                        onChange={(e: any) => setTglLahir(e.target.value)}
                        required
                      />
                      <FloatingInput
                        id="asalRujukan"
                        label="Asal Rujukan (Faskes 1 / RS)"
                        value={asalRujukan}
                        onChange={(e: any) => setAsalRujukan(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                      >
                        Cari & Verifikasi Data
                      </button>
                    </form>
                  )}

                  {step === 2 && verifiedPatient && (
                    <form onSubmit={handleSubmitDaftar} className="space-y-4">
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl mb-4">
                        <p className="text-sm font-medium text-emerald-800">
                          Pasien Terverifikasi
                        </p>
                        <p className="font-bold text-lg text-emerald-900">
                          {verifiedPatient.nama}
                        </p>
                        <p className="text-xs text-emerald-700">
                          No BPJS: {verifiedPatient.noBpjs}
                        </p>
                      </div>

                      <FloatingInput
                        id="tanggalJkn"
                        label="Tanggal Berobat (H-7 s/d H-1)"
                        type="date"
                        min={minDateStr}
                        max={maxDateStr}
                        value={tanggal}
                        onChange={(e: any) => setTanggal(e.target.value)}
                        required
                      />
                      <FloatingSelect
                        id="poliJkn"
                        label="Pilih Poliklinik"
                        value={poli}
                        onChange={(e: any) => {
                          setPoli(e.target.value);
                          setDokter("");
                        }}
                        options={masterData?.poliklinik?.map((p: any) => (
                          <option key={p.id} value={p.Nama}>
                            {p.Nama}
                          </option>
                        )) || []}
                        required
                      />
                      <FloatingSelect
                        id="dokterJkn"
                        label="Pilih Dokter"
                        value={dokter}
                        onChange={(e: any) => setDokter(e.target.value)}
                        options={
                          poli
                            ? srmDoctors
                                .filter(d => d.spesialisasi && poli.toLowerCase().includes(d.spesialisasi.toLowerCase()))
                                .map((d: any) => (
                                  <option key={d.id} value={d.nama}>
                                    {d.nama}
                                  </option>
                                ))
                            : undefined
                        }
                        required
                        disabled={!poli}
                      />
                      <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                        Dengan mendaftar, Anda menyetujui{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Syarat, Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Kebijakan Privasi
                        </a>{" "}
                        Layanan Medis RS UMLA.
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-bold py-3 rounded-xl"
                        >
                          Kembali
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-emerald-600 text-white font-bold py-3 rounded-xl"
                        >
                          Daftar Berobat
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <SuccessBookingWidget data={successData} />
              )}
            </div>
          )}

          {/* Form Umum & Non JKN */}
          {activeMenu === "umum" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                Pendaftaran Umum & Non JKN
              </h2>

              {!isSuccess ? (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}

                  {step === 1 && (
                    <form onSubmit={handleVerifyUmum} className="space-y-4">
                      <FloatingSelect
                        id="jenisIdentitasUmum"
                        label="Pilih KTP / Rekam Medik"
                        value={jenisIdentitas}
                        onChange={(e: any) => setJenisIdentitas(e.target.value)}
                        options={
                          <>
                            <option value="RM">Rekam Medik</option>
                            <option value="KTP">KTP</option>
                          </>
                        }
                        required
                      />
                      <FloatingInput
                        id="identitasUmum"
                        label={`Nomor ${jenisIdentitas === "RM" ? "Rekam Medik" : "KTP"}`}
                        value={identitas}
                        onChange={(e: any) => setIdentitas(e.target.value)}
                        required
                      />
                      <FloatingInput
                        id="tglLahirUmum"
                        label="Tanggal Lahir"
                        type="date"
                        value={tglLahir}
                        onChange={(e: any) => setTglLahir(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                      >
                        Verifikasi Data
                      </button>
                    </form>
                  )}

                  {step === 2 && verifiedPatient && (
                    <form onSubmit={handleSubmitDaftar} className="space-y-4">
                      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4">
                        <p className="text-sm font-medium text-blue-800">
                          Review Pasien
                        </p>
                        <p className="font-bold text-lg text-blue-900">
                          {verifiedPatient.nama}
                        </p>
                        <p className="text-xs text-blue-700">
                          ID: {verifiedPatient.identitas}
                        </p>
                      </div>

                      <FloatingSelect
                        id="penjaminanUmum"
                        label="Pilih Penjaminan"
                        value={penjaminan}
                        onChange={(e: any) => setPenjaminan(e.target.value)}
                        options={
                          <>
                            <option value="Umum / Biaya Sendiri">
                              Umum / Biaya Sendiri
                            </option>
                            <option value="Asuransi Swasta">
                              Asuransi Swasta
                            </option>
                            <option value="Perusahaan">Perusahaan Mitra</option>
                          </>
                        }
                        required
                      />
                      <FloatingInput
                        id="tanggalUmum"
                        label="Tanggal Berobat (H-7 s/d H-1)"
                        type="date"
                        min={minDateStr}
                        max={maxDateStr}
                        value={tanggal}
                        onChange={(e: any) => setTanggal(e.target.value)}
                        required
                      />
                      <FloatingSelect
                        id="poliUmum"
                        label="Pilih Poliklinik"
                        value={poli}
                        onChange={(e: any) => {
                          setPoli(e.target.value);
                          setDokter("");
                        }}
                        options={masterData?.poliklinik?.map((p: any) => (
                          <option key={p.id} value={p.Nama}>
                            {p.Nama}
                          </option>
                        )) || []}
                        required
                      />
                      <FloatingSelect
                        id="dokterUmum"
                        label="Pilih Dokter"
                        value={dokter}
                        onChange={(e: any) => setDokter(e.target.value)}
                        options={
                          poli
                            ? srmDoctors
                                .filter(d => d.spesialisasi && poli.toLowerCase().includes(d.spesialisasi.toLowerCase()))
                                .map((d: any) => (
                                  <option key={d.id} value={d.nama}>
                                    {d.nama}
                                  </option>
                                ))
                            : undefined
                        }
                        required
                        disabled={!poli}
                      />
                      <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                        Dengan mendaftar, Anda menyetujui{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Syarat, Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Kebijakan Privasi
                        </a>{" "}
                        Layanan Medis RS UMLA.
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-bold py-3 rounded-xl"
                        >
                          Kembali
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-emerald-600 text-white font-bold py-3 rounded-xl"
                        >
                          Daftar Berobat
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <SuccessBookingWidget data={successData} />
              )}
            </div>
          )}

          {/* Form Eksekutif */}
          {activeMenu === "eksekutif" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-3 text-amber-500" />
                Graha Amerta Eksekutif
              </h2>

              {!isSuccess ? (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}

                  {step === 1 && (
                    <form onSubmit={handleVerifyUmum} className="space-y-4">
                      <FloatingInput
                        id="tipeKlinik"
                        label="Tipe Klinik"
                        value="Klinik Eksekutif (Graha Amerta)"
                        readOnly
                      />
                      <FloatingSelect
                        id="jenisIdentitasEks"
                        label="Pilih KTP / Rekam Medik"
                        value={jenisIdentitas}
                        onChange={(e: any) => setJenisIdentitas(e.target.value)}
                        options={
                          <>
                            <option value="RM">Rekam Medik</option>
                            <option value="KTP">KTP</option>
                          </>
                        }
                        required
                      />
                      <FloatingInput
                        id="identitasEks"
                        label={`Nomor ${jenisIdentitas === "RM" ? "Rekam Medik" : "KTP"}`}
                        value={identitas}
                        onChange={(e: any) => setIdentitas(e.target.value)}
                        required
                      />
                      <FloatingInput
                        id="tglLahirEks"
                        label="Tanggal Lahir"
                        type="date"
                        value={tglLahir}
                        onChange={(e: any) => setTglLahir(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                      >
                        Verifikasi & Lanjut
                      </button>
                    </form>
                  )}

                  {step === 2 && verifiedPatient && (
                    <form onSubmit={handleSubmitDaftar} className="space-y-4">
                      <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-4">
                        <p className="text-sm font-medium text-amber-800">
                          Pasien Terverifikasi (Eksekutif)
                        </p>
                        <p className="font-bold text-lg text-amber-900">
                          {verifiedPatient.nama}
                        </p>
                      </div>

                      <FloatingInput
                        id="tanggalEks"
                        label="Tanggal Berobat (H-7 s/d H-1)"
                        type="date"
                        min={minDateStr}
                        max={maxDateStr}
                        value={tanggal}
                        onChange={(e: any) => setTanggal(e.target.value)}
                        required
                      />
                      <FloatingSelect
                        id="poliEks"
                        label="Pilih Poliklinik Eksekutif"
                        value={poli}
                        onChange={(e: any) => {
                          setPoli(e.target.value);
                          setDokter("");
                        }}
                        options={
                          <>
                            <option value="Poli Eksekutif Jantung">
                              Poli Eksekutif Jantung
                            </option>
                            <option value="Poli Eksekutif Saraf">
                              Poli Eksekutif Saraf
                            </option>
                            <option value="Poli Eksekutif Anak">
                              Poli Eksekutif Anak
                            </option>
                          </>
                        }
                        required
                      />
                      <FloatingSelect
                        id="dokterEks"
                        label="Pilih Dokter Spesialis Eksklusif"
                        value={dokter}
                        onChange={(e: any) => setDokter(e.target.value)}
                        options={
                          poli ? (
                            <option value="dr. VIP Spesialis">
                              dr. VIP Spesialis
                            </option>
                          ) : undefined
                        }
                        required
                        disabled={!poli}
                      />
                      <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                        Dengan mendaftar, Anda menyetujui{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Syarat, Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Kebijakan Privasi
                        </a>{" "}
                        Layanan Medis RS UMLA.
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-bold py-3 rounded-xl"
                        >
                          Kembali
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                          Daftar Eksekutif
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <SuccessBookingWidget data={successData} />
              )}
            </div>
          )}

          {/* Form Pembatalan */}
          {activeMenu === "batal" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <XCircle className="w-6 h-6 mr-3" />
                Pembatalan Pendaftaran
              </h2>

              {!isSuccess ? (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}

                  {step === 1 && (
                    <form onSubmit={handleVerifyBatal} className="space-y-4">
                      <FloatingSelect
                        id="jenisIdentitasBatal"
                        label="Pilih KTP / Rekam Medik"
                        value={jenisIdentitas}
                        onChange={(e: any) => setJenisIdentitas(e.target.value)}
                        options={
                          <>
                            <option value="RM">Rekam Medik</option>
                            <option value="KTP">KTP</option>
                          </>
                        }
                        required
                      />
                      <FloatingInput
                        id="identitasBatal"
                        label={`Nomor ${jenisIdentitas === "RM" ? "Rekam Medik" : "KTP"}`}
                        value={identitas}
                        onChange={(e: any) => setIdentitas(e.target.value)}
                        required
                      />
                      <FloatingInput
                        id="tglLahirBatal"
                        label="Tanggal Lahir"
                        type="date"
                        value={tglLahir}
                        onChange={(e: any) => setTglLahir(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                      >
                        Proses Pengecekan
                      </button>
                    </form>
                  )}

                  {step === 2 && verifiedPatient && (
                    <form onSubmit={handleSubmitBatal} className="space-y-4">
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-4">
                        <p className="font-bold text-lg text-slate-800 mb-2">
                          Detail Pendaftaran
                        </p>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>
                            <span className="inline-block w-24">Nama</span>:{" "}
                            {verifiedPatient.nama}
                          </p>
                          <p>
                            <span className="inline-block w-24">Poli</span>:{" "}
                            {verifiedPatient.poli}
                          </p>
                          <p>
                            <span className="inline-block w-24">Dokter</span>:{" "}
                            {verifiedPatient.dokter}
                          </p>
                          <p>
                            <span className="inline-block w-24">Tanggal</span>:{" "}
                            <span className="font-bold text-slate-800">
                              {verifiedPatient.tanggal}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Alasan Pembatalan{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                          {[
                            "Sakit / Berhalangan hadir",
                            "Pindah rumah sakit lain",
                            "Kesalahan pilih jadwal/dokter",
                            "Lainnya",
                          ].map((al) => (
                            <label
                              key={al}
                              className="flex items-center space-x-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50"
                            >
                              <input
                                type="radio"
                                name="alasan"
                                value={al}
                                checked={alasanBatal === al}
                                onChange={() => setAlasanBatal(al)}
                                className="w-4 h-4 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-slate-700">{al}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-bold py-3 rounded-xl border-none"
                        >
                          Kembali
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                          Konfirmasi Batal
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Berhasil Dibatalkan
                  </h3>
                  <p className="text-slate-600 mb-8">
                    Pendaftaran atas nama{" "}
                    <strong>{verifiedPatient?.nama || "Pasien"}</strong> telah
                    sukses dibatalkan.
                  </p>
                  <button
                    onClick={() => handleMenuClick("main")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    Kembali ke Pilihan Menu
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Form Cetak Antrian */}
          {activeMenu === "cetak" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
                <Printer className="w-6 h-6 mr-3" />
                Cetak Nomor Antrian
              </h2>

              {!isSuccess && step === 1 && (
                <form onSubmit={handleVerifyCetak} className="space-y-4">
                  <FloatingSelect
                    id="jenisIdentitasCetak"
                    label="Pilih KTP / Rekam Medik"
                    value={jenisIdentitas}
                    onChange={(e: any) => setJenisIdentitas(e.target.value)}
                    options={
                      <>
                        <option value="RM">Rekam Medik</option>
                        <option value="KTP">KTP</option>
                      </>
                    }
                    required
                  />
                  <FloatingInput
                    id="identitasCetak"
                    label={`Nomor ${jenisIdentitas === "RM" ? "Rekam Medik" : "KTP"}`}
                    value={identitas}
                    onChange={(e: any) => setIdentitas(e.target.value)}
                    required
                  />
                  <FloatingInput
                    id="tglLahirCetak"
                    label="Tanggal Lahir"
                    type="date"
                    value={tglLahir}
                    onChange={(e: any) => setTglLahir(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                  >
                    Proses & Tampilkan
                  </button>
                </form>
              )}

              {step === 2 && verifiedPatient && !isSuccess && (
                <div className="text-center animate-in fade-in zoom-in-95">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 mb-6 max-w-sm mx-auto">
                    <p className="text-sm text-indigo-800 font-bold mb-1">
                      BUKTI PENDAFTARAN
                    </p>
                    <p className="text-3xl font-black text-indigo-900 mb-4">
                      {verifiedPatient.kodeBooking}
                    </p>

                    <div className="bg-white rounded-lg p-4 text-left border border-indigo-100 space-y-2 text-sm">
                      <p>
                        <span className="text-slate-500 text-xs block">
                          Nama Pasien
                        </span>
                        <span className="font-bold">
                          {verifiedPatient.nama}
                        </span>
                      </p>
                      <p>
                        <span className="text-slate-500 text-xs block">
                          Poliklinik
                        </span>
                        <span className="font-bold">
                          {verifiedPatient.poli}
                        </span>
                      </p>
                      <p>
                        <span className="text-slate-500 text-xs block">
                          Dokter
                        </span>
                        <span className="font-bold">
                          {verifiedPatient.dokter}
                        </span>
                      </p>
                      <p>
                        <span className="text-slate-500 text-xs block">
                          Jadwal Periksa
                        </span>
                        <span className="font-bold text-indigo-700">
                          {verifiedPatient.tanggal}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-bold py-3 px-6 rounded-xl"
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-bold py-3 px-8 rounded-xl items-center flex"
                    >
                      <Printer className="w-5 h-5 mr-2" />
                      Cetak Bukti
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Resep Iter */}
          {activeMenu === "iter" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-teal-700 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                Pendaftaran Pasien Resep Iter
              </h2>

              {!isSuccess ? (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}
                  {step === 1 && (
                    <form onSubmit={submitIter} className="space-y-4">
                      <FloatingInput
                        id="identitasIter"
                        label="Nomor Rekam Medik"
                        value={identitas}
                        onChange={(e: any) => setIdentitas(e.target.value)}
                        required
                      />
                      <FloatingInput
                        id="tglLahirIter"
                        label="Tanggal Lahir"
                        type="date"
                        value={tglLahir}
                        onChange={(e: any) => setTglLahir(e.target.value)}
                        required
                      />
                      <div className="text-center text-[11px] text-slate-500 px-4 mt-4 mb-2">
                        Dengan mendaftar, Anda menyetujui{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Syarat, Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Kebijakan Privasi
                        </a>{" "}
                        Layanan Medis RS UMLA.
                      </div>

                      <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                        Dengan mendaftar, Anda menyetujui{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Syarat, Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Kebijakan Privasi
                        </a>{" "}
                        Layanan Medis RS UMLA.
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                      >
                        Daftar Resep Iter
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Pendaftaran Iter Berhasil
                  </h3>
                  <button
                    onClick={() => handleMenuClick("main")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    Kembali ke Pilihan Menu
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Form Pendaftaran MCU */}
          {activeMenu === "mcu" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3" />
                Pendaftaran MCU
              </h2>

              {!isSuccess ? (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}
                  {step === 1 && (
                    <form onSubmit={submitMcuLama} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <label
                          className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all ${mcuPasienStatus === "lama" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}
                        >
                          <input
                            type="radio"
                            name="mcuStatus"
                            value="lama"
                            checked={mcuPasienStatus === "lama"}
                            onChange={() => {
                              setMcuPasienStatus("lama");
                              setStep(1);
                            }}
                            className="sr-only"
                          />
                          <span
                            className={`font-bold ${mcuPasienStatus === "lama" ? "text-emerald-700" : "text-slate-500"}`}
                          >
                            Pasien Lama
                          </span>
                        </label>
                        <label
                          className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all ${mcuPasienStatus === "baru" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}
                        >
                          <input
                            type="radio"
                            name="mcuStatus"
                            value="baru"
                            checked={mcuPasienStatus === "baru"}
                            onChange={() => {
                              setMcuPasienStatus("baru");
                              setStep(1);
                            }}
                            className="sr-only"
                          />
                          <span
                            className={`font-bold ${mcuPasienStatus === "baru" ? "text-emerald-700" : "text-slate-500"}`}
                          >
                            Pasien Baru
                          </span>
                        </label>
                      </div>

                      {mcuPasienStatus === "lama" ? (
                        <>
                          <FloatingSelect
                            id="jenisIdentitasMcu"
                            label="Pilih KTP / Rekam Medik"
                            value={jenisIdentitas}
                            onChange={(e: any) =>
                              setJenisIdentitas(e.target.value)
                            }
                            options={
                              <>
                                <option value="RM">Rekam Medik</option>
                                <option value="KTP">KTP</option>
                              </>
                            }
                            required
                          />
                          <FloatingInput
                            id="identitasMcu"
                            label={`Nomor ${jenisIdentitas === "RM" ? "Rekam Medik" : "KTP"}`}
                            value={identitas}
                            onChange={(e: any) => setIdentitas(e.target.value)}
                            required
                          />
                          <FloatingInput
                            id="tglLahirMcu"
                            label="Tanggal Lahir"
                            type="date"
                            value={tglLahir}
                            onChange={(e: any) => setTglLahir(e.target.value)}
                            required
                          />

                          <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                            Dengan mendaftar, Anda menyetujui{" "}
                            <a
                              href="#"
                              className="text-emerald-600 hover:underline"
                            >
                              Syarat, Ketentuan
                            </a>{" "}
                            dan{" "}
                            <a
                              href="#"
                              className="text-emerald-600 hover:underline"
                            >
                              Kebijakan Privasi
                            </a>{" "}
                            Layanan Medis RS UMLA.
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                          >
                            Daftar MCU
                          </button>
                        </>
                      ) : (
                        <>
                          <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">
                            1. Data Pribadi
                          </h4>
                          <FloatingInput
                            id="nikMcuBaru"
                            label="No. Induk Kependudukan (KTP)"
                            value={identitas}
                            onChange={(e: any) => setIdentitas(e.target.value)}
                            required
                          />
                          <FloatingInput
                            id="namaMcu"
                            label="Nama Pasien"
                            value={namaPasien}
                            onChange={(e: any) => setNamaPasien(e.target.value)}
                            required
                          />
                          <FloatingInput
                            id="tempatLahirMcu"
                            label="Tempat Lahir"
                            value={tempatLahir}
                            onChange={(e: any) =>
                              setTempatLahir(e.target.value)
                            }
                            required
                          />
                          <FloatingInput
                            id="tglLahirBaruMcu"
                            type="date"
                            label="Tanggal Lahir"
                            value={tglLahir}
                            onChange={(e: any) => setTglLahir(e.target.value)}
                            required
                          />

                          <div className="pt-2 pb-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Jenis Kelamin *
                            </label>
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="LAKI-LAKI"
                                  checked={jk === "LAKI-LAKI"}
                                  onChange={(e) => setJk(e.target.value)}
                                  className="text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                                  required
                                />
                                <span className="text-sm font-medium">
                                  LAKI-LAKI
                                </span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="PEREMPUAN"
                                  checked={jk === "PEREMPUAN"}
                                  onChange={(e) => setJk(e.target.value)}
                                  className="text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                                  required
                                />
                                <span className="text-sm font-medium">
                                  PEREMPUAN
                                </span>
                              </label>
                            </div>
                          </div>

                          <FloatingSelect
                            id="kerjaMcu"
                            label="Pekerjaan"
                            value={pekerjaan}
                            onChange={(e: any) => setPekerjaan(e.target.value)}
                            options={
                              <>
                                <option value="PNS">PNS</option>
                                <option value="Swasta">Swasta</option>
                                <option value="Wiraswasta">Wiraswasta</option>
                                <option value="Lainnya">Lainnya</option>
                              </>
                            }
                            required
                          />
                          <FloatingSelect
                            id="wnMcu"
                            label="Warga Negara"
                            value={wargaNegara}
                            onChange={(e: any) =>
                              setWargaNegara(e.target.value)
                            }
                            options={
                              <>
                                <option value="WNI">WNI</option>
                                <option value="WNA">WNA</option>
                              </>
                            }
                            required
                          />
                          <FloatingSelect
                            id="agamaMcu"
                            label="Agama"
                            value={agama}
                            onChange={(e: any) => setAgama(e.target.value)}
                            options={
                              <>
                                <option value="Islam">Islam</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Konghucu">Konghucu</option>
                              </>
                            }
                            required
                          />
                          <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                          >
                            Lanjut
                          </button>
                        </>
                      )}
                    </form>
                  )}

                  {step === 2 && mcuPasienStatus === "baru" && (
                    <form onSubmit={submitMcuBaru} className="space-y-4">
                      <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">
                        2. Alamat dan Kontak
                      </h4>

                      <FloatingInput
                        id="alamatMcu"
                        label="Alamat Lengkap Pasien Sesuai KTP"
                        value={alamat}
                        onChange={(e: any) => setAlamat(e.target.value)}
                        required
                      />
                      <FloatingSelect
                        id="propinsiMcu"
                        label="Propinsi"
                        value={propinsi}
                        onChange={(e: any) => {
                          setPropinsi(e.target.value);
                          setKabupaten("");
                          setKecamatan("");
                          setKelurahan("");
                        }}
                        options={
                          <>
                            <option value="" disabled>
                              Pilih Salah Satu
                            </option>
                            {provincesList.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </>
                        }
                        required
                      />
                      <FloatingSelect
                        id="kabMcu"
                        label="Kabupaten / Kota"
                        value={kabupaten}
                        onChange={(e: any) => {
                          setKabupaten(e.target.value);
                          setKecamatan("");
                          setKelurahan("");
                        }}
                        options={
                          <>
                            <option value="" disabled>
                              Pilih Salah Satu
                            </option>
                            {citiesList.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </>
                        }
                        required
                      />
                      <FloatingSelect
                        id="kecMcu"
                        label="Kecamatan"
                        value={kecamatan}
                        onChange={(e: any) => {
                          setKecamatan(e.target.value);
                          setKelurahan("");
                        }}
                        options={
                          <>
                            <option value="" disabled>
                              Pilih Salah Satu
                            </option>
                            {districtsList.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </>
                        }
                        required
                      />
                      <FloatingInput
                        id="hpMcu"
                        label="No. Mobile Pasien / Whatsapp"
                        type="tel"
                        value={noHp}
                        onChange={(e: any) => setNoHp(e.target.value)}
                        required
                      />

                      <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                        Dengan mendaftar, Anda menyetujui{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Syarat, Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Kebijakan Privasi
                        </a>{" "}
                        Layanan Medis RS UMLA.
                      </div>
                      <div className="flex gap-4 pt-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-bold py-3 rounded-xl"
                        >
                          Kembali
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                          Selesai & Daftar
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Pendaftaran MCU Berhasil
                  </h3>
                  <button
                    onClick={() => handleMenuClick("main")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    Kembali ke Pilihan Menu
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Form Pendaftaran Donor Darah */}
          {activeMenu === "donor" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-rose-700 mb-6 flex items-center">
                <HeartPulse className="w-6 h-6 mr-3" />
                Pendaftaran Donor Darah
              </h2>

              {!isSuccess ? (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}
                  {step === 1 && (
                    <form onSubmit={submitDonorLama} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <label
                          className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all ${donorStatus === "lama" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}
                        >
                          <input
                            type="radio"
                            name="donorStatus"
                            value="lama"
                            checked={donorStatus === "lama"}
                            onChange={() => {
                              setDonorStatus("lama");
                              setStep(1);
                            }}
                            className="sr-only"
                          />
                          <span
                            className={`font-bold ${donorStatus === "lama" ? "text-emerald-700" : "text-slate-500"}`}
                          >
                            Pendonor Lama
                          </span>
                        </label>
                        <label
                          className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all ${donorStatus === "baru" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}
                        >
                          <input
                            type="radio"
                            name="donorStatus"
                            value="baru"
                            checked={donorStatus === "baru"}
                            onChange={() => {
                              setDonorStatus("baru");
                              setStep(1);
                            }}
                            className="sr-only"
                          />
                          <span
                            className={`font-bold ${donorStatus === "baru" ? "text-emerald-700" : "text-slate-500"}`}
                          >
                            Pendonor Baru
                          </span>
                        </label>
                      </div>

                      {donorStatus === "lama" ? (
                        <>
                          <FloatingSelect
                            id="jenisIdentitasDonor"
                            label="Pilih KTP / Nomor Pendonor"
                            value={jenisIdentitas}
                            onChange={(e: any) =>
                              setJenisIdentitas(e.target.value)
                            }
                            options={
                              <>
                                <option value="Nomor Pendonor">
                                  Nomor Pendonor
                                </option>
                                <option value="KTP">KTP</option>
                              </>
                            }
                            required
                          />
                          <FloatingInput
                            id="identitasDonor"
                            label={`Nomor ${jenisIdentitas === "Nomor Pendonor" ? "Pendonor" : "KTP"}`}
                            value={identitas}
                            onChange={(e: any) => setIdentitas(e.target.value)}
                            required
                          />
                          <FloatingInput
                            id="tglLahirDonor"
                            label="Tanggal Lahir"
                            type="date"
                            value={tglLahir}
                            onChange={(e: any) => setTglLahir(e.target.value)}
                            required
                          />

                          <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                            Dengan mendaftar, Anda menyetujui{" "}
                            <a
                              href="#"
                              className="text-emerald-600 hover:underline"
                            >
                              Syarat, Ketentuan
                            </a>{" "}
                            dan{" "}
                            <a
                              href="#"
                              className="text-emerald-600 hover:underline"
                            >
                              Kebijakan Privasi
                            </a>{" "}
                            Layanan Medis RS UMLA.
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                          >
                            Daftar Donor Darah
                          </button>
                        </>
                      ) : (
                        <>
                          <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">
                            1. Data Pribadi
                          </h4>

                          <FloatingSelect
                            id="jenisIdentitasVal"
                            label="Pilih Salah Satu Identitas"
                            value={jenisIdentitas}
                            onChange={(e: any) =>
                              setJenisIdentitas(e.target.value)
                            }
                            options={
                              <>
                                <option value="KTP">KTP</option>
                                <option value="Paspor">Paspor</option>
                              </>
                            }
                            required
                          />
                          <FloatingInput
                            id="nikDonor"
                            label="No. Induk Kependudukan / Identitas"
                            value={identitas}
                            onChange={(e: any) => setIdentitas(e.target.value)}
                            required
                          />
                          <FloatingInput
                            id="namaDonor"
                            label="Nama Lengkap"
                            value={namaPasien}
                            onChange={(e: any) => setNamaPasien(e.target.value)}
                            required
                          />
                          <FloatingInput
                            id="tmpLahirDonor"
                            label="Tempat Lahir"
                            value={tempatLahir}
                            onChange={(e: any) =>
                              setTempatLahir(e.target.value)
                            }
                            required
                          />
                          <FloatingInput
                            id="tglLahirBaruDonor"
                            type="date"
                            label="Tanggal Lahir"
                            value={tglLahir}
                            onChange={(e: any) => setTglLahir(e.target.value)}
                            required
                          />

                          <div className="pt-2 pb-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Jenis Kelamin *
                            </label>
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="LAKI-LAKI"
                                  checked={jk === "LAKI-LAKI"}
                                  onChange={(e) => setJk(e.target.value)}
                                  className="text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                                  required
                                />
                                <span className="text-sm font-medium">
                                  LAKI-LAKI
                                </span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="PEREMPUAN"
                                  checked={jk === "PEREMPUAN"}
                                  onChange={(e) => setJk(e.target.value)}
                                  className="text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                                  required
                                />
                                <span className="text-sm font-medium">
                                  PEREMPUAN
                                </span>
                              </label>
                            </div>
                          </div>

                          <FloatingSelect
                            id="kerjaDonor"
                            label="Pekerjaan"
                            value={pekerjaan}
                            onChange={(e: any) => setPekerjaan(e.target.value)}
                            options={
                              <>
                                <option value="PNS">PNS</option>
                                <option value="Swasta">Swasta</option>
                                <option value="Wiraswasta">Wiraswasta</option>
                                <option value="Lainnya">Lainnya</option>
                              </>
                            }
                            required
                          />
                          <FloatingSelect
                            id="agamaDonor"
                            label="Agama"
                            value={agama}
                            onChange={(e: any) => setAgama(e.target.value)}
                            options={
                              <>
                                <option value="Islam">Islam</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Konghucu">Konghucu</option>
                              </>
                            }
                            required
                          />
                          <FloatingSelect
                            id="kawinDonor"
                            label="Status Perkawinan"
                            value={statusKawin}
                            onChange={(e: any) =>
                              setStatusKawin(e.target.value)
                            }
                            options={
                              <>
                                <option value="Belum Kawin">Belum Kawin</option>
                                <option value="Kawin">Kawin</option>
                                <option value="Cerai Hidup">Cerai Hidup</option>
                                <option value="Cerai Mati">Cerai Mati</option>
                              </>
                            }
                            required
                          />
                          <FloatingInput
                            id="jmlAnakDonor"
                            label="Jumlah Anak (Optional)"
                            type="number"
                            min="0"
                            value={jumlahAnak}
                            onChange={(e: any) => setJumlahAnak(e.target.value)}
                          />
                          <FloatingSelect
                            id="golDarahDonor"
                            label="Golongan Darah"
                            value={golDarah}
                            onChange={(e: any) => setGolDarah(e.target.value)}
                            options={
                              <>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                              </>
                            }
                            required
                          />

                          <div className="pt-2 pb-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Rhesus *
                            </label>
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="Positif"
                                  checked={rhesus === "Positif"}
                                  onChange={(e) => setRhesus(e.target.value)}
                                  className="text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                                  required
                                />
                                <span className="text-sm font-medium">
                                  Positif
                                </span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="Negatif"
                                  checked={rhesus === "Negatif"}
                                  onChange={(e) => setRhesus(e.target.value)}
                                  className="text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                                  required
                                />
                                <span className="text-sm font-medium">
                                  Negatif
                                </span>
                              </label>
                            </div>
                          </div>

                          <FloatingInput
                            id="tbDonor"
                            label="Tinggi Badan (cm)"
                            type="number"
                            min="0"
                            value={tinggiBadan}
                            onChange={(e: any) =>
                              setTinggiBadan(e.target.value)
                            }
                            required
                          />
                          <FloatingInput
                            id="bbDonor"
                            label="Berat Badan (kg)"
                            type="number"
                            min="0"
                            value={beratBadan}
                            onChange={(e: any) => setBeratBadan(e.target.value)}
                            required
                          />

                          <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                          >
                            Lanjut
                          </button>
                        </>
                      )}
                    </form>
                  )}

                  {step === 2 && donorStatus === "baru" && (
                    <form onSubmit={submitDonorBaru} className="space-y-4">
                      <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">
                        2. Alamat dan Kontak
                      </h4>

                      <FloatingInput
                        id="alamatDonor"
                        label="Alamat Lengkap Pasien Sesuai KTP"
                        value={alamat}
                        onChange={(e: any) => setAlamat(e.target.value)}
                        required
                      />
                      <FloatingSelect
                        id="propinsiDonor"
                        label="Propinsi"
                        value={propinsi}
                        onChange={(e: any) => {
                          setPropinsi(e.target.value);
                          setKabupaten("");
                          setKecamatan("");
                          setKelurahan("");
                        }}
                        options={
                          <>
                            <option value="" disabled>
                              Pilih Salah Satu
                            </option>
                            {provincesList.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </>
                        }
                        required
                      />
                      <FloatingSelect
                        id="kabDonor"
                        label="Kabupaten / Kota"
                        value={kabupaten}
                        onChange={(e: any) => {
                          setKabupaten(e.target.value);
                          setKecamatan("");
                          setKelurahan("");
                        }}
                        options={
                          <>
                            <option value="" disabled>
                              Pilih Salah Satu
                            </option>
                            {citiesList.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </>
                        }
                        required
                      />
                      <FloatingSelect
                        id="kecDonor"
                        label="Kecamatan"
                        value={kecamatan}
                        onChange={(e: any) => {
                          setKecamatan(e.target.value);
                          setKelurahan("");
                        }}
                        options={
                          <>
                            <option value="" disabled>
                              Pilih Salah Satu
                            </option>
                            {districtsList.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </>
                        }
                        required
                      />
                      <FloatingSelect
                        id="kelDonor"
                        label="Kelurahan"
                        value={kelurahan}
                        onChange={(e: any) => setKelurahan(e.target.value)}
                        options={
                          <>
                            <option value="" disabled>
                              Pilih Salah Satu
                            </option>
                            {villagesList.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </>
                        }
                        required
                      />
                      <FloatingInput
                        id="hpDonor"
                        label="No. Mobile Pasien / Whatsapp"
                        type="tel"
                        value={noHp}
                        onChange={(e: any) => setNoHp(e.target.value)}
                        required
                      />

                      <div className="pt-2 pb-2 text-center text-[10px] sm:text-[11px] text-slate-500 px-2 mt-4 -mb-2">
                        Dengan mendaftar, Anda menyetujui{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Syarat, Ketentuan
                        </a>{" "}
                        dan{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Kebijakan Privasi
                        </a>{" "}
                        Layanan Medis RS UMLA.
                      </div>
                      <div className="flex gap-4 pt-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-bold py-3 rounded-xl"
                        >
                          Kembali
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                          Selesai & Daftar
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Pendaftaran Donor Darah Berhasil
                  </h3>
                  <button
                    onClick={() => handleMenuClick("main")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    Kembali ke Pilihan Menu
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SuccessBookingWidget({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="text-center animate-in fade-in zoom-in-95">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        Pendaftaran Berhasil!
      </h3>
      <p className="text-slate-600 mb-6">
        Berikut adalah detail reservasi kunjungan Anda.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8 max-w-sm mx-auto text-left relative overflow-hidden">
        <div className="text-center mb-6">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
            Kode Booking
          </p>
          <div className="text-3xl font-black text-emerald-700 font-mono tracking-tight pb-4">
            {data.kodeBooking}
          </div>
          
          {/* QR Code Segment */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm inline-block">
               <QRCodeSVG value={data.kodeBooking || "MEDITECH-000"} size={120} level="H" />
            </div>
          </div>
          <p className="text-xs text-slate-400">Tunjukkan QR Code ini pada mesin APM</p>
        </div>
        {data.noAntrian && (
          <div className="text-center mb-6">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Nomor Antrian
            </p>
            <div className="text-4xl font-black text-rose-600 font-mono tracking-tight">
              {data.noAntrian}
            </div>
          </div>
        )}

        <div className="space-y-3 text-sm border-t border-slate-200 pt-4">
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Pasien</span>
            <span className="font-bold text-slate-800 text-right">
              {data.nama}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Klinik Tujuan</span>
            <span className="font-bold text-slate-800 text-right">
              {data.poli}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Dokter</span>
            <span className="font-bold text-slate-800 text-right">
              {data.dokter}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Tanggal</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-xs">
              {data.tanggal}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Penjaminan</span>
            <span className="font-bold text-slate-800 text-right">
              {data.penjaminan}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-emerald-100 text-emerald-700 font-bold py-3 px-6 rounded-xl hover:bg-emerald-200 transition-colors"
        >
          Selesai
        </button>
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl flex items-center hover:bg-emerald-700 transition-colors"
        >
          <Printer className="w-5 h-5 mr-2" />
          Cetak Bukti
        </button>
      </div>
    </div>
  );
}
