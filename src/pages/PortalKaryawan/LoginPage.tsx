import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMPLOYEES } from "../../data/portalData";
import { ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedEmpId, setSelectedEmpId] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId) return;

    const employee = EMPLOYEES.find((e) => e.id === selectedEmpId);
    if (employee) {
      localStorage.setItem("karyawan_session", JSON.stringify(employee));
      navigate("/karyawan/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <ShieldCheck className="w-10 h-10 text-white transform -rotate-3" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Portal Karyawan
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Simulasi Sistem Informasi SDM Rumah Sakit Universitas Muhammadiyah Lamongan
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="employee"
                className="block text-sm font-medium text-slate-700"
              >
                Pilih Akun Simulasi
              </label>
              <div className="mt-1">
                <select
                  id="employee"
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">-- Pilih Karyawan --</option>
                  {EMPLOYEES.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.jabatan})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Masuk ke Portal
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Aplikasi ini adalah simulasi untuk keperluan akademik dan tidak
              terhubung dengan data asli rumah sakit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
