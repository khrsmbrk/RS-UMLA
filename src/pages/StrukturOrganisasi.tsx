import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { ChevronRight, Home, FileText, Users, Network } from "lucide-react";

export default function StrukturOrganisasi() {
  const { lang } = useLangStore();
  const [activeTab, setActiveTab] = useState("struktur");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Header Section */}
      <div className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-struktur/1920/600')] bg-cover bg-center opacity-20"></div>
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
                  {t(lang, "Beranda", "Home")}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-emerald-300">Profil</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-emerald-400 font-medium">
                    Struktur Organisasi
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full">
            <Network className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t(lang, "Struktur Organisasi", "Organizational Structure")}
            </h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl px-4">
              {t(
                lang,
                "Bagan susunan organisasi, kedudukan, tugas, dan fungsi Rumah Sakit Universitas Muhammadiyah Lamongan.",
                "Organizational structure, position, duties, and functions of Muhammadiyah Lamongan University Hospital."
              )}
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setActiveTab("struktur")}
              className={`flex-1 min-w-[200px] px-6 py-4 flex items-center justify-center font-medium transition-colors ${
                activeTab === "struktur"
                  ? "bg-white text-emerald-700 border-b-2 border-emerald-600"
                  : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              <Network className="w-5 h-5 mr-3" />
              Struktur Organisasi dan SK
            </button>
            <button
              onClick={() => setActiveTab("direksi")}
              className={`flex-1 min-w-[200px] px-6 py-4 flex items-center justify-center font-medium transition-colors ${
                activeTab === "direksi"
                  ? "bg-white text-emerald-700 border-b-2 border-emerald-600"
                  : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Profil Direksi
            </button>
            <button
              onClick={() => setActiveTab("unit-kerja")}
              className={`flex-1 min-w-[200px] px-6 py-4 flex items-center justify-center font-medium transition-colors ${
                activeTab === "unit-kerja"
                  ? "bg-white text-emerald-700 border-b-2 border-emerald-600"
                  : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Daftar Unit Kerja
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12">
            {activeTab === "struktur" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="overflow-x-auto p-4 md:p-8 border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <div className="min-w-[1100px] flex flex-col items-center">
                    
                    {/* Direktur Level */}
                    <div className="relative text-center w-full max-w-lg">
                      <div className="bg-emerald-600 text-white font-extrabold text-lg px-12 py-4 rounded-full shadow-lg relative z-10 mx-auto w-max border-4 border-emerald-100">
                        DIREKTUR
                      </div>
                      <div className="h-8 w-1 bg-emerald-500 mx-auto"></div>
                    </div>

                    {/* Staff Level */}
                    <div className="relative w-full max-w-4xl">
                      {/* Main vertical line continues */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-emerald-500 z-0"></div>
                      
                      {/* Horizontal line connecting staff */}
                      <div className="border-t-4 border-emerald-500 absolute top-0 left-[12.5%] right-[12.5%] z-0 rounded-t-sm"></div>
                      
                      <div className="grid grid-cols-4 gap-4 pt-6 pb-8 relative z-10 w-full px-2">
                        {[
                          'KELOMPOK STAF MEDIS', 
                          'KOMITE RUMAH SAKIT', 
                          'SATUAN PENGAWAS INTERNAL', 
                          'KELOMPOK JABATAN FUNGSIONAL'
                        ].map((staff, i) => (
                          <div key={staff} className="relative flex flex-col items-center">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-emerald-500 -z-10"></div>
                            <div className="bg-emerald-50 border-2 border-dashed border-emerald-500 text-emerald-800 text-xs font-bold text-center px-2 py-3 rounded-2xl w-full shadow-sm flex items-center justify-center min-h-[70px]">
                              {staff}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Line down to Wadir */}
                    <div className="h-8 w-1 bg-emerald-500 mx-auto"></div>

                    {/* Wakil Direktur Level */}
                    <div className="relative w-full pb-8">
                      {/* Horizontal line for Wadir */}
                      <div className="border-t-4 border-emerald-500 absolute top-0 left-[12.5%] right-[12.5%] z-0 rounded-t-sm"></div>

                      <div className="grid grid-cols-4 gap-6 pt-6 relative z-10 w-full">
                        
                        {/* Wadir Umum */}
                        <div className="flex flex-col items-center relative">
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-emerald-500 -z-10"></div>
                          <div className="bg-emerald-600 text-white text-xs font-bold text-center px-4 py-3 rounded-[30px] w-full shadow-md min-h-[70px] flex items-center justify-center border-2 border-emerald-200">
                            WAKIL DIREKTUR UMUM DAN OPERASIONAL
                          </div>
                          <div className="h-6 w-1 bg-emerald-500 mx-auto"></div>
                          <div className="w-full flex-grow border-t-4 border-emerald-500 relative pt-4 flex justify-around">
                            <div className="flex flex-col items-center w-[45%]">
                              <div className="absolute -top-0 w-1 h-4 bg-emerald-500"></div>
                              <div className="bg-emerald-500 text-white text-[10px] font-bold text-center p-2 rounded-xl w-full shadow-sm min-h-[50px] flex items-center justify-center">
                                BAGIAN UMUM
                              </div>
                              <div className="w-1 h-3 bg-emerald-500"></div>
                              <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[8px] font-bold text-center p-1.5 rounded-lg w-full mb-1">
                                SUBKOORDINATOR JABATAN FUNGSIONAL
                              </div>
                              <div className="w-1 h-3 bg-emerald-500"></div>
                              <div className="bg-emerald-700 text-white text-[9px] font-bold text-center py-1 px-4 rounded-full shadow-sm">
                                INSTALASI
                              </div>
                            </div>
                            <div className="flex flex-col items-center w-[45%]">
                              <div className="absolute -top-0 w-1 h-4 bg-emerald-500"></div>
                              <div className="bg-emerald-500 text-white text-[10px] font-bold text-center p-2 rounded-xl w-full shadow-sm min-h-[50px] flex items-center justify-center">
                                BAGIAN SARANA DAN PRASARANA
                              </div>
                              <div className="w-1 h-3 bg-emerald-500"></div>
                              <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[8px] font-bold text-center p-1.5 rounded-lg w-full mb-1">
                                SUBKOORDINATOR JABATAN FUNGSIONAL
                              </div>
                              <div className="w-1 h-3 bg-emerald-500"></div>
                              <div className="bg-emerald-700 text-white text-[9px] font-bold text-center py-1 px-4 rounded-full shadow-sm">
                                INSTALASI
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Wadir Perencanaan */}
                        <div className="flex flex-col items-center relative">
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-emerald-500 -z-10"></div>
                          <div className="bg-emerald-600 text-white text-xs font-bold text-center px-4 py-3 rounded-[30px] w-full shadow-md min-h-[70px] flex items-center justify-center border-2 border-emerald-200">
                            WAKIL DIREKTUR PERENCANAAN DAN KEUANGAN
                          </div>
                          <div className="h-6 w-1 bg-emerald-500 mx-auto"></div>
                          <div className="w-full flex-grow border-t-4 border-emerald-500 relative pt-4 flex justify-between">
                            {['BAGIAN AKUNTANSI DAN ASET', 'BAGIAN KEUANGAN', 'BAGIAN PERENCANAAN DAN EVALUASI'].map((title, i) => (
                              <div key={title} className="flex flex-col items-center w-[31%]">
                                <div className="absolute -top-0 w-1 h-4 bg-emerald-500"></div>
                                <div className="bg-emerald-500 text-white text-[9px] leading-tight font-bold text-center p-1.5 rounded-xl w-full shadow-sm min-h-[50px] flex items-center justify-center">
                                  {title}
                                </div>
                                <div className="w-1 h-3 bg-emerald-500"></div>
                                <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[7px] leading-tight font-bold text-center p-1 rounded-lg w-full mb-1 min-h-[30px] flex items-center justify-center">
                                  SUBKOORDINATOR JABATAN FUNGSIONAL
                                </div>
                                <div className="w-1 h-3 bg-emerald-500"></div>
                                <div className="bg-emerald-700 text-white text-[8px] font-bold text-center py-1 w-[90%] rounded-full shadow-sm">
                                  INSTALASI
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Wadir SDM */}
                        <div className="flex flex-col items-center relative">
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-emerald-500 -z-10"></div>
                          <div className="bg-emerald-600 text-white text-xs font-bold text-center px-2 py-3 rounded-[30px] w-full shadow-md min-h-[70px] flex items-center justify-center border-2 border-emerald-200">
                            WAKIL DIREKTUR PENDIDIKAN PROFESI, PENELITIAN DAN SUMBER DAYA MANUSIA
                          </div>
                          <div className="h-6 w-1 bg-emerald-500 mx-auto"></div>
                          <div className="w-full flex-grow border-t-4 border-emerald-500 relative pt-4 flex justify-between">
                            {['BAGIAN SUMBER DAYA MANUSIA', 'BAGIAN PENDIDIKAN DAN PELATIHAN', 'BAGIAN PENELITIAN DAN PENGEMBANGAN'].map((title, i) => (
                              <div key={title} className="flex flex-col items-center w-[31%]">
                                <div className="absolute -top-0 w-1 h-4 bg-emerald-500"></div>
                                <div className="bg-emerald-500 text-white text-[9px] leading-tight font-bold text-center p-1.5 rounded-xl w-full shadow-sm min-h-[50px] flex items-center justify-center">
                                  {title}
                                </div>
                                <div className="w-1 h-3 bg-emerald-500"></div>
                                <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[7px] leading-tight font-bold text-center p-1 rounded-lg w-full mb-1 min-h-[30px] flex items-center justify-center">
                                  SUBKOORDINATOR JABATAN FUNGSIONAL
                                </div>
                                <div className="w-1 h-3 bg-emerald-500"></div>
                                <div className="bg-emerald-700 text-white text-[8px] font-bold text-center py-1 w-[90%] rounded-full shadow-sm">
                                  INSTALASI
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Wadir Medik */}
                        <div className="flex flex-col items-center relative">
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-emerald-500 -z-10"></div>
                          <div className="bg-emerald-600 text-white text-xs font-bold text-center px-4 py-3 rounded-[30px] w-full shadow-md min-h-[70px] flex items-center justify-center border-2 border-emerald-200">
                            WAKIL DIREKTUR PELAYANAN MEDIK DAN KEPERAWATAN
                          </div>
                          <div className="h-6 w-1 bg-emerald-500 mx-auto"></div>
                          <div className="w-full flex-grow border-t-4 border-emerald-500 relative pt-4 flex justify-between">
                            {['BIDANG PELAYANAN MEDIK', 'BIDANG PENUNJANG MEDIK', 'BIDANG KEPERAWATAN'].map((title, i) => (
                              <div key={title} className="flex flex-col items-center w-[31%]">
                                <div className="absolute -top-0 w-1 h-4 bg-emerald-500"></div>
                                <div className="bg-emerald-500 text-white text-[9px] leading-tight font-bold text-center p-1.5 rounded-xl w-full shadow-sm min-h-[50px] flex items-center justify-center">
                                  {title}
                                </div>
                                <div className="w-1 h-3 bg-emerald-500"></div>
                                <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[7px] leading-tight font-bold text-center p-1 rounded-lg w-full mb-1 min-h-[30px] flex items-center justify-center">
                                  SUBKOORDINATOR JABATAN FUNGSIONAL
                                </div>
                                <div className="w-1 h-3 bg-emerald-500"></div>
                                <div className="bg-emerald-700 text-white text-[8px] font-bold text-center py-1 w-[90%] rounded-full shadow-sm">
                                  INSTALASI
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex bg-emerald-50 items-start md:items-center rounded-2xl p-6 border border-emerald-100 shadow-sm transition-transform hover:scale-[1.01]">
                  <div className="bg-emerald-100 p-4 rounded-xl text-emerald-600 mr-6 shrink-0">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 leading-snug">
                      Peraturan Direktur Utama Rumah Sakit Universitas Muhammadiyah Lamongan
                    </h3>
                    <p className="text-slate-600 mt-2 font-medium">
                      Tentang Nomenklatur, Susunan Organisasi, Uraian Tugas dan Fungsi serta Tata Kerja Rumah Sakit Universitas Muhammadiyah Lamongan
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "direksi" && (
              <div className="text-center py-20 text-slate-500 animate-in fade-in duration-500">
                <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-medium text-slate-800 mb-2">Data Profil Direksi belum tersedia</h3>
                <p>Informasi detail direksi sedang dalam persiapan.</p>
              </div>
            )}

            {activeTab === "unit-kerja" && (
              <div className="text-center py-20 text-slate-500 animate-in fade-in duration-500">
                <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-medium text-slate-800 mb-2">Data Unit Kerja belum tersedia</h3>
                <p>Daftar lengkap unit kerja sedang dalam persiapan pembaruan data.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
