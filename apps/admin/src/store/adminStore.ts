import { Admin } from '@repo/db';
import { create } from 'zustand';

type AdminState = {
  admins: Admin[] | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
};

export const useAdminStore = create<AdminState>((set) => ({
  admins: null,
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/admin');
      const { data } = await response.json();
      set({ admins: data, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch', loading: false });
    }
  },
}));
