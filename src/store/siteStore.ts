import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  date: string;
  status: 'draft' | 'published';
}

interface SiteSettings {
  logoUrl: string;
  logoHomepage: string | null;
  logoPortalPasien: string | null;
  logoOffice: string | null;
  logoPendaftaran: string | null;
  heroImage: string;
  heroTitleId: string;
  heroTitleEn: string;
  heroSubtitleId: string;
  heroSubtitleEn: string;
  primaryColor: string;
}

interface SiteState {
  settings: SiteSettings;
  news: NewsArticle[];
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  addNews: (news: NewsArticle) => void;
  updateNews: (id: string, news: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;
}

import { createJSONStorage } from 'zustand/middleware';
import { secureLocalStorage } from '../utils/crypto';

export const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      settings: {
        logoUrl: '/logo-rsumla.png',
        logoHomepage: null,
        logoPortalPasien: null,
        logoOffice: null,
        logoPendaftaran: null,
        heroImage: 'https://picsum.photos/seed/hospital/1920/1080',
        heroTitleId: 'Melayani dengan Ilmu,\nMenyembuhkan dengan Hati.',
        heroTitleEn: 'Serving with Knowledge,\nHealing with Heart.',
        heroSubtitleId: 'Rumah Sakit Universitas Muhammadiyah Lamongan hadir memberikan layanan kesehatan paripurna, terintegrasi dengan pendidikan dan penelitian medis terkini.',
        heroSubtitleEn: 'Muhammadiyah Lamongan University Hospital is here to provide comprehensive healthcare services, integrated with the latest medical education and research.',
        primaryColor: 'emerald',
      },
      news: [],
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      addNews: (newsItem) => set((state) => ({ news: [...state.news, newsItem] })),
      updateNews: (id, updatedNews) => set((state) => ({
        news: state.news.map((item) => item.id === id ? { ...item, ...updatedNews } : item)
      })),
      deleteNews: (id) => set((state) => ({ news: state.news.filter((item) => item.id !== id) })),
    }),
    {
      name: 'site-settings-v3',
      storage: createJSONStorage(() => secureLocalStorage),
    }
  )
);
