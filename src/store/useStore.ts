
import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  activeSection: string;
  isMenuOpen: boolean;
  projectFilter: string;
  toggleDarkMode: () => void;
  setActiveSection: (section: string) => void;
  toggleMenu: () => void;
  setProjectFilter: (filter: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isDarkMode: false,
  activeSection: 'home',
  isMenuOpen: false,
  projectFilter: 'all',
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setActiveSection: (section) => set({ activeSection: section }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setProjectFilter: (filter) => set({ projectFilter: filter }),
}));
