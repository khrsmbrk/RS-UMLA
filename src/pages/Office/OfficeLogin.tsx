import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Mail, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { useOfficeStore } from "./store/officeStore";
import { initAuth, internalSsoSignIn } from "./store/auth";
import { EMPLOYEES } from "../../data/portalData";
import { useSiteStore } from "../../store/siteStore";

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
  const [password, setPassword] = useState("");
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Portal Karyawan state
  const [selectedEmpId, setSelectedEmpId] = useState("");

  useEffect(() => {
    const unsubscribe = initAuth(
      () => setNeedsAuth(false),
      () => setNeedsAuth(true),
    );
    return () => unsubscribe();
  }, []);

  const handleOfficeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (needsAuth) {
      if (!email || !password)
        return alert("Silakan masukkan email dan password SSO internal.");
      setIsLoggingIn(true);
      try {
        const result = await internalSsoSignIn(email, password);
        if (result) {
          setNeedsAuth(false);
          login(role);
          navigate("/office/dashboard");
        }
      } catch (err: any) {
        console.error("Login failed:", err);
        alert("Gagal login: " + err.message);
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      login(role);
      navigate("/office/dashboard");
    }
  };

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId) return;

    const employee = EMPLOYEES.find((e) => e.id === selectedEmpId);
    if (employee) {
      localStorage.setItem("karyawan_session", JSON.stringify(employee));
      navigate("/karyawan/dashboard");
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
          <img src={settings.logoOffice} alt="RS UMLA" className="h-24 object-contain" />
        ) : (
          <>
            <h1 className="text-5xl font-black text-emerald-600 tracking-tighter" style={{ fontFamily: "Unesa, sans-serif" }}>
              RS UMLA
            </h1>
            <p className="text-[10px] font-semibold text-emerald-600 mt-1.5 tracking-wider uppercase">
              Rumah Sakit Universitas Muhammadiyah Lamongan
            </p>
          </>
        )}
      </div>

      <div className="sm:mx-auto sm:w-full max-w-5xl">
        <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-slate-800">
          Corporate & Employee Portal
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1 - SSO Office */}
          <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-6 border border-slate-100 relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-800">SSO Office</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sistem manajerial & operasional rumah sakit.
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 ml-2">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            <form
              className="space-y-6 flex-1 flex flex-col"
              onSubmit={handleOfficeLogin}
            >
              <div className="space-y-6 flex-1">
                {needsAuth && (
                  <>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2"
                      >
                        Email Korporat
                      </label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Mail className="text-slate-400 sm:text-sm w-5 h-5" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="nama@rsumla.internal"
                          className="focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full pl-11 sm:text-sm border-slate-200 rounded-xl py-3 px-3 border bg-slate-50 hover:bg-white transition-colors"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2"
                      >
                        PIN Internal
                      </label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Lock className="text-slate-400 sm:text-sm w-5 h-5" />
                        </div>
                        <input
                          id="password"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full pl-11 sm:text-sm border-slate-200 rounded-xl py-3 px-3 border bg-slate-50 hover:bg-white transition-colors"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="role"
                    className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2"
                  >
                    Role Modul
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Users className="text-slate-400 sm:text-sm w-5 h-5" />
                    </div>
                    <select
                      id="role"
                      className="focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full pl-11 sm:text-sm border-slate-200 rounded-xl py-3 px-3 border bg-slate-50 hover:bg-white transition-colors cursor-pointer"
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
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white ${isLoggingIn ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center gap-2 tracking-wide`}
                >
                  {needsAuth ? (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      {isLoggingIn ? "Loading..." : "Login SSO"}
                    </>
                  ) : (
                    "Dashboard"
                  )}
                </button>
              </div>

              {needsAuth && (
                <div className="mt-4 text-center text-[10px] font-bold text-slate-400 tracking-wider">
                  *Auto-register.
                </div>
              )}
            </form>
          </div>

          {/* 2 - Portal Karyawan */}
          <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-6 border border-slate-100 relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Portal Karyawan
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sistem informasi SDM & presensi karyawan.
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 ml-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            <form
              className="space-y-6 flex-1 flex flex-col"
              onSubmit={handlePortalLogin}
            >
              <div className="space-y-6 flex-1">
                <div>
                  <div className="mt-1">
                    <select
                      id="employee"
                      value={selectedEmpId}
                      onChange={(e) => setSelectedEmpId(e.target.value)}
                      className="focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 block w-full sm:text-sm border-slate-200 rounded-xl py-3 px-3 border bg-slate-50 hover:bg-white transition-colors cursor-pointer"
                      required
                    >
                      <option value="">-- Pilih --</option>
                      {EMPLOYEES.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.jabatan})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-auto">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 items-center gap-2 tracking-wide"
                >
                  Login Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
