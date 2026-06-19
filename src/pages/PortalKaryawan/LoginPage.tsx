import { secureLocalStorage } from "../../utils/crypto";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMPLOYEES } from "../../data/portalData";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [empPassword, setEmpPassword] = useState("");
  const [selectedEmpId, setSelectedEmpId] = useState("");

  const handleLogin = (e: React.FormEvent) => {
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
          Simulasi Sistem Informasi SDM Rumah Sakit Universitas Muhammadiyah
          Lamongan
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="mb-2 bg-blue-50 border border-blue-200 p-3 rounded-lg flex flex-col gap-2 relative">
              <div className="text-xs font-bold text-blue-800 flex items-center gap-1">
                Login Cepat (Simulasi)
              </div>
              <select
                className="w-full border-blue-200 bg-white rounded p-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  const emp = EMPLOYEES.find((x) => x.id === e.target.value);
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
                <option value="">-- Pilih Karyawan --</option>
                {EMPLOYEES.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.jabatan} ({emp.id})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-blue-600">
                Pilih karyawan untuk mengisi ID & Kata Sandi otomatis
              </p>
            </div>

            <div>
              <label
                htmlFor="empId"
                className="block text-sm font-medium text-slate-700"
              >
                ID Karyawan / NIK
              </label>
              <div className="mt-1">
                <input
                  id="empId"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="empPassword"
                className="block text-sm font-medium text-slate-700"
              >
                Kata Sandi
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="empPassword"
                  value={empPassword}
                  onChange={(e) => setEmpPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
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
