import { create } from 'zustand';

interface Overtime {
  id: string;
  date: string;
  hours: number;
  reason: string;
  status: string;
  approvedBy: string | null;
}

interface HRState {
  overtimes: Overtime[];
  addOvertime: (overtime: Overtime) => void;
}

export const useHRStore = create<HRState>((set) => ({
  overtimes: [
    {
      id: "OVT-20260601",
      date: "2026-06-01",
      hours: 3,
      reason: "Penyelesaian laporan bulanan unit Rekam Medis",
      status: "Disetujui",
      approvedBy: "Dr. Andi Setiawan",
    },
    {
      id: "OVT-20260520",
      date: "2026-05-20",
      hours: 2,
      reason: "Bantuan shift malam UGD (Darurat)",
      status: "Disetujui",
      approvedBy: "Kepala Ruangan UGD",
    },
    {
      id: "OVT-20260608",
      date: "2026-06-08",
      hours: 4,
      reason: "Backup sistem IT rutin",
      status: "Menunggu",
      approvedBy: null,
    },
  ],
  addOvertime: (overtime) => set((state) => ({ overtimes: [overtime, ...state.overtimes] })),
}));
