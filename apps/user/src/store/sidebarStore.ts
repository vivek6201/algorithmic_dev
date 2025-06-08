import { create } from 'zustand';

interface SidebarStore {
  openTutorialSidebar: boolean;
  setTutorialSidebar: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  openTutorialSidebar: false,
  setTutorialSidebar: (value) => set({ openTutorialSidebar: value }),
}));
