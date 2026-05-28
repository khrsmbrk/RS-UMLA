import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, Volume2, FileOutput, Database, 
  ChevronLeft, ChevronRight, Activity, FileText, 
  CheckCircle2, Shield, Search, Clock, 
  MessageSquare, Calendar, Link as LinkIcon
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-slate-900">RS UMLA <span className="text-blue-600">•</span> Rekam Medis Modern</span>
          </div>
          <div className="hidden lg:flex space-x-8">
            <a href="#fitur" className="text-sm font-medium text-slate-600 hover:text-blue-600">Fitur</a>
            <a href="#alur" className="text-sm font-medium text-slate-600 hover:text-blue-600">Alur Klinik</a>
            <a href="#keamanan" className="text-sm font-medium text-slate-600 hover:text-blue-600">Keamanan</a>
            <a href="#kontak" className="text-sm font-medium text-slate-600 hover:text-blue-600">Kontak</a>
          </div>
          <div className="flex items-center space-x-2">
             <Link to="/portal/pendaftaran" className="hidden md:block text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50">Portal Pasien</Link>
             <Link to="/srm/dashboard" className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm">SIM RS UMLA</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <p className="text-sm font-bold text-blue-600 tracking-wide uppercase mb-4">Untuk Klinik, Praktek Dokter, & Layanan Kesehatan</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
        Rekam Medis Lebih Rapi.<br/>Antrian Lebih Tertib.<br/><span className="text-blue-600">Laporan Lebih Cepat.</span>
      </h1>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
        SRM membantu klinik mengelola data pasien, vital sign, resep, surat, pembayaran, dan laporan dengan alur yang nyaman dipakai harian. Lengkap dengan antrian + suara TTS, export/import Excel, laporan PDF, WhatsApp reminder, integrasi BPJS & Satu Sehat, serta backup & restore database.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <Link to="/srm/dashboard" className="px-8 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
          SIM RS UMLA
        </Link>
        <Link to="/pendaftaran-online" className="px-8 py-3.5 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-full shadow-sm transition-all">
          Pendaftaran Online
        </Link>
        <Link to="/portal/pendaftaran" className="px-8 py-3.5 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-full shadow-sm transition-all">
          Portal Pasien
        </Link>
        <Link to="/office/login" className="px-8 py-3.5 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-full shadow-sm transition-all">
          Portal Karyawan
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          { icon: BarChart3, text: "Dashboard Statistik & Grafik" },
          { icon: Volume2, text: "Antrian + TTS" },
          { icon: FileOutput, text: "PDF Laporan & Surat" },
          { icon: Database, text: "Backup & Restore" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-slate-800 text-center">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <section className="py-16 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Preview Tampilan SRM</h2>
          <p className="text-slate-500">Ambil gambar dari folder judul/ (1.png–8.png)</p>
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
              <span className="text-4xl font-bold text-white/80 drop-shadow-lg">Preview SRM {images[current]}</span>
            </div>
            
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-white">
              {current + 1} / {images.length}
            </div>
          </div>
          
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/10 hover:bg-black/20 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/10 hover:bg-black/20 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FiturUtama = () => {
  const features = [
    { title: "Dashboard Statistik & Grafik", desc: "Pantau kunjungan, layanan, dan tren klinik dengan tampilan bersih dan mudah dibaca.", icon: BarChart3 },
    { title: "Antrian Pasien + Suara TTS", desc: "Nomor antrian tertib, panggilan otomatis dengan suara TTS agar pasien jelas mendengar.", icon: Volume2 },
    { title: "Foto Pasien & Vital Sign", desc: "Catatan vital sign bisa dibuat grafik, plus foto pasien untuk verifikasi lebih cepat.", icon: Activity },
    { title: "Template Diagnosis & Resep", desc: "Percepat input tindakan: pakai template diagnosis, resep, dan catatan medis.", icon: FileText },
    { title: "Surat Keterangan", desc: "Surat sakit/sehat/rujukan siap cetak: rapi, konsisten, dan cepat dibuat.", icon: FileOutput },
    { title: "Excel & PDF Report", desc: "Export/import Excel dan generate laporan PDF untuk rekap harian/bulanan.", icon: Database },
  ];

  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Fitur Utama</h2>
          <p className="text-lg text-slate-600">Fokus ke kebutuhan operasional klinik.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AlurKlinik = () => {
  const steps = [
    { num: "1", title: "Registrasi / Cari Pasien", desc: "Tambah pasien baru atau cari cepat dengan multi-kriteria." },
    { num: "2", title: "Antrian & Pemeriksaan", desc: "Kelola antrian + panggilan TTS, input vital sign & pemeriksaan." },
    { num: "3", title: "Diagnosis, Resep, Surat", desc: "Pakai template untuk mempercepat tindakan & dokumen." },
    { num: "4", title: "Pembayaran & Laporan", desc: "Riwayat pembayaran rapi, laporan Excel/PDF siap kapan saja." },
  ];

  const checks = [
    { text: "WhatsApp Reminder", desc: "Follow up pasien kontrol/jadwal agar layanan lebih optimal.", icon: MessageSquare },
    { text: "Riwayat Vaksinasi", desc: "Simpan histori vaksin, mudah dilihat kembali saat dibutuhkan.", icon: Activity },
    { text: "Jadwal Dokter & Log Aktivitas", desc: "Monitor siapa melakukan apa, lebih aman dan tertata.", icon: Calendar },
    { text: "Integrasi BPJS & Satu Sehat", desc: "Siap integrasi sesuai kebutuhan operasional klinik.", icon: LinkIcon },
  ];

  return (
    <section id="alur" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Alur Klinik yang Nyaman</h2>
          <p className="text-lg text-slate-600">Dari pasien datang sampai laporan selesai.</p>
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
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{s.title}</h3>
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
                    <h4 className="text-base font-bold text-slate-800">{c.text}</h4>
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
  return (
    <section id="keamanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Keamanan & Keandalan Data</h2>
          <p className="text-lg text-slate-600">Untuk data kesehatan, harus aman dan bisa dipulihkan.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
              <Database className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Backup & Restore Database</h3>
            <p className="text-slate-600">Fitur penyelamatan data untuk pindah perangkat, reinstall, atau pemulihan saat darurat.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 -rotate-3">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Log Aktivitas</h3>
            <p className="text-slate-600">Catat aktivitas penting untuk audit operasional dan meningkatkan keamanan.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 rotate-3">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Pencarian Multi-Kriteria</h3>
            <p className="text-slate-600">Data lebih mudah ditemukan tanpa harus buka satu-satu, hemat waktu pelayanan.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimoni = () => {
  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Yang Biasanya Dirasakan Klinik</h2>
          <p className="text-slate-500">Kalimat testimoni bisa kamu ganti sesuai kebutuhan.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
            <div className="text-4xl text-blue-500 absolute top-4 left-4 opacity-20">"</div>
            <p className="text-lg text-slate-700 mb-6 relative z-10">“Antrian jadi tertib, panggilan pasien jelas. Admin lebih cepat input data.”</p>
            <div>
              <p className="font-bold text-slate-900">Admin Klinik</p>
              <p className="text-sm text-slate-500">Klinik Pratama</p>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
            <div className="text-4xl text-blue-500 absolute top-4 left-4 opacity-20">"</div>
            <p className="text-lg text-slate-700 mb-6 relative z-10">“Template resep & surat bikin pelayanan lebih cepat, tidak ketik ulang.”</p>
            <div>
              <p className="font-bold text-slate-900">Dokter</p>
              <p className="text-sm text-slate-500">Praktek Mandiri</p>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
            <div className="text-4xl text-blue-500 absolute top-4 left-4 opacity-20">"</div>
            <p className="text-lg text-slate-700 mb-6 relative z-10">“Laporan Excel/PDF gampang, dan data aman karena ada backup & restore.”</p>
            <div>
              <p className="font-bold text-slate-900">Pimpinan Klinik</p>
              <p className="text-sm text-slate-500">Cabang 2</p>
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
        <p className="text-slate-500 text-sm">© 2026 SRUMLA • All rights reserved.</p>
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
