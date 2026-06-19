import React, { useState } from "react";
import { Link } from '@tanstack/react-router';
import {
  ArrowLeft,
  Upload,
  Settings,
  LayoutTemplate,
  Newspaper,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useSiteStore } from "../../store/siteStore";

export default function OfficeDeveloperWeb() {
  const [activeTab, setActiveTab] = useState("logos");
  const { settings, updateSettings, addNews } = useSiteStore();
  const [successMsg, setSuccessMsg] = useState("");

  const [localLogos, setLocalLogos] = useState({
    logoHomepage: settings.logoHomepage,
    logoPortalPasien: settings.logoPortalPasien,
    logoOffice: settings.logoOffice,
    logoPendaftaran: settings.logoPendaftaran,
  });

  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "Umum",
    image: "",
    content: "",
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof localLogos,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalLogos((prev) => ({ ...prev, [key]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveLogos = () => {
    updateSettings({
      logoHomepage: localLogos.logoHomepage,
      logoPortalPasien: localLogos.logoPortalPasien,
      logoOffice: localLogos.logoOffice,
      logoPendaftaran: localLogos.logoPendaftaran,
    });
    setSuccessMsg("Logo berhasil disimpan.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const saveNews = (status: "draft" | "published") => {
    if (!newsForm.title || !newsForm.content) return;

    addNews({
      id: Date.now().toString(),
      title: newsForm.title,
      category: newsForm.category,
      image: newsForm.image || "https://picsum.photos/seed/news/800/600",
      content: newsForm.content,
      date: new Date().toISOString(),
      status,
    });

    setNewsForm({ title: "", category: "Umum", image: "", content: "" });
    setSuccessMsg(
      `Berita berhasil di${status === "published" ? "publikasi" : "simpan sebagai draft"}.`,
    );
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/office/dashboard"
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Developer Web Settings
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              Konfigurasi Sistem Panel Admin
            </p>
          </div>
        </div>
        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 animate-in fade-in zoom-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-4 h-4" /> {successMsg}
          </div>
        )}
      </header>

      <div className="p-6 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("logos")}
              className={`text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-colors ${activeTab === "logos" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              <LayoutTemplate className="w-5 h-5" />
              Upload Logo
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-colors ${activeTab === "news" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              <Newspaper className="w-5 h-5" />
              Berita Utama
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-colors ${activeTab === "settings" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              <Settings className="w-5 h-5" />
              Pengaturan Umum
            </button>
          </div>

          <div className="flex-1 p-6 md:p-8">
            {activeTab === "logos" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    Upload Logo Aplikasi
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Ubah logo RS UMLA pada berbagai halaman portal.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Item 1 */}
                  <div className="border border-slate-200 p-5 rounded-xl">
                    <h3 className="font-bold text-slate-800 mb-1">
                      Halaman Depan (Homepage)
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Logo utama pada layar depan.
                    </p>
                    <label className="block border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative overflow-hidden">
                      {localLogos.logoHomepage ? (
                        <div className="w-full flex items-center justify-center">
                          <img
                            src={localLogos.logoHomepage}
                            alt="Logo"
                            className="max-h-16 object-contain"
                          />
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                          <span className="text-sm font-medium text-slate-600">
                            Klik untuk upload file PNG/SVG
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "logoHomepage")}
                      />
                    </label>
                  </div>

                  {/* Item 2 */}
                  <div className="border border-slate-200 p-5 rounded-xl">
                    <h3 className="font-bold text-slate-800 mb-1">
                      Portal Pasien (Login & Dashboard)
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Logo diatas login form portal pasien.
                    </p>
                    <label className="block border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative overflow-hidden">
                      {localLogos.logoPortalPasien ? (
                        <div className="w-full flex items-center justify-center">
                          <img
                            src={localLogos.logoPortalPasien}
                            alt="Logo"
                            className="max-h-16 object-contain"
                          />
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                          <span className="text-sm font-medium text-slate-600">
                            Klik untuk upload file PNG/SVG
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, "logoPortalPasien")
                        }
                      />
                    </label>
                  </div>

                  {/* Item 3 */}
                  <div className="border border-slate-200 p-5 rounded-xl">
                    <h3 className="font-bold text-slate-800 mb-1">
                      RSUMLA Office (Internal)
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Logo diatas login form Office.
                    </p>
                    <label className="block border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative overflow-hidden">
                      {localLogos.logoOffice ? (
                        <div className="w-full flex items-center justify-center">
                          <img
                            src={localLogos.logoOffice}
                            alt="Logo"
                            className="max-h-16 object-contain"
                          />
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                          <span className="text-sm font-medium text-slate-600">
                            Klik untuk upload file PNG/SVG
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "logoOffice")}
                      />
                    </label>
                  </div>

                  {/* Item 4 */}
                  <div className="border border-slate-200 p-5 rounded-xl">
                    <h3 className="font-bold text-slate-800 mb-1">
                      Pendaftaran Online
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Logo pada form pendaftaran online.
                    </p>
                    <label className="block border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative overflow-hidden">
                      {localLogos.logoPendaftaran ? (
                        <div className="w-full flex items-center justify-center">
                          <img
                            src={localLogos.logoPendaftaran}
                            alt="Logo"
                            className="max-h-16 object-contain"
                          />
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                          <span className="text-sm font-medium text-slate-600">
                            Klik untuk upload file PNG/SVG
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "logoPendaftaran")}
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={saveLogos}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-4 h-4" /> Simpan Semua Perubahan
                  </button>
                </div>
              </div>
            )}

            {activeTab === "news" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    Manajemen Berita & Pengumuman
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Masukkan berita terbaru untuk halaman utama web RSUMLA.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Judul Artikel
                    </label>
                    <input
                      type="text"
                      value={newsForm.title}
                      onChange={(e) =>
                        setNewsForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                      placeholder="Masukkan judul berita..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Kategori
                    </label>
                    <select
                      value={newsForm.category}
                      onChange={(e) =>
                        setNewsForm((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium bg-white"
                    >
                      <option>Umum</option>
                      <option>Layanan Medis</option>
                      <option>Pengumuman</option>
                      <option>Event Khusus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Upload Gambar Sampul
                    </label>
                    <div className="border border-slate-300 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500 truncate max-w-xs">
                        {newsForm.image
                          ? "Gambar terpilih"
                          : "Tidak ada file gambar terpilih"}
                      </span>
                      <label className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1.5 rounded font-bold text-xs transition-colors cursor-pointer">
                        Pilih File
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleNewsImageUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Konten Berita
                    </label>
                    <textarea
                      value={newsForm.content}
                      onChange={(e) =>
                        setNewsForm((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={8}
                      className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                      placeholder="Ketik isi berita Anda di sini..."
                    ></textarea>
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button
                    onClick={() => saveNews("draft")}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-lg font-bold transition-colors"
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => saveNews("published")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors"
                  >
                    Publikasi Berita
                  </button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    Pengaturan Umum Website
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Konfigurasi footer, kontak, dan pengaturan dasar website.
                  </p>
                </div>
                <div className="border border-amber-200 bg-amber-50 p-6 rounded-xl flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-900 mb-1">
                      Informasi Konfigurasi Sistem
                    </h3>
                    <p className="text-sm text-amber-800">
                      Fitur pengaturan SEO, konfigurasi email SMTP, dan
                      integrasi API pihak ketiga memerlukan hak akses superadmin tingkat server. Silakan hubungi tim infrastruktur IT.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
