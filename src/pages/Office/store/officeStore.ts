import { create } from 'zustand';

interface OfficeState {
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
  
  // Data for Features
  tickets: any[];
  disposisi: any[];
  notaDinas: any[];
  
  addTicket: (ticket: any) => void;
  addDisposisi: (disposisi: any) => void;
  addNotaDinas: (nota: any) => void;
}

export const useOfficeStore = create<OfficeState>((set) => ({
  userRole: localStorage.getItem('office_role') || null,
  login: (role) => {
    localStorage.setItem('office_role', role);
    set({ userRole: role });
  },
  logout: () => {
    localStorage.removeItem('office_role');
    set({ userRole: null });
  },
  
  tickets: [],
  disposisi: [
    { id: '1', title: 'Undangan Kemenkes', status: 'pending', date: '2026-05-20', sender: 'Kemenkes RI' }
  ],
  notaDinas: [],
  
  addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
  addDisposisi: (disp) => set((state) => ({ disposisi: [...state.disposisi, disp] })),
  addNotaDinas: (nota) => set((state) => ({ notaDinas: [...state.notaDinas, nota] })),
}));
