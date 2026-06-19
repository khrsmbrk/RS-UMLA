import React from "react";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Network,
  Ambulance,
  ShieldPlus,
  HeartHandshake,
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from '@tanstack/react-router';

export default function RujukanKabupaten() {
  const { lang } = useLangStore();

  const layananRujukan = [
    {
      title: "Kegawatdaruratan Terpadu",
      desc: "Layanan IGD 24 Jam dengan sistem triase modern dan tim medis profesional yang siap memberikan penanganan pertama pada kasus gawat darurat tingkat lanjut.",
      icon: Ambulance,
    },
    {
      title: "Perawatan Intensif Terpusat",
      desc: "Menyediakan layanan ICU, NICU, PICU dengan peralatan berstandar tinggi untuk perawatan pasien kritis yang membutuhkan observasi ketat.",
      icon: ShieldPlus,
    },
    {
      title: "Rujukan Spesialistik Komprehensif",
      desc: "Pusat rujukan untuk poli spesialis dan subspesialis yang didukung oleh dokter ahli dari Fakultas Kedokteran Universitas Muhammadiyah Lamongan.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-rujukan/1920/600')] bg-cover bg-center opacity-20"></div>
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
                  <span className="ml-1 md:ml-2">Pelayanan</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span className="ml-1 md:ml-2 text-white font-medium">
                    Rujukan Kabupaten
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full">
            <Network className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t(lang, "Rujukan Kabupaten", "District Referral")}
            </h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl px-4">
              {t(
                lang,
                "Peran responsif RS UMLA sebagai pusat rujukan fasilitas kesehatan tingkat pertama di wilayah Kabupaten Lamongan.",
                "The responsive role of RS UMLA as a referral center for primary healthcare facilities in Lamongan District.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xl text-slate-600 leading-relaxed">
            Sebagai salah satu rumah sakit utama di wilayah regional, Rumah
            Sakit Universitas Muhammadiyah Lamongan bertindak sebagai{" "}
            <strong>
              fasilitas rujukan tingkat lanjut (Fasilitas Kesehatan Rujukan
              Tingkat Lanjut/FKRTL)
            </strong>{" "}
            yang melayani rujukan dari Puskesmas, Klinik Pratama, maupun Praktik
            Dokter Mandiri di seluruh Kabupaten Lamongan dan sekitarnya.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {layananRujukan.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 hover:shadow-md hover:border-emerald-200 transition-all group"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                <item.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Alur Rujukan */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Sistem Rujukan Terintegrasi
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex bg-slate-50 border border-slate-200 rounded-2xl p-6 items-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 mr-6 shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">
                    Fasilitas Kesehatan Tingkat Pertama (FKTP)
                  </h4>
                  <p className="text-slate-600">
                    Pasien dirujuk melalui Puskesmas/Klinik jejaring BPJS atau
                    Mandiri dengan indikasi medis yang memerlukan spesialisasi.
                  </p>
                </div>
              </div>
              <div className="flex bg-emerald-50 border border-emerald-200 rounded-2xl p-6 items-center">
                <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center font-bold text-emerald-800 mr-6 shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 text-lg">
                    Integrasi SPGDT & Satu Sehat
                  </h4>
                  <p className="text-emerald-700">
                    Pendaftaran rujukan dilakukan melalui sistem rujukan online
                    (SISRUTE/Mobile JKN) untuk ketersediaan bed dan penjadwalan
                    dokter terintegrasi.
                  </p>
                </div>
              </div>
              <div className="flex bg-blue-50 border border-blue-200 rounded-2xl p-6 items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-800 mr-6 shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-lg">
                    Penerimaan & Tindakan di RS UMLA
                  </h4>
                  <p className="text-blue-700">
                    Pasien diterima di IGD atau Poli Rawat Jalan RS UMLA dengan
                    penanganan cepat, aman, dan berkesinambungan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
