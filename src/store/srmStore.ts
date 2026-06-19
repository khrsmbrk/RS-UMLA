import { create } from "zustand";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// --- SCHEMAS / INTERFACES ---

export interface Patient {
  id: string; // No.RM
  nik: string;
  namaLengkap: string;
  istri?: string;
  pekerjaan: string;
  kotaLahir: string;
  tanggalLahir: string;
  jenisKelamin: "L" | "P";
  statusPernikahan: string;
  riwayatAlergi: string;
  tanggalRegistrasi: string;
  jumlahKunjungan: number;
}

export interface Doctor {
  id: string; // Kode Dokter
  nama: string;
  spesialisasi: string;
}

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
}

export interface QueueItem {
  id: string;
  nomor: number;
  patientId: string;
  nama: string;
  status: "Menunggu" | "Sedang Diperiksa" | "Selesai" | "Dilewati";
  waktuDaftar: string;
}

export interface QueueState {
  tanggal: string;
  currentNumber: number;
  nextNumber: number;
  totalHariIni: number;
  menunggu: number;
  selesai: number;
  list: QueueItem[];
}

export interface Visit {
  id: string;
  patientId: string;
  tanggalKunjungan: string;
  dokterId: string;
  operatorId: string;
  anamnesa: string;
  pemeriksaanFisik: string;
  pemeriksaanPenunjang: string;
  diagnosis: string;
  terapi: string;
  tindakan: string;
  status: "Menunggu" | "Diperiksa" | "Selesai";
  totalBiaya: number;
}

export interface Operator {
  id: string;
  kode: string;
  nama: string;
  passwordHash: string;
  permissions: {
    kunjungan: boolean;
    rekamMedis: boolean;
    laporan: boolean;
    pasien: boolean;
    pemeriksaan: boolean;
    diagnosis: boolean;
    tindakan: boolean;
    layananTambahan: boolean;
    pengaturan: boolean;
  };
}

export interface AppSettings {
  header1: string;
  header2: string;
  titleBar: string;
  versi: string;
  backupFolder: string;
}

export interface IntegrationConfig {
  satuSehat: {
    isProduction: boolean;
    baseUrl: string;
    authUrl: string;
    organizationId: string;
    clientId: string;
    clientSecret: string;
  };
  bpjs: {
    isProduction: boolean;
    consId: string;
    secretKey: string;
    userKey: string;
  };
}

export interface MasterDataRecord {
  id: string;
  [key: string]: any;
}

export type MasterDataState = Record<string, MasterDataRecord[]>;

// --- ZUSTAND STORE ---

interface SRMStore {
  // State
  patients: Patient[];
  doctors: Doctor[];
  doctorSchedules: DoctorSchedule[];
  queueToday: QueueState;
  visits: Visit[];
  operators: Operator[];
  settings: AppSettings;
  integrationConfig: IntegrationConfig;
  masterData: MasterDataState;
  igdQueues: any[];
  addIgdQueue: (queue: any) => void;
  updateIgdQueueStatus: (id: string, status: string) => void;
  kasirBills: any[];
  addKasirBill: (bill: any) => void;
  updateKasirBillStatus: (id: string, status: string) => void;
  poliQueues: any[];
  addPoliQueue: (queue: any) => void;
  updatePoliQueueStatus: (id: string, status: string) => void;
  apotekRecipes: any[];
  addApotekRecipe: (recipe: any) => void;
  updateApotekRecipeStatus: (id: string, status: string) => void;
  labOrders: any[];
  addLabOrder: (order: any) => void;
  updateLabOrderStatus: (id: string, status: string) => void;
  radiologyOrders: any[];
  addRadiologyOrder: (order: any) => void;
  updateRadiologyOrderStatus: (id: string, status: string) => void;
  inpatientBeds: any[];
  addInpatientBed: (bed: any) => void;
  updateInpatientBedStatus: (id: string, status: string) => void;

  // Actions - Patients
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  // Actions - Queue
  addQueue: (patientId: string, nama: string) => void;
  callNextQueue: () => void;
  callQueueAgain: () => void;
  skipQueue: () => void;
  resetQueue: () => void;

  // Actions - Visits
  addVisit: (visit: Visit) => void;
  updateVisit: (id: string, data: Partial<Visit>) => void;

  // Actions - Doctors
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (id: string, data: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;

  // Actions - Doctor Schedules
  addDoctorSchedule: (schedule: DoctorSchedule) => void;
  updateDoctorSchedule: (id: string, data: Partial<DoctorSchedule>) => void;
  deleteDoctorSchedule: (id: string) => void;

  // Actions - Operators
  addOperator: (operator: Operator) => void;
  updateOperator: (id: string, data: Partial<Operator>) => void;
  deleteOperator: (id: string) => void;

  // Actions - Settings & Integration
  updateSettings: (data: Partial<AppSettings>) => void;
  updateIntegrationConfig: (type: "satuSehat" | "bpjs", data: any) => void;

  // Actions - Master Data
  addMasterData: (
    type: string,
    data: Omit<MasterDataRecord, "id">,
  ) => Promise<void>;
  updateMasterData: (
    type: string,
    id: string,
    data: Partial<MasterDataRecord>,
  ) => Promise<void>;
  deleteMasterData: (type: string, id: string) => Promise<void>;
}

// --- INITIAL DUMMY DATA ---
const initialPatients: Patient[] = [
  {
    id: "PSN0001",
    nik: "3524845062243185",
    namaLengkap: "Ratna Indah",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Semarang",
    tanggalLahir: "1990-05-06",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-03-11",
    jumlahKunjungan: 5,
  },
  {
    id: "PSN0002",
    nik: "3524290206207347",
    namaLengkap: "Siti Indah",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Jakarta",
    tanggalLahir: "2009-05-01",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-22",
    jumlahKunjungan: 4,
  },
  {
    id: "PSN0003",
    nik: "3524548213389408",
    namaLengkap: "Budi Setiawan",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Bojonegoro",
    tanggalLahir: "1970-02-21",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-03-14",
    jumlahKunjungan: 4,
  },
  {
    id: "PSN0004",
    nik: "3524712869413576",
    namaLengkap: "Ahmad Wijaya",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Surabaya",
    tanggalLahir: "1975-01-27",
    jenisKelamin: "P",
    statusPernikahan: "Belum Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-08",
    jumlahKunjungan: 3,
  },
  {
    id: "PSN0005",
    nik: "3524527608048820",
    namaLengkap: "Andi Astuti",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Lamongan",
    tanggalLahir: "1983-07-04",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-03-19",
    jumlahKunjungan: 1,
  },
  {
    id: "PSN0006",
    nik: "3524262980096416",
    namaLengkap: "Putra Ayu",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Jakarta",
    tanggalLahir: "1978-04-08",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-12",
    jumlahKunjungan: 5,
  },
  {
    id: "PSN0007",
    nik: "3524745123438281",
    namaLengkap: "Rudi Setiawan",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Bojonegoro",
    tanggalLahir: "2002-04-19",
    jenisKelamin: "P",
    statusPernikahan: "Belum Menikah",
    riwayatAlergi: "Amoxicillin",
    tanggalRegistrasi: "2026-04-09",
    jumlahKunjungan: 4,
  },
  {
    id: "PSN0008",
    nik: "3524833410105044",
    namaLengkap: "Putri Aminah",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Surabaya",
    tanggalLahir: "1984-03-14",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-04",
    jumlahKunjungan: 3,
  },
  {
    id: "PSN0009",
    nik: "3524784611997305",
    namaLengkap: "Eka Baskoro",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Bojonegoro",
    tanggalLahir: "1992-07-18",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Amoxicillin",
    tanggalRegistrasi: "2026-01-05",
    jumlahKunjungan: 1,
  },
  {
    id: "PSN0010",
    nik: "3524297494826940",
    namaLengkap: "Nur Pratama",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Semarang",
    tanggalLahir: "2003-08-07",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-18",
    jumlahKunjungan: 3,
  },
  {
    id: "PSN0011",
    nik: "3524724792277195",
    namaLengkap: "Sri Aminah",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Sidoarjo",
    tanggalLahir: "1972-03-22",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-04-06",
    jumlahKunjungan: 1,
  },
  {
    id: "PSN0012",
    nik: "3524623789423898",
    namaLengkap: "Budi Wati",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Sidoarjo",
    tanggalLahir: "2008-11-08",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-02-03",
    jumlahKunjungan: 1,
  },
  {
    id: "PSN0013",
    nik: "3524609824834723",
    namaLengkap: "Eka Lestari",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Bandung",
    tanggalLahir: "1999-03-18",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-15",
    jumlahKunjungan: 2,
  },
  {
    id: "PSN0014",
    nik: "3524295434051614",
    namaLengkap: "Siti Kusuma",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Malang",
    tanggalLahir: "2004-10-31",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-04-17",
    jumlahKunjungan: 5,
  },
  {
    id: "PSN0015",
    nik: "3524358239918363",
    namaLengkap: "Siti Purnomo",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Gresik",
    tanggalLahir: "2003-05-30",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-26",
    jumlahKunjungan: 1,
  },
  {
    id: "PSN0016",
    nik: "3524165737857349",
    namaLengkap: "Andi Kurniawan",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Malang",
    tanggalLahir: "1975-07-21",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-02-15",
    jumlahKunjungan: 5,
  },
  {
    id: "PSN0017",
    nik: "3524475952244978",
    namaLengkap: "Rudi Rahman",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Malang",
    tanggalLahir: "2005-06-08",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Amoxicillin",
    tanggalRegistrasi: "2026-03-24",
    jumlahKunjungan: 3,
  },
  {
    id: "PSN0018",
    nik: "3524818183876187",
    namaLengkap: "Nur Rahman",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Tuban",
    tanggalLahir: "1989-01-27",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-04",
    jumlahKunjungan: 3,
  },
  {
    id: "PSN0019",
    nik: "3524327837047084",
    namaLengkap: "Ahmad Rahman",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Surabaya",
    tanggalLahir: "2008-11-20",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-03-25",
    jumlahKunjungan: 4,
  },
  {
    id: "PSN0020",
    nik: "3524192901229198",
    namaLengkap: "Nur Lestari",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Jakarta",
    tanggalLahir: "1981-09-30",
    jenisKelamin: "L",
    statusPernikahan: "Belum Menikah",
    riwayatAlergi: "Amoxicillin",
    tanggalRegistrasi: "2026-02-04",
    jumlahKunjungan: 4,
  },
  {
    id: "PSN0021",
    nik: "3524913779323160",
    namaLengkap: "Dewi Baskoro",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Bandung",
    tanggalLahir: "1983-08-24",
    jenisKelamin: "P",
    statusPernikahan: "Belum Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-03-20",
    jumlahKunjungan: 5,
  },
  {
    id: "PSN0022",
    nik: "3524575718949572",
    namaLengkap: "Andi Indah",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Bandung",
    tanggalLahir: "1993-02-06",
    jenisKelamin: "L",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-22",
    jumlahKunjungan: 2,
  },
  {
    id: "PSN0023",
    nik: "3524629436576121",
    namaLengkap: "Ketut Sari",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Sidoarjo",
    tanggalLahir: "2000-04-17",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-02-26",
    jumlahKunjungan: 1,
  },
  {
    id: "PSN0024",
    nik: "3524767976568414",
    namaLengkap: "Ratna Saputra",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Lamongan",
    tanggalLahir: "1987-03-22",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-04-08",
    jumlahKunjungan: 1,
  },
  {
    id: "PSN0025",
    nik: "3524656530419937",
    namaLengkap: "Rudi Pratama",
    pekerjaan: "Wiraswasta",
    kotaLahir: "Surabaya",
    tanggalLahir: "1972-05-12",
    jenisKelamin: "P",
    statusPernikahan: "Menikah",
    riwayatAlergi: "Tidak Ada",
    tanggalRegistrasi: "2026-01-17",
    jumlahKunjungan: 1,
  },
];

const initialDoctors: Doctor[] = [
  {
    id: "DR001",
    nama: "Dr. Ali, Sp.PD",
    spesialisasi: "Penyakit Dalam",
  },
  {
    id: "DR002",
    nama: "Dr. Budi, Sp.PD",
    spesialisasi: "Anak",
  },
  {
    id: "DR003",
    nama: "Dr. Citra, Sp.A",
    spesialisasi: "Kandungan",
  },
  {
    id: "DR004",
    nama: "Dr. Dian, Sp.PD",
    spesialisasi: "Saraf",
  },
  {
    id: "DR005",
    nama: "Dr. Eka, Sp.A",
    spesialisasi: "Mata",
  },
  {
    id: "DR006",
    nama: "Dr. Fajar, Sp.PD",
    spesialisasi: "Penyakit Dalam",
  },
  {
    id: "DR007",
    nama: "Dr. Gita, Sp.PD",
    spesialisasi: "Anak",
  },
  {
    id: "DR008",
    nama: "Dr. Hadi, Sp.PD",
    spesialisasi: "Kandungan",
  },
  {
    id: "DR009",
    nama: "Dr. Ina, Sp.PD",
    spesialisasi: "Saraf",
  },
  {
    id: "DR010",
    nama: "Dr. Joko, Sp.PD",
    spesialisasi: "Mata",
  },
  {
    id: "DR011",
    nama: "Dr. Kiki, Sp.A",
    spesialisasi: "Penyakit Dalam",
  },
  {
    id: "DR012",
    nama: "Dr. Lina, Sp.A",
    spesialisasi: "Anak",
  },
  {
    id: "DR013",
    nama: "Dr. Maya, Sp.PD",
    spesialisasi: "Kandungan",
  },
  {
    id: "DR014",
    nama: "Dr. Nina, Sp.PD",
    spesialisasi: "Saraf",
  },
  {
    id: "DR015",
    nama: "Dr. Oki, Sp.PD",
    spesialisasi: "Mata",
  },
  {
    id: "DR016",
    nama: "Dr. Rika, Sp.PD",
    spesialisasi: "Penyakit Dalam",
  },
  {
    id: "DR017",
    nama: "Dr. Siska, Sp.PD",
    spesialisasi: "Anak",
  },
  {
    id: "DR018",
    nama: "Dr. Tono, Sp.PD",
    spesialisasi: "Kandungan",
  },
  {
    id: "DR019",
    nama: "Dr. Umar, Sp.A",
    spesialisasi: "Saraf",
  },
  {
    id: "DR020",
    nama: "Dr. Vina, Sp.PD",
    spesialisasi: "Mata",
  },
];

const initialDoctorSchedules: DoctorSchedule[] = [
  {
    id: "SCH001",
    doctorId: "DR003",
    hari: "Rabu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH002",
    doctorId: "DR016",
    hari: "Kamis",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH003",
    doctorId: "DR011",
    hari: "Selasa",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH004",
    doctorId: "DR009",
    hari: "Kamis",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH005",
    doctorId: "DR002",
    hari: "Jumat",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH006",
    doctorId: "DR008",
    hari: "Sabtu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH007",
    doctorId: "DR006",
    hari: "Sabtu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH008",
    doctorId: "DR002",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH009",
    doctorId: "DR017",
    hari: "Selasa",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH010",
    doctorId: "DR005",
    hari: "Rabu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH011",
    doctorId: "DR006",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH012",
    doctorId: "DR011",
    hari: "Sabtu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH013",
    doctorId: "DR007",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH014",
    doctorId: "DR008",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH015",
    doctorId: "DR001",
    hari: "Sabtu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH016",
    doctorId: "DR015",
    hari: "Rabu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH017",
    doctorId: "DR013",
    hari: "Kamis",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH018",
    doctorId: "DR013",
    hari: "Kamis",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH019",
    doctorId: "DR019",
    hari: "Rabu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH020",
    doctorId: "DR001",
    hari: "Rabu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH021",
    doctorId: "DR019",
    hari: "Rabu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH022",
    doctorId: "DR006",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH023",
    doctorId: "DR001",
    hari: "Sabtu",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH024",
    doctorId: "DR016",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
  {
    id: "SCH025",
    doctorId: "DR020",
    hari: "Selasa",
    jamMulai: "08:00",
    jamSelesai: "12:00",
  },
];

const initialQueue: QueueState = {
  tanggal: "2026-05-27",
  currentNumber: 5,
  nextNumber: 6,
  totalHariIni: 20,
  menunggu: 15,
  selesai: 4,
  list: [
    {
      id: "Q001",
      nomor: 1,
      patientId: "PSN0012",
      nama: "Ketut Kusuma",
      status: "Selesai",
      waktuDaftar: "08:02",
    },
    {
      id: "Q002",
      nomor: 2,
      patientId: "PSN0017",
      nama: "Made Indah",
      status: "Selesai",
      waktuDaftar: "08:04",
    },
    {
      id: "Q003",
      nomor: 3,
      patientId: "PSN0024",
      nama: "Nyoman Indah",
      status: "Selesai",
      waktuDaftar: "08:06",
    },
    {
      id: "Q004",
      nomor: 4,
      patientId: "PSN0002",
      nama: "Ahmad Wati",
      status: "Selesai",
      waktuDaftar: "08:08",
    },
    {
      id: "Q005",
      nomor: 5,
      patientId: "PSN0015",
      nama: "Dwi Kurniawan",
      status: "Sedang Diperiksa",
      waktuDaftar: "08:10",
    },
    {
      id: "Q006",
      nomor: 6,
      patientId: "PSN0019",
      nama: "Nur Kusuma",
      status: "Menunggu",
      waktuDaftar: "08:12",
    },
    {
      id: "Q007",
      nomor: 7,
      patientId: "PSN0020",
      nama: "Putra Wati",
      status: "Menunggu",
      waktuDaftar: "08:14",
    },
    {
      id: "Q008",
      nomor: 8,
      patientId: "PSN0015",
      nama: "Wayan Indah",
      status: "Menunggu",
      waktuDaftar: "08:16",
    },
    {
      id: "Q009",
      nomor: 9,
      patientId: "PSN0012",
      nama: "Nyoman Wijaya",
      status: "Menunggu",
      waktuDaftar: "08:18",
    },
    {
      id: "Q010",
      nomor: 10,
      patientId: "PSN0014",
      nama: "Made Setiawan",
      status: "Menunggu",
      waktuDaftar: "08:20",
    },
    {
      id: "Q011",
      nomor: 11,
      patientId: "PSN0005",
      nama: "Sri Kusuma",
      status: "Menunggu",
      waktuDaftar: "08:22",
    },
    {
      id: "Q012",
      nomor: 12,
      patientId: "PSN0012",
      nama: "Siti Santoso",
      status: "Menunggu",
      waktuDaftar: "08:24",
    },
    {
      id: "Q013",
      nomor: 13,
      patientId: "PSN0019",
      nama: "Dwi Kurniawan",
      status: "Menunggu",
      waktuDaftar: "08:26",
    },
    {
      id: "Q014",
      nomor: 14,
      patientId: "PSN0009",
      nama: "Siti Wati",
      status: "Menunggu",
      waktuDaftar: "08:28",
    },
    {
      id: "Q015",
      nomor: 15,
      patientId: "PSN0016",
      nama: "Nur Santoso",
      status: "Menunggu",
      waktuDaftar: "08:30",
    },
    {
      id: "Q016",
      nomor: 16,
      patientId: "PSN0024",
      nama: "Putra Setiawan",
      status: "Menunggu",
      waktuDaftar: "08:32",
    },
    {
      id: "Q017",
      nomor: 17,
      patientId: "PSN0014",
      nama: "Ratna Sari",
      status: "Menunggu",
      waktuDaftar: "08:34",
    },
    {
      id: "Q018",
      nomor: 18,
      patientId: "PSN0011",
      nama: "Putri Wijaya",
      status: "Menunggu",
      waktuDaftar: "08:36",
    },
    {
      id: "Q019",
      nomor: 19,
      patientId: "PSN0017",
      nama: "Dwi Indah",
      status: "Menunggu",
      waktuDaftar: "08:38",
    },
    {
      id: "Q020",
      nomor: 20,
      patientId: "PSN0020",
      nama: "Rudi Pratama",
      status: "Menunggu",
      waktuDaftar: "08:40",
    },
  ],
};

const initialVisits: Visit[] = [
  {
    id: "VST-20260318-001",
    patientId: "PSN0024",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR006",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-002",
    patientId: "PSN0022",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR014",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-003",
    patientId: "PSN0020",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR004",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-004",
    patientId: "PSN0007",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR002",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-005",
    patientId: "PSN0020",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR002",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-006",
    patientId: "PSN0019",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR005",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-007",
    patientId: "PSN0021",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR020",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-008",
    patientId: "PSN0009",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR005",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-009",
    patientId: "PSN0018",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR004",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-010",
    patientId: "PSN0017",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR004",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-011",
    patientId: "PSN0001",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR007",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-012",
    patientId: "PSN0010",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR017",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-013",
    patientId: "PSN0009",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR017",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-014",
    patientId: "PSN0014",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR011",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-015",
    patientId: "PSN0015",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR017",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-016",
    patientId: "PSN0023",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR017",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-017",
    patientId: "PSN0023",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR001",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-018",
    patientId: "PSN0013",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR012",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-019",
    patientId: "PSN0020",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR009",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-020",
    patientId: "PSN0011",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR005",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-021",
    patientId: "PSN0012",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR014",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-022",
    patientId: "PSN0002",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR010",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-023",
    patientId: "PSN0004",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR020",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-024",
    patientId: "PSN0020",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR010",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
  {
    id: "VST-20260318-025",
    patientId: "PSN0018",
    tanggalKunjungan: "2026-05-27T02:39:08.116Z",
    dokterId: "DR017",
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000,
  },
];

const getInitialVersion = () => {
  const date = new Date();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${date.getFullYear()}.${months[date.getMonth()]}.${date.getDate()}`;
};

const initialMasterData: MasterDataState = {
  kamar: [
    { id: "KMR-1", "Nama Kamar": "Melati 101", Kategori: "VIP", Status: "Terisi", "Harga/Malam": 1500000 },
    { id: "KMR-2", "Nama Kamar": "Melati 102", Kategori: "VIP", Status: "Tersedia", "Harga/Malam": 1500000 },
    { id: "KMR-3", "Nama Kamar": "Mawar 201", Kategori: "Kelas 1", Status: "Terisi", "Harga/Malam": 800000 },
    { id: "KMR-4", "Nama Kamar": "Mawar 202", Kategori: "Kelas 1", Status: "Tersedia", "Harga/Malam": 800000 },
    { id: "KMR-5", "Nama Kamar": "Anggrek 301", Kategori: "Kelas 2", Status: "Terisi", "Harga/Malam": 400000 },
    { id: "KMR-6", "Nama Kamar": "Anggrek 302", Kategori: "Kelas 2", Status: "Tersedia", "Harga/Malam": 400000 },
    { id: "KMR-7", "Nama Kamar": "Dahlia 401A", Kategori: "Kelas 3", Status: "Tersedia", "Harga/Malam": 150000 },
    { id: "KMR-8", "Nama Kamar": "Dahlia 401B", Kategori: "Kelas 3", Status: "Terisi", "Harga/Malam": 150000 },
    { id: "KMR-9", "Nama Kamar": "ICU Bed 1", Kategori: "ICU", Status: "Terisi", "Harga/Malam": 2500000 },
    { id: "KMR-10", "Nama Kamar": "ICU Bed 2", Kategori: "ICU", Status: "Tersedia", "Harga/Malam": 2500000 },
  ],
  poliklinik: [
    { id: "POL-1", "Nama Poliklinik": "Poli Umum", Kode: "UMM", "Kepala Poli": "Dr. Ratna" },
    { id: "POL-2", "Nama Poliklinik": "Poli Gigi", Kode: "GIG", "Kepala Poli": "Drg. Budi" },
    { id: "POL-3", "Nama Poliklinik": "Poli Anak", Kode: "ANK", "Kepala Poli": "Dr. Sarah, Sp.A" },
    { id: "POL-4", "Nama Poliklinik": "Poli Penyakit Dalam", Kode: "PDK", "Kepala Poli": "Dr. Anton, Sp.PD" },
    { id: "POL-5", "Nama Poliklinik": "Poli Kandungan", Kode: "OBG", "Kepala Poli": "Dr. Nina, Sp.OG" },
  ],

  "pemeriksaan-fisik": [
    {
      id: "PF1",
      "Nama Pemeriksaan": "Tekanan Darah",
      Kategori: "Tanda Vital",
    },
    {
      id: "PF2",
      "Nama Pemeriksaan": "Suhu Tubuh",
      Kategori: "Umum",
    },
    {
      id: "PF3",
      "Nama Pemeriksaan": "Nadi",
      Kategori: "Khusus",
    },
    {
      id: "PF4",
      "Nama Pemeriksaan": "Pernapasan",
      Kategori: "Tanda Vital",
    },
    {
      id: "PF5",
      "Nama Pemeriksaan": "Berat Badan",
      Kategori: "Umum",
    },
    {
      id: "PF6",
      "Nama Pemeriksaan": "Tinggi Badan",
      Kategori: "Khusus",
    },
    {
      id: "PF7",
      "Nama Pemeriksaan": "Lingkar Kepala",
      Kategori: "Tanda Vital",
    },
    {
      id: "PF8",
      "Nama Pemeriksaan": "Pemeriksaan Mata",
      Kategori: "Umum",
    },
    {
      id: "PF9",
      "Nama Pemeriksaan": "Pemeriksaan THT",
      Kategori: "Khusus",
    },
    {
      id: "PF10",
      "Nama Pemeriksaan": "Pemeriksaan Gigi",
      Kategori: "Tanda Vital",
    },
    {
      id: "PF11",
      "Nama Pemeriksaan": "Pemeriksaan Leher",
      Kategori: "Umum",
    },
    {
      id: "PF12",
      "Nama Pemeriksaan": "Pemeriksaan Dada",
      Kategori: "Khusus",
    },
    {
      id: "PF13",
      "Nama Pemeriksaan": "Pemeriksaan Jantung",
      Kategori: "Tanda Vital",
    },
    {
      id: "PF14",
      "Nama Pemeriksaan": "Pemeriksaan Paru",
      Kategori: "Umum",
    },
    {
      id: "PF15",
      "Nama Pemeriksaan": "Pemeriksaan Abdomen",
      Kategori: "Khusus",
    },
    {
      id: "PF16",
      "Nama Pemeriksaan": "Pemeriksaan Ekstremitas",
      Kategori: "Tanda Vital",
    },
    {
      id: "PF17",
      "Nama Pemeriksaan": "Refleks Fisiologis",
      Kategori: "Umum",
    },
    {
      id: "PF18",
      "Nama Pemeriksaan": "Refleks Patologis",
      Kategori: "Khusus",
    },
    {
      id: "PF19",
      "Nama Pemeriksaan": "GCS",
      Kategori: "Tanda Vital",
    },
    {
      id: "PF20",
      "Nama Pemeriksaan": "Saturasi Oksigen",
      Kategori: "Umum",
    },
  ],
  "pemeriksaan-penunjang": [
    {
      id: "PP1",
      "Nama Pemeriksaan": "Darah Lengkap",
      Jenis: "Laboratorium",
    },
    {
      id: "PP2",
      "Nama Pemeriksaan": "Urine Rutin",
      Jenis: "Radiologi",
    },
    {
      id: "PP3",
      "Nama Pemeriksaan": "Feses Rutin",
      Jenis: "Lainnya",
    },
    {
      id: "PP4",
      "Nama Pemeriksaan": "Gula Darah Puasa",
      Jenis: "Laboratorium",
    },
    {
      id: "PP5",
      "Nama Pemeriksaan": "Kolesterol Total",
      Jenis: "Radiologi",
    },
    {
      id: "PP6",
      "Nama Pemeriksaan": "Asam Urat",
      Jenis: "Lainnya",
    },
    {
      id: "PP7",
      "Nama Pemeriksaan": "SGOT",
      Jenis: "Laboratorium",
    },
    {
      id: "PP8",
      "Nama Pemeriksaan": "SGPT",
      Jenis: "Radiologi",
    },
    {
      id: "PP9",
      "Nama Pemeriksaan": "Ureum",
      Jenis: "Lainnya",
    },
    {
      id: "PP10",
      "Nama Pemeriksaan": "Kreatinin",
      Jenis: "Laboratorium",
    },
    {
      id: "PP11",
      "Nama Pemeriksaan": "Radiologi (X-Ray)",
      Jenis: "Radiologi",
    },
    {
      id: "PP12",
      "Nama Pemeriksaan": "USG Abdomen",
      Jenis: "Lainnya",
    },
    {
      id: "PP13",
      "Nama Pemeriksaan": "EKG",
      Jenis: "Laboratorium",
    },
    {
      id: "PP14",
      "Nama Pemeriksaan": "CT Scan",
      Jenis: "Radiologi",
    },
    {
      id: "PP15",
      "Nama Pemeriksaan": "MRI",
      Jenis: "Lainnya",
    },
    {
      id: "PP16",
      "Nama Pemeriksaan": "Widal",
      Jenis: "Laboratorium",
    },
    {
      id: "PP17",
      "Nama Pemeriksaan": "Dengue NS1",
      Jenis: "Radiologi",
    },
    {
      id: "PP18",
      "Nama Pemeriksaan": "Tes Kehamilan",
      Jenis: "Lainnya",
    },
    {
      id: "PP19",
      "Nama Pemeriksaan": "Golongan Darah",
      Jenis: "Laboratorium",
    },
    {
      id: "PP20",
      "Nama Pemeriksaan": "HbA1c",
      Jenis: "Radiologi",
    },
  ],
  diagnosis: [
    {
      id: "DG1",
      "Kode ICD": "A00.0",
      "Nama Penyakit": "Kolera",
    },
    {
      id: "DG2",
      "Kode ICD": "A01.1",
      "Nama Penyakit": "Demam Tifoid",
    },
    {
      id: "DG3",
      "Kode ICD": "A02.2",
      "Nama Penyakit": "Shigellosis",
    },
    {
      id: "DG4",
      "Kode ICD": "A03.3",
      "Nama Penyakit": "Botulisme",
    },
    {
      id: "DG5",
      "Kode ICD": "A04.4",
      "Nama Penyakit": "Tuberkulosis",
    },
    {
      id: "DG6",
      "Kode ICD": "A05.0",
      "Nama Penyakit": "Malaria",
    },
    {
      id: "DG7",
      "Kode ICD": "A06.1",
      "Nama Penyakit": "Dengue Fever",
    },
    {
      id: "DG8",
      "Kode ICD": "A07.2",
      "Nama Penyakit": "Chikungunya",
    },
    {
      id: "DG9",
      "Kode ICD": "A08.3",
      "Nama Penyakit": "Zika",
    },
    {
      id: "DG10",
      "Kode ICD": "A09.4",
      "Nama Penyakit": "Leptospirosis",
    },
    {
      id: "DG11",
      "Kode ICD": "A00.0",
      "Nama Penyakit": "Tetanus",
    },
    {
      id: "DG12",
      "Kode ICD": "A01.1",
      "Nama Penyakit": "Difteri",
    },
    {
      id: "DG13",
      "Kode ICD": "A02.2",
      "Nama Penyakit": "Pertusis",
    },
    {
      id: "DG14",
      "Kode ICD": "A03.3",
      "Nama Penyakit": "Polio",
    },
    {
      id: "DG15",
      "Kode ICD": "A04.4",
      "Nama Penyakit": "Campak",
    },
    {
      id: "DG16",
      "Kode ICD": "A05.0",
      "Nama Penyakit": "Rubella",
    },
    {
      id: "DG17",
      "Kode ICD": "A06.1",
      "Nama Penyakit": "Mumps",
    },
    {
      id: "DG18",
      "Kode ICD": "A07.2",
      "Nama Penyakit": "Varisela",
    },
    {
      id: "DG19",
      "Kode ICD": "A08.3",
      "Nama Penyakit": "Herpes Zoster",
    },
    {
      id: "DG20",
      "Kode ICD": "A09.4",
      "Nama Penyakit": "COVID-19",
    },
  ],
  terapi: [
    {
      id: "TR1",
      "Nama Terapi": "Rehidrasi Oral",
      Kategori: "Suportif",
    },
    {
      id: "TR2",
      "Nama Terapi": "Oksigenasi",
      Kategori: "Kuratif",
    },
    {
      id: "TR3",
      "Nama Terapi": "Fisioterapi Dada",
      Kategori: "Rehabilitatif",
    },
    {
      id: "TR4",
      "Nama Terapi": "Nebulisasi",
      Kategori: "Suportif",
    },
    {
      id: "TR5",
      "Nama Terapi": "Transfusi Darah",
      Kategori: "Kuratif",
    },
    {
      id: "TR6",
      "Nama Terapi": "Cuci Darah",
      Kategori: "Rehabilitatif",
    },
    {
      id: "TR7",
      "Nama Terapi": "Konseling Gizi",
      Kategori: "Suportif",
    },
    {
      id: "TR8",
      "Nama Terapi": "Rehabilitasi Medik",
      Kategori: "Kuratif",
    },
    {
      id: "TR9",
      "Nama Terapi": "Radioterapi",
      Kategori: "Rehabilitatif",
    },
    {
      id: "TR10",
      "Nama Terapi": "Kemoterapi",
      Kategori: "Suportif",
    },
    {
      id: "TR11",
      "Nama Terapi": "Terapi Bermain",
      Kategori: "Kuratif",
    },
    {
      id: "TR12",
      "Nama Terapi": "Terapi Wicara",
      Kategori: "Rehabilitatif",
    },
    {
      id: "TR13",
      "Nama Terapi": "Terapi Okupasi",
      Kategori: "Suportif",
    },
    {
      id: "TR14",
      "Nama Terapi": "Psikoterapi",
      Kategori: "Kuratif",
    },
    {
      id: "TR15",
      "Nama Terapi": "Akupuntur",
      Kategori: "Rehabilitatif",
    },
    {
      id: "TR16",
      "Nama Terapi": "Pijat Bayi",
      Kategori: "Suportif",
    },
    {
      id: "TR17",
      "Nama Terapi": "Fototerapi",
      Kategori: "Kuratif",
    },
    {
      id: "TR18",
      "Nama Terapi": "Kompres Hangat",
      Kategori: "Rehabilitatif",
    },
    {
      id: "TR19",
      "Nama Terapi": "Perawatan Luka",
      Kategori: "Suportif",
    },
    {
      id: "TR20",
      "Nama Terapi": "Edukasi Kesehatan",
      Kategori: "Kuratif",
    },
  ],
  tindakan: [
    {
      id: "TD1",
      "Kode Tindakan": "TND-001",
      "Nama Tindakan": "Konsultasi Dokter Umum",
      Tarif: 150000,
    },
    {
      id: "TD2",
      "Kode Tindakan": "TND-002",
      "Nama Tindakan": "Jahit Luka Kecil",
      Tarif: 70000,
    },
    {
      id: "TD3",
      "Kode Tindakan": "TND-003",
      "Nama Tindakan": "Cabut Gigi",
      Tarif: 140000,
    },
    {
      id: "TD4",
      "Kode Tindakan": "TND-004",
      "Nama Tindakan": "Pemasangan Infus",
      Tarif: 230000,
    },
    {
      id: "TD5",
      "Kode Tindakan": "TND-005",
      "Nama Tindakan": "Injeksi IM/IV",
      Tarif: 60000,
    },
    {
      id: "TD6",
      "Kode Tindakan": "TND-006",
      "Nama Tindakan": "Sirkumsisi",
      Tarif: 80000,
    },
    {
      id: "TD7",
      "Kode Tindakan": "TND-007",
      "Nama Tindakan": "Nebulizer",
      Tarif: 130000,
    },
    {
      id: "TD8",
      "Kode Tindakan": "TND-008",
      "Nama Tindakan": "Pemasangan Kateter",
      Tarif: 170000,
    },
    {
      id: "TD9",
      "Kode Tindakan": "TND-009",
      "Nama Tindakan": "Rawat Luka Sedang",
      Tarif: 190000,
    },
    {
      id: "TD10",
      "Kode Tindakan": "TND-010",
      "Nama Tindakan": "EKG",
      Tarif: 130000,
    },
    {
      id: "TD11",
      "Kode Tindakan": "TND-011",
      "Nama Tindakan": "USG Kehamilan",
      Tarif: 50000,
    },
    {
      id: "TD12",
      "Kode Tindakan": "TND-012",
      "Nama Tindakan": "Konsultasi Spesialis Anak",
      Tarif: 100000,
    },
    {
      id: "TD13",
      "Kode Tindakan": "TND-013",
      "Nama Tindakan": "Konsultasi Spesialis Penyakit Dalam",
      Tarif: 80000,
    },
    {
      id: "TD14",
      "Kode Tindakan": "TND-014",
      "Nama Tindakan": "Cabut Kuku",
      Tarif: 190000,
    },
    {
      id: "TD15",
      "Kode Tindakan": "TND-015",
      "Nama Tindakan": "Pemasangan NGT",
      Tarif: 130000,
    },
    {
      id: "TD16",
      "Kode Tindakan": "TND-016",
      "Nama Tindakan": "Ekstraksi Benda Asing",
      Tarif: 120000,
    },
    {
      id: "TD17",
      "Kode Tindakan": "TND-017",
      "Nama Tindakan": "Insisi Abses",
      Tarif: 180000,
    },
    {
      id: "TD18",
      "Kode Tindakan": "TND-018",
      "Nama Tindakan": "Spirometri",
      Tarif: 240000,
    },
    {
      id: "TD19",
      "Kode Tindakan": "TND-019",
      "Nama Tindakan": "Tindakan Gigi - Tambal",
      Tarif: 160000,
    },
    {
      id: "TD20",
      "Kode Tindakan": "TND-020",
      "Nama Tindakan": "Konseling Psikologi",
      Tarif: 180000,
    },
  ],
  obat: [
    {
      id: "OB1",
      "Kode Obat": "OBT-001",
      "Nama Obat": "Paracetamol 500mg",
      Stok: 18,
      Harga: 10500,
    },
    {
      id: "OB2",
      "Kode Obat": "OBT-002",
      "Nama Obat": "Amoxicillin 500mg",
      Stok: 21,
      Harga: 1500,
    },
    {
      id: "OB3",
      "Kode Obat": "OBT-003",
      "Nama Obat": "Cefadroxil 500mg",
      Stok: 99,
      Harga: 6000,
    },
    {
      id: "OB4",
      "Kode Obat": "OBT-004",
      "Nama Obat": "Ibuprofen 400mg",
      Stok: 74,
      Harga: 10500,
    },
    {
      id: "OB5",
      "Kode Obat": "OBT-005",
      "Nama Obat": "Antasida Doen",
      Stok: 90,
      Harga: 4500,
    },
    {
      id: "OB6",
      "Kode Obat": "OBT-006",
      "Nama Obat": "Omeprazole 20mg",
      Stok: 21,
      Harga: 12000,
    },
    {
      id: "OB7",
      "Kode Obat": "OBT-007",
      "Nama Obat": "Lansoprazole 30mg",
      Stok: 63,
      Harga: 13500,
    },
    {
      id: "OB8",
      "Kode Obat": "OBT-008",
      "Nama Obat": "Captopril 25mg",
      Stok: 83,
      Harga: 15000,
    },
    {
      id: "OB9",
      "Kode Obat": "OBT-009",
      "Nama Obat": "Amlodipine 5mg",
      Stok: 67,
      Harga: 3000,
    },
    {
      id: "OB10",
      "Kode Obat": "OBT-010",
      "Nama Obat": "Amlodipine 10mg",
      Stok: 60,
      Harga: 3000,
    },
    {
      id: "OB11",
      "Kode Obat": "OBT-011",
      "Nama Obat": "Metformin 500mg",
      Stok: 46,
      Harga: 13500,
    },
    {
      id: "OB12",
      "Kode Obat": "OBT-012",
      "Nama Obat": "Glibenclamide 5mg",
      Stok: 55,
      Harga: 3000,
    },
    {
      id: "OB13",
      "Kode Obat": "OBT-013",
      "Nama Obat": "Salbutamol 2mg",
      Stok: 59,
      Harga: 3000,
    },
    {
      id: "OB14",
      "Kode Obat": "OBT-014",
      "Nama Obat": "Cetirizine 10mg",
      Stok: 54,
      Harga: 3000,
    },
    {
      id: "OB15",
      "Kode Obat": "OBT-015",
      "Nama Obat": "Loratadine 10mg",
      Stok: 48,
      Harga: 15000,
    },
    {
      id: "OB16",
      "Kode Obat": "OBT-016",
      "Nama Obat": "Dexamethasone 0.5mg",
      Stok: 87,
      Harga: 13500,
    },
    {
      id: "OB17",
      "Kode Obat": "OBT-017",
      "Nama Obat": "Vitamin C 50mg",
      Stok: 107,
      Harga: 9000,
    },
    {
      id: "OB18",
      "Kode Obat": "OBT-018",
      "Nama Obat": "Vitamin B Complex",
      Stok: 107,
      Harga: 7500,
    },
    {
      id: "OB19",
      "Kode Obat": "OBT-019",
      "Nama Obat": "Asam Mefenamat 500mg",
      Stok: 60,
      Harga: 9000,
    },
    {
      id: "OB20",
      "Kode Obat": "OBT-020",
      "Nama Obat": "Domperidone 10mg",
      Stok: 40,
      Harga: 1500,
    },
  ],
  "template-diagnosis": [
    {
      id: "TMP1",
      "Nama Template": "Template ISPA",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP2",
      "Nama Template": "Template Dispepsia",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP3",
      "Nama Template": "Template Diare",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP4",
      "Nama Template": "Template Hipertensi",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP5",
      "Nama Template": "Template Thypoid",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP6",
      "Nama Template": "Template Myalgia",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP7",
      "Nama Template": "Template Dermatitis",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP8",
      "Nama Template": "Template Asma",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP9",
      "Nama Template": "Template Faringitis",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP10",
      "Nama Template": "Template Vertigo",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP11",
      "Nama Template": "Template Tonsilitis",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP12",
      "Nama Template": "Template Anemia",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP13",
      "Nama Template": "Template Gastritis",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP14",
      "Nama Template": "Template Tinea",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP15",
      "Nama Template": "Template Konjungtivitis",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP16",
      "Nama Template": "Template Caries Gigi",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP17",
      "Nama Template": "Template Scabies",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP18",
      "Nama Template": "Template Gizi Kurang",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP19",
      "Nama Template": "Template Diabetes Mellitus",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
    {
      id: "TMP20",
      "Nama Template": "Template Rhinitis",
      "Isi Template":
        "Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.",
    },
  ],
};

export const useSRMStore = create<SRMStore>((set, get) => ({
  // Initial State
  patients: initialPatients,
  doctors: initialDoctors,
  doctorSchedules: initialDoctorSchedules,
  queueToday: initialQueue,
  visits: initialVisits,
  operators: [
    {
      id: "OP001",
      kode: "ADM",
      nama: "Admin Utama",
      passwordHash: "***",
      permissions: {
        kunjungan: true,
        rekamMedis: true,
        laporan: true,
        pasien: true,
        pemeriksaan: true,
        diagnosis: true,
        tindakan: true,
        layananTambahan: true,
        pengaturan: true,
      },
    },
    {
      id: "OP002",
      kode: "RM-001",
      nama: "Petugas Admisi",
      passwordHash: "***",
      permissions: {
        kunjungan: true,
        rekamMedis: false,
        laporan: true,
        pasien: true,
        pemeriksaan: false,
        diagnosis: false,
        tindakan: false,
        layananTambahan: false,
        pengaturan: false,
      },
    },
    {
      id: "OP003",
      kode: "DOK-001",
      nama: "Dr. Laila",
      passwordHash: "***",
      permissions: {
        kunjungan: true,
        rekamMedis: true,
        laporan: false,
        pasien: true,
        pemeriksaan: true,
        diagnosis: true,
        tindakan: true,
        layananTambahan: true,
        pengaturan: false,
      },
    },
    {
      id: "OP004",
      kode: "KASIR",
      nama: "Kasir Pembayaran",
      passwordHash: "***",
      permissions: {
        kunjungan: false,
        rekamMedis: false,
        laporan: true,
        pasien: true,
        pemeriksaan: false,
        diagnosis: false,
        tindakan: false,
        layananTambahan: false,
        pengaturan: false,
      },
    },
  ],
  settings: {
    header1: "Klinik Utama RS UMLA",
    header2: "Jl. Raya Plalangan Plosowahyu KM 2, Lamongan",
    titleBar: "SIM RS UMLA - Sistem Informasi Manajemen",
    versi: getInitialVersion(),
    backupFolder: "D:/Backup_SIM_RSUMLA",
  },
  integrationConfig: {
    satuSehat: {
      isProduction: false,
      baseUrl: "",
      authUrl: "",
      organizationId: "",
      clientId: "",
      clientSecret: "",
    },
    bpjs: { isProduction: false, consId: "", secretKey: "", userKey: "" },
  },
  masterData: initialMasterData,
  igdQueues: [
    { id: 'IGD-001', name: 'Tn. Abdul Ghani', age: 45, triage: 'Merah', diagnosis: 'Cardiac Arrest', time: '10:05', status: 'Resusitasi' },
    { id: 'IGD-002', name: 'Ny. Siti Mariam', age: 32, triage: 'Kuning', diagnosis: 'Fraktur Tertutup Tibia', time: '10:15', status: 'Observasi' },
    { id: 'IGD-003', name: 'An. Budi', age: 8, triage: 'Hijau', diagnosis: 'Febris (Demam H+3)', time: '10:30', status: 'Pemeriksaan' },
  ],
  addIgdQueue: (q) => set(state => ({ igdQueues: [q, ...state.igdQueues] })),
  updateIgdQueueStatus: (id, status) => set(state => ({ igdQueues: state.igdQueues.map(q => q.id === id ? { ...q, status } : q) })),
  
  kasirBills: [
    { id: 'INV-20260611-001', noRM: 'PSN0001', pasien: 'Budi Santoso', poli: 'Poli Umum', tipe: 'Umum / Pribadi', total: 150000, status: 'Menunggu', time: '10:05' },
    { id: 'INV-20260611-002', noRM: 'PSN0002', pasien: 'Siti Aminah', poli: 'Poli Gigi', tipe: 'BPJS Kesehatan', total: 65000, status: 'Menunggu', time: '10:15' },
    { id: 'INV-20260611-003', noRM: 'PSN0003', pasien: 'Agus Setiawan', poli: 'IGD', tipe: 'Asuransi Swasta', total: 450000, status: 'Lunas', time: '09:30' },
  ],
  addKasirBill: (b) => set(state => ({ kasirBills: [b, ...state.kasirBills] })),
  updateKasirBillStatus: (id, status) => set(state => ({ kasirBills: state.kasirBills.map(b => b.id === id ? { ...b, status } : b) })),

  poliQueues: [
    { id: 'Q-20260611-001', noRM: 'PSN0001', pasien: 'Budi Santoso', poli: 'Poli Umum', tipe: 'BPJS Kesehatan', dr: 'Dr. Andi', status: 'Diperiksa', time: '09:05', antrean: 'A-01' },
    { id: 'Q-20260611-002', noRM: 'PSN0002', pasien: 'Siti Aminah', poli: 'Poli Umum', tipe: 'Umum / Pribadi', dr: 'Dr. Andi', status: 'Menunggu', time: '09:15', antrean: 'A-02' },
    { id: 'Q-20260611-003', noRM: 'PSN0003', pasien: 'Agus Setiawan', poli: 'Poli Umum', tipe: 'BPJS Kesehatan', dr: 'Dr. Andi', status: 'Selesai', time: '08:30', antrean: 'A-00' },
  ],
  addPoliQueue: (q) => set(state => ({ poliQueues: [q, ...state.poliQueues] })),
  updatePoliQueueStatus: (id, status) => set(state => ({ poliQueues: state.poliQueues.map(q => q.id === id ? { ...q, status } : q) })),

  apotekRecipes: [
    {
      id: "RSP-20260611-001",
      noRM: "PSN0001",
      pasien: "Budi Santoso",
      poli: "Poli Umum",
      dr: "Dr. Andi",
      status: "Menyiapkan Obat",
      time: "10:05",
      tipe: "Umum",
      catatan: "Alergi Penicillin",
    },
    {
      id: "RSP-20260611-002",
      noRM: "PSN0002",
      pasien: "Siti Aminah",
      poli: "Poli Gigi",
      dr: "Dr. Budi",
      status: "Siap Diambil",
      time: "10:15",
      tipe: "BPJS",
      catatan: "-",
    },
    {
      id: "RSP-20260611-003",
      noRM: "PSN0003",
      pasien: "Agus Setiawan",
      poli: "IGD",
      dr: "Dr. Citra",
      status: "Selesai",
      time: "09:30",
      tipe: "Asuransi",
      catatan: "Cito",
    },
  ],
  addApotekRecipe: (r) => set(state => ({ apotekRecipes: [r, ...state.apotekRecipes] })),
  updateApotekRecipeStatus: (id, status) => set(state => ({ apotekRecipes: state.apotekRecipes.map(r => r.id === id ? { ...r, status } : r) })),

  labOrders: [
    { id: 'LAB-20260611-001', noRM: 'PSN0003', pasien: 'Agus Setiawan', poli: 'IGD', dokter: 'Dr. Herman', urgen: true, status: 'Proses', time: '10:05' },
    { id: 'LAB-20260611-002', noRM: 'PSN0004', pasien: 'Dewi Lestari', poli: 'Poli Dalam', dokter: 'Dr. Sarah', urgen: false, status: 'Menunggu', time: '10:15' },
  ],
  addLabOrder: (o) => set(state => ({ labOrders: [o, ...state.labOrders] })),
  updateLabOrderStatus: (id, status) => set(state => ({ labOrders: state.labOrders.map(o => o.id === id ? { ...o, status } : o) })),

  radiologyOrders: [
    { id: 'RAD-20260611-001', rm: 'PSN0011', patient: 'Leni Marlina', poly: 'IGD', type: 'Rontgen Thorax AP/PA', reqTime: '10:15', status: 'Menunggu' },
    { id: 'RAD-20260611-002', rm: 'PSN0012', patient: 'Samsul Arif', poly: 'Poli Orthopedi', type: 'Rontgen Genu Kanan', reqTime: '09:40', status: 'Proses' },
  ],
  addRadiologyOrder: (o) => set(state => ({ radiologyOrders: [o, ...state.radiologyOrders] })),
  updateRadiologyOrderStatus: (id, status) => set(state => ({ radiologyOrders: state.radiologyOrders.map(o => o.id === id ? { ...o, status } : o) })),

  inpatientBeds: [
    { id: '101A', room: 'Mawar (Kelas I)', patient: 'Budi Santoso', rm: 'PSN0001', bpjs: true, admissionDate: '09 Jun 2026', doctor: 'Dr. Andi, Sp.PD', status: 'Terisi' },
    { id: '101B', room: 'Mawar (Kelas I)', patient: null, rm: '', bpjs: false, admissionDate: '', doctor: '', status: 'Kosong' },
    { id: '205A', room: 'Melati (VIP)', patient: 'Siti Aminah', rm: 'PSN0002', bpjs: false, admissionDate: '10 Jun 2026', doctor: 'Dr. Sarah, Sp.OG', status: 'Rencana Pulang' },
    { id: 'ICU-1', room: 'ICU', patient: 'Agus Setiawan', rm: 'PSN0003', bpjs: true, admissionDate: '11 Jun 2026', doctor: 'Dr. Herman, Sp.An', status: 'Kritis' },
  ],
  addInpatientBed: (b) => set(state => ({ inpatientBeds: [b, ...state.inpatientBeds] })),
  updateInpatientBedStatus: (id, status) => set(state => ({ inpatientBeds: state.inpatientBeds.map(b => b.id === id ? { ...b, status } : b) })),

  // Actions
  addPatient: async (patient) => {
    set((state) => ({ patients: [patient, ...state.patients] }));
    try {
      await setDoc(doc(db, "patients", patient.id), patient);
    } catch (e) {
      console.error(e);
    }
  },
  updatePatient: async (id, data) => {
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...data } : p,
      ),
    }));
    try {
      await updateDoc(doc(db, "patients", id), data);
    } catch (e) {
      console.error(e);
    }
  },
  deletePatient: async (id) => {
    set((state) => ({ patients: state.patients.filter((p) => p.id !== id) }));
    try {
      await deleteDoc(doc(db, "patients", id));
    } catch (e) {
      console.error(e);
    }
  },

  addQueue: async (patientId, nama) => {
    const state = useSRMStore.getState();
    const newNomor = state.queueToday.totalHariIni + 1;
    const newItem: QueueItem = {
      id: `Q${newNomor.toString().padStart(3, "0")}`,
      nomor: newNomor,
      patientId,
      nama,
      status: "Menunggu",
      waktuDaftar: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newQueueState = {
      ...state.queueToday,
      totalHariIni: state.queueToday.totalHariIni + 1,
      menunggu: state.queueToday.menunggu + 1,
      list: [...state.queueToday.list, newItem],
    };

    set({ queueToday: newQueueState });
    try {
      await setDoc(doc(db, "queues", state.queueToday.tanggal), newQueueState);
    } catch (e) {}
  },
  callNextQueue: async () => {
    const state = useSRMStore.getState();
    const current = state.queueToday.nextNumber;
    const next = current + 1;
    const updatedList = state.queueToday.list.map((q) => {
      if (q.nomor === state.queueToday.currentNumber)
        return { ...q, status: "Selesai" as const };
      if (q.nomor === current)
        return { ...q, status: "Sedang Diperiksa" as const };
      return q;
    });

    const newQueueState = {
      ...state.queueToday,
      currentNumber: current,
      nextNumber: next,
      menunggu: Math.max(0, state.queueToday.menunggu - 1),
      selesai: state.queueToday.selesai + 1,
      list: updatedList,
    };

    set({ queueToday: newQueueState });
    try {
      await setDoc(doc(db, "queues", state.queueToday.tanggal), newQueueState);
    } catch (e) {}
  },
  callQueueAgain: () => {
    console.log("Memanggil ulang antrian...");
  },
  skipQueue: async () => {
    const state = useSRMStore.getState();
    const current = state.queueToday.currentNumber;
    const next = state.queueToday.nextNumber;
    const updatedList = state.queueToday.list.map((q) => {
      if (q.nomor === current) return { ...q, status: "Dilewati" as const };
      if (q.nomor === next)
        return { ...q, status: "Sedang Diperiksa" as const };
      return q;
    });

    const newQueueState = {
      ...state.queueToday,
      currentNumber: next,
      nextNumber: next + 1,
      menunggu: Math.max(0, state.queueToday.menunggu - 1),
      list: updatedList,
    };

    set({ queueToday: newQueueState });
    try {
      await setDoc(doc(db, "queues", state.queueToday.tanggal), newQueueState);
    } catch (e) {}
  },
  resetQueue: async () => {
    const today = new Date().toISOString().split("T")[0];
    const newQueueState = {
      tanggal: today,
      currentNumber: 0,
      nextNumber: 1,
      totalHariIni: 0,
      menunggu: 0,
      selesai: 0,
      list: [],
    };
    set({ queueToday: newQueueState });
    try {
      await setDoc(doc(db, "queues", today), newQueueState);
    } catch (e) {}
  },

  addVisit: async (visit) => {
    set((state) => ({ visits: [visit, ...state.visits] }));
    try {
      await setDoc(doc(db, "visits", visit.id), visit);
    } catch (e) {
      console.error(e);
    }
  },
  updateVisit: async (id, data) => {
    set((state) => ({
      visits: state.visits.map((v) => (v.id === id ? { ...v, ...data } : v)),
    }));
    try {
      await updateDoc(doc(db, "visits", id), data);
    } catch (e) {
      console.error(e);
    }
  },

  // Actions - Doctors
  addDoctor: async (doctor) => {
    set((state) => ({ doctors: [doctor, ...state.doctors] }));
    try {
      await setDoc(doc(db, "doctors", doctor.id), doctor);
    } catch (e) {
      console.error(e);
    }
  },
  updateDoctor: async (id, data) => {
    set((state) => ({
      doctors: state.doctors.map((d) => (d.id === id ? { ...d, ...data } : d)),
    }));
    try {
      await updateDoc(doc(db, "doctors", id), data);
    } catch (e) {
      console.error(e);
    }
  },
  deleteDoctor: async (id) => {
    set((state) => ({ doctors: state.doctors.filter((d) => d.id !== id) }));
    try {
      await deleteDoc(doc(db, "doctors", id));
    } catch (e) {
      console.error(e);
    }
  },

  // Actions - Doctor Schedules
  addDoctorSchedule: (schedule) =>
    set((state) => ({
      doctorSchedules: [...state.doctorSchedules, schedule],
    })),
  updateDoctorSchedule: (id, data) =>
    set((state) => ({
      doctorSchedules: state.doctorSchedules.map((s) =>
        s.id === id ? { ...s, ...data } : s,
      ),
    })),
  deleteDoctorSchedule: (id) =>
    set((state) => ({
      doctorSchedules: state.doctorSchedules.filter((s) => s.id !== id),
    })),

  addOperator: async (operator) => {
    set((state) => ({ operators: [...state.operators, operator] }));
    try {
      await setDoc(doc(db, "operators", operator.id), operator);
    } catch (e) {
      console.error(e);
    }
  },
  updateOperator: async (id, data) => {
    set((state) => ({
      operators: state.operators.map((o) =>
        o.id === id ? { ...o, ...data } : o,
      ),
    }));
    try {
      await updateDoc(doc(db, "operators", id), data);
    } catch (e) {
      console.error(e);
    }
  },
  deleteOperator: async (id) => {
    set((state) => ({ operators: state.operators.filter((o) => o.id !== id) }));
    try {
      await deleteDoc(doc(db, "operators", id));
    } catch (e) {
      console.error(e);
    }
  },

  updateSettings: async (data) => {
    set((state) => ({ settings: { ...state.settings, ...data } }));
    const currentSettings = get().settings;
    try {
      await setDoc(doc(db, "settings", "global"), currentSettings);
    } catch (e) {
      console.error(e);
    }
  },
  updateIntegrationConfig: (type, data) =>
    set((state) => ({
      integrationConfig: {
        ...state.integrationConfig,
        [type]: { ...state.integrationConfig[type], ...data },
      },
    })),

  // Actions - Master Data
  addMasterData: async (type, data) => {
    const newId = `MD${Date.now()}`;
    const newRecord = { id: newId, ...data };

    set((state) => ({
      masterData: {
        ...state.masterData,
        [type]: [...(state.masterData[type] || []), newRecord],
      },
    }));

    const state = get();
    try {
      await setDoc(doc(db, "master_data", type), {
        records: state.masterData[type],
      });
    } catch (e) {
      console.error(e);
    }
  },
  updateMasterData: async (type, id, data) => {
    set((state) => {
      const typeData = state.masterData[type] || [];
      return {
        masterData: {
          ...state.masterData,
          [type]: typeData.map((item) =>
            item.id === id ? { ...item, ...data } : item,
          ),
        },
      };
    });

    const state = get();
    try {
      await setDoc(doc(db, "master_data", type), {
        records: state.masterData[type],
      });
    } catch (e) {
      console.error(e);
    }
  },
  deleteMasterData: async (type, id) => {
    set((state) => {
      const typeData = state.masterData[type] || [];
      return {
        masterData: {
          ...state.masterData,
          [type]: typeData.filter((item) => item.id !== id),
        },
      };
    });

    const state = get();
    try {
      await setDoc(doc(db, "master_data", type), {
        records: state.masterData[type],
      });
    } catch (e) {
      console.error(e);
    }
  },
}));
