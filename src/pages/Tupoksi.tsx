import React from "react";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  CheckCircle2,
  Target,
  Stethoscope,
  Scale,
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Tupoksi() {
  const { lang } = useLangStore();

  const fungsiList = [
    "Pelayanan asuhan pasien secara profesional dan Islami;",
    "Penyelenggaraan pendidikan dan penelitian dalam rangka pengembangan pelayanan kesehatan guna memfasilitasi Tri Dharma Perguruan Tinggi Universitas Muhammadiyah Lamongan;",
    "Pengelolaan manajemen sumber daya secara efektif, efisien, dan transparan berlandaskan nilai-nilai kemuhammadiyahan;",
    "Penyelenggaraan dukungan penanganan masalah kesehatan masyarakat dan peran sebagai rumah sakit rujukan daerah tingkat kabupaten/regional;",
    "Pelaksanaan pelayanan kesehatan komprehensif, paripurna, bermutu dan keselamatan pasien;",
    "Pelaksanaan fungsi lain yang diberikan oleh Direktur Utama dan Persyarikatan Muhammadiyah.",
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-tupoksi/1920/600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-emerald-800/90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
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
                  <span className="ml-1 md:ml-2">Profil</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span className="ml-1 md:ml-2 text-white font-medium">
                    Tugas Pokok & Fungsi
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full">
            <Target className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t(lang, "Tugas Pokok & Fungsi", "Duties & Functions")}
            </h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl px-4">
              {t(
                lang,
                "Pedoman dasar pelaksanaan tugas dan fungsi pelayanan kesehatan Islami di lingkungan RS Universitas Muhammadiyah Lamongan.",
                "Basic guidelines for the implementation of Islamic health services and functions at Muhammadiyah Lamongan University Hospital.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Tugas Pokok Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="bg-emerald-100 p-3 rounded-2xl mr-4 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-emerald-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {t(lang, "Tugas Pokok", "Main Duties")}
              </h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Melaksanakan upaya pelayanan kesehatan paripurna (preventif,
              promotif, kuratif, dan rehabilitatif) secara berdaya guna dan
              berhasil guna yang Islami, serta menyelenggarakan kegiatan Tri
              Dharma Perguruan Tinggi (Pendidikan, Penelitian, dan Pengabdian
              kepada Masyarakat) sebagai Rumah Sakit Pendidikan Universitas
              Muhammadiyah Lamongan, dan berfungsi sebagai rujukan kesehatan
              masyarakat di Kabupaten Lamongan dan sekitarnya.
            </p>
          </div>
        </div>

        {/* Fungsi Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-tr-[100px] -z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-2xl mr-4 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {t(lang, "Fungsi", "Functions")}
              </h2>
            </div>
            <ul className="space-y-4">
              {fungsiList.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm mr-4 mt-0.5 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    {index + 1}
                  </span>
                  <p className="text-lg text-slate-700 leading-relaxed pt-0.5">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sumber Reference */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start">
          <Scale className="w-6 h-6 text-slate-400 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              Sumber Regulasi
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              Peraturan Direktur Rumah Sakit Universitas Muhammadiyah Lamongan
              tentang Nomenklatur, Susunan Organisasi, Uraian Tugas dan Fungsi
              serta Tata Kerja Rumah Sakit Universitas Muhammadiyah Lamongan.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
