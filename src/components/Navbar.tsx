import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { t } from "../utils/translations";
import { useLangStore } from "../store/langStore";
import { useSiteStore } from "../store/siteStore";

export const Navbar = () => {
  const { lang, setLang } = useLangStore();
  const { settings } = useSiteStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  const menus = [
    { name: t(lang, "Beranda", "Home"), type: "link", path: "/" },
    {
      name: t(lang, "Profil", "Profile"),
      type: "dropdown",
      items: [
        {
          label: t(lang, "Tentang Kami", "About Us"),
          path: "/profil/tentang-kami",
        },
        { label: t(lang, "Kedudukan", "Position"), path: "/profil/kedudukan" },
        {
          label: t(lang, "Tupoksi", "Duties & Functions"),
          path: "/profil/tupoksi",
        },
        {
          label: t(lang, "Visi & Misi", "Vision & Mission"),
          path: "/profil/visi-misi",
        },
        {
          label: t(lang, "Struktur Organisasi", "Organizational Structure"),
          path: "/profil/struktur-organisasi",
        },
        {
          label: t(lang, "Sumber Daya Manusia", "Human Resources"),
          path: "/profil/sumber-daya-manusia",
        },
        {
          label: t(lang, "Penghargaan & HAKI", "Awards & IPR"),
          path: "/profil/penghargaan-haki",
        },
      ],
    },
    {
      name: t(lang, "Pelayanan", "Services"),
      type: "dropdown",
      items: [
        {
          label: t(lang, "Rawat Jalan", "Outpatient"),
          path: "/pelayanan/rawat-jalan",
        },
        {
          label: t(lang, "Rawat Inap", "Inpatient"),
          path: "/pelayanan/rawat-inap",
        },
        {
          label: t(lang, "Gawat Darurat", "Emergency"),
          path: "/pelayanan/gawat-darurat",
        },
        {
          label: t(lang, "Graha Amerta", "Graha Amerta"),
          path: "/pelayanan/graha-amerta",
        },
        {
          label: t(lang, "Rujukan Kabupaten", "District Referral"),
          path: "/pelayanan/rujukan-kabupaten",
        },
        {
          label: t(lang, "Daftar Dokter", "Doctor Directory"),
          path: "/jadwal-dokter",
        },
        {
          label: t(lang, "Informasi", "Information"),
          path: "/pelayanan/informasi",
        },
        {
          label: t(
            lang,
            "Standart Pelayanan Publik",
            "Public Service Standards",
          ),
          path: "/pelayanan/standar-pelayanan",
        },
        {
          label: t(
            lang,
            "Panduan Peraktek Klinik",
            "Clinical Practice Guidelines",
          ),
          path: "/pelayanan/panduan-klinik",
        },
      ],
    },
    {
      name: t(lang, "Diklat & Penelitian", "Education & Research"),
      type: "dropdown",
      items: [
        {
          label: t(lang, "Diklat", "Education & Training"),
          path: "/diklat/diklat",
        },
        { label: t(lang, "Litbang", "R&D"), path: "/diklat/litbang" },
        { label: t(lang, "Webinar", "Webinar"), path: "/diklat/webinar" },
      ],
    },
    {
      name: t(lang, "Promosi Kesehatan", "Health Promotion"),
      type: "link",
      path: "/promkes",
    },
    { name: t(lang, "Laporan", "Reports"), type: "link", path: "/laporan" },
    {
      name: t(lang, "Reformasi Birokrasi", "Bureaucratic Reform"),
      type: "link",
      path: "/reformasi-birokrasi",
    },
    {
      name: t(lang, "PPID", "Information Commission"),
      type: "link",
      path: "/ppid",
    },
    {
      name: t(lang, "Pengaduan", "Complaints"),
      type: "link",
      path: "/pengaduan",
    },
  ];

  const allLinks = menus.flatMap((m) => {
    if (m.type === "dropdown") {
      return m.items!.map((item) => ({
        title: item.label,
        path: item.path,
        category: m.name,
      }));
    }
    return [
      {
        title: m.name,
        path: m.path,
        category: t(lang, "Halaman Utama", "Main Page"),
      },
    ];
  });

  const searchResults =
    searchQuery.trim() === ""
      ? []
      : allLinks.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const toggleMobileDropdown = (name: string) => {
    if (openMobileDropdown === name) {
      setOpenMobileDropdown(null);
    } else {
      setOpenMobileDropdown(name);
    }
  };

  const handleItemClick = (path?: string) => {
    if (path) {
      navigate(path);
      setIsOpen(false);
    } else {
      alert(
        t(
          lang,
          "Fitur masih dalam pengembangan",
          "Feature is still under development",
        ),
      );
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-emerald-700 text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">
            {t(
              lang,
              "Rumah Sakit Universitas Muhammadiyah Lamongan",
              "Muhammadiyah Lamongan University Hospital",
            )}
          </span>
          <span className="sm:hidden">RS UMLA</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/portal/pendaftaran"
            className="hover:text-emerald-200 transition-colors"
          >
            {t(lang, "Portal Pasien", "Patient Portal")}
          </Link>
          <Link
            to="/srm/dashboard"
            className="hover:text-emerald-200 transition-colors"
          >
            SIM RS UMLA
          </Link>
          <Link
            to="/office/login"
            className="hover:text-emerald-200 transition-colors font-semibold text-emerald-100"
          >
            RS UMLA Office
          </Link>
          <div className="flex items-center border-l border-emerald-600 pl-4 ml-2">
            <button
              onClick={() => setLang("ID")}
              className={`px-1.5 ${lang === "ID" ? "font-bold" : "text-emerald-300"}`}
            >
              ID
            </button>
            <span>|</span>
            <button
              onClick={() => setLang("EN")}
              className={`px-1.5 ${lang === "EN" ? "font-bold" : "text-emerald-300"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mr-3 overflow-hidden bg-white border border-emerald-100 shadow-sm">
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
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-800 leading-tight">
                {t(lang, "Rumah Sakit", "Hospital")}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {t(
                  lang,
                  "Universitas Muhammadiyah Lamongan",
                  "Muhammadiyah Lamongan University",
                )}
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menus.map((menu, idx) =>
              menu.type === "dropdown" ? (
                <div key={idx} className="relative group">
                  <button className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors flex items-center gap-1">
                    {menu.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-slate-100 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {menu.items?.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleItemClick(item.path)}
                          className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={idx}
                  onClick={() => handleItemClick(menu.path)}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                >
                  {menu.name}
                </button>
              ),
            )}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="ml-2 p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 ml-1 text-slate-600"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-4 border-b border-slate-100 flex items-center">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 text-lg placeholder:text-slate-400 outline-none"
                placeholder={t(
                  lang,
                  "Cari layanan, dokter, atau informasi...",
                  "Search services, doctors, or info...",
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {searchQuery.trim() !== "" && (
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((result, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-4 py-3 hover:bg-emerald-50 rounded-xl transition-colors flex flex-col group"
                        onClick={() => {
                          handleItemClick(result.path);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <span className="text-sm font-medium text-slate-800 group-hover:text-emerald-700">
                          {result.title}
                        </span>
                        <span className="text-xs text-slate-500">
                          {result.category}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <p className="text-sm">
                      {t(
                        lang,
                        `Pencarian "${searchQuery}" tidak ditemukan.`,
                        `Search "${searchQuery}" not found.`,
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
            {searchQuery.trim() === "" && (
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center">
                  {t(
                    lang,
                    "Ketik pencarian dan temukan yang Anda butuhkan.",
                    "Type your search and find what you need.",
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full max-h-[80vh] overflow-y-auto z-50">
          {menus.map((menu, idx) =>
            menu.type === "dropdown" ? (
              <div key={idx} className="space-y-1">
                <button
                  onClick={() => toggleMobileDropdown(menu.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-slate-900 bg-slate-50 rounded-md"
                >
                  {menu.name}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${openMobileDropdown === menu.name ? "rotate-180" : ""}`}
                  />
                </button>
                {openMobileDropdown === menu.name && (
                  <div className="pl-4 space-y-1 pb-2">
                    {menu.items?.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleItemClick(item.path)}
                        className="w-full text-left block px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={idx}
                onClick={() => handleItemClick(menu.path)}
                className="w-full text-left block px-3 py-2 text-base font-medium text-slate-900 bg-slate-50 rounded-md"
              >
                {menu.name}
              </button>
            ),
          )}
        </div>
      )}
    </nav>
  );
};
