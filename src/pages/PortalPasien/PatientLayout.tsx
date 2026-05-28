import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

export default function PatientLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("patient_session");
    if (!session) {
      navigate("/portal/pendaftaran");
    } else {
      setPatient(JSON.parse(session));
    }
  }, [navigate]);

  if (!patient) return null;

  const activeTab = location.pathname.split("/").pop() || "dashboard";

  const handleTabChange = (tabId: string) => {
    navigate(`/portal/pendaftaran/${tabId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("patient_session");
    navigate("/portal/pendaftaran");
  };

  const tabs = [
    { id: "dashboard", label: "Ringkasan" },
    { id: "rme", label: "Riwayat Klinis & RME" },
    { id: "daftar", label: "Pendaftaran Berobat" },
    { id: "telemedisin", label: "Telekonsultasi" },
    { id: "lab", label: "Hasil Lab & Rad" },
    { id: "tagihan", label: "Info Tagihan" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Portal Pasien & RME</p>
            <h1 className="text-sm md:text-base font-semibold text-slate-900">
              Rumah Sakit Universitas Muhammadiyah Lamongan
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs text-emerald-700 font-medium hover:text-emerald-800"
            >
              Kembali ke Beranda
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-red-600 font-medium hover:text-red-700"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b bg-slate-50 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  {patient.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w: string) => w[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {patient.name}
                  </p>
                  <p className="text-xs text-slate-600">
                    No. RM: {patient.mrn} · NIK: {patient.nik}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Tgl Lahir: {patient.birthDate} · Gol. Darah:{" "}
                    {patient.bloodType}
                  </p>
                </div>
              </div>
              <div className="text-[10px] text-slate-500">
                Simulasi akademik: data pasien, kunjungan, dan biaya bersifat
                dummy.
              </div>
            </div>

            <div className="border-b px-4 pt-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={[
                        "px-3 py-1.5 text-xs rounded-full border whitespace-nowrap",
                        isActive
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "bg-white text-slate-600 border-slate-200 hover:text-emerald-700",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-4 pb-4 pt-3">
              <Outlet context={{ patient }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
