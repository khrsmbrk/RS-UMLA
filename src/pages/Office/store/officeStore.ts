import { create } from "zustand";
import { secureLocalStorage } from "../../../utils/crypto";

interface OfficeState {
  userRole: string | null;
  currentUser: any | null;
  login: (role: string, user?: any) => void;
  logout: () => void;

  // Data for Features
  tickets: any[];
  disposisi: any[];
  notaDinas: any[];
  leaveRequests: any[];
  assets: any[];
  pos: any[];
  incidents: any[];
  shifts: any[];
  audits: any[];
  roomBookings: any[];
  patrols: any[];
  contracts: any[];
  fleet: any[];

  addTicket: (ticket: any) => void;
  updateTicketStatus: (id: string, status: string, tech?: string) => void;
  addDisposisi: (disposisi: any) => void;
  addNotaDinas: (nota: any) => void;
  addLeaveRequest: (req: any) => void;
  updateLeaveRequestStatus: (id: string, status: string) => void;
  addAsset: (asset: any) => void;
  addPO: (po: any) => void;
  updatePOStatus: (id: string, status: string) => void;
  addIncident: (incident: any) => void;
  addShift: (shift: any) => void;
  addAudit: (audit: any) => void;
  addRoomBooking: (booking: any) => void;
  addPatrol: (patrol: any) => void;
  addContract: (contract: any) => void;
  addFleet: (fleet: any) => void;
  cssdMachines: any[];
  addCssdMachine: (machine: any) => void;
  updateCssdMachineStatus: (id: string, status: string) => void;
  cssdBatches: any[];
  addCssdBatch: (batch: any) => void;
  updateCssdBatchStatus: (id: string, status: string) => void;
  dietOrders: any[];
  addDietOrder: (order: any) => void;
  updateDietOrderStatus: (id: string, status: string) => void;
  daycareKids: any[];
  addDaycareKid: (kid: any) => void;
  updateDaycareKidStatus: (id: string, status: string) => void;
  spiritualSchedules: any[];
  addSpiritualSchedule: (schedule: any) => void;
  updateSpiritualScheduleStatus: (id: string, status: string) => void;
  pkrsCampaigns: any[];
  addPkrsCampaign: (campaign: any) => void;
  updatePkrsCampaignStatus: (id: string, status: string) => void;
}

export const useOfficeStore = create<OfficeState>((set) => ({
  userRole: secureLocalStorage.getItem("office_role") || null,
  currentUser: JSON.parse(secureLocalStorage.getItem("office_user") || "null"),
  login: (role, user) => {
    secureLocalStorage.setItem("office_role", role);
    if (user) {
      secureLocalStorage.setItem("office_user", JSON.stringify(user));
    }
    set({ userRole: role, currentUser: user || null });
  },
  logout: () => {
    secureLocalStorage.removeItem("office_role");
    secureLocalStorage.removeItem("office_user");
    set({ userRole: null, currentUser: null });
  },

  tickets: [
    { id: "IT-2601", unit: "Poli Gigi", issue: "Printer Label Rekam Medis Macet", priority: "Tinggi", status: "Sedang Dikerjakan", tech: "Andri" },
    { id: "IT-2602", unit: "Kasir Rawat Inap", issue: "PC Lemot / Sering Freeze", priority: "Sedang", status: "Open", tech: "Belum Ditugaskan" },
    { id: "IT-2603", unit: "IGD", issue: "Koneksi LAN Putus", priority: "Kritis", status: "Menunggu Sparepart", tech: "Budi" },
    { id: "TKT-2605-01", req: "Ns. Siti", unit: "IGD", desc: "Lampu Tindakan Putus", priority: "High", status: "Pending", date: "2 Hours Ago", color: "text-amber-600 bg-amber-50" },
  ],
  disposisi: [
    {
      id: "1",
      title: "Undangan Kemenkes",
      status: "pending",
      date: "2026-05-20",
      sender: "Kemenkes RI",
    },
  ],
  notaDinas: [],
  
  leaveRequests: [
    {
      id: "1",
      userId: "KARYAWAN-001",
      userName: "Dr. Budi Santoso",
      submittedDate: "10 Apr 2026",
      type: "Cuti Tahunan",
      duration: "12 Apr - 14 Apr 2026",
      days: 3,
      reason: "Acara keluarga di luar kota",
      status: "Disetujui",
    },
     {
      id: "2",
      userId: "KARYAWAN-001",
      userName: "Dr. Budi Santoso",
      submittedDate: "2 Feb 2026",
      type: "Izin Sakit",
      duration: "2 Feb - 3 Feb 2026",
      days: 2,
      reason: "Demam (Surat Dokter Tertaut)",
      status: "Disetujui",
    },
  ],

  assets: [
    { id: "MED-MRI-01", name: "MRI Scanner Philips 1.5T", loc: "Instalasi Radiologi", category: "Medical", lastPM: "10 Apr 2026", status: "Active" },
    { id: "IT-SRV-02", name: "Server HIS Utama (Dell)", loc: "Ruang Server Lt. 3", category: "IT", lastPM: "01 May 2026", status: "Active" },
    { id: "MED-XRY-04", name: "Mobile X-Ray GE", loc: "IGD", category: "Medical", lastPM: "15 Jan 2026", status: "Maintenance" },
    { id: "FAC-GEN-01", name: "Genset Caterpillar 500kVA", loc: "Gedung Utilitas", category: "Facility", lastPM: "20 May 2026", status: "Active" },
  ],
  pos: [
    { id: "PO-2605-01", vendor: "PT. Mensa Binasukses", items: "Obat-obatan Injeksi", total: "Rp 45.000.000", status: "Approved", date: "24 May 2026", color: "text-emerald-600 bg-emerald-50" },
    { id: "PO-2605-02", vendor: "PT. Global Medika", items: "Alkes Habis Pakai", total: "Rp 12.500.000", status: "Pending", date: "25 May 2026", color: "text-amber-600 bg-amber-50" },
  ],
  incidents: [
    { id: "INC-26001", date: "10 Mei 2026", unit: "Farmasi Rawat Jalan", loc: "Loket Penyerahan", type: "KNC", risk: "Low", desc: "Kesalahan identifikasi obat namun disadari perawat sebelum diberikan", status: "Investigasi" },
    { id: "INC-26002", date: "12 Mei 2026", unit: "Kamar Bersalin", loc: "Ruang VK 2", type: "KTD", risk: "High", desc: "Pasien jatuh dari tempat tidur (bed rail tidak dinaikkan max)", status: "CAPA" },
  ],
  shifts: [
    { id: "SHF-01", employee: "Ns. Siti", unit: "IGD", date: "15 Jun 2026", shiftStr: "Pagi (07:00 - 14:00)", status: "Completed" }
  ],
  audits: [
    { id: "AUD-01", type: "Kepatuhan Hand Hygiene", unit: "ICU", date: "10 Jun 2026", auditor: "Tim PPI", score: 85, status: "Done" }
  ],
  roomBookings: [
    { id: "RB-01", room: "Ruang Rapat Direksi", date: "14 Jun 2026", time: "09:00 - 11:00", purpose: "Rapat Koordinasi", status: "Approved" }
  ],
  patrols: [
    { id: "PTR-01", area: "Gedung A Lt. 1", date: "12 Jun 2026", time: "08:00", officer: "Security Joko", status: "Aman", notes: "" }
  ],
  contracts: [
    { id: "CTR-01", vendor: "PT. Medika Bersama", type: "Farmasi", startDate: "01 Jan 2026", endDate: "31 Des 2026", status: "Active" }
  ],
  fleet: [
    { id: "AMB-01", plate: "B 1234 KAA", type: "Ambulance Gawat Darurat", driver: "Budi", status: "Tersedia" }
  ],
  cssdMachines: [
     { id: "A-01", machine: "Autoclave A-01", temp: "134°C", time: "15 Menit", status: "Running", progress: "45%" },
     { id: "A-02", machine: "Autoclave A-02", temp: "121°C", time: "30 Menit", status: "Standby", progress: "0%" },
     { id: "W-01", machine: "Washer Disinfector", temp: "90°C", time: "10 Menit", status: "Running", progress: "12%" }
  ],
  cssdBatches: [
      { id: "SET-BD-09", from: "Instalasi Bedah Sentral", type: "Set Mayor Bedah Umum" },
      { id: "SET-IGD-02", from: "IGD", type: "Set Hecting" },
      { id: "SET-POLI-01", from: "Poli Gigi", type: "Set Ekstraksi" },
  ],
  dietOrders: [
      { id: "D001", room: "Mawar 01 (VIP)", name: "Tn. Budi Santoso", diet: "Rendah Garam, DM", allergy: "Seafood", status: "Persiapan" },
      { id: "D002", room: "Melati 04", name: "Ny. Siti Aminah", diet: "Lunak", allergy: "-", status: "Diantar" },
      { id: "D003", room: "ICU Bed 2", name: "Tn. Ahmad", diet: "Cair / Sonde", allergy: "-", status: "Selesai" },
      { id: "D004", room: "Anggrek 11", name: "An. Bintang", diet: "Biasa", allergy: "Susu Sapi", status: "Persiapan" },
  ],
  daycareKids: [
    { id: "KID-1", name: "Aluna Maharani", age: "3 Tahun", parent: "dr. Siska, Sp.A", dropTime: "07:15 WIB", pickupTime: "Belum", status: "Hadir" },
    { id: "KID-2", name: "Bagas Pratama", age: "4 Tahun", parent: "Ns. Eka", dropTime: "07:30 WIB", pickupTime: "16:00 WIB", status: "Pulang" },
    { id: "KID-3", name: "Celine", age: "2.5 Tahun", parent: "Andi (IT)", dropTime: "-", pickupTime: "-", status: "Izin" },
    { id: "KID-4", name: "Daffa Wijaya", age: "5 Tahun", parent: "dr. Budi, Sp.PD", dropTime: "08:10 WIB", pickupTime: "Belum", status: "Hadir" },
  ],
  spiritualSchedules: [
    { id: "BIN-012", ward: "Ruang ICU", patient: "Tn. Surya (Bad 04)", counselor: "Ust. Fathurrahman", time: "10:00", type: "Bimbingan Doa", status: "Terjadwal" },
    { id: "BIN-013", ward: "Ruang Isolasi", patient: "Ny. Fatimah", counselor: "Pdt. Simon", time: "11:30", type: "Konseling Keluarga", status: "Selesai" },
    { id: "BIN-014", ward: "Ruang Anak (Melati)", patient: "Keluarga An. Kevin", counselor: "Romo Johannes", time: "13:00", type: "Dukungan Moral", status: "Terjadwal" },
    { id: "BIN-015", ward: "Ruang Palliative", patient: "Tn. Agus P.", counselor: "Ustzh. Aisyah", time: "15:00", type: "Pendampingan Pasien", status: "Menunggu" },
  ],
  pkrsCampaigns: [
    { id: "PKRS-1", title: "Edukasi Cuci Tangan WHO", type: "Poster & Video", date: "June 2026", status: "Aktif", loc: "IGD & Rawat Jalan" },
    { id: "PKRS-2", title: "Pencegahan Diabetes Melitus", type: "Penyuluhan", date: "15 Jun 2026", status: "Terjadwal", loc: "Ruang Tunggu Poli Penyakit Dalam" },
    { id: "PKRS-3", title: "Senam Jantung Sehat", type: "Kegiatan Massa", date: "Setiap Jumat", status: "Aktif", loc: "Halaman Parkir Depan" },
    { id: "PKRS-4", title: "Materi Edukasi Stunting", type: "Brosur", date: "May 2026", status: "Selesai", loc: "Poli Anak & Obgyn" },
  ],

  addTicket: (ticket) => set((state) => ({ tickets: [ticket, ...state.tickets] })),
  updateTicketStatus: (id, status, tech) => set((state) => ({
    tickets: state.tickets.map(t => t.id === id ? { ...t, status, tech: tech || t.tech } : t)
  })),
  addDisposisi: (disp) => set((state) => ({ disposisi: [disp, ...state.disposisi] })),
  addNotaDinas: (nota) => set((state) => ({ notaDinas: [nota, ...state.notaDinas] })),
  addLeaveRequest: (req) => set((state) => ({ leaveRequests: [req, ...state.leaveRequests] })),
  updateLeaveRequestStatus: (id, status) => set((state) => ({
       leaveRequests: state.leaveRequests.map(r => r.id === id ? { ...r, status } : r)
  })),
  addAsset: (asset) => set((state) => ({ assets: [asset, ...state.assets] })),
  addPO: (po) => set((state) => ({ pos: [po, ...state.pos] })),
  updatePOStatus: (id, status) => set((state) => ({ pos: state.pos.map(p => p.id === id ? { ...p, status } : p) })),
  addIncident: (inc) => set((state) => ({ incidents: [inc, ...state.incidents] })),
  addShift: (shift) => set((state) => ({ shifts: [shift, ...state.shifts] })),
  addAudit: (audit) => set((state) => ({ audits: [audit, ...state.audits] })),
  addRoomBooking: (booking) => set((state) => ({ roomBookings: [booking, ...state.roomBookings] })),
  addPatrol: (patrol) => set((state) => ({ patrols: [patrol, ...state.patrols] })),
  addContract: (contract) => set((state) => ({ contracts: [contract, ...state.contracts] })),
  addFleet: (f) => set((state) => ({ fleet: [f, ...state.fleet] })),
  addCssdMachine: (m) => set((state) => ({ cssdMachines: [m, ...state.cssdMachines] })),
  updateCssdMachineStatus: (id, status) => set((state) => ({ cssdMachines: state.cssdMachines.map(m => m.id === id ? { ...m, status } : m) })),
  addCssdBatch: (b) => set((state) => ({ cssdBatches: [b, ...state.cssdBatches] })),
  updateCssdBatchStatus: (id, status) => set((state) => ({ cssdBatches: state.cssdBatches.map(b => b.id === id ? { ...b, status } : b) })),
  addDietOrder: (o) => set((state) => ({ dietOrders: [o, ...state.dietOrders] })),
  updateDietOrderStatus: (id, status) => set((state) => ({ dietOrders: state.dietOrders.map(o => o.id === id ? { ...o, status } : o) })),
  addDaycareKid: (k) => set((state) => ({ daycareKids: [k, ...state.daycareKids] })),
  updateDaycareKidStatus: (id, status) => set((state) => ({ daycareKids: state.daycareKids.map(k => k.id === id ? { ...k, status } : k) })),
  addSpiritualSchedule: (s) => set((state) => ({ spiritualSchedules: [s, ...state.spiritualSchedules] })),
  updateSpiritualScheduleStatus: (id, status) => set((state) => ({ spiritualSchedules: state.spiritualSchedules.map(s => s.id === id ? { ...s, status } : s) })),
  addPkrsCampaign: (c) => set((state) => ({ pkrsCampaigns: [c, ...state.pkrsCampaigns] })),
  updatePkrsCampaignStatus: (id, status) => set((state) => ({ pkrsCampaigns: state.pkrsCampaigns.map(c => c.id === id ? { ...c, status } : c) }))
}));
