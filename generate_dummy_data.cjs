const fs = require('fs');
const path = require('path');

function generateNIK() {
  return "3524" + Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

function generateName() {
  const firsts = ["Budi", "Siti", "Ahmad", "Nur", "Andi", "Dewi", "Rudi", "Ratna", "Agus", "Sri", "Hadi", "Eka", "Dwi", "Tri", "Putra", "Putri", "Wayan", "Made", "Nyoman", "Ketut"];
  const lasts = ["Santoso", "Aminah", "Rahman", "Wati", "Pratama", "Lestari", "Setiawan", "Sari", "Purnomo", "Indah", "Kurniawan", "Astuti", "Saputra", "Ayu", "Wijaya", "Kusuma", "Baskoro", "Ardiansyah"];
  return firsts[Math.floor(Math.random() * firsts.length)] + " " + lasts[Math.floor(Math.random() * lasts.length)];
}

const cities = ["Surabaya", "Jakarta", "Bandung", "Semarang", "Malang", "Sidoarjo", "Gresik", "Lamongan", "Bojonegoro", "Tuban"];

function generateDate(startProps, endProps) {
  const start = new Date(startProps).getTime();
  const end = new Date(endProps).getTime();
  return new Date(start + Math.random() * (end - start)).toISOString().split('T')[0];
}

const patients = [];
for (let i = 1; i <= 25; i++) {
  patients.push({
    id: `PSN${i.toString().padStart(4, '0')}`,
    nik: generateNIK(),
    namaLengkap: generateName(),
    pekerjaan: "Wiraswasta",
    kotaLahir: cities[Math.floor(Math.random() * cities.length)],
    tanggalLahir: generateDate("1970-01-01", "2010-01-01"),
    jenisKelamin: Math.random() > 0.5 ? "L" : "P",
    statusPernikahan: Math.random() > 0.2 ? "Menikah" : "Belum Menikah",
    riwayatAlergi: Math.random() > 0.8 ? "Amoxicillin" : "Tidak Ada",
    tanggalRegistrasi: generateDate("2026-01-01", "2026-05-01"),
    jumlahKunjungan: Math.floor(Math.random() * 5) + 1
  });
}

const docs = ["Dr. Ali", "Dr. Budi", "Dr. Citra", "Dr. Dian", "Dr. Eka", "Dr. Fajar", "Dr. Gita", "Dr. Hadi", "Dr. Ina", "Dr. Joko", "Dr. Kiki", "Dr. Lina", "Dr. Maya", "Dr. Nina", "Dr. Oki", "Dr. Rika", "Dr. Siska", "Dr. Tono", "Dr. Umar", "Dr. Vina"];
const specs = ["Penyakit Dalam", "Anak", "Kandungan", "Saraf", "Mata"];

const doctors = [];
for (let i = 1; i <= 20; i++) {
  doctors.push({
    id: `DR${i.toString().padStart(3, '0')}`,
    nama: docs[i-1] + ", Sp." + (Math.random()>0.5?"A":"PD"),
    spesialisasi: specs[Math.floor((i-1)%5)]
  });
}

const schedules = [];
for (let i = 1; i <= 25; i++) {
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][Math.floor(Math.random() * 6)];
  schedules.push({
    id: `SCH${i.toString().padStart(3, '0')}`,
    doctorId: `DR${(Math.floor(Math.random() * 20)+1).toString().padStart(3, '0')}`,
    hari: hari,
    jamMulai: "08:00",
    jamSelesai: "12:00"
  });
}

const queues = [];
for(let i = 1; i <= 20; i++) {
  const stat = i < 5 ? "Selesai" : i === 5 ? "Sedang Diperiksa" : "Menunggu";
  queues.push({
    id: `Q${i.toString().padStart(3, '0')}`,
    nomor: i,
    patientId: `PSN${(Math.floor(Math.random() * 25)+1).toString().padStart(4, '0')}`,
    nama: generateName(),
    status: stat,
    waktuDaftar: "08:" + (i*2).toString().padStart(2, '0')
  });
}
const queueState = {
  tanggal: new Date().toISOString().split('T')[0],
  currentNumber: 5,
  nextNumber: 6,
  totalHariIni: 20,
  menunggu: 15,
  selesai: 4,
  list: queues
};

const visits = [];
for(let i=1; i<=25; i++) {
  visits.push({
    id: `VST-20260318-${i.toString().padStart(3, '0')}`,
    patientId: `PSN${(Math.floor(Math.random() * 25)+1).toString().padStart(4, '0')}`,
    tanggalKunjungan: new Date().toISOString(),
    dokterId: `DR${(Math.floor(Math.random() * 20)+1).toString().padStart(3, '0')}`,
    operatorId: "OP001",
    anamnesa: "Demam dan Pusing",
    pemeriksaanFisik: "TD: 120/80",
    pemeriksaanPenunjang: "-",
    diagnosis: "ISPA",
    terapi: "Paracetamol",
    tindakan: "Konsultasi",
    status: "Diperiksa",
    totalBiaya: 150000
  });
}

const patientsStr = `const initialPatients: Patient[] = ${JSON.stringify(patients, null, 2)};`;
const doctorsStr = `const initialDoctors: Doctor[] = ${JSON.stringify(doctors, null, 2)};`;
const schedulesStr = `const initialDoctorSchedules: DoctorSchedule[] = ${JSON.stringify(schedules, null, 2)};`;
const queueStateStr = `const initialQueue: QueueState = ${JSON.stringify(queueState, null, 2)};`;
const visitsStr = `const initialVisits: Visit[] = ${JSON.stringify(visits, null, 2)};`;

const targetFile = path.join(__dirname, 'src/store/srmStore.ts');
let fileContent = fs.readFileSync(targetFile, 'utf8');

fileContent = fileContent.replace(/const initialPatients(?:(?!const initialDoctors)[\s\S])*?(?=const initialDoctors)/g, patientsStr + '\n\n');
fileContent = fileContent.replace(/const initialDoctors(?:(?!const initialDoctorSchedules)[\s\S])*?(?=const initialDoctorSchedules)/g, doctorsStr + '\n\n');
fileContent = fileContent.replace(/const initialDoctorSchedules(?:(?!const initialQueue)[\s\S])*?(?=const initialQueue)/g, schedulesStr + '\n\n');
fileContent = fileContent.replace(/const initialQueue(?:(?!const initialVisits)[\s\S])*?(?=const initialVisits)/g, queueStateStr + '\n\n');
fileContent = fileContent.replace(/const initialVisits(?:(?!const getInitialVersion)[\s\S])*?(?=const getInitialVersion)/g, visitsStr + '\n\n');

fs.writeFileSync(targetFile, fileContent);
console.log('Dummy data injected');
