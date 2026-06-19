import React, { useState } from "react";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Building2,
  Navigation,
  MapPin,
  PhoneCall,
  Map,
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from '@tanstack/react-router';

export default function Kedudukan() {
  const { lang } = useLangStore();
  const [activeTab, setActiveTab] = useState("kedudukan");

  const tabs = [
    { id: "kedudukan", label: t(lang, "Kedudukan", "Position") },
    { id: "kontak", label: t(lang, "Kontak Penting", "Important Contacts") },
    { id: "denah", label: t(lang, "Denah", "Map") },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-kedudukan/1920/600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-emerald-800/90"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          {/* Breadcrumb */}
          <nav
            className="flex text-emerald-100 text-sm mb-4 md:mb-6 w-full max-w-6xl"
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
                    Kedudukan
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t(lang, "Kedudukan", "Position")}
            </h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl px-4">
              {t(
                lang,
                "Kedudukan hukum, lokasi, serta kontak penting Rumah Sakit Universitas Muhammadiyah Lamongan.",
                "Legal position, location, and important contacts of Muhammadiyah Lamongan University Hospital.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 mb-8 pb-px scrollbar-hide">
          <div className="flex space-x-8 min-w-full md:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm md:text-base font-bold tracking-wide whitespace-nowrap transition-all border-b-2 ${
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
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10 mb-8 min-h-[400px]">
          {/* Tab 1: Kedudukan */}
          {activeTab === "kedudukan" && (
            <div className="animate-in fade-in duration-500 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-emerald-100 p-3 rounded-2xl mr-4 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {t(lang, "Kedudukan Institusi", "Institutional Position")}
                  </h2>
                </div>
                <div className="prose prose-lg text-slate-700 leading-relaxed max-w-none space-y-6">
                  <p className="text-justify indent-8">
                    Rumah Sakit Universitas Muhammadiyah Lamongan (RS UMLA)
                    adalah fasilitas pelayanan kesehatan paripurna yang
                    diselenggarakan secara langsung oleh{" "}
                    <strong>Persyarikatan Muhammadiyah</strong> di bawah
                    koordinasi dan naungan Majelis Pembina Kesehatan Umum (MPKU)
                    Pimpinan Wilayah Muhammadiyah Jawa Timur, yang bersinergi
                    lekat dengan Universitas Muhammadiyah Lamongan. Kehadiran RS
                    UMLA merupakan wujud nyata ikhtiar Persyarikatan
                    Muhammadiyah dalam membumikan misi kerahmatan, yakni
                    memberikan pelayanan sosial dan kesehatan yang inklusif,
                    profesional, berkualitas, dan berjiwa Islami kepada seluruh
                    lapisan masyarakat.
                  </p>
                  <p className="text-justify indent-8">
                    Sebagai unit amal usaha Muhammadiyah yang bergerak tangguh
                    di bidang kesehatan, RS UMLA memiliki kedudukan yang sangat
                    fundamental. Pertama, RS UMLA berkedudukan sebagai{" "}
                    <strong>Rumah Sakit Pendidikan Utama</strong>. Dalam
                    kapasitas ini, rumah sakit tak hanya melayani pasien, namun
                    juga menjadi sentra pendidikan klinis terpadu bagi para
                    mahasiswa tingkat profesi dari Fakultas Ilmu Kesehatan dan
                    Fakultas Kedokteran Universitas Muhammadiyah Lamongan. RS
                    UMLA berperan aktif memfasilitasi ruang aktualisasi Tri
                    Dharma Perguruan Tinggi yang meliputi elemen pendidikan,
                    penerapan inovasi penelitian, serta pengabdian masyarakat.
                  </p>
                  <p className="text-justify indent-8">
                    Kedua, RS UMLA memegang kedudukan sentral sebagai pilar
                    penyedia layanan kesehatan masyarakat di wilayah regional.
                    Rumah sakit ini berkomitmen menyelenggarakan layanan
                    kesehatan medis yang komprehensif, mencakup aspek pelayanan
                    preventif (pencegahan), promotif (peningkatan kesehatan),
                    kuratif (tindakan medis dan pengobatan), serta rehabilitatif
                    (pemulihan berkesinambungan). Dengan ekosistem layanan yang
                    mumpuni, RS UMLA memposisikan dirinya sebagai rujukan dan
                    oase kesehatan bagi masyarakat umum di wilayah Kabupaten
                    Lamongan, serta daerah-daerah lain di sekitarnya.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Kontak Penting */}
          {activeTab === "kontak" && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl mr-4 flex items-center justify-center">
                  <PhoneCall className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t(lang, "Kontak Penting", "Important Contacts")}
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm md:text-base">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-slate-700">
                        Unit
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-slate-700">
                        Kontak
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-slate-700">
                        Jam Kerja
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Call Center
                      </td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">
                        1500955
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        Senin - Sabtu, 07.00 - 18.00 WIB
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Instalasi Gawat Darurat
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        Customer Care :{" "}
                        <span className="font-semibold whitespace-nowrap">
                          +62 812 1314 4007
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">24 Jam</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 align-top">
                        Instalasi Graha Amerta dan Paviliun Indraprastha
                      </td>
                      <td className="px-6 py-4 text-slate-700 space-y-2">
                        <div className="flex flex-col">
                          <span>
                            Informasi :{" "}
                            <span className="font-semibold whitespace-nowrap">
                              +62 822 3373 6431
                            </span>
                          </span>
                          <span className="text-xs text-slate-500 italic">
                            (Hanya menerima pesan WhatsApp)
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span>
                            Customer Care :{" "}
                            <span className="font-semibold whitespace-nowrap">
                              +62 812 1687 3905
                            </span>
                          </span>
                          <span className="text-xs text-slate-500 italic">
                            (Hanya menerima pesan WhatsApp)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 align-top">
                        Senin - Jumat, 07.00 - 20.00 WIB
                        <br />
                        Sabtu, 07.00 - 14.00 WIB
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Medical Check Up
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        <div className="flex flex-col">
                          <span>
                            Customer Care :{" "}
                            <span className="font-semibold whitespace-nowrap">
                              +62 812 2590 5986
                            </span>
                          </span>
                          <span className="text-xs text-slate-500 italic">
                            (Hanya menerima pesan WhatsApp)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        Senin - Jumat, 08.00 - 15.00 WIB
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Pengaduan
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        <div className="flex flex-col">
                          <span className="font-semibold whitespace-nowrap">
                            +62 812 1670 0101
                          </span>
                          <span className="text-xs text-slate-500 italic">
                            (Hanya menerima pesan WhatsApp)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        Senin - Jumat, 08.00 - 15.30 WIB
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Hotline BPJS Kesehatan
                      </td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold whitespace-nowrap">
                        +62 813 3181 9776
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        Senin - Jumat, 08.00 - 15.30 WIB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Denah */}
          {activeTab === "denah" && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 p-3 rounded-2xl mr-4 flex items-center justify-center">
                  <Map className="w-6 h-6 text-amber-700" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t(lang, "Denah Lokasi", "Location Map")}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Berada di lokasi strategis yang mudah diakses dari berbagai
                wilayah di Kabupaten Lamongan dan sekitarnya.
              </p>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 relative group">
                <div className="aspect-[16/9] md:aspect-[21/9] bg-slate-200 rounded-xl flex items-center justify-center flex-col relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50 bg-[url('https://picsum.photos/seed/map/1200/600')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <MapPin className="w-12 h-12 text-red-600 mb-2 relative z-10 drop-shadow-lg" />
                  <p className="font-bold text-slate-800 relative z-10 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full text-sm md:text-base border border-slate-200 shadow-sm text-center mx-4">
                    Jl. Raya Plalangan, Plosowahyu, Kec. Lamongan, Kabupaten
                    Lamongan, Jawa Timur 62218
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
