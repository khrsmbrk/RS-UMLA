import React, { useState } from "react";
import {
  MessageCircle,
  Settings,
  Send,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const SRMWaReminder = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            WhatsApp Reminder
          </h1>
          <p className="text-slate-500">
            Kirim pengingat jadwal kontrol dan tagihan ke pasien
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium">WA Gateway Terhubung</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "dashboard" ? "border-green-500 text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "kirim" ? "border-green-500 text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("kirim")}
        >
          Kirim Pesan
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "template" ? "border-green-500 text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("template")}
        >
          Template Pesan
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "pengaturan" ? "border-green-500 text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("pengaturan")}
        >
          Pengaturan
        </button>
      </div>

      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">
                  Total Terkirim
                </h3>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Send className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800">1,248</div>
              <p className="text-xs text-slate-500 mt-1">Bulan ini</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">Berhasil</h3>
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800">1,205</div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <span>96.5% success rate</span>
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">Gagal</h3>
                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800">43</div>
              <p className="text-xs text-red-600 mt-1">Perlu dicek ulang</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">Antrean</h3>
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800">12</div>
              <p className="text-xs text-slate-500 mt-1">Menunggu pengiriman</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-800">
                Riwayat Pengiriman Terakhir
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">
                Lihat Semua
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3 font-medium">Waktu</th>
                    <th className="px-5 py-3 font-medium">Penerima</th>
                    <th className="px-5 py-3 font-medium">No. WhatsApp</th>
                    <th className="px-5 py-3 font-medium">Jenis Pesan</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-slate-600">
                        Hari ini, 09:{15 + item}
                      </td>
                      <td className="px-5 py-3 font-medium text-slate-800">
                        Budi Santoso
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        0812345678{item}
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        Reminder Kontrol
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3" /> Terkirim
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "dashboard" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
             Modul Terkunci
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Halaman {activeTab} memerlukan hak akses administrator tingkat lanjut atau integrasi API WhatsApp Business yang valid.
          </p>
        </div>
      )}
    </div>
  );
};

export default SRMWaReminder;
