import { 
  Stethoscope, BedDouble, FileText, Users, CreditCard, 
  ClipboardCheck, MessageSquareWarning, Info, Activity,
  Baby, HeartPulse, ActivitySquare, Sparkles, ShieldCheck
} from 'lucide-react';
import { Lang, t } from '../utils/translations';

export const quickAccess = (lang: Lang) => [
  { id: 1, title: t(lang, 'Pendaftaran Online', 'Online Registration'), desc: t(lang, 'Daftar periksa tanpa antri', 'Register without queuing'), icon: Stethoscope, link: '/pendaftaran-online' },
  { id: 2, title: t(lang, 'Kamar Rawat Inap', 'Inpatient Rooms'), desc: t(lang, 'Cek ketersediaan bed', 'Check bed availability'), icon: BedDouble, link: '#' },
  { id: 3, title: t(lang, 'Hasil Penunjang', 'Medical Results'), desc: t(lang, 'Laboratorium & Radiologi', 'Laboratory & Radiology'), icon: FileText, link: '#' },
  { id: 4, title: t(lang, 'Daftar Dokter', 'Doctor Directory'), desc: t(lang, 'Jadwal & profil dokter', 'Schedule & doctor profile'), icon: Users, link: '/jadwal-dokter' },
  { id: 5, title: t(lang, 'Tarif & Kerja Sama', 'Rates & Partnerships'), desc: t(lang, 'Informasi biaya & asuransi', 'Cost & insurance info'), icon: CreditCard, link: '#' },
  { id: 6, title: t(lang, 'Standar Pelayanan', 'Service Standards'), desc: t(lang, 'Maklumat & standar layanan', 'Declarations & service standards'), icon: ClipboardCheck, link: '#' },
  { id: 7, title: t(lang, 'Pengaduan Layanan', 'Service Complaints'), desc: t(lang, 'Sampaikan keluhan Anda', 'Submit your complaints'), icon: MessageSquareWarning, link: '#' },
  { id: 8, title: t(lang, 'Permohonan Informasi', 'Information Request'), desc: t(lang, 'PPID & Keberatan', 'PPID & Objections'), icon: Info, link: '/ppid' },
  { id: 9, title: t(lang, 'PROMs & PREMs', 'PROMs & PREMs'), desc: t(lang, 'Survei kepuasan pasien', 'Patient satisfaction survey'), icon: Activity, link: '#' },
];

export const layananUnggulan = (lang: Lang) => [
  { id: 1, title: t(lang, 'Klinik Tumbuh Kembang Anak', 'Child Growth & Development Clinic'), desc: t(lang, 'Layanan komprehensif untuk memantau dan mengoptimalkan tumbuh kembang anak sejak dini.', 'Comprehensive services to monitor and optimize child growth and development from an early age.'), icon: Baby },
  { id: 2, title: t(lang, 'Pusat Pelayanan Jantung Terpadu', 'Integrated Heart Service Center'), desc: t(lang, 'Penanganan penyakit jantung dengan teknologi modern dan tenaga medis ahli.', 'Handling heart disease with modern technology and expert medical personnel.'), icon: HeartPulse },
  { id: 3, title: t(lang, 'Layanan Ginjal Terpadu / Hemodialisa', 'Integrated Kidney Services / Hemodialysis'), desc: t(lang, 'Fasilitas cuci darah yang nyaman dengan pengawasan dokter spesialis nefrologi.', 'Comfortable dialysis facilities under the supervision of a nephrologist.'), icon: ActivitySquare },
  { id: 4, title: t(lang, 'Klinik Estetika & Rehabilitasi', 'Aesthetic & Rehabilitation Clinic'), desc: t(lang, 'Perawatan kecantikan medis dan rehabilitasi medik pasca cedera atau operasi.', 'Medical beauty treatments and medical rehabilitation post-injury or surgery.'), icon: Sparkles },
  { id: 5, title: t(lang, 'Pencegahan & Manajemen Penyakit Kronis', 'Prevention & Management of Chronic Diseases'), desc: t(lang, 'Pendampingan jangka panjang untuk diabetes, hipertensi, dan penyakit kronis lainnya.', 'Long-term assistance for diabetes, hypertension, and other chronic diseases.'), icon: ShieldCheck },
];

export const beritaRSUMLA = (lang: Lang) => [
  {
    id: 1,
    tanggal: t(lang, '15 Mar 2026', 'Mar 15, 2026'),
    kategori: 'RS UMLA NEWS',
    judul: t(lang, 'RS UMLA Resmikan Gedung Pusat Pelayanan Jantung Terpadu', 'RS UMLA Inaugurates Integrated Heart Service Center Building'),
    ringkasan: t(lang, 'Fasilitas baru ini diharapkan dapat menekan angka rujukan pasien jantung ke luar kota Lamongan.', 'This new facility is expected to reduce the number of heart patient referrals outside Lamongan city.'),
    image: 'https://picsum.photos/seed/news1/400/250'
  },
  {
    id: 2,
    tanggal: t(lang, '12 Mar 2026', 'Mar 12, 2026'),
    kategori: 'RS UMLA NEWS',
    judul: t(lang, 'Penghargaan Pelayanan Publik Terbaik Tingkat Provinsi', 'Best Public Service Award at Provincial Level'),
    ringkasan: t(lang, 'RS UMLA berhasil meraih penghargaan atas inovasi sistem antrian digital dan rekam medis terintegrasi.', 'RS UMLA successfully won an award for its innovative digital queue system and integrated medical records.'),
    image: 'https://picsum.photos/seed/news2/400/250'
  },
  {
    id: 3,
    tanggal: t(lang, '08 Mar 2026', 'Mar 08, 2026'),
    kategori: 'RS UMLA NEWS',
    judul: t(lang, 'Bakti Sosial Operasi Katarak Gratis Bersama FIK UMLA', 'Free Cataract Surgery Social Service with FIK UMLA'),
    ringkasan: t(lang, 'Lebih dari 100 warga Lamongan mendapatkan layanan operasi katarak gratis dalam rangka milad universitas.', 'More than 100 Lamongan residents received free cataract surgery services in celebration of the university anniversary.'),
    image: 'https://picsum.photos/seed/news3/400/250'
  }
];

export const seputarUMLA = (lang: Lang) => [
  {
    id: 1,
    tanggal: t(lang, '16 Mar 2026', 'Mar 16, 2026'),
    kategori: t(lang, 'PENDIDIKAN', 'EDUCATION'),
    judul: t(lang, 'Penerimaan Mahasiswa Profesi Ners Angkatan Baru', 'Admission of New Batch of Nurse Profession Students'),
    ringkasan: t(lang, 'RS UMLA menyambut 50 mahasiswa profesi Ners FIK UMLA untuk menjalani praktik klinik komprehensif.', 'RS UMLA welcomed 50 nurse profession students from FIK UMLA to undergo comprehensive clinical practice.')
  },
  {
    id: 2,
    tanggal: t(lang, '10 Mar 2026', 'Mar 10, 2026'),
    kategori: t(lang, 'KOLABORASI', 'COLLABORATION'),
    judul: t(lang, 'Riset Bersama Penanganan Stunting di Lamongan', 'Joint Research on Stunting Handling in Lamongan'),
    ringkasan: t(lang, 'Tim dokter RS UMLA dan dosen FIK UMLA meluncurkan program riset intervensi gizi untuk balita stunting.', 'A team of RS UMLA doctors and FIK UMLA lecturers launched a nutritional intervention research program for stunted toddlers.')
  },
  {
    id: 3,
    tanggal: t(lang, '05 Mar 2026', 'Mar 05, 2026'),
    kategori: t(lang, 'SEMINAR', 'SEMINAR'),
    judul: t(lang, 'Seminar Nasional Keperawatan Gawat Darurat', 'National Seminar on Emergency Nursing'),
    ringkasan: t(lang, 'Diadakan di auditorium RS UMLA, menghadirkan pakar keperawatan gawat darurat tingkat nasional.', 'Held in the RS UMLA auditorium, featuring national-level emergency nursing experts.')
  }
];

export const agendaDiklit = (lang: Lang) => [
  { id: 1, tanggal: t(lang, '20 - 22 Mar 2026', 'Mar 20 - 22, 2026'), status: t(lang, 'Akan Datang', 'Upcoming'), judul: t(lang, 'Pelatihan Bantuan Hidup Dasar (BHD) untuk Tenaga Non-Medis', 'Basic Life Support (BLS) Training for Non-Medical Staff') },
  { id: 2, tanggal: t(lang, '25 - 26 Mar 2026', 'Mar 25 - 26, 2026'), status: t(lang, 'Akan Datang', 'Upcoming'), judul: t(lang, 'Workshop Manajemen Mutu & Keselamatan Pasien RS', 'Hospital Quality Management & Patient Safety Workshop') },
  { id: 3, tanggal: t(lang, '10 - 12 Mar 2026', 'Mar 10 - 12, 2026'), status: t(lang, 'Selesai', 'Completed'), judul: t(lang, 'Pelatihan Pencegahan dan Pengendalian Infeksi (PPI) Dasar', 'Basic Infection Prevention and Control (IPC) Training') },
  { id: 4, tanggal: t(lang, '01 - 03 Mar 2026', 'Mar 01 - 03, 2026'), status: t(lang, 'Selesai', 'Completed'), judul: t(lang, 'Orientasi Mahasiswa Praktik Klinik Keperawatan', 'Nursing Clinical Practice Student Orientation') },
];

export const inovasiLayanan = (lang: Lang) => [
  { id: 1, judul: t(lang, 'Sistem Antrian Digital (SIM RS UMLA)', 'Digital Queue System (SIM RS UMLA)'), desc: t(lang, 'Integrasi antrian online dengan estimasi waktu panggil via WhatsApp.', 'Online queue integration with estimated call time via WhatsApp.') },
  { id: 2, judul: t(lang, 'Dashboard Mutu Real-time', 'Real-time Quality Dashboard'), desc: t(lang, 'Pemantauan indikator mutu rumah sakit secara transparan dan real-time.', 'Transparent and real-time monitoring of hospital quality indicators.') },
  { id: 3, judul: t(lang, 'Edukasi Pasien Berbasis Video', 'Video-Based Patient Education'), desc: t(lang, 'Akses mudah ke perpustakaan video edukasi kesehatan melalui QR code di ruang tunggu.', 'Easy access to health education video library via QR code in the waiting room.') },
  { id: 4, judul: t(lang, 'Telemedicine Terintegrasi', 'Integrated Telemedicine'), desc: t(lang, 'Konsultasi online lanjutan pasca rawat inap langsung dari aplikasi.', 'Advanced online consultation post-hospitalization directly from the app.') },
];

export const mediaEdukasi = (lang: Lang) => [
  { id: 1, episode: t(lang, 'Episode 1', 'Episode 1'), judul: t(lang, 'Mengenal Gejala Awal Stroke & Penanganannya', 'Recognizing Early Symptoms of Stroke & Its Handling') },
  { id: 2, episode: t(lang, 'Episode 2', 'Episode 2'), judul: t(lang, 'Pentingnya Imunisasi Dasar Lengkap pada Anak', 'The Importance of Complete Basic Immunization in Children') },
  { id: 3, episode: t(lang, 'Episode 3', 'Episode 3'), judul: t(lang, 'Mitos dan Fakta Seputar Penyakit Diabetes', 'Myths and Facts About Diabetes') },
  { id: 4, episode: t(lang, 'Episode 4', 'Episode 4'), judul: t(lang, 'Tips Menjaga Kesehatan Mental di Lingkungan Kerja', 'Tips for Maintaining Mental Health in the Workplace') },
];
