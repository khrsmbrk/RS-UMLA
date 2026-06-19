import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Activity, ArrowLeft, Users } from "lucide-react";
import { useSiteStore } from "../../store/siteStore";
import { useSRMStore } from "../../store/srmStore";

export default function SRMLogin() {
  const { settings } = useSiteStore();
  const operators = useSRMStore((state) => state.operators);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identifier || !form.password) return;
    
    // Check if operator exists with given NIP/kode and password
    const validOperator = operators.find(op => op.kode === form.identifier && op.passwordHash === form.password);
    
    if (validOperator) {
      // Login successful
      navigate("/srm/dashboard");
    } else {
      setError("Username/NIP atau Kata Sandi salah.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-6 pb-12 px-6 relative">
      <header className="w-full z-10 mb-8 sm:mb-16">
        <div className="max-w-7xl mx-auto flex items-center relative min-h-[60px]">
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-full bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium z-10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center flex flex-col items-center">
        {settings.logoOffice ? (
          <img src={settings.logoOffice} alt="RS UMLA" className="h-14 md:h-16 object-contain" />
        ) : (
          <h1 className="text-5xl font-black text-emerald-600 tracking-tighter" style={{ fontFamily: "Unesa, sans-serif" }}>
            RS UMLA
          </h1>
        )}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Simulation Dropdown */}
        <div className="mb-4 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex flex-col gap-2 relative z-50">
           <div className="text-xs font-bold text-emerald-800 flex items-center gap-1"><Users className="w-4 h-4"/> Login Cepat (Simulasi Karyawan)</div>
           <select 
             className="w-full border-emerald-200 bg-white rounded p-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500"
             onChange={(e) => {
               const val = e.target.value;
               if (val) {
                 setForm({ identifier: val, password: "***" });
               }
             }}
             value={form.identifier}
           >
             <option value="">-- Pilih Role Akses --</option>
             <option value="ADM">Admin Utama (ADM)</option>
             <option value="RM-001">Petugas Admisi (RM-001)</option>
             <option value="DOK-001">Dokter (DOK-001)</option>
             <option value="KASIR">Kasir (KASIR)</option>
           </select>
           <p className="text-[10px] text-emerald-600">Pilih role untuk mengisi NIP/Username otomatis</p>
        </div>

        <div className="bg-white py-8 px-8 shadow-sm sm:rounded-sm border border-slate-200">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-normal text-slate-800">SIM RS UMLA</h2>
            <div className="flex items-center gap-2 cursor-pointer group">
              <Activity className="w-10 h-10 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">
                {error}
              </div>
            )}
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
                  Username atau NIP
                </label>
              </div>
            </div>

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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all focus:outline-none"
              >
                LOG IN
              </button>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button type="button" className="font-medium text-emerald-600 hover:text-emerald-700 text-sm">
                Butuh bantuan?
              </button>
            </div>
            
            <div className="mt-8 text-center text-[11px] text-slate-500 px-4">
              Dengan login, kamu menyetujui{" "}
              <a href="#" className="text-emerald-600 hover:underline">Syarat, Ketentuan</a>
              {" "}dan{" "}
              <a href="#" className="text-emerald-600 hover:underline">Kebijakan Privasi</a>
              {" "}SIM RS UMLA.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
