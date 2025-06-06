import { create } from 'zustand';

type Tab = {
  id: string;
  label: string;
};

type FilterStore = {
  tabs: Tab[];
  activeTab: Tab | null;
  setTabs: (tabs: Tab[]) => void;
  setActiveTab: (tab: Tab) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  tabs: [],
  activeTab: null,
  setTabs: (tabs) => set({ tabs }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
