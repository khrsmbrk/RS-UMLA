import React from "react";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Target, Flag, Star, Heart, ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function VisiMisi() {
  const { lang } = useLangStore();

  const misi = [
    "Menyelenggarakan pelayanan kesehatan yang paripurna, bermutu, dan Islami.",
    "Menyelenggarakan pendidikan klinik, keperawatan, dan tenaga kesehatan lainnya secara profesional dan Islami.",
    "Menyelenggarakan penelitian dan pengabdian kepada masyarakat dalam bidang kesehatan yang relevan dengan perkembangan keilmuan.",
    "Membina dan mengembangkan mutu sumber daya insani yang berakhlak mulia, profesional, dan berdedikasi tinggi.",
    "Mengembangkan manajemen rumah sakit yang mandiri, efisien, efektif, dan akuntabel berlandaskan nilai-nilai kemuhammadiyahan.",
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-visimisi/1920/600')] bg-cover bg-center opacity-20"></div>
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
                    Visi & Misi
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full">
            <Target className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t(lang, "Visi & Misi", "Vision & Mission")}
            </h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl px-4">
              {t(
                lang,
                "Cita-cita dan arah langkah juang Rumah Sakit Universitas Muhammadiyah Lamongan dalam melayani umat.",
                "The ideals and direction of Muhammadiyah Lamongan University Hospital in serving the community.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Visi Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0"></div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-8">
              <Star className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {t(lang, "Visi", "Vision")}
            </h2>
            <p className="text-2xl font-bold text-emerald-700 leading-relaxed italic">
              "Menjadi Rumah Sakit Pendidikan Utama yang Unggul, Islami, dan
              Berdaya Saing Global"
            </p>
          </div>
        </div>

        {/* Misi Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-tr-[100px] -z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-2xl mr-4 flex items-center justify-center">
                <Flag className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {t(lang, "Misi", "Mission")}
              </h2>
            </div>
            <ul className="space-y-6">
              {misi.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm mr-5 mt-0.5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-sm">
                    {index + 1}
                  </span>
                  <p className="text-lg text-slate-700 leading-relaxed pt-1.5">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nilai-nilai Card */}
        <div className="mt-8 bg-emerald-800 text-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <Heart className="w-12 h-12 text-emerald-300 mb-6" />
            <h2 className="text-2xl font-bold mb-4">
              {t(lang, "Motto Layanan", "Service Motto")}
            </h2>
            <p className="text-3xl font-serif italic text-emerald-100">
              "Melayani dengan Hati, Merawat dengan Sepenuh Jiwa Islami"
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
