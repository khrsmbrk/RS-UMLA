import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { t } from "../utils/translations";
import { useLangStore } from "../store/langStore";
import { useSiteStore } from "../store/siteStore";

export const Footer = () => {
  const { lang } = useLangStore();
  const { settings } = useSiteStore();

  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mr-3 overflow-hidden bg-white border border-emerald-200 shadow-sm">
                <img
                  src={settings.logoHomepage || settings.logoUrl}
                  alt="Logo RS UMLA"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="text-emerald-700 font-bold text-2xl">RS</span>';
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 leading-tight">
                  {t(lang, "Rumah Sakit", "Hospital")}
                </h3>
                <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
                  {t(
                    lang,
                    "Universitas Muhammadiyah Lamongan",
                    "Muhammadiyah Lamongan University",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-6 max-w-md leading-relaxed">
              {t(
                lang,
                "Rumah Sakit Universitas Muhammadiyah Lamongan (RS UMLA) adalah rumah sakit yang berkomitmen memberikan pelayanan kesehatan paripurna, bermutu, dan Islami.",
                "Muhammadiyah Lamongan University Hospital (RS UMLA) is a hospital committed to providing comprehensive, high-quality, and Islamic healthcare services.",
              )}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/Gx1mudXX3tqnyPYo7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Jl. Raya Plalangan Plosowahyu KM 2, Lamongan, Jawa Timur 62218
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                <span>(0322) 322356 (Hunting)</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                <span>info@rsumla.ac.id</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">
              {t(lang, "Tautan Cepat", "Quick Links")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/profil/tentang-kami"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(lang, "Profil RS UMLA", "RS UMLA Profile")}
                </Link>
              </li>
              <li>
                <Link
                  to="/jadwal-dokter"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(lang, "Jadwal Dokter", "Doctor Schedule")}
                </Link>
              </li>
              <li>
                <Link
                  to="/pendaftaran-online"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(lang, "Pendaftaran Online", "Online Registration")}
                </Link>
              </li>
              <li>
                <Link
                  to="/pelayanan/rawat-inap"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(lang, "Ketersediaan Kamar", "Room Availability")}
                </Link>
              </li>
              <li>
                <Link
                  to="/profil/sumber-daya-manusia"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(lang, "Karir & Lowongan", "Career & Vacancies")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">
              {t(lang, "Layanan Publik", "Public Services")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/pelayanan/standar-pelayanan"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(
                    lang,
                    "Standar Pelayanan Publik",
                    "Public Service Standards",
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/pengaduan"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(lang, "Pengaduan Masyarakat", "Public Complaints")}
                </Link>
              </li>
              <li>
                <Link
                  to="/ppid"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(
                    lang,
                    "PPID (Informasi Publik)",
                    "PPID (Public Information)",
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/pengaduan"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(lang, "Whistleblowing System", "Whistleblowing System")}
                </Link>
              </li>
              <li>
                <Link
                  to="/laporan"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t(
                    lang,
                    "Survei Kepuasan (IKM)",
                    "Satisfaction Survey (IKM)",
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026{" "}
            {t(
              lang,
              "Instalasi Teknologi Komunikasi dan Informasi",
              "Information and Communication Technology Installation",
            )}
            , RS UMLA.
          </p>
          <div className="flex space-x-6 text-xs text-slate-500">
            <Link
              to="/kebijakan-privasi"
              className="hover:text-slate-900 transition-colors"
            >
              {t(lang, "Kebijakan Privasi", "Privacy Policy")}
            </Link>
            <Link
              to="/syarat-ketentuan"
              className="hover:text-slate-900 transition-colors"
            >
              {t(lang, "Syarat & Ketentuan", "Terms & Conditions")}
            </Link>
            <a
              href="https://maps.app.goo.gl/F2kLiKu9V3oR6PmaA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              {t(lang, "Peta Lokasi", "Maps")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
