import { create } from 'zustand';

interface UtilityStore {
  openTutorialSidebar: boolean;
  openAuthModal: boolean;
  setTutorialSidebar: (value: boolean) => void;
  setAuthModel: (value: boolean) => void;
  isLoginMode: boolean;
  setIsLoginMode: (value: boolean) => void;
  openFeedbackModal: boolean;
  setOpenFeedbackModal: (value: boolean) => void;
}

export const useUtilityStore = create<UtilityStore>((set) => ({
  openTutorialSidebar: false,
  setTutorialSidebar: (value) => set({ openTutorialSidebar: value }),
  openAuthModal: false,
  setAuthModel: (value) => set({ openAuthModal: value }),
  isLoginMode: true,
  setIsLoginMode: (value) => set({ isLoginMode: value }),
  openFeedbackModal: false,
  setOpenFeedbackModal: (value) => set({ openFeedbackModal: value }),
}));
