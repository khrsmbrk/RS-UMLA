import React from "react";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ChevronRight, Home, Info, Construction } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeMap: Record<
  string,
  { title: string; category: string; icon: React.ReactNode }
> = {
  "/profil/struktur-organisasi": {
    title: "Struktur Organisasi",
    category: "Profil",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/profil/sumber-daya-manusia": {
    title: "Sumber Daya Manusia",
    category: "Profil",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/profil/penghargaan-haki": {
    title: "Penghargaan & HAKI",
    category: "Profil",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pelayanan/rawat-jalan": {
    title: "Rawat Jalan",
    category: "Pelayanan",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pelayanan/rawat-inap": {
    title: "Rawat Inap",
    category: "Pelayanan",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pelayanan/gawat-darurat": {
    title: "Gawat Darurat",
    category: "Pelayanan",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pelayanan/graha-amerta": {
    title: "Graha Amerta",
    category: "Pelayanan",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pelayanan/informasi": {
    title: "Informasi",
    category: "Pelayanan",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pelayanan/standar-pelayanan": {
    title: "Standart Pelayanan Publik",
    category: "Pelayanan",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pelayanan/panduan-klinik": {
    title: "Panduan Peraktek Klinik",
    category: "Pelayanan",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/diklat/diklat": {
    title: "Diklat",
    category: "Diklat & Penelitian",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/diklat/litbang": {
    title: "Litbang",
    category: "Diklat & Penelitian",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/diklat/webinar": {
    title: "Webinar",
    category: "Diklat & Penelitian",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/promkes": {
    title: "Promosi Kesehatan",
    category: "Menu Utama",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/laporan": {
    title: "Laporan",
    category: "Menu Utama",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/reformasi-birokrasi": {
    title: "Reformasi Birokrasi",
    category: "Menu Utama",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/pengaduan": {
    title: "Pengaduan",
    category: "Menu Utama",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/kebijakan-privasi": {
    title: "Kebijakan Privasi",
    category: "Informasi",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
  "/syarat-ketentuan": {
    title: "Syarat & Ketentuan",
    category: "Informasi",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  },
};

export default function GenericPage() {
  const { lang } = useLangStore();
  const location = useLocation();
  const pathInfo = routeMap[location.pathname] || {
    title: "Halaman Tidak Ditemukan",
    category: "Sistem",
    icon: <Info className="w-16 h-16 text-emerald-400 mb-6" />,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-generic/1920/600')] bg-cover bg-center opacity-20"></div>
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
              {pathInfo.category !== "Menu Utama" &&
                pathInfo.category !== "Sistem" && (
                  <li>
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4" />
                      <span className="ml-1 md:ml-2">{pathInfo.category}</span>
                    </div>
                  </li>
                )}
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span className="ml-1 md:ml-2 text-white font-medium">
                    {pathInfo.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center">
            {pathInfo.icon}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {pathInfo.title}
            </h1>
            <p className="text-lg text-emerald-100 max-w-2xl">
              {t(
                lang,
                `Halaman ${pathInfo.title} RS UMLA`,
                `${pathInfo.title} Page of RS UMLA`,
              )}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center bg-white rounded-3xl p-12 py-20 shadow-sm border border-slate-200">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <Construction className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Informasi Sedang Diperbarui
          </h2>
          <p className="text-slate-500 max-w-md text-lg">
            Halaman <strong>{pathInfo.title}</strong> sedang dalam peninjauan berkala oleh tim operasional untuk memastikan standar pelayanan terbaik.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
