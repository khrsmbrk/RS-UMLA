import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Globe, Menu, X, ChevronRight, ChevronDown, PlayCircle, 
  Calendar, MapPin, Phone, Mail, ArrowRight, ArrowUpRight,
  Activity, Users, BedDouble, Award, ShieldCheck, HeartPulse, Sparkles
} from 'lucide-react';
import { 
  quickAccess, layananUnggulan, beritaRSUMLA, 
  seputarUMLA, agendaDiklit, inovasiLayanan, mediaEdukasi 
} from '../data/rsumlaData';
import { t, Lang } from '../utils/translations';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useLangStore } from '../store/langStore';
import { useSiteStore } from '../store/siteStore';

const Hero = ({ lang }: { lang: Lang }) => {
  const { settings } = useSiteStore();
  
  return (
    <div className="relative bg-slate-50 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img 
          src={settings.heroImage} 
          alt="RS UMLA Building" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/95 via-white/90 to-white/50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1] whitespace-pre-line">
              {lang === 'ID' ? settings.heroTitleId : settings.heroTitleEn}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed font-light">
              {lang === 'ID' ? settings.heroSubtitleId : settings.heroSubtitleEn}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pendaftaran-online" className="group px-8 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-all flex items-center">
                {t(lang, 'Pendaftaran Online', 'Online Registration')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/portal/pendaftaran" className="px-8 py-4 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 backdrop-blur-md rounded-full transition-all shadow-sm">
                Portal Pasien
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements for Hero Right Side */}
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-sm">
                  <HeartPulse className="w-10 h-10 text-emerald-500 mb-4" />
                  <h3 className="text-slate-900 font-bold text-xl mb-1">24/7</h3>
                  <p className="text-slate-500 text-sm">{t(lang, 'Layanan Gawat Darurat', 'Emergency Services')}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-sm">
                  <ShieldCheck className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-slate-900 font-bold text-xl mb-1">{t(lang, 'Terakreditasi', 'Accredited')}</h3>
                  <p className="text-slate-500 text-sm">{t(lang, 'Paripurna KARS', 'Plenary KARS')}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-sm">
                  <Users className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="text-slate-900 font-bold text-xl mb-1">50+</h3>
                  <p className="text-slate-500 text-sm">{t(lang, 'Dokter Spesialis', 'Specialist Doctors')}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-sm">
                  <BedDouble className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="text-slate-900 font-bold text-xl mb-1">200+</h3>
                  <p className="text-slate-500 text-sm">{t(lang, 'Kapasitas Tempat Tidur', 'Bed Capacity')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Statistik = ({ lang }: { lang: Lang }) => {
  const stats = [
    { label: t(lang, 'Tahun Pengalaman', 'Years Experience'), value: '15+', icon: Award },
    { label: t(lang, 'Dokter Spesialis', 'Specialist Doctors'), value: '50+', icon: Users },
    { label: t(lang, 'Tempat Tidur', 'Beds Capacity'), value: '200+', icon: BedDouble },
    { label: t(lang, 'Pasien Terlayani', 'Patients Served'), value: '100k+', icon: Activity },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-light text-slate-900 mb-2 tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AksesCepat = ({ lang }: { lang: Lang }) => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              {t(lang, 'Akses Cepat Layanan', 'Quick Access Services')}
            </h2>
            <p className="text-slate-600 text-lg">
              {t(lang, 'Temukan layanan yang Anda butuhkan dengan cepat dan mudah melalui portal digital kami.', 'Find the services you need quickly and easily through our digital portal.')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {quickAccess(lang).map((item) => (
            <Link key={item.id} to={item.link} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
              <div className="w-14 h-14 bg-slate-50 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-500 mt-auto">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const LayananUnggulan = ({ lang }: { lang: Lang }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Center of Excellence</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t(lang, 'Layanan Unggulan RS UMLA', 'RS UMLA Center of Excellence')}
          </h2>
          <p className="text-lg text-slate-600">
            {t(lang, 'Pusat pelayanan medis terpadu yang didukung oleh tenaga ahli dan teknologi terkini untuk memberikan perawatan terbaik bagi Anda dan keluarga.', 'Integrated medical service center supported by experts and the latest technology to provide the best care for you and your family.')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {layananUnggulan(lang).map((item, idx) => (
            <div key={item.id} className={`group relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 p-8 hover:bg-emerald-900 transition-colors duration-500 ${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <item.icon className="w-32 h-32 text-emerald-500 group-hover:text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-white group-hover:bg-emerald-800 text-emerald-600 group-hover:text-emerald-300 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-colors">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors">{item.title}</h3>
                <p className="text-slate-600 group-hover:text-emerald-100/80 text-base leading-relaxed mb-8 transition-colors">{item.desc}</p>
                <div className="mt-auto">
                  <button className="inline-flex items-center text-sm font-bold text-emerald-600 group-hover:text-emerald-300 transition-colors">
                    {t(lang, 'Pelajari Lebih Lanjut', 'Learn More')} <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeritaDanSeputar = ({ lang }: { lang: Lang }) => {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Berita Utama (Kiri) */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {t(lang, 'Berita & Artikel', 'News & Articles')}
              </h2>
              <button className="hidden md:flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                {t(lang, 'Lihat Semua Berita', 'View All News')} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {beritaRSUMLA(lang).slice(0, 2).map((berita, idx) => (
                <div key={berita.id} className={`group flex flex-col ${idx === 0 ? 'sm:col-span-2 sm:flex-row gap-8' : ''}`}>
                  <div className={`relative overflow-hidden rounded-2xl ${idx === 0 ? 'sm:w-1/2' : 'w-full aspect-[4/3] mb-6'}`}>
                    <img 
                      src={berita.image} 
                      alt={berita.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {berita.kategori}
                    </div>
                  </div>
                  <div className={`flex flex-col justify-center ${idx === 0 ? 'sm:w-1/2' : ''}`}>
                    <div className="flex items-center text-sm text-slate-500 mb-3 font-medium">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-500" /> {berita.tanggal}
                    </div>
                    <h3 className={`font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug ${idx === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      <button className="text-left">{berita.judul}</button>
                    </h3>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed mb-6">{berita.ringkasan}</p>
                    <div className="mt-auto">
                      <button className="inline-flex items-center text-sm font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                        {t(lang, 'Baca Selengkapnya', 'Read More')} <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seputar UMLA (Kanan) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100">
                {t(lang, 'Seputar UMLA', 'About UMLA')}
              </h2>
              <div className="space-y-8">
                {seputarUMLA(lang).map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex items-center text-xs font-bold mb-2">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{item.kategori}</span>
                      <span className="mx-3 text-slate-300">•</span>
                      <span className="text-slate-500">{item.tanggal}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.ringkasan}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center">
                {t(lang, 'Lihat Semua Kegiatan', 'View All Activities')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const DiklitDanInovasi = ({ lang }: { lang: Lang }) => {
  return (
    <section className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Diklit & Agenda */}
          <div>
            <div className="mb-10">
              <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Pendidikan & Penelitian</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {t(lang, 'Agenda Diklit', 'Education & Research Agenda')}
              </h2>
            </div>
            <div className="space-y-4">
              {agendaDiklit(lang).map((agenda) => (
                <div key={agenda.id} className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-200 shadow-sm rounded-2xl p-6 transition-all flex items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-white border border-slate-200 group-hover:border-emerald-200 rounded-xl flex flex-col items-center justify-center mr-6 transition-colors">
                    <span className="text-sm text-emerald-600 font-medium uppercase">{agenda.tanggal.split(' ')[1]}</span>
                    <span className="text-2xl font-bold text-slate-900">{agenda.tanggal.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        agenda.status === 'Selesai' || agenda.status === 'Completed' 
                          ? 'bg-slate-200 text-slate-600' 
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {agenda.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{agenda.judul}</h3>
                    <p className="text-sm text-slate-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5 opacity-70" /> {t(lang, 'Kampus UMLA', 'UMLA Campus')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inovasi Layanan */}
          <div>
            <div className="mb-10">
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Pengembangan</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {t(lang, 'Inovasi Layanan', 'Service Innovation')}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {inovasiLayanan(lang).map((inovasi, idx) => {
                const icons = [Sparkles, Activity, PlayCircle, Phone];
                const Icon = icons[idx % icons.length];
                return (
                  <div key={inovasi.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:bg-white hover:shadow-sm transition-colors">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{inovasi.judul}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{inovasi.desc}</p>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Box */}
            <div className="mt-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/40 blur-3xl rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{t(lang, 'Butuh Bantuan?', 'Need Help?')}</h3>
              <p className="text-emerald-800 mb-6 relative z-10 max-w-sm">
                {t(lang, 'Tim layanan pelanggan kami siap membantu Anda 24/7 untuk informasi lebih lanjut.', 'Our customer service team is ready to help you 24/7 for further information.')}
              </p>
              <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors relative z-10 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Hubungi Kami
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function HomePageRSUMLA() {
  const { lang } = useLangStore();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero lang={lang} />
        <Statistik lang={lang} />
        <AksesCepat lang={lang} />
        <LayananUnggulan lang={lang} />
        <BeritaDanSeputar lang={lang} />
        <DiklitDanInovasi lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
