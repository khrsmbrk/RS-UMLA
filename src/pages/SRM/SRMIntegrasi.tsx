import React, { useState } from "react";
import {
  Building2,
  Save,
  Wrench,
  Key,
  Search,
  Send,
  CheckCircle,
  Database,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";
import toast from "react-hot-toast";

const SRMIntegrasi = () => {
  const [activeTab, setActiveTab] = useState("konfigurasi");
  const { integrationConfig, updateIntegrationConfig, patients } =
    useSRMStore();
  const [localConfig, setLocalConfig] = useState(integrationConfig.satuSehat);

  const [searchNIK, setSearchNIK] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    ihs: string;
    name: string;
  } | null>(null);

  const handleConfigChange = (
    field: keyof typeof localConfig,
    value: string | boolean,
  ) => {
    setLocalConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = () => {
    updateIntegrationConfig("satuSehat", localConfig);
    toast.success("Konfigurasi Satu Sehat berhasil disimpan!");
  };

  const handleSearchPatient = () => {
    if (!searchNIK || searchNIK.length < 16) {
      toast.error("Gunakan minimal 16 digit NIK");
      return;
    }

    setIsSearching(true);
    setSearchResult(null);
    toast.success("Mencari data ke Satu Sehat...");

    setTimeout(() => {
      // Mock result based on NIK
      const foundLocal = patients.find((p) => p.nik === searchNIK);
      if (foundLocal) {
        setSearchResult({
          ihs: `P${Math.floor(Math.random() * 10000000000)
            .toString()
            .padStart(10, "0")}`,
          name: foundLocal.namaLengkap,
        });
      } else {
        toast.error(
          "Pasien dengan NIK tersebut tidak ditemukan atau belum e-KYC",
        );
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
        <Building2 className="w-6 h-6 text-slate-700" />
        <h1 className="text-xl font-bold text-slate-800">
          Integrasi Satu Sehat
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-300 mb-6">
        <button
          className={`px-6 py-2 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === "konfigurasi" ? "border-blue-500 text-blue-600 bg-blue-50" : "border-transparent text-slate-600 hover:bg-slate-50"}`}
          onClick={() => setActiveTab("konfigurasi")}
        >
          <Wrench className="w-4 h-4" /> Konfigurasi
        </button>
        <button
          className={`px-6 py-2 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === "cari" ? "border-blue-500 text-blue-600 bg-blue-50" : "border-transparent text-slate-600 hover:bg-slate-50"}`}
          onClick={() => setActiveTab("cari")}
        >
          <Search className="w-4 h-4" /> Cari Pasien
        </button>
        <button
          className={`px-6 py-2 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === "kirim" ? "border-blue-500 text-blue-600 bg-blue-50" : "border-transparent text-slate-600 hover:bg-slate-50"}`}
          onClick={() => setActiveTab("kirim")}
        >
          <Send className="w-4 h-4" /> Kirim Data
        </button>
        <button
          className={`px-6 py-2 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === "mapping" ? "border-blue-500 text-blue-600 bg-blue-50" : "border-transparent text-slate-600 hover:bg-slate-50"}`}
          onClick={() => setActiveTab("mapping")}
        >
          <Database className="w-4 h-4" /> Mapping Master
        </button>
        <button
          className={`px-6 py-2 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === "sirs" ? "border-blue-500 text-blue-600 bg-blue-50" : "border-transparent text-slate-600 hover:bg-slate-50"}`}
          onClick={() => setActiveTab("sirs")}
        >
          <Building2 className="w-4 h-4" /> SIRS Online
        </button>
      </div>

      {/* Tab Content - Konfigurasi */}
      {activeTab === "konfigurasi" && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-4 h-4 text-slate-600" />
            <h2 className="text-sm font-bold text-slate-700">
              Konfigurasi API Satu Sehat
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-sm p-6 mb-6">
            <div className="grid grid-cols-[150px_1fr] gap-y-4 items-center">
              <label className="text-sm text-slate-700">Environment:</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="env"
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  checked={localConfig.isProduction}
                  onChange={(e) =>
                    handleConfigChange("isProduction", e.target.checked)
                  }
                />
                <label htmlFor="env" className="text-sm text-slate-600">
                  Mode Production (centang jika sudah live)
                </label>
              </div>

              <label className="text-sm text-slate-700">Base URL:</label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                value={localConfig.baseUrl}
                onChange={(e) => handleConfigChange("baseUrl", e.target.value)}
              />

              <label className="text-sm text-slate-700">Auth URL:</label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                value={localConfig.authUrl}
                onChange={(e) => handleConfigChange("authUrl", e.target.value)}
              />

              <label className="text-sm text-slate-700">Organization ID:</label>
              <input
                type="text"
                placeholder="Organization ID dari Satu Sehat"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                value={localConfig.organizationId}
                onChange={(e) =>
                  handleConfigChange("organizationId", e.target.value)
                }
              />

              <label className="text-sm text-slate-700">Client ID:</label>
              <input
                type="text"
                placeholder="Client ID dari Satu Sehat"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                value={localConfig.clientId}
                onChange={(e) => handleConfigChange("clientId", e.target.value)}
              />

              <label className="text-sm text-slate-700">Client Secret:</label>
              <input
                type="password"
                placeholder="Client Secret dari Satu Sehat"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                value={localConfig.clientSecret}
                onChange={(e) =>
                  handleConfigChange("clientSecret", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
              onClick={handleSaveConfig}
            >
              <Save className="w-4 h-4" /> Simpan Konfigurasi
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
              onClick={() =>
                toast("Test Koneksi memerlukan environment staging/produksi Kemenkes", {
                  icon: "🌐",
                })
              }
            >
              <Wrench className="w-4 h-4" /> Test Koneksi
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
              onClick={() =>
                toast("Gagal mendapatkan akses Token, Client Secret tidak valid", {
                  icon: "❌",
                })
              }
            >
              <Key className="w-4 h-4" /> Get Token
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-sm p-6 flex-1">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-700">
                Cara Mendapatkan Kredensial Satu Sehat
              </h3>
            </div>
            <div className="text-sm text-slate-700 leading-relaxed">
              <p className="font-bold mb-2">Langkah-langkah:</p>
              <ol className="list-decimal list-inside space-y-1 mb-4">
                <li>
                  Daftar faskes di{" "}
                  <a
                    href="#"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    https://satusehat.kemkes.go.id
                  </a>
                </li>
                <li>Login ke dashboard developer</li>
                <li>Buat aplikasi dan dapatkan kredensial</li>
                <li>Copy Organization ID, Client ID, Client Secret</li>
                <li>Test di environment Staging terlebih dahulu</li>
                <li>Jika sudah siap, ajukan Production</li>
              </ol>
              <p>
                <span className="font-bold">Dokumentasi:</span>{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  https://satusehat.kemkes.go.id/platform/docs
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Cari Pasien */}
      {activeTab === "cari" && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-slate-600" />
            <h2 className="text-sm font-bold text-slate-700">
              Pencarian NIK Pasien di Satu Sehat
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-sm p-4 mb-4 flex items-center gap-4">
            <label className="text-sm font-bold text-slate-700 whitespace-nowrap">
              NIK Pasien :
            </label>
            <input
              type="text"
              placeholder="Masukkan 16 digit NIK..."
              value={searchNIK}
              onChange={(e) => setSearchNIK(e.target.value)}
              className="w-full max-w-sm border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded text-sm font-bold shadow-sm disabled:opacity-50"
              onClick={handleSearchPatient}
              disabled={isSearching}
            >
              Cari Data
            </button>
          </div>

          {searchResult ? (
            <div className="border border-slate-300 rounded-sm bg-white overflow-hidden">
              <div className="bg-emerald-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-800">
                    Pasien Ditemukan (KYC Valid)
                  </span>
                </div>
                <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-emerald-200 text-emerald-700">
                  IHS: {searchResult.ihs}
                </span>
              </div>
              <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Data Demografi IHS
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Nama Lengkap</span>
                      <span className="font-bold text-slate-800">
                        {searchResult.name}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">NIK / ID</span>
                      <span className="font-medium text-slate-800">
                        {searchNIK || "3500112233445566"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Tanggal Lahir</span>
                      <span className="font-medium text-slate-800">
                        12 Maret 1985
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Aksi Lanjutan
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded transition-colors text-sm font-medium">
                      <span>Update Nomor IHS ke Local DB</span>
                      <Save className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded transition-colors text-sm font-medium">
                      <span>Lihat Rekam Medis (FHIR)</span>
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-slate-300 rounded-sm p-8 flex-1 flex flex-col items-center justify-center bg-slate-50">
              <SearchIcon className="w-16 h-16 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium text-sm">
                Masukkan NIK untuk melihat data pasien dari server Satu Sehat
              </p>
              <p className="text-slate-400 text-xs mt-2">
                Data yang ditampilkan berupa IHS Number, Nama Lengkap, dan
                status KYC
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content - Kirim Data */}
      {activeTab === "kirim" && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-700">
                Kirim Data Kunjungan (Encounter) ke Satu Sehat
              </h2>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
              onClick={() => toast.success("Mengirim semua data pending...")}
            >
              <Send className="w-4 h-4" /> Kirim Semua Pending
            </button>
          </div>

          <div className="flex-1 overflow-auto border border-slate-300 rounded-sm bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-200 text-slate-700 sticky top-0">
                <tr>
                  <th className="px-3 py-2 border-b border-slate-300">
                    Waktu Kunjungan
                  </th>
                  <th className="px-3 py-2 border-b border-slate-300">
                    No. RM (Local)
                  </th>
                  <th className="px-3 py-2 border-b border-slate-300">
                    Nama Pasien
                  </th>
                  <th className="px-3 py-2 border-b border-slate-300">
                    IHS Number
                  </th>
                  <th className="px-3 py-2 border-b border-slate-300 text-center">
                    Status Kirim
                  </th>
                  <th className="px-3 py-2 border-b border-slate-300 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {useSRMStore
                  .getState()
                  .visits.slice(0, 8)
                  .map((visit, idx) => {
                    const p = patients.find(
                      (pat) => pat.id === visit.patientId,
                    );
                    const isPending = idx % 3 === 0;
                    const isFailed = idx === 1;
                    const ihsNum = p?.nik?.startsWith("35")
                      ? `P${p.nik.slice(2, 12) || "1234567890"}`
                      : "Belum KYC";

                    return (
                      <tr
                        key={visit.id}
                        className="border-b border-slate-200 hover:bg-slate-50"
                      >
                        <td className="px-3 py-2">{visit.tanggalKunjungan}</td>
                        <td className="px-3 py-2 font-medium">
                          {p?.id || "-"}
                        </td>
                        <td className="px-3 py-2 font-bold text-slate-800">
                          {p?.namaLengkap || "-"}
                        </td>
                        <td
                          className={`px-3 py-2 font-mono ${ihsNum === "Belum KYC" ? "text-rose-500 italic" : "text-slate-500"}`}
                        >
                          {ihsNum}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {isPending ? (
                            <span className="bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              Pending
                            </span>
                          ) : isFailed ? (
                            <span className="bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              Failed
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              Success
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {isPending ? (
                            <button
                              className="text-blue-600 hover:text-blue-800 font-bold"
                              onClick={() => toast.success("Mengirim data...")}
                            >
                              Kirim
                            </button>
                          ) : isFailed ? (
                            <button
                              className="text-blue-600 hover:text-blue-800 font-bold"
                              onClick={() =>
                                toast.error("Validasi gagal. Periksa mapping")
                              }
                            >
                              Mapping
                            </button>
                          ) : (
                            <button className="text-slate-400 hover:text-slate-600 font-bold">
                              Detail
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content - Mapping Master */}
      {activeTab === "mapping" && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-700">
                Mapping Master Data ke Standar Kemenkes (Satu Sehat)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="border border-slate-300 rounded-sm bg-white p-4">
              <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                Mapping Poliklinik (Location)
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center text-xs">
                  <div className="font-medium text-slate-700 bg-slate-100 px-2 py-1.5 rounded">
                    Poli Umum (Rawat Jalan)
                  </div>
                  <input
                    type="text"
                    className="border border-slate-300 rounded px-2 py-1.5 focus:border-blue-500"
                    placeholder="ID Location IHS"
                    defaultValue="LOC-123456"
                  />
                  <button className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded font-bold hover:bg-blue-100">
                    Cek
                  </button>
                </div>
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center text-xs">
                  <div className="font-medium text-slate-700 bg-slate-100 px-2 py-1.5 rounded">
                    IGD
                  </div>
                  <input
                    type="text"
                    className="border border-slate-300 rounded px-2 py-1.5 focus:border-blue-500"
                    placeholder="ID Location IHS"
                    defaultValue="LOC-987654"
                  />
                  <button className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded font-bold hover:bg-blue-100">
                    Cek
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-slate-300 rounded-sm bg-white p-4">
              <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                Mapping Dokter (Practitioner)
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center text-xs">
                  <div className="font-medium text-slate-700 bg-slate-100 px-2 py-1.5 rounded">
                    Dr. Andi (NIK: 350...)
                  </div>
                  <input
                    type="text"
                    className="border border-emerald-300 bg-emerald-50 rounded px-2 py-1.5 focus:border-blue-500 text-emerald-800"
                    placeholder="IHS Practitioner ID"
                    defaultValue="N12345678"
                    readOnly
                  />
                  <button
                    className="bg-slate-100 text-slate-400 px-3 py-1.5 rounded font-bold"
                    disabled
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center text-xs">
                  <div className="font-medium text-slate-700 bg-slate-100 px-2 py-1.5 rounded">
                    Dr. Budi (NIK: 320...)
                  </div>
                  <input
                    type="text"
                    className="border border-slate-300 rounded px-2 py-1.5 focus:border-blue-500"
                    placeholder="IHS Practitioner ID"
                  />
                  <button className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded font-bold hover:bg-blue-100">
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - SIRS Online */}
      {activeTab === "sirs" && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-700">
                Pelaporan SIRS Online (Sistem Informasi Rumah Sakit)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="border border-slate-300 rounded-sm bg-white p-4">
              <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>RL 3.1 - Pelayanan Rawat Inap</span>
                <span className="bg-amber-50 text-amber-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-amber-200">
                  Menunggu Laporan
                </span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Laporan rekapitulasi pelayanan rawat inap bulanan yang
                dikelompokkan berdasarkan jenis pelayanan.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Bulan
                  </label>
                  <select className="w-full text-xs border border-slate-300 rounded px-2 py-1.5 focus:border-blue-500">
                    <option>Mei 2026</option>
                    <option>Juni 2026</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded w-full">
                    Tarik Data Rekam Medis
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 border border-slate-300 rounded">
                  Pratinjau XML
                </button>
                <button
                  className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm"
                  onClick={() =>
                    toast.success("Mengirim laporan RL 3.1 ke SIRS Online...")
                  }
                >
                  Kirim ke SIRS
                </button>
              </div>
            </div>

            <div className="border border-slate-300 rounded-sm bg-white p-4">
              <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>RL 5.3 - 10 Besar Penyakit Rawat Jalan</span>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Terkirim
                </span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Laporan rekapitulasi 10 besar penyakit terbanyak pada pasien
                rawat jalan berdasarkan kode ICD-10.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Bulan
                  </label>
                  <select
                    className="w-full text-xs border border-slate-300 rounded px-2 py-1.5 focus:border-blue-500"
                    disabled
                  >
                    <option>April 2026</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    className="bg-slate-50 text-slate-400 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded w-full"
                    disabled
                  >
                    Tarik Data Rekam Medis
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 border border-slate-300 rounded">
                  Lihat Bukti Kirim
                </button>
              </div>
            </div>

            <div className="border border-slate-300 rounded-sm bg-white p-4 col-span-2">
              <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                Status Pelaporan Tahun 2026
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2 font-medium">Jenis Laporan</th>
                      <th className="px-3 py-2 font-medium text-center">Jan</th>
                      <th className="px-3 py-2 font-medium text-center">Feb</th>
                      <th className="px-3 py-2 font-medium text-center">Mar</th>
                      <th className="px-3 py-2 font-medium text-center">Apr</th>
                      <th className="px-3 py-2 font-medium text-center">Mei</th>
                      <th className="px-3 py-2 font-medium text-center">Jun</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-3 py-2 font-medium">
                        RL 3.1 Rawat Inap
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">-</td>
                      <td className="px-3 py-2 text-center">-</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">
                        RL 3.2 Rawat Darurat
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">-</td>
                      <td className="px-3 py-2 text-center">-</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">
                        RL 5.3 Penyakit Rawat Jalan
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
                      </td>
                      <td className="px-3 py-2 text-center">-</td>
                      <td className="px-3 py-2 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default SRMIntegrasi;
