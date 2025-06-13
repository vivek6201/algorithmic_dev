'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { queryClient } from './provider';

const getProfile = async (profileId: string) => {
  const { data } = await axios.get(`/api/user/profile/${profileId}`);
  return data.data;
};

const getBookmarks = async () => {
  const { data } = await axios.get('/api/user/bookmarks');
  return data.data;
};

export const ProfileSync = () => {
  const { data: session, status } = useSession();

  const setProfile = useUserStore((s) => s.setProfile);
  const setBookmarks = useUserStore((s) => s.setBookmarks);
  const clearUserData = useUserStore((s) => s.clearUserData);

  const profileId = session?.user?.profileId;

  const { data: profileData, isFetched: isProfileFetched } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => getProfile(profileId!),
    enabled: !!profileId && status === 'authenticated',
    staleTime: 5 * 60 * 1000, // optional
  });

  const { data: bookmarksData, isFetched: isBookmarksFetched } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
    enabled: status === 'authenticated',
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isProfileFetched && profileData) {
      setProfile(profileData);
    }
  }, [isProfileFetched, profileData]);

  useEffect(() => {
    if (isBookmarksFetched && bookmarksData) {
      setBookmarks(bookmarksData);
    }
  }, [isBookmarksFetched, bookmarksData]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      clearUserData();
      queryClient.removeQueries({ queryKey: ['profile'] });
      queryClient.removeQueries({ queryKey: ['bookmarks'] });
    }
  }, [status]);

  return null;
};
