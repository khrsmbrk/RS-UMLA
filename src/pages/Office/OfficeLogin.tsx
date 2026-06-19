import React, { useState, useEffect } from "react";
import { secureLocalStorage } from "../../utils/crypto";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  Mail,
  Lock,
  ShieldCheck,
  ArrowLeft,
  X,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";
import { initAuth, internalSsoSignIn } from "./store/auth";
import { EMPLOYEES } from "../../data/portalData";
import { useSiteStore } from "../../store/siteStore";
import toast from "react-hot-toast";

export default function OfficeLogin() {
  const { settings } = useSiteStore();
  const navigate = useNavigate();
  const login = useOfficeStore((state) => state.login);

  const roles = [
    {
      group: "Jabatan Struktural",
      items: [
        { id: "bph", name: "BPH Rumah Sakit" },
        { id: "direktur", name: "Direktur" },
        { id: "wadir_medis", name: "Wakil Direktur Medis" },
        { id: "wadir_keuangan", name: "Wakil Direktur Keuangan" },
        { id: "wadir_admin", name: "Wakil Direktur Administrasi dan SDI" },
        { id: "kabid_jalan", name: "Kepala Bidang Pelayanan Rawat Jalan" },
        { id: "kabid_keperawatan", name: "Kepala Bidang Keperawatan" },
        { id: "kepala_igd", name: "Kepala Instalasi Gawat Darurat" },
        { id: "kepala_inap", name: "Kepala Instalasi Rawat Inap" },
        { id: "kepala_bedah", name: "Kepala Instalasi Bedah Sentral" },
        { id: "kepala_farmasi", name: "Kepala Instalasi Farmasi" },
        { id: "kepala_gizi", name: "Kepala Instalasi Gizi" },
        { id: "kepala_lab", name: "Kepala Instalasi Laboratorium" },
        { id: "kepala_rad", name: "Kepala Instalasi Radiologi" },
        { id: "kepala_paviliun", name: "Kepala Unit Paviliun" },
      ],
    },
    {
      group: "Jabatan Pendukung",
      items: [
        { id: "kasubag_data", name: "Kasubag Pengolahan Data" },
        { id: "kasubag_akuntansi", name: "Kasubag Akuntansi dan Pelaporan" },
        { id: "kasubag_pasar", name: "Kasubag Pengembangan Pasar" },
        { id: "bendahara", name: "Bendahara" },
        { id: "kasubag_aset", name: "Kasubag Penjagaan Aset" },
        { id: "kasubag_kebersihan", name: "Kasubag Kebersihan dan Pertamanan" },
        { id: "pkrs", name: "Petugas PKRS" },
        { id: "developer_web", name: "Developer Web" },
      ],
    },
    {
      group: "Tenaga Profesional & Pelaksana",
      items: [
        { id: "dokter_umum", name: "Dokter Umum" },
        { id: "dokter_gigi", name: "Dokter Gigi" },
        { id: "dokter_spesialis", name: "Dokter Spesialis" },
        { id: "perawat", name: "Perawat" },
        { id: "paramedis", name: "Paramedis / Bidan" },
        { id: "apoteker", name: "Apoteker / Tenaga Farmasi" },
        { id: "ahli_gizi", name: "Ahli Gizi" },
        { id: "analis_lab", name: "Analis Laboratorium" },
        { id: "radiografer", name: "Radiografer" },
        { id: "tenaga_adm", name: "Tenaga Administrasi" },
      ],
    },
  ];

  const [role, setRole] = useState("direktur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // which is now 'pin' for office

  const [empId, setEmpId] = useState("");
  const [empPassword, setEmpPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Portal Karyawan state
  const [selectedEmpId, setSelectedEmpId] = useState("");

  const [bantuanView, setBantuanView] = useState<
    "none" | "menu" | "forgot_password" | "forgot_rm" | "verification_code"
  >("none");
  const [bantuanContext, setBantuanContext] = useState<
    "office" | "karyawan" | null
  >(null);
  const [verifyMode, setVerifyMode] = useState<"password" | "rm">("password");
  const [resetInput, setResetInput] = useState("");
  const [countdown, setCountdown] = useState(90);

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
    if (!contact) return "a***@gmail.com";
    if (contact.includes("@")) {
      const parts = contact.split("@");
      if (parts[0].length <= 2) return contact;
      return `${parts[0].charAt(0)}***@${parts[1]}`;
    }
    if (contact.length >= 8) {
      return `${contact.substring(0, 4)}***${contact.substring(contact.length - 3)}`;
    }
    return contact;
  };

  useEffect(() => {
    // Clear user role from store to prevent immediate redirect
    // and allow viewing the login page.
    useOfficeStore.getState().logout();

    const unsubscribe = initAuth(
      () => {
        setNeedsAuth(false);
      },
      () => setNeedsAuth(true),
    );
    return () => unsubscribe();
  }, []);

  const handleOfficeLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let assignedRole = role;
    if (email) {
      const parsedEmp = EMPLOYEES.find((x) =>
        email.includes(x.id.toLowerCase()),
      );
      if (parsedEmp) {
        assignedRole = parsedEmp.roleId;
      }
    }

    if (needsAuth) {
      if (!email || !password)
        return toast.error("Silakan masukkan email dan PIN internal.");
      setIsLoggingIn(true);
      try {
        const result = await internalSsoSignIn(email, password, rememberMe);
        if (result) {
          setNeedsAuth(false);
          let parsedEmp = EMPLOYEES.find((x) =>
            email.includes(x.id.toLowerCase()),
          );
          if (!parsedEmp)
            parsedEmp = EMPLOYEES.find((x) => x.roleId === assignedRole);
          login(assignedRole, parsedEmp);
          navigate("/office/dashboard");
        }
      } catch (err: any) {
        console.error("Login failed:", err);
        toast.error("Gagal login: " + err.message);
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      let parsedEmp = EMPLOYEES.find((x) => email.includes(x.id.toLowerCase()));
      if (!parsedEmp)
        parsedEmp = EMPLOYEES.find((x) => x.roleId === assignedRole);
      login(assignedRole, parsedEmp);
      navigate("/office/dashboard");
    }
  };

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empId || !empPassword) return;

    const employee = EMPLOYEES.find((e) => e.id === empId);
    if (employee) {
      secureLocalStorage.setItem("karyawan_session", JSON.stringify(employee));
      navigate("/karyawan/dashboard");
    } else {
      toast.error("ID Karyawan atau Kata Sandi salah.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </button>
      </div>
      <div className="sm:mx-auto sm:w-full max-w-5xl mb-6 text-center flex flex-col items-center">
        {settings.logoOffice ? (
          <img
            src={settings.logoOffice}
            alt="RS UMLA"
            className="h-14 md:h-16 object-contain"
          />
        ) : (
          <>
            <h1
              className="text-5xl font-black text-emerald-600 tracking-tighter"
              style={{ fontFamily: "Unesa, sans-serif" }}
            >
              RS UMLA
            </h1>
            <p className="text-[10px] font-semibold text-emerald-600 mt-1.5 tracking-wider uppercase">
              Rumah Sakit Universitas Muhammadiyah Lamongan
            </p>
          </>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1 - SSO Office */}
          <div className="bg-white py-8 px-8 shadow-sm sm:rounded-sm border border-slate-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-normal text-slate-800">
                Smart Office
              </h2>
              <div className="flex items-center gap-2 cursor-pointer group">
                <Building2 className="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>
            </div>

            <form
              className="space-y-5 flex-1 flex flex-col"
              onSubmit={handleOfficeLogin}
            >
              <div className="space-y-5 flex-1">
                {/* Simulation Dropdown for Smart Office */}
                <div className="mb-2 bg-blue-50 border border-blue-200 p-3 rounded-lg flex flex-col gap-2 relative z-50">
                  <div className="text-xs font-bold text-blue-800 flex items-center gap-1">
                    <Building2 className="w-4 h-4" /> Login Cepat (Simulasi
                    Jabatan)
                  </div>
                  <select
                    className="w-full border-blue-200 bg-white rounded p-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-blue-500"
                    onChange={(e) => {
                      const emp = EMPLOYEES.find(
                        (x) => x.id === e.target.value,
                      );
                      if (emp) {
                        setEmail(emp.id.toLowerCase() + "@rsumla.com");
                        setPassword("123456");
                        setRole(emp.roleId);
                      } else {
                        setEmail("");
                        setPassword("");
                        setRole("direktur");
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="">-- Pilih Akun Jabatan --</option>
                    {EMPLOYEES.map((emp) => (
                      <option key={`office-${emp.id}`} value={emp.id}>
                        {emp.name} - {emp.jabatan}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-blue-600">
                    Pilih karyawan untuk mengisi Email, PIN & Role otomatis
                  </p>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder=" "
                      className="peer focus:ring-0 focus:border-blue-500 block w-full sm:text-base border-slate-300 rounded-sm py-3 px-4 border text-slate-800 transition-colors outline-none appearance-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text"
                    >
                      Email Korporat
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      inputMode="numeric"
                      required
                      placeholder=" "
                      className="peer focus:ring-0 focus:border-blue-500 block w-full sm:text-base border-slate-300 rounded-sm py-3 px-4 pr-12 border text-slate-800 transition-colors outline-none appearance-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text"
                    >
                      PIN Internal
                    </label>
                  </div>

                  <div className="mt-3 flex items-center hidden">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-slate-600 cursor-pointer select-none"
                    >
                      Biarkan saya tetap masuk
                    </label>
                  </div>
                </div>

                <div className="mb-6 hidden">
                  <div className="relative">
                    <select
                      id="role"
                      className="peer focus:ring-0 focus:border-blue-500 block w-full sm:text-base border-slate-300 rounded-sm py-3 px-4 border text-slate-800 bg-transparent transition-colors outline-none cursor-pointer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {roles.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                          {group.items.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <label
                      htmlFor="role"
                      className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 left-2 cursor-pointer"
                    >
                      Pilih Role / Jabatan
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all focus:outline-none"
                >
                  {needsAuth
                    ? isLoggingIn
                      ? "Loading..."
                      : "LOG IN"
                    : "Dashboard"}
                </button>
              </div>

              <div className="flex items-center justify-end mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setBantuanContext("office");
                    setBantuanView("menu");
                  }}
                  className="font-medium text-blue-600 hover:text-blue-700 text-sm"
                >
                  Butuh bantuan?
                </button>
              </div>

              <div className="mt-8 text-center text-[11px] text-slate-500 px-4 pb-2">
                Dengan login, kamu menyetujui{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Syarat, Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Kebijakan Privasi
                </a>{" "}
                Smart Office RS UMLA.
              </div>
            </form>
          </div>

          {/* 2 - Portal Karyawan */}
          <div className="bg-white py-8 px-8 shadow-sm sm:rounded-sm border border-slate-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-normal text-slate-800">
                Portal Karyawan
              </h2>
              <div className="flex items-center gap-2 cursor-pointer group">
                <ShieldCheck className="w-10 h-10 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
              </div>
            </div>

            <form
              className="space-y-5 flex-1 flex flex-col"
              onSubmit={handlePortalLogin}
            >
              <div className="space-y-5 flex-1">
                {/* Simulation Dropdown */}
                <div className="mb-2 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex flex-col gap-2 relative z-50">
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <Users className="w-4 h-4" /> Login Cepat (Simulasi Data
                    Karyawan)
                  </div>
                  <select
                    className="w-full border-emerald-200 bg-white rounded p-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500"
                    onChange={(e) => {
                      const emp = EMPLOYEES.find(
                        (x) => x.id === e.target.value,
                      );
                      if (emp) {
                        setEmpId(emp.id);
                        setEmpPassword("password123");
                        setSelectedEmpId(emp.id);
                      } else {
                        setEmpId("");
                        setEmpPassword("");
                        setSelectedEmpId("");
                      }
                    }}
                    value={selectedEmpId}
                  >
                    <option value="">-- Pilih Akun Karyawan --</option>
                    {EMPLOYEES.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.jabatan} ({emp.id})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-emerald-600">
                    Pilih karyawan untuk mengisi ID & Kata Sandi otomatis
                  </p>
                </div>

                <div className="mb-6 mt-4">
                  <div className="relative">
                    <input
                      id="empId"
                      type="text"
                      required
                      placeholder=" "
                      className="peer focus:ring-0 focus:border-emerald-500 block w-full sm:text-base border-slate-300 rounded-sm py-3 px-4 border text-slate-800 transition-colors outline-none appearance-none"
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                    />
                    <label
                      htmlFor="empId"
                      className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text"
                    >
                      ID Karyawan / NIK
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      id="empPassword"
                      type="password"
                      required
                      placeholder=" "
                      className="peer focus:ring-0 focus:border-emerald-500 block w-full sm:text-base border-slate-300 rounded-sm py-3 px-4 border text-slate-800 transition-colors outline-none appearance-none"
                      value={empPassword}
                      onChange={(e) => setEmpPassword(e.target.value)}
                    />
                    <label
                      htmlFor="empPassword"
                      className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text"
                    >
                      Kata Sandi
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 mt-auto">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all focus:outline-none"
                >
                  LOG IN
                </button>
              </div>

              <div className="flex items-center justify-end mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setBantuanContext("karyawan");
                    setBantuanView("menu");
                  }}
                  className="font-medium text-emerald-600 hover:text-emerald-700 text-sm"
                >
                  Butuh bantuan?
                </button>
              </div>

              <div className="mt-8 text-center text-[11px] text-slate-500 px-4 pb-2">
                Dengan login, kamu menyetujui{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Syarat, Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Kebijakan Privasi
                </a>{" "}
                Portal Karyawan RS UMLA.
              </div>
            </form>
          </div>
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
                    {bantuanContext === "office"
                      ? "Lupa PIN Internal?"
                      : "Lupa kata sandi?"}
                  </button>
                  <button
                    onClick={() => setBantuanView("forgot_rm")}
                    className="w-full py-3.5 px-4 text-slate-600 font-semibold text-sm rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    {bantuanContext === "office"
                      ? "Lupa Email Korporat"
                      : "Lupa ID Karyawan / NIK"}
                  </button>
                </div>

                <div className="text-center text-sm font-bold">
                  <span className="text-slate-800">Butuh bantuan lain? </span>
                  <a
                    href="#"
                    className={
                      bantuanContext === "office"
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-emerald-600 hover:text-emerald-700"
                    }
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
                  {bantuanContext === "office"
                    ? "Atur ulang PIN Internal"
                    : "Atur ulang kata sandi"}
                </h3>
                <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
                  Masukkan e-mail atau nomor HP yang terdaftar. Kami akan
                  mengirimkan kode verifikasi untuk atur ulang{" "}
                  {bantuanContext === "office" ? "PIN Internal" : "kata sandi"}.
                </p>

                <div className="mb-8">
                  <div className="relative">
                    <input
                      id="resetInput"
                      type="text"
                      className={`peer focus:ring-0 ${bantuanContext === "office" ? "focus:border-blue-500" : "focus:border-emerald-500"} block w-full sm:text-base border-b border-t-0 border-x-0 border-slate-300 py-2 px-0 text-slate-800 transition-colors outline-none bg-transparent placeholder-transparent`}
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
                  className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white ${bantuanContext === "office" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"} active:scale-[0.99] transition-all focus:outline-none`}
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
                  {bantuanContext === "office"
                    ? "Lupa Email Korporat"
                    : "Lupa ID Karyawan / NIK"}
                </h3>
                <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
                  Masukkan e-mail atau nomor HP yang terdaftar. Kami akan
                  mengirimkan kode verifikasi untuk memulihkan{" "}
                  {bantuanContext === "office"
                    ? "Email Korporat"
                    : "ID Karyawan / NIK"}{" "}
                  Anda.
                </p>

                <div className="mb-8">
                  <div className="relative">
                    <input
                      id="resetInputRM"
                      type="text"
                      className={`peer focus:ring-0 ${bantuanContext === "office" ? "focus:border-blue-500" : "focus:border-emerald-500"} block w-full sm:text-base border-b border-t-0 border-x-0 border-slate-300 py-2 px-0 text-slate-800 transition-colors outline-none bg-transparent placeholder-transparent`}
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
                  className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white ${bantuanContext === "office" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"} active:scale-[0.99] transition-all focus:outline-none`}
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
                  <div
                    className={
                      bantuanContext === "office"
                        ? "text-blue-600"
                        : "text-emerald-600"
                    }
                  >
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
                      className={`block w-full text-center text-xl border-b-[2.5px] border-t-0 border-x-0 ${bantuanContext === "office" ? "border-blue-600" : "border-emerald-600"} py-2 px-0 text-slate-800 transition-colors outline-none bg-transparent font-bold tracking-[0.5em]`}
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
                      className={`font-bold ${bantuanContext === "office" ? "text-blue-600 hover:text-blue-700" : "text-emerald-600 hover:text-emerald-700"} hover:underline`}
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
