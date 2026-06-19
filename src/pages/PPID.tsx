import React, { useState } from "react";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  FileText,
  Clock,
  Info,
  MessageSquareWarning,
  ArrowRight,
  ShieldCheck,
  FileSearch,
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from '@tanstack/react-router';

export default function PPID() {
  const { lang } = useLangStore();
  const [activeTab, setActiveTab] = useState("profil");

  const tabs = [
    { id: "profil", label: t(lang, "Profil", "Profile") },
    { id: "dokumen", label: t(lang, "Dokumen", "Documents") },
    {
      id: "layanan",
      label: t(lang, "Layanan Informasi", "Information Services"),
    },
    { id: "daftar", label: t(lang, "Daftar Informasi", "Information List") },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-ppid/1920/600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-emerald-800/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          {/* Breadcrumb */}
          <nav
            className="flex text-emerald-100 text-sm mb-4 md:mb-6 w-full max-w-4xl"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center hover:text-white transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Beranda
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span className="ml-1 md:ml-2 text-white font-medium">
                    PPID
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full max-w-4xl">
            <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 px-4">
              Pejabat Pengelola Informasi dan Dokumentasi (PPID)
            </h1>
            <p className="text-base md:text-xl text-emerald-100 max-w-3xl px-4">
              {t(
                lang,
                "Komitmen Manajemen Rumah Sakit Universitas Muhammadiyah Lamongan Untuk Keterbukaan Informasi Publik.",
                "Commitment of Muhammadiyah Lamongan University Hospital Management to Public Information Openness.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 mb-8 pb-px scrollbar-hide">
          <div className="flex space-x-8 min-w-full lg:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold tracking-wide whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-12 min-h-[400px]">
          {activeTab === "profil" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t(lang, "Profil PPID", "PPID Profile")}
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                <p>
                  Sesuai dengan amanat Undang-Undang Nomor 14 Tahun 2008 tentang
                  Keterbukaan Informasi Publik, Rumah Sakit Universitas
                  Muhammadiyah Lamongan menetapkan Pejabat Pengelola Informasi
                  dan Dokumentasi (PPID) untuk memastikan layanan informasi
                  publik yang profesional, transparan, dan akuntabel.
                </p>
                <p>PPID RS UMLA bertugas:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Menyediakan informasi publik yang akurat dan mudah
                    dijangkau.
                  </li>
                  <li>
                    Membangun dan mengembangkan sistem penyediaan dan layanan
                    informasi.
                  </li>
                  <li>
                    Melaksanakan pengelolaan dan pendokumentasian informasi
                    publik.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "dokumen" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t(lang, "Dokumen PPID", "PPID Documents")}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "SK PPID",
                  "Pedoman Pengelolaan Informasi Publik",
                  "SOP Pelayanan Informasi Publik",
                  "Laporan Tahunan PPID",
                ].map((doc, i) => (
                  <a
                    href="#"
                    key={i}
                    className="flex items-center p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-colors">
                      <FileText className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="font-semibold text-slate-700 group-hover:text-emerald-800 transition-colors">
                      {doc}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === "layanan" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t(lang, "Layanan Informasi", "Information Services")}
              </h2>
              <div className="space-y-8">
                {/* Jam Pelayanan */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center mb-4">
                    <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                    {t(
                      lang,
                      "Jam Pelayanan Informasi Publik",
                      "Public Information Service Hours",
                    )}
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left font-bold text-slate-700">
                            Hari
                          </th>
                          <th className="px-6 py-3 text-left font-bold text-slate-700">
                            Waktu Pelayanan
                          </th>
                          <th className="px-6 py-3 text-left font-bold text-slate-700">
                            Waktu Istirahat
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        <tr>
                          <td className="px-6 py-4 font-medium text-slate-900">
                            Senin - Kamis
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            07:00 - 15:30 WIB
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            12:00 - 13:00 WIB
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-slate-900">
                            Jumat
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            07:00 - 15:00 WIB
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            11:30 - 12:30 WIB
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Jangka Waktu */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center mb-4">
                    <Info className="w-5 h-5 mr-2 text-emerald-600" />
                    {t(
                      lang,
                      "Jangka Waktu Penyelesaian",
                      "Completion Duration",
                    )}
                  </h3>
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 text-sm text-slate-700 leading-relaxed">
                    Waktu penyelesaian dilaksanakan paling lambat{" "}
                    <strong>10 (sepuluh) hari kerja</strong> sejak diterima
                    permintaan. Pejabat Pengelola Informasi dan Dokumentasi
                    (PPID) akan menyampaikan pemberitahuan yang berisikan
                    informasi yang diminta berada di bawah penguasaannya atau
                    tidak. Kemudian PPID dapat memperpanjang waktu paling lambat{" "}
                    <strong>7 (tujuh) hari kerja</strong>.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "daftar" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t(lang, "Daftar Informasi Publik", "Public Information List")}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border border-slate-200">
                  <FileSearch className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">
                    Informasi Berkala
                  </h3>
                  <p className="text-sm text-slate-600">
                    Informasi yang wajib disediakan dan diumumkan secara berkala
                    (6 bulan sekali).
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-slate-200">
                  <FileSearch className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">
                    Informasi Serta Merta
                  </h3>
                  <p className="text-sm text-slate-600">
                    Informasi yang dapat mengancam hajat hidup orang banyak dan
                    ketertiban umum.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-slate-200">
                  <FileSearch className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">
                    Informasi Tiap Saat
                  </h3>
                  <p className="text-sm text-slate-600">
                    Informasi yang harus tersedia setiap saat dan dapat diakses
                    oleh publik.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Set */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href="#"
            className="flex flex-col items-center text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              <MessageSquareWarning className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700">
              Pengaduan Layanan Publik
            </h3>
            <p className="text-sm text-slate-500 flex-1">
              Sampaikan keluhan dan saran untuk perbaikan layanan kami.
            </p>
            <div className="mt-6 flex items-center text-sm font-bold text-blue-600">
              Kirim Pengaduan{" "}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <a
            href="#"
            className="flex flex-col items-center text-center p-8 bg-emerald-600 border border-emerald-700 rounded-2xl shadow-sm hover:bg-emerald-500 hover:border-emerald-600 transition-all group"
          >
            <div className="w-16 h-16 bg-emerald-700/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600/50 transition-colors">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Permohonan Informasi
            </h3>
            <p className="text-sm text-emerald-100 flex-1">
              Ajukan permohonan informasi publik secara online melalui portal
              kami.
            </p>
            <div className="mt-6 flex items-center text-sm font-bold text-white">
              Buat Permohonan{" "}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <a
            href="#"
            className="flex flex-col items-center text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-amber-300 hover:shadow-md transition-all group"
          >
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
              <ShieldCheck className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-700">
              Keberatan Permohonan
            </h3>
            <p className="text-sm text-slate-500 flex-1">
              Ajukan keberatan atas permohonan informasi publik Anda.
            </p>
            <div className="mt-6 flex items-center text-sm font-bold text-amber-600">
              Ajukan Keberatan{" "}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
