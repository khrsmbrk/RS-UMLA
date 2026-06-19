import React, { useState } from "react";
import { User, Lock, Save, Bell, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function PortalKaryawanPengaturan() {
  const [activeTab, setActiveTab] = useState("profil");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pengaturan berhasil diperbarui.");
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Pengaturan Akun
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Kelola preferensi portal dan keamanan akun Anda.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button
            onClick={() => setActiveTab("profil")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-colors ${activeTab === "profil" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"}`}
          >
            <User className="w-5 h-5" /> Informasi Dasar
          </button>
          <button
            onClick={() => setActiveTab("keamanan")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-colors ${activeTab === "keamanan" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"}`}
          >
            <Lock className="w-5 h-5" /> Keamanan & Password
          </button>
          <button
            onClick={() => setActiveTab("notifikasi")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-colors ${activeTab === "notifikasi" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"}`}
          >
            <Bell className="w-5 h-5" /> Preferensi Notifikasi
          </button>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "profil" && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Informasi Dasar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Email Pemulihan
                    </label>
                    <input
                      type="email"
                      defaultValue="karyawan.demo@example.com"
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      No. HP Aktif / WhatsApp
                    </label>
                    <input
                      type="text"
                      defaultValue="081234567890"
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Alamat Domisili
                  </label>
                  <textarea
                    rows={2}
                    defaultValue="Jl. Merdeka No. 10, Lamongan"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            )}

            {activeTab === "keamanan" && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Ubah Kata Sandi
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Kata Sandi Lama
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      placeholder="Minimal 8 karakter"
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Konfirmasi Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      placeholder="Ulangi kata sandi baru"
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-800 font-medium leading-relaxed">
                    Kami tidak pernah meminta kata sandi Anda melalui email atau
                    telepon. Ubah sandi secara berkala.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "notifikasi" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800">
                  Preferensi Notifikasi
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <div>
                      <p className="font-bold text-slate-800">
                        Email Notifikasi Jadwal
                      </p>
                      <p className="text-xs text-slate-500">
                        Menerima email jika ada perubahan shift.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-bold text-slate-800">
                        Push Notifikasi Pengumuman
                      </p>
                      <p className="text-xs text-slate-500">
                        Menerima peringatan saat ada surat edaran direksi baru.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
