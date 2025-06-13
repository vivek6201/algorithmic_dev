import { create } from 'zustand';

type Bookmark = {
  id: string;
  blogId?: string;
  jobId?: string;
};

type BookmarkStore = {
  bookmarks: Bookmark[];
  setBookmarks: (bookmarks: Bookmark[]) => void;
  isBookmarked: (type: 'blog' | 'job', id: string) => boolean;
};

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),
  isBookmarked: (type, id) =>
    get().bookmarks.some((bm) => (type === 'blog' ? bm.blogId === id : bm.jobId === id)),
}));
