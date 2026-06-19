import { secureLocalStorage } from "../../utils/crypto";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from '@tanstack/react-router';
import { DUMMY_PATIENT } from "../../data/mockData";
import {
  Eye,
  EyeOff,
  QrCode,
  ArrowLeft,
  X,
  Lock,
  Mail,
  Users,
  MonitorSmartphone,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { useSiteStore } from "../../store/siteStore";
import { useSRMStore } from "../../store/srmStore";

export default function PortalLogin() {
  const { settings } = useSiteStore();
  const patients = useSRMStore((state) => state.patients);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    identifier: patients.length > 0 ? patients[0].nik : "3512XXXXXXXX0001",
    password: "password123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [bantuanView, setBantuanView] = useState<
    "none" | "menu" | "forgot_password" | "forgot_rm" | "verification_code"
  >("none");
  const [verifyMode, setVerifyMode] = useState<"password" | "rm">("password");
  const [error, setError] = useState("");
  const [resetInput, setResetInput] = useState("");
  const [countdown, setCountdown] = useState(90);

  const [showQrModal, setShowQrModal] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [qrTimer, setQrTimer] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showQrModal) {
      const generateQr = () => `RSUMLA-LOGIN-${Date.now()}`;
      setQrValue(generateQr());
      setQrTimer(30);

      timer = setInterval(() => {
        setQrTimer((prev) => {
          if (prev <= 1) {
            setQrValue(generateQr());
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQrModal]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bantuanView === "verification_code" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [bantuanView, countdown]);

  const handleLanjutClickPassword = () => {
    setCountdown(90);
    setVerifyMode("password");
    setBantuanView("verification_code");
  };

  const handleLanjutClickRM = () => {
    setCountdown(90);
    setVerifyMode("rm");
    setBantuanView("verification_code");
  };

  const maskContact = (contact: string) => {
    if (!contact) return "k*****@a*******.sch.id"; // Default for mockup

    if (contact.includes("@")) {
      const [name, domain] = contact.split("@");
      if (!name || !domain) return contact;
      // Masking like k*****
      const maskName =
        name[0] + "*".repeat(name.length - 1 > 0 ? name.length - 1 : 4);
      const domainParts = domain.split(".");
      if (domainParts.length < 2) return contact;
      const maskDomainName =
        domainParts[0][0] +
        "*".repeat(
          domainParts[0].length - 1 > 0 ? domainParts[0].length - 1 : 6,
        );
      const maskDomain = `${maskDomainName}.${domainParts.slice(1).join(".")}`;
      return `${maskName}@${maskDomain}`;
    } else {
      // Assuming phone number (+62... or 08...)
      if (contact.length >= 8) {
        return (
          contact.substring(0, 4) +
          "*".repeat(contact.length - 6 > 0 ? contact.length - 6 : 4) +
          contact.substring(contact.length - 2)
        );
      }
      return contact;
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.identifier || !form.password) {
      setError("Harap isi NIK/No. RM dan Kata Sandi.");
      return;
    }

    const foundPatient = patients.find(
      (p) => p.nik === form.identifier || p.id === form.identifier,
    );
    if (foundPatient) {
      const sessionPatient = {
        id: foundPatient.id,
        mrn: foundPatient.id,
        nik: foundPatient.nik,
        name: foundPatient.namaLengkap,
        dob: foundPatient.tanggalLahir,
        gender: foundPatient.jenisKelamin,
        bloodType: "-",
        address: foundPatient.kotaLahir || "-",
      };
      secureLocalStorage.setItem(
        "patient_session",
        JSON.stringify(sessionPatient),
      );
      navigate({ to: "/pasien/dashboard" });
      return;
    }

    // Default fallback
    secureLocalStorage.setItem(
      "patient_session",
      JSON.stringify(DUMMY_PATIENT),
    );
    navigate({ to: "/pasien/dashboard" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-6 pb-12 px-6 relative">
      <header className="w-full z-10 mb-8 sm:mb-16">
        <div className="max-w-7xl mx-auto flex items-center relative min-h-[60px]">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-full bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium z-10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center flex flex-col items-center">
        {settings.logoPortalPasien && (
          <img
            src={settings.logoPortalPasien}
            alt="RS UMLA"
            className="h-14 md:h-16 object-contain"
          />
        )}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Simulation Dropdown */}
        <div className="mb-4 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex flex-col gap-2 relative z-50">
          <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
            <Users className="w-4 h-4" /> Login Cepat (Simulasi SRM Data)
          </div>
          <select
            className="w-full border-emerald-200 bg-white rounded p-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500"
            onChange={(e) => handleChange("identifier", e.target.value)}
            value={form.identifier}
          >
            {patients.map((p) => (
              <option key={p.id} value={p.nik}>
                {p.namaLengkap} - {p.nik} ({p.id})
              </option>
            ))}
          </select>
          <p className="text-[10px] text-emerald-600">
            Pilih pasien untuk mengisi NIK otomatis
          </p>
        </div>

        <div className="bg-white py-8 px-8 shadow-sm sm:rounded-sm border border-slate-200">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-normal text-slate-800">
              Portal Pasien
            </h2>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setShowQrModal(!showQrModal)}
            >
              <div className="relative text-emerald-600 font-medium hidden sm:block bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-sm leading-snug text-center text-xs">
                {showQrModal ? (
                  <>
                    Login dengan <br /> Nomor RM/ Nomor KTP
                  </>
                ) : (
                  <>
                    Scan dengan aplikasi <br /> MyRS UMLA
                  </>
                )}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-50 border-t border-r border-emerald-200 rotate-45"></div>
              </div>
              {showQrModal ? (
                <MonitorSmartphone className="w-10 h-10 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
              ) : (
                <QrCode className="w-10 h-10 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
              )}
            </div>
          </div>

          {showQrModal ? (
            <div className="flex flex-col items-center justify-center pt-2 pb-6 min-h-[300px] animate-in fade-in duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative">
                  <QRCodeSVG
                    value={qrValue}
                    size={200}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src:
                        settings.logoHomepage ||
                        settings.logoUrl ||
                        "/logo-rsumla.png",
                      height: 48,
                      width: 48,
                      excavate: true,
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-end mb-4 px-2">
                <button
                  type="button"
                  onClick={() => setBantuanView("menu")}
                  className="font-medium text-emerald-600 hover:text-emerald-700 text-sm"
                >
                  Butuh bantuan?
                </button>
              </div>

              <p className="text-center text-[13px] text-slate-500 mb-6 px-4">
                Buka aplikasi{" "}
                <span className="font-bold text-slate-700">MyRS UMLA</span> di
                ponsel Anda, pilih menu Scan QR, lalu arahkan kamera ke kode di
                atas.
              </p>

              {/* Terms and Privacy */}
              <div className="mt-4 text-center text-[11px] text-slate-500 px-4 w-full">
                Dengan login, kamu menyetujui{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Syarat, Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Kebijakan Privasi
                </a>{" "}
                Portal Pasien RS UMLA.
              </div>

              {/* Register */}
              <div className="mt-6 text-center text-sm text-slate-500 w-full">
                Baru di Portal Pasien?{" "}
                <Link
                  to="/pendaftaran-online"
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Daftar
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="space-y-5 animate-in fade-in duration-300"
              onSubmit={handleSubmit}
            >
              {/* Identifier Input */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    id="identifier"
                    type="text"
                    required
                    placeholder=" "
                    className="peer focus:ring-0 focus:border-emerald-500 block w-full sm:text-base border-slate-300 rounded-sm py-3 px-4 border text-slate-800 transition-colors outline-none appearance-none"
                    value={form.identifier}
                    onChange={(e) => handleChange("identifier", e.target.value)}
                  />
                  <label
                    htmlFor="identifier"
                    className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text"
                  >
                    Nomor RM/ Nomor KTP
                  </label>
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder=" "
                    className="peer focus:ring-0 focus:border-emerald-500 block w-full sm:text-base border-slate-300 rounded-sm py-3 px-4 pr-12 border text-slate-800 transition-colors outline-none appearance-none"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text"
                  >
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 outline-none z-20"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-sm px-3 py-2 text-center font-medium">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all focus:outline-none"
                >
                  LOG IN
                </button>
              </div>

              {/* Bantuan */}
              <div className="flex items-center justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setBantuanView("menu")}
                  className="font-medium text-emerald-600 hover:text-emerald-700 text-sm"
                >
                  Butuh bantuan?
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="mt-8 text-center text-[11px] text-slate-500 px-4">
                Dengan login, kamu menyetujui{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Syarat, Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Kebijakan Privasi
                </a>{" "}
                Portal Pasien RS UMLA.
              </div>

              {/* Register */}
              <div className="mt-6 text-center text-sm text-slate-500">
                Baru di Portal Pasien?{" "}
                <Link
                  to="/pendaftaran-online"
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Daftar
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Modal Bantuan */}
      {bantuanView !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {bantuanView === "menu" && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">
                    Butuh bantuan apa?
                  </h3>
                  <button
                    onClick={() => setBantuanView("none")}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-6 h-6 stroke-[1.5]" />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => setBantuanView("forgot_password")}
                    className="w-full py-3.5 px-4 text-slate-600 font-semibold text-sm rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Lupa kata sandi?
                  </button>
                  <button
                    onClick={() => setBantuanView("forgot_rm")}
                    className="w-full py-3.5 px-4 text-slate-600 font-semibold text-sm rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Lupa Nomor RM/Nomor KTP
                  </button>
                </div>

                <div className="text-center text-sm font-bold">
                  <span className="text-slate-800">Butuh bantuan lain? </span>
                  <a
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Hubungi RS UMLA Care
                  </a>
                </div>
              </div>
            )}

            {bantuanView === "forgot_password" && (
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setBantuanView("menu")}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-6 h-6 stroke-[1.5]" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Atur ulang kata sandi
                </h3>
                <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
                  Masukkan e-mail atau nomor HP yang terdaftar. Kami akan
                  mengirimkan kode verifikasi untuk atur ulang kata sandi.
                </p>

                <div className="mb-8">
                  <div className="relative">
                    <input
                      id="resetInput"
                      type="text"
                      className="peer focus:ring-0 focus:border-emerald-500 block w-full sm:text-base border-b border-t-0 border-x-0 border-slate-300 py-2 px-0 text-slate-800 transition-colors outline-none bg-transparent placeholder-transparent"
                      placeholder="Nomor HP atau Email"
                      value={resetInput}
                      onChange={(e) => setResetInput(e.target.value)}
                    />
                    <label
                      htmlFor="resetInput"
                      className="absolute text-base text-slate-500 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-0 cursor-text"
                    >
                      Nomor HP atau Email
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleLanjutClickPassword}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#00A651] hover:bg-[#009247] active:scale-[0.99] transition-all focus:outline-none"
                >
                  Lanjut
                </button>
              </div>
            )}

            {bantuanView === "forgot_rm" && (
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setBantuanView("menu")}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-6 h-6 stroke-[1.5]" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Lupa Nomor RM / KTP
                </h3>
                <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
                  Masukkan e-mail atau nomor HP yang terdaftar. Kami akan
                  mengirimkan kode verifikasi untuk memulihkan Nomor RM / KTP
                  Anda.
                </p>

                <div className="mb-8">
                  <div className="relative">
                    <input
                      id="resetInputRM"
                      type="text"
                      className="peer focus:ring-0 focus:border-emerald-500 block w-full sm:text-base border-b border-t-0 border-x-0 border-slate-300 py-2 px-0 text-slate-800 transition-colors outline-none bg-transparent placeholder-transparent"
                      placeholder="Nomor HP atau Email"
                      value={resetInput}
                      onChange={(e) => setResetInput(e.target.value)}
                    />
                    <label
                      htmlFor="resetInputRM"
                      className="absolute text-base text-slate-500 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-0 cursor-text"
                    >
                      Nomor HP atau Email
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleLanjutClickRM}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#00A651] hover:bg-[#009247] active:scale-[0.99] transition-all focus:outline-none"
                >
                  Lanjut
                </button>
              </div>
            )}

            {bantuanView === "verification_code" && (
              <div className="p-8 text-center relative">
                <div className="absolute top-6 left-6">
                  <button
                    onClick={() =>
                      setBantuanView(
                        verifyMode === "password"
                          ? "forgot_password"
                          : "forgot_rm",
                      )
                    }
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
                  </button>
                </div>

                <div className="flex justify-center mb-6 mt-2">
                  <div className="text-[#00A651]">
                    <Mail className="w-12 h-12 stroke-[2]" />
                  </div>
                </div>

                <h3 className="text-[22px] font-bold text-[#1e293b] mb-3">
                  Masukkan Kode Verifikasi
                </h3>
                <p className="text-[15px] text-slate-500 mb-8 leading-relaxed px-2">
                  Kode verifikasi telah dikirim melalui{" "}
                  {!resetInput || resetInput.includes("@")
                    ? "e-mail"
                    : "nomor HP"}{" "}
                  ke {maskContact(resetInput)}.
                </p>

                <div className="mb-10">
                  <div className="relative w-48 mx-auto">
                    <input
                      type="text"
                      className="block w-full text-center text-xl border-b-[2.5px] border-t-0 border-x-0 border-[#00A651] py-2 px-0 text-slate-800 transition-colors outline-none bg-transparent font-bold tracking-[0.5em]"
                      placeholder=""
                    />
                  </div>
                </div>

                <p className="text-[14px] text-slate-500">
                  {countdown > 0 ? (
                    <>
                      Mohon tunggu dalam{" "}
                      <span className="font-bold text-slate-600">
                        {countdown} detik
                      </span>{" "}
                      untuk kirim ulang
                    </>
                  ) : (
                    <button
                      onClick={
                        verifyMode === "password"
                          ? handleLanjutClickPassword
                          : handleLanjutClickRM
                      }
                      className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      Kirim ulang sekarang
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
