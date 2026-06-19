import React, { useState } from "react";
import {
  Search,
  Calendar,
  UserRound,
  Home,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import { Link } from '@tanstack/react-router';
import { useSiteStore } from "../store/siteStore";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Use same data store if it has public info
import { useSRMStore } from "../store/srmStore";

export default function JadwalDokter() {
  const { lang } = useLangStore();
  const { doctors, doctorSchedules } = useSRMStore();
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (d) =>
      (d.nama || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.spesialisasi || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-jadwal/1920/600')] bg-cover bg-center opacity-20"></div>
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
                    Jadwal Dokter
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full max-w-4xl">
            <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t(lang, "Jadwal Dokter", "Doctor Schedule")}
            </h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl px-4">
              {t(
                lang,
                "Temukan informasi jadwal praktik dokter kami untuk merencanakan kunjungan Anda.",
                "Find information on our doctors practice schedules to plan your visit.",
              )}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t(
                lang,
                "Cari nama dokter atau spesialisasi...",
                "Search doctor name or specialty...",
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => {
            const schedules = doctorSchedules.filter(
              (s) => s.doctorId === doctor.id,
            );
            return (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <UserRound className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">
                      {doctor.nama}
                    </h3>
                    <p className="text-sm font-medium text-emerald-600 mt-1">
                      {doctor.spesialisasi}
                    </p>
                  </div>
                </div>

                <div className="flex-1 mt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t(lang, "Jadwal Praktik", "Practice Schedule")}
                  </h4>
                  {schedules.length > 0 ? (
                    <ul className="space-y-2">
                      {schedules.map((schedule) => (
                        <li
                          key={schedule.id}
                          className="flex justify-between items-center text-sm p-2 rounded-lg bg-slate-50"
                        >
                          <span className="font-semibold text-slate-700">
                            {schedule.hari}
                          </span>
                          <span className="text-slate-600">
                            {schedule.jamMulai} - {schedule.jamSelesai}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500 italic block py-2">
                      {t(lang, "Belum ada jadwal", "No schedule available")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            {t(lang, "Dokter tidak ditemukan.", "Doctor not found.")}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
