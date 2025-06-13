import { queryClient } from '@/components/shared/provider';
import { CombinedProfile } from '@/types/main';
import { Bookmark } from '@repo/db';
import { create } from 'zustand';

interface UserStore {
  profileData?: CombinedProfile;
  bookmarks: Bookmark[];
  setProfile: (data: CombinedProfile) => void;
  setBookmarks: (data: Bookmark[]) => void;
  clearUserData: () => void;
  isBookmarked: (type: 'blog' | 'job', id: string) => boolean;
  refetchProfile: () => Promise<void>;
  refetchBookmarks: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  profileData: undefined,
  bookmarks: [],

  setProfile: (data) => set({ profileData: data }),
  setBookmarks: (data) => set({ bookmarks: data }),
  clearUserData: () => set({ profileData: undefined, bookmarks: [] }),

  isBookmarked: (type, id) => {
    const key = `${type}Id` as keyof Bookmark;
    return get().bookmarks.some((b) => b[key] === id);
  },

  refetchProfile: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  refetchBookmarks: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
}));
