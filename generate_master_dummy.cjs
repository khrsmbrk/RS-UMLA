const fs = require('fs');
const path = require('path');

const generateData = () => {
  const masterData = {
    'pemeriksaan-fisik': Array.from({ length: 20 }, (_, i) => ({
      id: `PF${i+1}`,
      'Nama Pemeriksaan': [
        'Tekanan Darah', 'Suhu Tubuh', 'Nadi', 'Pernapasan', 'Berat Badan', 'Tinggi Badan', 
        'Lingkar Kepala', 'Pemeriksaan Mata', 'Pemeriksaan THT', 'Pemeriksaan Gigi', 
        'Pemeriksaan Leher', 'Pemeriksaan Dada', 'Pemeriksaan Jantung', 'Pemeriksaan Paru',
        'Pemeriksaan Abdomen', 'Pemeriksaan Ekstremitas', 'Refleks Fisiologis', 'Refleks Patologis',
        'GCS', 'Saturasi Oksigen'
      ][i],
      'Kategori': ['Tanda Vital', 'Umum', 'Khusus'][(i % 3)]
    })),
    'pemeriksaan-penunjang': Array.from({ length: 20 }, (_, i) => ({
      id: `PP${i+1}`,
      'Nama Pemeriksaan': [
        'Darah Lengkap', 'Urine Rutin', 'Feses Rutin', 'Gula Darah Puasa', 'Kolesterol Total',
        'Asam Urat', 'SGOT', 'SGPT', 'Ureum', 'Kreatinin',
        'Radiologi (X-Ray)', 'USG Abdomen', 'EKG', 'CT Scan', 'MRI',
        'Widal', 'Dengue NS1', 'Tes Kehamilan', 'Golongan Darah', 'HbA1c'
      ][i],
      'Jenis': ['Laboratorium', 'Radiologi', 'Lainnya'][(i % 3)]
    })),
    'diagnosis': Array.from({ length: 20 }, (_, i) => ({
      id: `DG${i+1}`,
      'Kode ICD': `A0${i % 10}.${i % 5}`,
      'Nama Penyakit': [
        'Kolera', 'Demam Tifoid', 'Shigellosis', 'Botulisme', 'Tuberkulosis',
        'Malaria', 'Dengue Fever', 'Chikungunya', 'Zika', 'Leptospirosis',
        'Tetanus', 'Difteri', 'Pertusis', 'Polio', 'Campak',
        'Rubella', 'Mumps', 'Varisela', 'Herpes Zoster', 'COVID-19'
      ][i]
    })),
    'terapi': Array.from({ length: 20 }, (_, i) => ({
      id: `TR${i+1}`,
      'Nama Terapi': [
        'Rehidrasi Oral', 'Oksigenasi', 'Fisioterapi Dada', 'Nebulisasi', 'Transfusi Darah',
        'Cuci Darah', 'Konseling Gizi', 'Rehabilitasi Medik', 'Radioterapi', 'Kemoterapi',
        'Terapi Bermain', 'Terapi Wicara', 'Terapi Okupasi', 'Psikoterapi', 'Akupuntur',
        'Pijat Bayi', 'Fototerapi', 'Kompres Hangat', 'Perawatan Luka', 'Edukasi Kesehatan'
      ][i],
      'Kategori': ['Suportif', 'Kuratif', 'Rehabilitatif'][(i % 3)]
    })),
    'tindakan': Array.from({ length: 20 }, (_, i) => ({
      id: `TD${i+1}`,
      'Kode Tindakan': `TND-${(i+1).toString().padStart(3, '0')}`,
      'Nama Tindakan': [
        'Konsultasi Dokter Umum', 'Jahit Luka Kecil', 'Cabut Gigi', 'Pemasangan Infus', 'Injeksi IM/IV',
        'Sirkumsisi', 'Nebulizer', 'Pemasangan Kateter', 'Rawat Luka Sedang', 'EKG',
        'USG Kehamilan', 'Konsultasi Spesialis Anak', 'Konsultasi Spesialis Penyakit Dalam', 'Cabut Kuku', 'Pemasangan NGT',
        'Ekstraksi Benda Asing', 'Insisi Abses', 'Spirometri', 'Tindakan Gigi - Tambal', 'Konseling Psikologi'
      ][i],
      'Tarif': (Math.floor(Math.random() * 20)+5) * 10000
    })),
    'obat': Array.from({ length: 20 }, (_, i) => ({
      id: `OB${i+1}`,
      'Kode Obat': `OBT-${(i+1).toString().padStart(3, '0')}`,
      'Nama Obat': [
        'Paracetamol 500mg', 'Amoxicillin 500mg', 'Cefadroxil 500mg', 'Ibuprofen 400mg', 'Antasida Doen',
        'Omeprazole 20mg', 'Lansoprazole 30mg', 'Captopril 25mg', 'Amlodipine 5mg', 'Amlodipine 10mg',
        'Metformin 500mg', 'Glibenclamide 5mg', 'Salbutamol 2mg', 'Cetirizine 10mg', 'Loratadine 10mg',
        'Dexamethasone 0.5mg', 'Vitamin C 50mg', 'Vitamin B Complex', 'Asam Mefenamat 500mg', 'Domperidone 10mg'
      ][i],
      'Stok': Math.floor(Math.random() * 100) + 10,
      'Harga': (Math.floor(Math.random() * 10) + 1) * 1500
    })),
    'template-diagnosis': Array.from({ length: 20 }, (_, i) => ({
      id: `TMP${i+1}`,
      'Nama Template': `Template ${[
        'ISPA', 'Dispepsia', 'Diare', 'Hipertensi', 'Thypoid', 
        'Myalgia', 'Dermatitis', 'Asma', 'Faringitis', 'Vertigo',
        'Tonsilitis', 'Anemia', 'Gastritis', 'Tinea', 'Konjungtivitis',
        'Caries Gigi', 'Scabies', 'Gizi Kurang', 'Diabetes Mellitus', 'Rhinitis'
      ][i]}`,
      'Isi Template': `Pasien datang dengan keluhan khas. Tanda vital dalam batas normal kecuali disebutkan lain. Pemeriksaan fisik mendukung diagnosis.`
    }))
  };
  return masterData;
};

const masterDataObj = generateData();
const masterDataStr = `const initialMasterData: MasterDataState = ${JSON.stringify(masterDataObj, null, 2)};`;

const targetFile = path.join(__dirname, 'src/store/srmStore.ts');
let fileContent = fs.readFileSync(targetFile, 'utf8');

if (!fileContent.includes('const initialMasterData')) {
  fileContent = fileContent.replace(/export const useSRMStore = create/, masterDataStr + '\n\nexport const useSRMStore = create');
}

fileContent = fileContent.replace(/masterData:\s*\{[^}]*\},?|masterData:\s*\{\},|masterData:\s*initialMasterData,?/g, 'masterData: initialMasterData,');

fs.writeFileSync(targetFile, fileContent);
console.log('Dummy master data injected');
