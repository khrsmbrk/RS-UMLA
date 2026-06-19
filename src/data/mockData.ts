export const DUMMY_PATIENT = {
  mrn: "RSUMLA-2024-001",
  nik: "3512XXXXXXXX0001",
  name: "Ahmad Fauzan",
  birthDate: "2004-03-15",
  bloodType: "O",
  allergies: ["Alergi Penisilin"],
  chronicConditions: ["Hipertensi"],
};

export const DUMMY_VISITS = [
  {
    id: "VIS-001",
    date: "2026-03-10",
    clinic: "Poli Penyakit Dalam",
    doctor: "dr. Siti Rahma, Sp.PD",
    icd10: "I10",
    diagnosis: "Hipertensi esensial (primer)",
    procedures: [
      { code: "TD-01", name: "Pemeriksaan Tekanan Darah", tariff: 25000 },
      { code: "KONS-01", name: "Konsultasi Dokter Spesialis", tariff: 90000 },
    ],
    drugPrescription: [
      { name: "Amlodipine 5 mg", dosage: "1x1", days: 30, cost: 75000 },
    ],
    adminFee: 15000,
    status: "Selesai",
    paymentMethod: "BPJS Kesehatan",
  },
  {
    id: "VIS-002",
    date: "2026-03-16",
    clinic: "Poli Jantung",
    doctor: "dr. Andi Fajar, Sp.JP",
    icd10: "I20",
    diagnosis: "Angina pektoris",
    procedures: [
      { code: "EKG-01", name: "Pemeriksaan EKG", tariff: 150000 },
      { code: "KONS-02", name: "Konsultasi Dokter Jantung", tariff: 150000 },
    ],
    drugPrescription: [
      { name: "Isosorbid Dinitrat", dosage: "2x1", days: 14, cost: 65000 },
    ],
    adminFee: 15000,
    status: "Menunggu",
    paymentMethod: "Umum",
  },
];

export const DUMMY_POLICLINICS = [
  { id: "p-internal", name: "Poli Penyakit Dalam" },
  { id: "p-jantung", name: "Poli Jantung" },
  { id: "p-anak", name: "Poli Anak" },
  { id: "p-kandungan", name: "Poli Kebidanan & Kandungan" },
];

export const DUMMY_DOCTORS = [
  {
    id: "d-001",
    name: "dr. Siti Rahma, Sp.PD",
    clinicId: "p-internal",
  },
  {
    id: "d-002",
    name: "dr. Andi Fajar, Sp.JP",
    clinicId: "p-jantung",
  },
  {
    id: "d-003",
    name: "dr. Nur Aisyah, Sp.A",
    clinicId: "p-anak",
  },
];

export const VISIT_STATUS_BADGE: Record<string, string> = {
  Menunggu: "bg-amber-50 text-amber-700 border-amber-200",
  "Sedang Diperiksa": "bg-sky-50 text-sky-700 border-sky-200",
  Selesai: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export const LAYANAN_UNGGULAN = [
  {
    id: 1,
    title: "Pusat Jantung Terpadu",
    desc: "Penanganan komprehensif penyakit jantung.",
    icon: "HeartPulse",
    color: "text-red-500",
  },
  {
    id: 2,
    title: "Hemodialisa",
    desc: "Layanan cuci darah dengan mesin modern.",
    icon: "Activity",
    color: "text-emerald-500",
  },
  {
    id: 3,
    title: "Klinik Tumbuh Kembang",
    desc: "Pemantauan optimal untuk anak.",
    icon: "User",
    color: "text-purple-500",
  },
  {
    id: 4,
    title: "Medical Check Up",
    desc: "Pemeriksaan kesehatan menyeluruh.",
    icon: "Shield",
    color: "text-blue-500",
  },
];

export const POLIKLINIK = [
  "Poli Umum",
  "Poli Gigi",
  "Poli Anak",
  "Poli Penyakit Dalam",
  "Poli Kandungan (Obgyn)",
];

export const DOKTER: Record<string, string[]> = {
  "Poli Umum": ["dr. Ahmad", "dr. Budi", "dr. Citra"],
  "Poli Gigi": ["drg. Diana", "drg. Eka"],
  "Poli Anak": ["dr. Fajar, Sp.A", "dr. Gita, Sp.A"],
  "Poli Penyakit Dalam": ["dr. Hadi, Sp.PD", "dr. Indah, Sp.PD"],
  "Poli Kandungan (Obgyn)": ["dr. Joko, Sp.OG"],
};

export const PATIENT_MOCK = {
  rm: "123456",
  nik: "3524000000000001",
  nama: "Ahmad Fulan",
  tglLahir: "1980-01-12",
  golDarah: "O",
  alergi: "Seafood",
};

export const REKAM_MEDIS_MOCK = [
  {
    id: 1,
    tanggal: "2026-03-15",
    poli: "Poli Penyakit Dalam",
    dokter: "dr. Hadi, Sp.PD",
    diagnosis: "Dyspepsia (K30)",
    terapi: "Omeprazole 20mg, Domperidone 10mg",
    status: "Selesai",
  },
  {
    id: 2,
    tanggal: "2026-02-02",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    diagnosis: "Fever, unspecified (R50.9)",
    terapi: "Paracetamol 500mg, Istirahat",
    status: "Selesai",
  },
  {
    id: 3,
    tanggal: "2026-03-20",
    poli: "Poli Gigi",
    dokter: "drg. Diana",
    diagnosis: "-",
    terapi: "-",
    status: "Menunggu",
  },
];

export const SMART_ACTIVITY_LOG = [
  {
    id: 1,
    time: "10:42",
    text: "Dr. Ahmad menyelesaikan operasi bedah umum.",
    type: "med",
    date: "today",
  },
  {
    id: 2,
    time: "09:15",
    text: "Pembayaran BPJS bulan lalu telah cair.",
    type: "fin",
    date: "today",
  },
  {
    id: 3,
    time: "08:30",
    text: "Stok Paracetamol di Farmasi Utama menipis.",
    type: "inv",
    date: "today",
  },
  {
    id: 4,
    time: "07:00",
    text: "Shift pagi dimulai. Kehadiran perawat 98%.",
    type: "hr",
    date: "today",
  },
  {
    id: 5,
    time: "14:20",
    text: "Dr. Hadi memulai praktek Poli Penyakit Dalam.",
    type: "med",
    date: "past_7_days",
  },
  {
    id: 6,
    time: "11:00",
    text: "Audit keuangan internal selesai dilakukan.",
    type: "fin",
    date: "past_7_days",
  },
];

export const SMART_DASHBOARD_DATA = {
  today: {
    bor: "78.5%",
    borTrend: "+2.4%",
    pasien: 428,
    pendapatan: "Rp 142M",
    pendapatanTrend: "+12%",
    stokKritis: 12,
    chartData: [40, 70, 45, 90, 65, 30, 50],
  },
  past_7_days: {
    bor: "75.2%",
    borTrend: "+1.1%",
    pasien: 2850,
    pendapatan: "Rp 980M",
    pendapatanTrend: "+8%",
    stokKritis: 15,
    chartData: [60, 50, 80, 70, 85, 90, 75],
  },
};
