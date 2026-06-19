import React, { useState } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  FileText,
  Activity,
  Users,
  Plus,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

const SRMBPJS = () => {
  const [status, setStatus] = useState<
    "connected" | "disconnected" | "checking"
  >("connected");
  const [searchNoKartu, setSearchNoKartu] = useState("");
  const [searchNIK, setSearchNIK] = useState("");
  const [activeMenu, setActiveMenu] = useState<
    | "none"
    | "sep"
    | "rujukan"
    | "kontrol"
    | "klaim"
    | "antrean"
    | "aplicare"
    | "prb"
  >("none");

  const checkConnection = () => {
    setStatus("checking");
    setTimeout(() => {
      setStatus("connected");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            Bridging BPJS Kesehatan
          </h1>
          <p className="text-slate-500">Integrasi V-Claim dan Antrean JKN</p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">
              Status Koneksi:
            </span>
            {status === "checking" ? (
              <span className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <RefreshCw className="w-4 h-4 animate-spin" /> Mengecek...
              </span>
            ) : status === "connected" ? (
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4" /> Terhubung
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                <XCircle className="w-4 h-4" /> Terputus
              </span>
            )}
          </div>
          <button
            onClick={checkConnection}
            disabled={status === "checking"}
            className="ml-2 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Cek Koneksi"
          >
            <RefreshCw
              className={`w-4 h-4 ${status === "checking" ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Cek Kepesertaan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden md:col-span-2">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              Cek Kepesertaan BPJS
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Berdasarkan No. Kartu BPJS
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchNoKartu}
                    onChange={(e) => setSearchNoKartu(e.target.value)}
                    placeholder="Masukkan 13 digit No. Kartu"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      if (searchNoKartu)
                        toast.success(
                          `Mencetak data kepesertaan untuk kartu ${searchNoKartu}`,
                        );
                      else toast.error("Masukkan nomor kartu dulu");
                    }}
                  >
                    Cari
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Berdasarkan NIK
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchNIK}
                    onChange={(e) => setSearchNIK(e.target.value)}
                    placeholder="Masukkan 16 digit NIK"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      if (searchNIK)
                        toast.success(
                          `Mencetak data kepesertaan untuk NIK ${searchNIK}`,
                        );
                      else toast.error("Masukkan NIK dulu");
                    }}
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>

            {searchNoKartu || searchNIK ? (
              <div className="mt-6 border border-slate-200 rounded-lg p-4 bg-slate-50 relative">
                <button
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
                  onClick={() => {
                    setSearchNoKartu("");
                    setSearchNIK("");
                  }}
                >
                  <XCircle className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                  Informasi Kepesertaan
                </h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-slate-500">Nama Peserta</div>
                  <div className="font-bold text-slate-800">BUDI SANTOSO</div>
                  <div className="text-slate-500">Status</div>
                  <div className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> AKTIF
                  </div>
                  <div className="text-slate-500">Jenis Peserta</div>
                  <div className="font-medium text-slate-800">
                    Pekerja Mandiri (PBPU)
                  </div>
                  <div className="text-slate-500">Kelas Rawat</div>
                  <div className="font-medium text-slate-800">Kelas II</div>
                  <div className="text-slate-500">Faskes Tingkat 1</div>
                  <div className="font-medium text-slate-800">
                    Klinik Sehat Selalu (0123G456)
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center justify-center min-h-[150px]">
                <div className="text-center text-slate-500">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    Silakan masukkan No. Kartu BPJS atau NIK untuk melihat data
                    kepesertaan
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Menu V-Claim
            </h2>
          </div>
          <div className="p-2">
            <button
              onClick={() => setActiveMenu("sep")}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors border-b border-slate-100 last:border-0 ${activeMenu === "sep" ? "bg-blue-50 border-blue-200" : ""}`}
            >
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800">
                  Pembuatan SEP
                </div>
                <div className="text-xs text-slate-500">
                  Surat Eligibilitas Peserta
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveMenu("rujukan")}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors border-b border-slate-100 last:border-0 ${activeMenu === "rujukan" ? "bg-green-50 border-green-200" : ""}`}
            >
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800">
                  Rujukan Keluar
                </div>
                <div className="text-xs text-slate-500">
                  Pembuatan rujukan ke faskes lain
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveMenu("kontrol")}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors border-b border-slate-100 last:border-0 ${activeMenu === "kontrol" ? "bg-purple-50 border-purple-200" : ""}`}
            >
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800">
                  Surat Kontrol
                </div>
                <div className="text-xs text-slate-500">
                  Rencana kontrol rawat jalan
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveMenu("klaim")}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors border-b border-slate-100 last:border-0 ${activeMenu === "klaim" ? "bg-orange-50 border-orange-200" : ""}`}
            >
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800">
                  Klaim JKN
                </div>
                <div className="text-xs text-slate-500">
                  Pengajuan klaim pelayanan
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveMenu("antrean")}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors ${activeMenu === "antrean" ? "bg-teal-50 border-teal-200" : ""}`}
            >
              <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm">
                  Antrean JKN
                </div>
                <div className="text-xs text-slate-500">
                  Integrasi Mobile JKN
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveMenu("aplicare")}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors border-b border-slate-100 last:border-0 ${activeMenu === "aplicare" ? "bg-indigo-50 border-indigo-200" : ""}`}
            >
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm">ApliCare</div>
                <div className="text-xs text-slate-500">
                  Ketersediaan Tempat Tidur
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveMenu("prb")}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors ${activeMenu === "prb" ? "bg-pink-50 border-pink-200" : ""}`}
            >
              <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm">
                  Apotek PRB
                </div>
                <div className="text-xs text-slate-500">
                  Program Rujuk Balik
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Active Menu Content */}
      {activeMenu !== "none" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              {activeMenu === "sep" && (
                <>
                  <FileText className="w-5 h-5 text-blue-600" /> Pembuatan Surat
                  Eligibilitas Peserta (SEP)
                </>
              )}
              {activeMenu === "rujukan" && (
                <>
                  <FileText className="w-5 h-5 text-blue-600" /> Pembuatan
                  Rujukan Keluar RS
                </>
              )}
              {activeMenu === "kontrol" && (
                <>
                  <FileText className="w-5 h-5 text-blue-600" /> Surat Rencana
                  Kontrol (SPRI/Surat Kontrol)
                </>
              )}
              {activeMenu === "klaim" && (
                <>
                  <FileText className="w-5 h-5 text-blue-600" /> Pengajuan Klaim
                  JKN & Grouping INA-CBG
                </>
              )}
              {activeMenu === "antrean" && (
                <>
                  <Users className="w-5 h-5 text-teal-600" /> Sinkronisasi
                  Antrean JKN - Mobile JKN
                </>
              )}
              {activeMenu === "aplicare" && (
                <>
                  <Activity className="w-5 h-5 text-indigo-600" /> Update
                  Ketersediaan Tempat Tidur (ApliCare)
                </>
              )}
              {activeMenu === "prb" && (
                <>
                  <Plus className="w-5 h-5 text-pink-600" /> Program Rujuk Balik
                  (PRB) / Apotek Kronis
                </>
              )}
            </h2>
            <button
              onClick={() => setActiveMenu("none")}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {activeMenu === "sep" && (
              <div className="space-y-4 max-w-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      No. Kartu BPJS
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      defaultValue={searchNoKartu || "0001234567890"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tanggal SEP
                    </label>
                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Jenis Pelayanan
                    </label>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Rawat Jalan</option>
                      <option>Rawat Inap</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Poliklinik Tujuan
                    </label>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Poli Penyakit Dalam</option>
                      <option>Poli Jantung</option>
                      <option>Poli Syaraf</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Diagnosa Awal (ICD-10)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Ketik kode atau nama diagnosa..."
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Catatan
                    </label>
                    <textarea
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows={2}
                    ></textarea>
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button className="px-5 py-2 border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                    Reset
                  </button>
                  <button
                    className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    onClick={() => toast.success("SEP Berhasil Diterbitkan")}
                  >
                    <CheckCircle className="w-4 h-4" /> Terbitkan SEP
                  </button>
                </div>
              </div>
            )}

            {activeMenu === "rujukan" && (
              <div className="space-y-4 max-w-3xl">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
                  <p className="text-sm text-orange-800">
                    <span className="font-bold">Info:</span> Masukkan nomor SEP
                    asal untuk mengambil data rujukan.
                  </p>
                </div>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      No. SEP
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Masukkan 19 karakter No. SEP asal..."
                    />
                  </div>
                  <button className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-slate-700 transition-colors">
                    Tarik Data
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tgl Rujukan
                    </label>
                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tgl Rencana Rujukan
                    </label>
                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Faskes Tujuan
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Kode atau nama faskes..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Poli Tujuan
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Kode atau nama poli..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Jenis Rujukan
                    </label>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Penuh</option>
                      <option>Parsial</option>
                      <option>Rujuk Balik</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Diagnosa Rujukan (ICD-10)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Ketik kode atau nama diagnosa..."
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button className="px-5 py-2 border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-not-allowed opacity-50">
                    Cetak
                  </button>
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                    onClick={() =>
                      toast.success("Surat Rujukan Berhasil Disimpan")
                    }
                  >
                    <CheckCircle className="w-4 h-4" /> Simpan Rujukan
                  </button>
                </div>
              </div>
            )}

            {activeMenu === "kontrol" && (
              <div className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      No. SEP Asal Pelayanan
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Masukkan 19 karakter No. SEP asal..."
                      />
                      <button className="bg-slate-100 border border-slate-300 px-4 rounded text-sm font-bold text-slate-600 hover:bg-slate-200">
                        Cek
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tgl Rencana Kontrol
                    </label>
                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Poli Kontrol Tujuan
                    </label>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Poli Penyakit Dalam</option>
                      <option>Poli Bedah</option>
                      <option>Poli Saraf</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Dokter Tujuan
                    </label>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Pilih Dokter SPESIALIS</option>
                      <option>Dr. Andi SP.PD</option>
                      <option>Dr. Budi SP.B</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    className="px-5 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                    onClick={() =>
                      toast.success("Surat Kontrol Berhasil Diterbitkan")
                    }
                  >
                    <CheckCircle className="w-4 h-4" /> Terbitkan Surat Kontrol
                  </button>
                </div>
              </div>
            )}

            {activeMenu === "klaim" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 font-medium">
                    Pengiriman berkas klaim (E-Klaim) dan integrasi grouping
                    INA-CBG
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold shadow-sm hover:bg-slate-50">
                      Filter
                    </button>
                    <button
                      className="px-4 py-1.5 bg-orange-600 text-white rounded text-sm font-bold shadow-sm hover:bg-orange-700"
                      onClick={() =>
                        toast.success(
                          "Mengirim data klaim yang valid ke INA-CBG",
                        )
                      }
                    >
                      Kirim INA-CBG Grouping
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 font-medium">No. SEP</th>
                        <th className="px-4 py-2 font-medium">Tgl Masuk</th>
                        <th className="px-4 py-2 font-medium">No. RM</th>
                        <th className="px-4 py-2 font-medium">Nama Pasien</th>
                        <th className="px-4 py-2 font-medium">Poli/Bangsal</th>
                        <th className="px-4 py-2 text-center font-medium">
                          Status Grouping
                        </th>
                        <th className="px-4 py-2 text-center font-medium">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono text-slate-500">
                          0001234567890
                        </td>
                        <td className="px-4 py-2.5">2026-06-11</td>
                        <td className="px-4 py-2.5">RM-829104</td>
                        <td className="px-4 py-2.5 font-bold">Budi Santoso</td>
                        <td className="px-4 py-2.5 text-slate-500">
                          Poli Umum
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                            Draft
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                            onClick={() =>
                              toast("Proses grouping...", { icon: "🔄" })
                            }
                          >
                            Group
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono text-slate-500">
                          0001234567891
                        </td>
                        <td className="px-4 py-2.5">2026-06-10</td>
                        <td className="px-4 py-2.5">RM-829106</td>
                        <td className="px-4 py-2.5 font-bold">Andi Wijaya</td>
                        <td className="px-4 py-2.5 text-slate-500">IGD</td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Optimal
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            className="text-orange-600 hover:text-orange-800 font-bold text-xs"
                            onClick={() => toast.success("Mengirim E-Klaim")}
                          >
                            Final
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono text-slate-500">
                          0001234567892
                        </td>
                        <td className="px-4 py-2.5">2026-06-09</td>
                        <td className="px-4 py-2.5">RM-829109</td>
                        <td className="px-4 py-2.5 font-bold">Rina Kartika</td>
                        <td className="px-4 py-2.5 text-slate-500">
                          Poli Gigi
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                            Error Grouping
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                            onClick={() => toast.error("Harap cek ICD-10")}
                          >
                            Periksa
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeMenu === "antrean" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 font-medium text-sm">
                    Dashboard Integrasi Sistem Antrean JKN
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" /> Sync Master Jadwal
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-slate-200 rounded p-4 bg-slate-50 flex flex-col justify-between">
                    <h3 className="font-bold text-slate-700 text-sm mb-2">
                      Total Antrean Hari Ini
                    </h3>
                    <div className="text-3xl font-bold text-blue-600">145</div>
                    <p className="text-xs text-slate-500 mt-2">
                      Dari Mobile JKN: 89, Offline: 56
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded p-4 bg-slate-50 flex flex-col justify-between">
                    <h3 className="font-bold text-slate-700 text-sm mb-2">
                      Sisa Kuota Poliklinik
                    </h3>
                    <div className="text-3xl font-bold text-emerald-600">
                      32
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Rata-rata 12 kuota/poli
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded p-4 bg-slate-50 flex flex-col justify-between">
                    <h3 className="font-bold text-slate-700 text-sm mb-2">
                      Batal / Tidak Hadir
                    </h3>
                    <div className="text-3xl font-bold text-rose-600">8</div>
                    <p className="text-xs text-slate-500 mt-2">
                      Pasien membatalkan via aplikasi
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
                    Log Pengiriman Task ID Waktu Tunggu
                  </div>
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="text-slate-500 border-b border-slate-200 bg-white">
                      <tr>
                        <th className="px-4 py-2 font-medium">No. RM</th>
                        <th className="px-4 py-2 font-medium">
                          No. SEP / Booking
                        </th>
                        <th className="px-4 py-2 font-medium">Task ID</th>
                        <th className="px-4 py-2 font-medium">Waktu (WIB)</th>
                        <th className="px-4 py-2 text-center font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5">RM-829104</td>
                        <td className="px-4 py-2.5 font-mono text-slate-500">
                          BK-20260611001
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 text-xs font-bold">
                            1 - Waktu Tunggu Admisi
                          </span>
                        </td>
                        <td className="px-4 py-2.5">08:00</td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Success
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5">RM-829104</td>
                        <td className="px-4 py-2.5 font-mono text-slate-500">
                          BK-20260611001
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 text-xs font-bold">
                            2 - Waktu Layan Admisi
                          </span>
                        </td>
                        <td className="px-4 py-2.5">08:15</td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Success
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5">RM-829104</td>
                        <td className="px-4 py-2.5 font-mono text-slate-500">
                          BK-20260611001
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 text-xs font-bold">
                            3 - Waktu Tunggu Poli
                          </span>
                        </td>
                        <td className="px-4 py-2.5">08:30</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            onClick={() =>
                              toast.success("Mengirim ulang task ID...")
                            }
                            className="text-orange-600 hover:text-orange-800 font-bold text-xs uppercase tracking-wider"
                          >
                            Kirim Ulang
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeMenu === "aplicare" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 font-medium text-sm">
                    Update Ketersediaan Bed Realtime ke BPJS Kesehatan
                  </p>
                  <button
                    className="px-4 py-1.5 bg-indigo-600 text-white rounded text-sm font-bold shadow-sm hover:bg-indigo-700 flex items-center gap-2"
                    onClick={() =>
                      toast.success(
                        "Berhasil mengirim ketersediaan tempat tidur ke ApliCare",
                      )
                    }
                  >
                    <RefreshCw className="w-4 h-4" /> Sync All Bed
                  </button>
                </div>

                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 font-medium">Kelas Ruangan</th>
                        <th className="px-4 py-2 font-medium">Kapasitas</th>
                        <th className="px-4 py-2 font-medium">Tersedia</th>
                        <th className="px-4 py-2 font-medium">Terisi</th>
                        <th className="px-4 py-2 font-medium">Antrean</th>
                        <th className="px-4 py-2 text-center font-medium">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-bold text-slate-700">
                          ICU
                        </td>
                        <td className="px-4 py-2.5">10</td>
                        <td className="px-4 py-2.5 font-bold text-emerald-600">
                          2
                        </td>
                        <td className="px-4 py-2.5">8</td>
                        <td className="px-4 py-2.5">1</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                            onClick={() =>
                              toast("Memperbarui data ICU ke ApliCare", {
                                icon: "🔄",
                              })
                            }
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-bold text-slate-700">
                          Kelas I
                        </td>
                        <td className="px-4 py-2.5">25</td>
                        <td className="px-4 py-2.5 font-bold text-emerald-600">
                          5
                        </td>
                        <td className="px-4 py-2.5">20</td>
                        <td className="px-4 py-2.5">0</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                            onClick={() =>
                              toast("Memperbarui data Kelas I ke ApliCare", {
                                icon: "🔄",
                              })
                            }
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-bold text-slate-700">
                          Kelas II
                        </td>
                        <td className="px-4 py-2.5">40</td>
                        <td className="px-4 py-2.5 font-bold text-emerald-600">
                          12
                        </td>
                        <td className="px-4 py-2.5">28</td>
                        <td className="px-4 py-2.5">0</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                            onClick={() =>
                              toast("Memperbarui data Kelas II ke ApliCare", {
                                icon: "🔄",
                              })
                            }
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-bold text-slate-700">
                          Kelas III
                        </td>
                        <td className="px-4 py-2.5">60</td>
                        <td className="px-4 py-2.5 font-bold text-rose-600">
                          0
                        </td>
                        <td className="px-4 py-2.5">60</td>
                        <td className="px-4 py-2.5">5</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                            onClick={() =>
                              toast("Memperbarui data Kelas III ke ApliCare", {
                                icon: "🔄",
                              })
                            }
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeMenu === "prb" && (
              <div className="space-y-4 max-w-3xl">
                <div className="p-4 bg-pink-50 border border-pink-200 rounded-md">
                  <p className="text-sm text-pink-800">
                    <span className="font-bold">Info:</span> Form pendaftaran
                    pasien PRB (Program Rujuk Balik) untuk mendapatkan layanan
                    apotek kronis.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      No. SEP
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                      placeholder="Masukkan No. SEP Pelayanan..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      No. Kartu BPJS
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                      placeholder="Otomatis terisi..."
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Program PRB
                    </label>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none">
                      <option>Diabetes Melitus</option>
                      <option>Hipertensi</option>
                      <option>Jantung</option>
                      <option>Asma</option>
                      <option>PPOK</option>
                      <option>Epilepsi</option>
                      <option>Schizophrenia</option>
                      <option>Stroke</option>
                      <option>SLE</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      DPJP (Dokter Penanggung Jawab)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                      placeholder="Ketik nama atau kode dokter..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tgl Mulai PRB
                    </label>
                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Pasien / Keluarga
                    </label>
                    <input
                      type="email"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                      placeholder="Bila ada..."
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button className="px-5 py-2 border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                    Batal
                  </button>
                  <button
                    className="px-5 py-2 bg-pink-600 text-white rounded-md font-medium hover:bg-pink-700 transition-colors flex items-center gap-2"
                    onClick={() =>
                      toast.success("Pendaftaran PRB berhasil di-submit")
                    }
                  >
                    <CheckCircle className="w-4 h-4" /> Daftarkan PRB
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SRMBPJS;
