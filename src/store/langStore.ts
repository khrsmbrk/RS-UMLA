import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lang } from '../utils/translations';

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

import { createJSONStorage } from 'zustand/middleware';
import { secureLocalStorage } from '../utils/crypto';

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'ID',
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => secureLocalStorage),
    }
  )
);
