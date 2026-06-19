import { secureLocalStorage } from "../../utils/crypto";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from '@tanstack/react-router';

export default function PatientLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const session = secureLocalStorage.getItem("patient_session");
    if (!session) {
      navigate({ to: "/pasien/login" });
    } else {
      const parsed = JSON.parse(session);
      if (parsed.mrn && parsed.mrn.startsWith("RSUML-")) {
        // Auto-update the old session format for the user
        const newPatient = {
          ...parsed,
          mrn: parsed.mrn.replace("RSUML-", "RSUMLA-"),
        };
        secureLocalStorage.setItem(
          "patient_session",
          JSON.stringify(newPatient),
        );
        setPatient(newPatient);
      } else {
        setPatient(parsed);
      }
    }
  }, [navigate]);

  if (!patient) return null;

  const activeTab = location.pathname.split("/").pop() || "dashboard";

  const handleTabChange = (tabId: string) => {
    navigate({ to: `/pasien/${tabId}` });
  };

  const handleLogout = () => {
    secureLocalStorage.removeItem("patient_session");
    navigate({ to: "/pasien/login" });
  };

  const tabs = [
    { id: "dashboard", label: "Ringkasan" },
    { id: "rme", label: "Riwayat Klinis & RME" },
    { id: "daftar", label: "Pendaftaran Berobat" },
    { id: "telemedisin", label: "Telekonsultasi" },
    { id: "lab", label: "Hasil Lab & Rad" },
    { id: "tagihan", label: "Info Tagihan" },
    { id: "notifikasi", label: "Notifikasi" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white relative z-20 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <svg
                className="w-6 h-6 text-emerald-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide text-white">
                Portal Pasien
              </h1>
              <p className="text-xs text-emerald-200">
                RS Universitas Muhammadiyah Lamongan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-medium text-emerald-100 hover:text-white transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold bg-red-500/20 text-red-100 hover:bg-red-500/40 hover:text-white px-4 py-2 rounded-lg transition-all border border-red-500/30"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="bg-emerald-800 pb-24 relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute -bottom-24 -right-24 w-96 h-96 text-emerald-700/50 transform -rotate-12"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
          </svg>
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-600/30 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-white text-emerald-800 flex items-center justify-center text-3xl font-black shadow-xl ring-4 ring-emerald-700/30">
              {patient.name
                .split(" ")
                .slice(0, 2)
                .map((w: string) => w[0])
                .join("")}
            </div>
            <div className="text-white flex-1">
              <h2 className="text-3xl font-bold mb-2">{patient.name}</h2>
              <div className="flex flex-wrap gap-4 text-emerald-100 text-sm font-medium">
                <div className="flex items-center gap-1.5 bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-700/50">
                  <svg
                    className="w-4 h-4 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  RM: {patient.mrn}
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-700/50">
                  <svg
                    className="w-4 h-4 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  NIK: {patient.nik}
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-700/50">
                  <svg
                    className="w-4 h-4 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {patient.birthDate}
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-700/50">
                  <svg
                    className="w-4 h-4 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Gol. Darah: {patient.bloodType}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 relative z-20 -mt-14 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="border-b px-2 md:px-4 pt-2 md:pt-3 bg-white">
              <div className="flex gap-1 md:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={[
                        "px-3 md:px-4 py-2 text-[11px] md:text-sm font-semibold rounded-xl border-b-2 whitespace-nowrap transition-colors",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-600"
                          : "bg-transparent text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-4 py-6 md:p-8 min-h-[400px]">
              <PatientContext.Provider value={{ patient }}><Outlet /></PatientContext.Provider>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
