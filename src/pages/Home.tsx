import React, { useState } from "react";
import { Link } from '@tanstack/react-router';
import {
  BarChart3,
  Volume2,
  FileOutput,
  Database,
  ChevronLeft,
  ChevronRight,
  Activity,
  FileText,
  CheckCircle2,
  Shield,
  Search,
  Clock,
  MessageSquare,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";
import { t } from "../utils/translations";
import { useLangStore } from "../store/langStore";

const Navbar = () => {
  const { lang } = useLangStore();
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-slate-900">
              RS UMLA <span className="text-blue-600">•</span>{" "}
              {t(lang, "Rekam Medis Modern", "Modern Medical Records")}
            </span>
          </div>
          <div className="hidden lg:flex space-x-8">
            <a
              href="#fitur"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              {t(lang, "Fitur", "Features")}
            </a>
            <a
              href="#alur"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              {t(lang, "Alur Klinik", "Clinical Flow")}
            </a>
            <a
              href="#keamanan"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              {t(lang, "Keamanan", "Security")}
            </a>
            <a
              href="#kontak"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              {t(lang, "Kontak", "Contact")}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/pasien/login"
              className="hidden md:block text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t(lang, "Portal Pasien", "Patient Portal")}
            </Link>
            <Link
              to="/srm/login"
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              {t(lang, "SIM RS UMLA", "RS UMLA HIS")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { lang } = useLangStore();
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <p className="text-sm font-bold text-blue-600 tracking-wide uppercase mb-4">
        {t(
          lang,
          "Untuk Klinik, Praktek Dokter, & Layanan Kesehatan",
          "For Clinics, Doctor Practices, & Healthcare Services",
        )}
      </p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
        {t(lang, "Rekam Medis Lebih Rapi.", "Cleaner Medical Records.")}
        <br />
        {t(lang, "Antrian Lebih Tertib.", "More Organized Queues.")}
        <br />
        <span className="text-blue-600">
          {t(lang, "Laporan Lebih Cepat.", "Faster Reports.")}
        </span>
      </h1>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
        {t(
          lang,
          "SRM membantu klinik mengelola data pasien, vital sign, resep, surat, pembayaran, dan laporan dengan alur yang nyaman dipakai harian. Lengkap dengan antrian + suara TTS, export/import Excel, laporan PDF, WhatsApp reminder, integrasi BPJS & Satu Sehat, serta backup & restore database.",
          "HIS helps clinics manage patient data, vital signs, prescriptions, letters, payments, and reports with a daily comfortable flow. Complete with queueing + TTS voice, export/import Excel, PDF reports, WhatsApp reminder, BPJS & Satu Sehat integration, and database backup & restore.",
        )}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <Link
          to="/srm/login"
          className="px-8 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
        >
          {t(lang, "SIM RS UMLA", "RS UMLA HIS")}
        </Link>
        <Link
          to="/pendaftaran-online"
          className="px-8 py-3.5 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-full shadow-sm transition-all"
        >
          {t(lang, "Pendaftaran Online", "Online Registration")}
        </Link>
        <Link
          to="/pasien/login"
          className="px-8 py-3.5 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-full shadow-sm transition-all"
        >
          {t(lang, "Portal Pasien", "Patient Portal")}
        </Link>
        <Link
          to="/office/login"
          className="px-8 py-3.5 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-full shadow-sm transition-all"
        >
          {t(lang, "Portal Karyawan", "Employee Portal")}
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          {
            icon: BarChart3,
            text: t(
              lang,
              "Dashboard Statistik & Grafik",
              "Statistics & Charts Dashboard",
            ),
          },
          { icon: Volume2, text: t(lang, "Antrian + TTS", "Queueing + TTS") },
          {
            icon: FileOutput,
            text: t(lang, "PDF Laporan & Surat", "PDF Reports & Letters"),
          },
          {
            icon: Database,
            text: t(lang, "Backup & Restore", "Backup & Restore"),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-slate-800 text-center">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Carousel = () => {
  const { lang } = useLangStore();
  const [current, setCurrent] = useState(0);
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <section className="py-16 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t(lang, "Preview Tampilan SRM", "HIS View Preview")}
          </h2>
          <p className="text-slate-500">
            {t(
              lang,
              "Ambil gambar dari folder judul/ (1.png–8.png)",
              "Take images from titles/ folder (1.png–8.png)",
            )}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="aspect-video bg-white rounded-2xl overflow-hidden border border-slate-200 relative shadow-xl">
            <img
              src={`https://picsum.photos/seed/srm${images[current]}/1200/675`}
              alt={`Preview SRM ${images[current]}`}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-4xl font-bold text-white/80 drop-shadow-lg">
                Preview SRM {images[current]}
              </span>
            </div>

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-white">
              {current + 1} / {images.length}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/10 hover:bg-black/20 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/10 hover:bg-black/20 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FiturUtama = () => {
  const { lang } = useLangStore();
  const features = [
    {
      title: t(
        lang,
        "Dashboard Statistik & Grafik",
        "Statistics & Charts Dashboard",
      ),
      desc: t(
        lang,
        "Pantau kunjungan, layanan, dan tren klinik dengan tampilan bersih dan mudah dibaca.",
        "Monitor visits, services, and clinic trends with a clean and readable interface.",
      ),
      icon: BarChart3,
    },
    {
      title: t(lang, "Antrian Pasien + Suara TTS", "Patient Queue + TTS Voice"),
      desc: t(
        lang,
        "Nomor antrian tertib, panggilan otomatis dengan suara TTS agar pasien jelas mendengar.",
        "Organized queue numbers, automatic calls with TTS voice so patients can hear clearly.",
      ),
      icon: Volume2,
    },
    {
      title: t(lang, "Foto Pasien & Vital Sign", "Patient Photo & Vital Signs"),
      desc: t(
        lang,
        "Catatan vital sign bisa dibuat grafik, plus foto pasien untuk verifikasi lebih cepat.",
        "Vital sign records can be graphed, plus patient photos for faster verification.",
      ),
      icon: Activity,
    },
    {
      title: t(
        lang,
        "Template Diagnosis & Resep",
        "Diagnosis & Prescription Templates",
      ),
      desc: t(
        lang,
        "Percepat input tindakan: pakai template diagnosis, resep, dan catatan medis.",
        "Speed up procedure input: use templates for diagnosis, prescriptions, and medical records.",
      ),
      icon: FileText,
    },
    {
      title: t(lang, "Surat Keterangan", "Medical Certificates"),
      desc: t(
        lang,
        "Surat sakit/sehat/rujukan siap cetak: rapi, konsisten, dan cepat dibuat.",
        "Print-ready sick/health/referral letters: neat, consistent, and quick to create.",
      ),
      icon: FileOutput,
    },
    {
      title: t(lang, "Excel & PDF Report", "Excel & PDF Reports"),
      desc: t(
        lang,
        "Export/import Excel dan generate laporan PDF untuk rekap harian/bulanan.",
        "Export/import Excel and generate PDF reports for daily/monthly recaps.",
      ),
      icon: Database,
    },
  ];

  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t(lang, "Fitur Utama", "Main Features")}
          </h2>
          <p className="text-lg text-slate-600">
            {t(
              lang,
              "Fokus ke kebutuhan operasional klinik.",
              "Focusing on clinic operational needs.",
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {f.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AlurKlinik = () => {
  const { lang } = useLangStore();
  const steps = [
    {
      num: "1",
      title: t(
        lang,
        "Registrasi / Cari Pasien",
        "Registration / Search Patient",
      ),
      desc: t(
        lang,
        "Tambah pasien baru atau cari cepat dengan multi-kriteria.",
        "Add new patient or quickly search with multi-criteria.",
      ),
    },
    {
      num: "2",
      title: t(lang, "Antrian & Pemeriksaan", "Queue & Examination"),
      desc: t(
        lang,
        "Kelola antrian + panggilan TTS, input vital sign & pemeriksaan.",
        "Manage queue + TTS calls, input vital signs & checkups.",
      ),
    },
    {
      num: "3",
      title: t(
        lang,
        "Diagnosis, Resep, Surat",
        "Diagnosis, Prescription, Letters",
      ),
      desc: t(
        lang,
        "Pakai template untuk mempercepat tindakan & dokumen.",
        "Use templates to speed up procedures & documents.",
      ),
    },
    {
      num: "4",
      title: t(lang, "Pembayaran & Laporan", "Payment & Reports"),
      desc: t(
        lang,
        "Riwayat pembayaran rapi, laporan Excel/PDF siap kapan saja.",
        "Clean payment history, Excel/PDF reports ready anytime.",
      ),
    },
  ];

  const checks = [
    {
      text: t(lang, "WhatsApp Reminder", "WhatsApp Reminder"),
      desc: t(
        lang,
        "Follow up pasien kontrol/jadwal agar layanan lebih optimal.",
        "Follow up checkup patients/schedule for optimal service.",
      ),
      icon: MessageSquare,
    },
    {
      text: t(lang, "Riwayat Vaksinasi", "Vaccination History"),
      desc: t(
        lang,
        "Simpan histori vaksin, mudah dilihat kembali saat dibutuhkan.",
        "Save vaccine history, easily viewable when needed.",
      ),
      icon: Activity,
    },
    {
      text: t(
        lang,
        "Jadwal Dokter & Log Aktivitas",
        "Doctor Schedule & Activity Log",
      ),
      desc: t(
        lang,
        "Monitor siapa melakukan apa, lebih aman dan tertata.",
        "Monitor who does what, safer and more organized.",
      ),
      icon: Calendar,
    },
    {
      text: t(
        lang,
        "Integrasi BPJS & Satu Sehat",
        "BPJS & Satu Sehat Integration",
      ),
      desc: t(
        lang,
        "Siap integrasi sesuai kebutuhan operasional klinik.",
        "Ready for integration based on clinic operational needs.",
      ),
      icon: LinkIcon,
    },
  ];

  return (
    <section id="alur" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t(lang, "Alur Klinik yang Nyaman", "Comfortable Clinic Flow")}
          </h2>
          <p className="text-lg text-slate-600">
            {t(
              lang,
              "Dari pasien datang sampai laporan selesai.",
              "From patient arrival to completed reports.",
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-200">
                    {s.num}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="space-y-6">
              {checks.map((c, i) => (
                <div key={i} className="flex items-start">
                  <c.icon className="w-6 h-6 text-emerald-500 mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-slate-800">
                      {c.text}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Keamanan = () => {
  const { lang } = useLangStore();
  return (
    <section id="keamanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t(
              lang,
              "Keamanan & Keandalan Data",
              "Data Security & Reliability",
            )}
          </h2>
          <p className="text-lg text-slate-600">
            {t(
              lang,
              "Untuk data kesehatan, harus aman dan bisa dipulihkan.",
              "For health data, must be secure and recoverable.",
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
              <Database className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              {t(
                lang,
                "Backup & Restore Database",
                "Database Backup & Restore",
              )}
            </h3>
            <p className="text-slate-600">
              {t(
                lang,
                "Fitur penyelamatan data untuk pindah perangkat, reinstall, atau pemulihan saat darurat.",
                "Data rescue features for moving devices, reinstalling, or emergency recovery.",
              )}
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 -rotate-3">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              {t(lang, "Log Aktivitas", "Activity Log")}
            </h3>
            <p className="text-slate-600">
              {t(
                lang,
                "Catat aktivitas penting untuk audit operasional dan meningkatkan keamanan.",
                "Record important activities for operational audits and security improvements.",
              )}
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 rotate-3">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              {t(lang, "Pencarian Multi-Kriteria", "Multi-Criteria Search")}
            </h3>
            <p className="text-slate-600">
              {t(
                lang,
                "Data lebih mudah ditemukan tanpa harus buka satu-satu, hemat waktu pelayanan.",
                "Data is easier to find without opening one by one, saving service time.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimoni = () => {
  const { lang } = useLangStore();
  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {t(
              lang,
              "Yang Biasanya Dirasakan Klinik",
              "What Clinics Usually Feel",
            )}
          </h2>
          <p className="text-slate-500">
            {t(
              lang,
              "Kalimat testimoni bisa kamu ganti sesuai kebutuhan.",
              "Testimonial sentences can be changed according to your needs.",
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
            <div className="text-4xl text-blue-500 absolute top-4 left-4 opacity-20">
              "
            </div>
            <p className="text-lg text-slate-700 mb-6 relative z-10">
              {t(
                lang,
                "“Antrian jadi tertib, panggilan pasien jelas. Admin lebih cepat input data.”",
                "“Queues are orderly, patient calls are clear. Admins input data faster.”",
              )}
            </p>
            <div>
              <p className="font-bold text-slate-900">
                {t(lang, "Admin Klinik", "Clinic Admin")}
              </p>
              <p className="text-sm text-slate-500">
                {t(lang, "Klinik Pratama", "Primary Clinic")}
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
            <div className="text-4xl text-blue-500 absolute top-4 left-4 opacity-20">
              "
            </div>
            <p className="text-lg text-slate-700 mb-6 relative z-10">
              {t(
                lang,
                "“Template resep & surat bikin pelayanan lebih cepat, tidak ketik ulang.”",
                "“Prescription & letter templates make service faster, no typing required.”",
              )}
            </p>
            <div>
              <p className="font-bold text-slate-900">
                {t(lang, "Dokter", "Doctor")}
              </p>
              <p className="text-sm text-slate-500">
                {t(lang, "Praktek Mandiri", "Independent Practice")}
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
            <div className="text-4xl text-blue-500 absolute top-4 left-4 opacity-20">
              "
            </div>
            <p className="text-lg text-slate-700 mb-6 relative z-10">
              {t(
                lang,
                "“Laporan Excel/PDF gampang, dan data aman karena ada backup & restore.”",
                "“Excel/PDF reports are easy, and data is safe thanks to backup & restore.”",
              )}
            </p>
            <div>
              <p className="font-bold text-slate-900">
                {t(lang, "Pimpinan Klinik", "Clinic Head")}
              </p>
              <p className="text-sm text-slate-500">
                {t(lang, "Cabang 2", "Branch 2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="kontak" className="bg-slate-50 py-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-500 text-sm">
          © 2026 SRUMLA • All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Carousel />
        <FiturUtama />
        <AlurKlinik />
        <Keamanan />
        <Testimoni />
      </main>
      <Footer />
    </div>
  );
}
