import { Education, Experience, Project } from '@repo/db';
import { create } from 'zustand';

type ProfileStore = {
  education: Education | null;
  setEducationForm: (data: Education | null) => void;
  project: Project | null;
  setProjectForm: (data: Project | null) => void;
  experience: Experience | null;
  setExperience: (data: Experience | null) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  education: null,
  experience: null,
  project: null,
  setEducationForm: (data) => set({ education: data }),
  setExperience: (data) => set({ experience: data }),
  setProjectForm: (data) => set({ project: data }),
}));
