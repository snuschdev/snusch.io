import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  toggle: () => void;
  set: (mode: ThemeMode) => void;
}

const getInitial = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem('theme-mode') as ThemeMode | null;
  if (saved === 'light' || saved === 'dark') return saved;
  // prefer system
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: getInitial(),
  toggle: () => {
    const next: ThemeMode = get().mode === 'light' ? 'dark' : 'light';
    set({ mode: next });
    if (typeof window !== 'undefined') window.localStorage.setItem('theme-mode', next);
  },
  set: (mode) => {
    set({ mode });
    if (typeof window !== 'undefined') window.localStorage.setItem('theme-mode', mode);
  },
}));
