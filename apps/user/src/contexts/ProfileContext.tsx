'use client';

import { CombinedProfile } from '@/types/main';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ProviderType {
  profileData?: CombinedProfile;
  triggerRefetch: () => void;
}

const ProfileContext = createContext<ProviderType | undefined>(undefined);

export default function ProfileContextProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, status } = useSession();

  const getProfileData = async (): Promise<CombinedProfile> => {
    const { data } = await axios.get(`/api/user/profile/${sessionData?.user?.profileId}`);
    return data.data;
  };

  const { data: profileData, refetch } = useQuery({
    queryKey: ['user-profile', sessionData?.user?.profileId],
    queryFn: () => getProfileData(),
    enabled: status !== 'loading',
  });

  const triggerRefetch = () => refetch();

  return (
    <ProfileContext.Provider value={{ profileData: profileData, triggerRefetch }}>
      {children}
    </ProfileContext.Provider>
  );
}

// ✅ Custom hook to use the context
export function useUserProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a ProfileContextProvider');
  }
  return context;
}
