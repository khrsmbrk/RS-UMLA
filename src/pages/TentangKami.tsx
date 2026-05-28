import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLangStore } from "../store/langStore";
import { useSiteStore } from "../store/siteStore";
import { t } from "../utils/translations";
import {
  Download,
  Heart,
  Users,
  Cross,
  Activity,
  Shield,
  PlayCircle,
  Circle,
  Sun,
  Moon,
  Leaf,
  Droplet,
  Star,
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TentangKami() {
  const { lang } = useLangStore();
  const { settings } = useSiteStore();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />

      {/* Header Section */}
      <div className="bg-emerald-800 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-building/1920/600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-emerald-800/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
          {/* Breadcrumb */}
          <nav
            className="flex text-emerald-100 text-sm mb-6"
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
                    Tentang Kami
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {t(lang, "Tentang Kami", "About Us")}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto text-center">
            {t(
              lang,
              "Mengenal lebih dekat Rumah Sakit Universitas Muhammadiyah Lamongan, dedikasi kami untuk kesehatan masyarakat.",
              "Get to know Muhammadiyah Lamongan University Hospital closer, our dedication to public health.",
            )}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
        {/* Sekilas RS UMLA */}
        <section>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img
                src="https://picsum.photos/seed/rsumla-building/800/600"
                alt="RS UMLA Building"
                className="rounded-2xl shadow-xl w-full object-cover aspect-video"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {t(lang, "Sekilas RS UMLA", "RS UMLA at a Glance")}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  {t(
                    lang,
                    "Rumah Sakit Universitas Muhammadiyah Lamongan (RS UMLA) adalah rumah sakit milik Persyarikatan Muhammadiyah dan Universitas Muhammadiyah Lamongan. Berlokasi strategis di Jl. Raya Plalangan Plosowahyu KM 2, Lamongan, Jawa Timur 62218, RS UMLA hadir sebagai pusat pelayanan kesehatan yang terintegrasi dengan pendidikan dan penelitian medis terkini.",
                    "Muhammadiyah Lamongan University Hospital (RS UMLA) is a hospital owned by the Muhammadiyah Organization and Muhammadiyah Lamongan University. Strategically located at Jl. Raya Plalangan Plosowahyu KM 2, Lamongan, East Java 62218, RS UMLA serves as a healthcare center integrated with the latest medical education and research.",
                  )}
                </p>
                <p>
                  {t(
                    lang,
                    "RS UMLA berkomitmen untuk memberikan pelayanan kesehatan paripurna, bermutu, dan Islami kepada seluruh lapisan masyarakat. Dengan fasilitas modern dan tenaga medis profesional, kami terus berupaya mencapai standar akreditasi tertinggi dalam pelayanan kesehatan dan pendidikan klinis.",
                    "RS UMLA is committed to providing comprehensive, high-quality, and Islamic healthcare services to all levels of society. With modern facilities and professional medical staff, we continuously strive to achieve the highest accreditation standards in healthcare and clinical education.",
                  )}
                </p>
                <p>
                  {t(
                    lang,
                    'Kini, RS UMLA terus beradaptasi dan berinovasi agar dapat memberikan pelayanan terbaik. "Melayani dengan Ilmu, Menyembuhkan dengan Hati" menjadi semangat kami dalam setiap langkah pelayanan. Kami menjunjung tinggi nilai-nilai Islami, Etika, Integritas, Profesionalisme, dan Inovasi. Semoga kehadiran RS UMLA membawa manfaat yang luas bagi kesehatan masyarakat Lamongan dan sekitarnya. Terima Kasih.',
                    'Today, RS UMLA continues to adapt and innovate to provide the best service. "Serving with Knowledge, Healing with Heart" is our spirit in every step of service. We uphold Islamic values, Ethics, Integrity, Professionalism, and Innovation. Hopefully, the presence of RS UMLA brings broad benefits to the public health of Lamongan and its surroundings. Thank you.',
                  )}
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t(
                    lang,
                    "Company Profile RS UMLA (PDF, 42.7 MB)",
                    "RS UMLA Company Profile (PDF, 42.7 MB)",
                  )}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sejarah / Lini Masa */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
            {t(lang, "Sejarah & Lini Masa", "History & Timeline")}
          </h2>
          <div className="relative border-l-4 border-emerald-200 ml-4 md:ml-8 space-y-12 pb-4">
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[14px] top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">2018</h3>
              <p className="text-slate-600">
                {t(
                  lang,
                  "Perubahan status STIKES Muhammadiyah Lamongan menjadi Universitas Muhammadiyah Lamongan (UMLA), memunculkan gagasan pendirian Rumah Sakit Pendidikan.",
                  "The change in status of STIKES Muhammadiyah Lamongan to Muhammadiyah Lamongan University (UMLA) sparked the idea of establishing a Teaching Hospital.",
                )}
              </p>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[14px] top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">2020</h3>
              <p className="text-slate-600">
                {t(
                  lang,
                  "Peletakan batu pertama pembangunan gedung utama RS UMLA oleh Pimpinan Pusat Muhammadiyah.",
                  "The laying of the first stone for the construction of the main building of RS UMLA by the Central Board of Muhammadiyah.",
                )}
              </p>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[14px] top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">2022</h3>
              <p className="text-slate-600">
                {t(
                  lang,
                  "Penyelesaian pembangunan tahap pertama dan persiapan fasilitas medis serta rekrutmen tenaga kesehatan profesional.",
                  "Completion of the first phase of construction and preparation of medical facilities as well as the recruitment of professional healthcare workers.",
                )}
              </p>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[14px] top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">2024</h3>
              <p className="text-slate-600">
                {t(
                  lang,
                  "Soft launching RS UMLA dan pembukaan layanan rawat jalan untuk masyarakat umum.",
                  "Soft launching of RS UMLA and the opening of outpatient services for the general public.",
                )}
              </p>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[14px] top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">2025</h3>
              <p className="text-slate-600">
                {t(
                  lang,
                  "Grand launching RS UMLA dengan fasilitas lengkap termasuk rawat inap, IGD 24 jam, dan layanan unggulan, serta penetapan sebagai Rumah Sakit Pendidikan Utama bagi mahasiswa Fakultas Ilmu Kesehatan dan Kedokteran UMLA.",
                  "Grand launching of RS UMLA with complete facilities including inpatient care, 24-hour ER, and centers of excellence, as well as its designation as the Main Teaching Hospital for students of the UMLA Faculty of Health Sciences and Medicine.",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Lambang & Filosofi */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {t(lang, "Lambang & Filosofi", "Logo & Philosophy")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t(
                lang,
                "Makna dan nilai-nilai yang terkandung dalam identitas visual RS UMLA.",
                "The meaning and values contained in the visual identity of RS UMLA.",
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="w-80 h-80 rounded-full flex items-center justify-center mb-8 overflow-hidden border-4 border-emerald-100 shadow-lg">
                <img
                  src={settings.logoUrl}
                  alt="Logo RS UMLA"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback if image is not found in public folder
                    e.currentTarget.src =
                      "https://picsum.photos/seed/rsumla-logo/400/400";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                {t(lang, "Unduh Lambang", "Download Logo")}
              </h3>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 transition-colors"
                >
                  <span className="font-medium">1. Lambang RS UMLA</span>
                  <Download className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 transition-colors"
                >
                  <span className="font-medium">2. Logo Universitas</span>
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                  <Circle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Bentuk Lingkaran
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t(
                      lang,
                      "Melambangkan kesinambungan, kesatuan, dan pelayanan yang tidak terputus kepada seluruh lapisan masyarakat tanpa membeda-bedakan.",
                      "Symbolizes continuity, unity, and uninterrupted service to all levels of society without discrimination.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Matahari Bersinar 12 (Muhammadiyah)
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t(
                      lang,
                      "Melambangkan pencerahan, semangat pembaruan, dan pengabdian tanpa henti yang menyinari kehidupan masyarakat, sejalan dengan visi Persyarikatan Muhammadiyah.",
                      "Symbolizes enlightenment, the spirit of renewal, and endless devotion that illuminates people's lives, in line with the vision of the Muhammadiyah Organization.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Bulan Sabit Merah
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t(
                      lang,
                      "Melambangkan pelayanan kesehatan, kepedulian, dan pertolongan medis yang berlandaskan nilai-nilai kemanusiaan dan keislaman.",
                      "Symbolizes healthcare, care, and medical assistance based on humanitarian and Islamic values.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Padi dan Kapas
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t(
                      lang,
                      "Melambangkan kesejahteraan, kemakmuran, dan keadilan sosial bagi seluruh masyarakat yang dilayani oleh RS UMLA.",
                      "Symbolizes welfare, prosperity, and social justice for all communities served by RS UMLA.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Warna Biru Tua
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t(
                      lang,
                      "Melambangkan kedamaian, ketenangan, kepercayaan, dan profesionalisme dalam memberikan pelayanan kesehatan yang paripurna.",
                      "Symbolizes peace, calmness, trust, and professionalism in providing comprehensive healthcare.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-emerald-500 p-3 rounded-full text-white shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Warna Hijau & Emas
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t(
                      lang,
                      "Warna hijau melambangkan pertumbuhan, harmoni, dan identitas Islami. Warna emas melambangkan kejayaan, kualitas pelayanan prima (excellent service), dan harapan.",
                      "Green symbolizes growth, harmony, and Islamic identity. Gold symbolizes glory, excellent service quality, and hope.",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mars dan Himne */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {t(lang, "Mars dan Himne", "Anthem and Hymn")}
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                {t(
                  lang,
                  "Dengarkan Mars dan Himne kebanggaan Rumah Sakit Universitas Muhammadiyah Lamongan.",
                  "Listen to the proud Anthem and Hymn of Muhammadiyah Lamongan University Hospital.",
                )}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Mars */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-emerald-800">
                    Mars RS UMLA
                  </h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    Official
                  </span>
                </div>

                <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group mb-6 shadow-inner">
                  <img
                    src="https://picsum.photos/seed/mars-rsumla/800/450"
                    alt="Thumbnail Mars RS UMLA"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-transform transform group-hover:scale-110 shadow-lg">
                      <PlayCircle className="w-8 h-8 ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-white font-medium drop-shadow-md">
                      Video Mars RS UMLA
                    </span>
                    <span className="text-white/80 text-sm bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                      03:45
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-amber-500" /> Lirik Mars
                    (Kutipan)
                  </h4>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-slate-600 text-sm italic leading-relaxed">
                    "Melangkah maju bersama RS UMLA...
                    <br />
                    Mengabdi untuk negeri, sehatkan masyarakat...
                    <br />
                    Dengan ilmu dan iman, kita wujudkan...
                    <br />
                    Pelayanan prima, penuh kasih sayang..."
                  </div>
                  <button className="w-full py-2.5 bg-white border border-emerald-200 text-emerald-700 font-medium rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" /> Unduh Lirik Lengkap
                  </button>
                </div>
              </div>

              {/* Himne */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-emerald-800">
                    Himne RS UMLA
                  </h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    Official
                  </span>
                </div>

                <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group mb-6 shadow-inner">
                  <img
                    src="https://picsum.photos/seed/himne-rsumla/800/450"
                    alt="Thumbnail Himne RS UMLA"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-transform transform group-hover:scale-110 shadow-lg">
                      <PlayCircle className="w-8 h-8 ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-white font-medium drop-shadow-md">
                      Video Himne RS UMLA
                    </span>
                    <span className="text-white/80 text-sm bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                      04:20
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-amber-500" /> Lirik Himne
                    (Kutipan)
                  </h4>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-slate-600 text-sm italic leading-relaxed">
                    "Dalam naungan ridho Ilahi...
                    <br />
                    RS UMLA berdiri teguh mengabdi...
                    <br />
                    Menyembuhkan luka, menyejukkan jiwa...
                    <br />
                    Bakti kami untuk kemanusiaan..."
                  </div>
                  <button className="w-full py-2.5 bg-white border border-emerald-200 text-emerald-700 font-medium rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" /> Unduh Lirik Lengkap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
