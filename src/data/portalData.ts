export const ROLES = [
  { id: 'bph', name: 'BPH Rumah Sakit', level: 'puncak', permissions: ['all'] },
  { id: 'direktur', name: 'Direktur', level: 'puncak', permissions: ['all'] },
  { id: 'wadir_medis', name: 'Wakil Direktur Medis', level: 'puncak', permissions: ['manage_all', 'view_reports'] },
  { id: 'wadir_keuangan', name: 'Wakil Direktur Keuangan', level: 'puncak', permissions: ['manage_all', 'view_reports'] },
  { id: 'wadir_admin', name: 'Wakil Direktur Administrasi dan SDI', level: 'puncak', permissions: ['manage_all', 'view_reports'] },
  { id: 'kepala_igd', name: 'Kepala Instalasi Gawat Darurat', level: 'menengah', permissions: ['manage_team'] },
  { id: 'kasubag_pegawai', name: 'Kasubag Kepegawaian', level: 'menengah', permissions: ['manage_team', 'view_reports'] },
  { id: 'dokter_spesialis', name: 'Dokter Spesialis', level: 'operasional', permissions: ['basic'] },
  { id: 'perawat', name: 'Perawat', level: 'operasional', permissions: ['basic'] },
  { id: 'staf_admin', name: 'Staf Administrasi', level: 'operasional', permissions: ['basic'] }
];

export const EMPLOYEES = [
  { id: 'EMP-BPH', nip: '1000000001', name: 'Dr. H. Soetomo, Sp.OG', roleId: 'bph', jabatan: 'Ketua BPH', unit: 'Yayasan', level: 'puncak', statusKepegawaian: 'Tetap', kontak: '081200000001' },
  { id: 'EMP-DIR', nip: '198001012005011001', name: 'dr. Hj. Umi Aliyah, MARS', roleId: 'direktur', jabatan: 'Direktur Utama', unit: 'Direksi', level: 'puncak', statusKepegawaian: 'Tetap', kontak: '081234567890' },
  { id: 'EMP-WDM', nip: '198202022008021002', name: 'dr. Budi Santoso, M.Kes', roleId: 'wadir_medis', jabatan: 'Wakil Direktur Medis', unit: 'Direksi', level: 'puncak', statusKepegawaian: 'Tetap', kontak: '081234567891' },
  { id: 'EMP-WDK', nip: '198202022008021003', name: 'Siti Aminah, S.E., M.Ak', roleId: 'wadir_keuangan', jabatan: 'Wakil Direktur Keuangan', unit: 'Direksi', level: 'puncak', statusKepegawaian: 'Tetap', kontak: '081234567812' },
  { id: 'EMP-WDA', nip: '198202022008021004', name: 'Rahmat Hidayat, S.H., M.M.', roleId: 'wadir_admin', jabatan: 'Wadir Administrasi & SDI', unit: 'Direksi', level: 'puncak', statusKepegawaian: 'Tetap', kontak: '081234567813' },
  { id: 'EMP-IGD', nip: '198503032010032003', name: 'dr. Anton Pratama, Sp.EM', roleId: 'kepala_igd', jabatan: 'Kepala Instalasi IGD', unit: 'IGD', level: 'menengah', statusKepegawaian: 'Tetap', kontak: '081234567892' },
  { id: 'EMP-SDI', nip: '198703032010032005', name: 'Dewi Lestari, S.Psi', roleId: 'kasubag_pegawai', jabatan: 'Kasubag Kepegawaian', unit: 'HRD', level: 'menengah', statusKepegawaian: 'Tetap', kontak: '081234567895' },
  { id: 'EMP-NUR', nip: '199004042015042004', name: 'Rina Wati, A.Md.Kep.', roleId: 'perawat', jabatan: 'Perawat Pelaksana', unit: 'IGD', level: 'operasional', statusKepegawaian: 'Kontrak', kontak: '081234567893' },
  { id: 'EMP-IT', nip: '199205052018051005', name: 'Ahmad Fauzi, S.Kom.', roleId: 'staf_admin', jabatan: 'Staf IT & Data', unit: 'Pengolahan Data', level: 'operasional', statusKepegawaian: 'Tetap', kontak: '081234567894' },
  { id: 'EMP-FAR', nip: '199406062020061006', name: ' apt. Dina Mariana, S.Farm', roleId: 'apoteker', jabatan: 'Apoteker', unit: 'Instalasi Farmasi', level: 'operasional', statusKepegawaian: 'Tetap', kontak: '081234567896' },
  { id: 'EMP-LAB', nip: '199507072021071007', name: 'Joko Anwar, A.Md.AK', roleId: 'analis_lab', jabatan: 'Analis Laboratorium', unit: 'Laboratorium', level: 'operasional', statusKepegawaian: 'Kontrak', kontak: '081234567897' },
  { id: 'EMP-RAD', nip: '199608082022081008', name: 'Siti Nurhaliza, A.Md.Rad', roleId: 'radiografer', jabatan: 'Radiografer', unit: 'Radiologi', level: 'operasional', statusKepegawaian: 'Kontrak', kontak: '081234567898' },
  { id: 'EMP-GIZI', nip: '199309092019091009', name: 'Bambang Pamungkas, S.Gz', roleId: 'ahli_gizi', jabatan: 'Ahli Gizi', unit: 'Instalasi Gizi', level: 'operasional', statusKepegawaian: 'Tetap', kontak: '081234567899' },
  { id: 'EMP-BIDAN', nip: '199110102016101010', name: 'Tri Wahyuni, A.Md.Keb', roleId: 'paramedis', jabatan: 'Bidan Pelaksana', unit: 'Ponek/VK', level: 'operasional', statusKepegawaian: 'Tetap', kontak: '081234567800' },
  { id: 'EMP-DOKUM', nip: '198811112014111011', name: 'dr. Andi Firmansyah', roleId: 'dokter_umum', jabatan: 'Dokter Umum Jaga', unit: 'IGD', level: 'operasional', statusKepegawaian: 'Tetap', kontak: '081234567801' },
];

export const SHIFTS = [
  { id: 'SHF-001', employeeId: 'EMP-NUR', date: new Date().toISOString().split('T')[0], startTime: '07:00', endTime: '14:00', unit: 'IGD', roleDescription: 'Perawat Jaga Pagi IGD' },
  { id: 'SHF-002', employeeId: 'EMP-IT', date: new Date().toISOString().split('T')[0], startTime: '08:00', endTime: '16:00', unit: 'IT', roleDescription: 'Support IT Shift Pagi' },
];

export const ATTENDANCES = [
  { id: 'ATT-001', employeeId: 'EMP-NUR', date: new Date().toISOString().split('T')[0], checkInTime: '06:55', checkOutTime: '14:15', status: 'Hadir' },
];

export const OVERTIMES = [
  { id: 'OVT-001', employeeId: 'EMP-IT', date: '2026-03-15', hours: 2, reason: 'Maintenance Server SIMRS', status: 'Disetujui', approvedBy: 'EMP-WDA' },
  { id: 'OVT-002', employeeId: 'EMP-NUR', date: new Date().toISOString().split('T')[0], hours: 3, reason: 'Cover shift teman sakit', status: 'Menunggu', approvedBy: null },
];

export const NOTIFICATIONS = [
  { id: 'NOT-001', title: 'Jadwal Shift Diperbarui', body: 'Jadwal shift Anda untuk minggu depan telah diterbitkan.', createdAt: '2026-03-16T08:00:00Z', type: 'schedule' },
  { id: 'NOT-002', title: 'Pengumuman HRD', body: 'Pembaruan kebijakan cuti tahunan 2026.', createdAt: '2026-03-15T10:00:00Z', type: 'announcement' },
  { id: 'NOT-003', title: 'Lembur Disetujui', body: 'Pengajuan lembur Anda tanggal 15 Maret telah disetujui.', createdAt: '2026-03-16T14:30:00Z', type: 'overtime' },
];
