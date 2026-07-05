'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  cycleLength: number;
  foodPreference: string;
  goals: string[];
  allergies?: string;
}

export interface UserState {
  profile: UserProfile;
  hasCompletedOnboarding: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (profile: UserProfile) => void;
}

const defaultProfile: UserProfile = {
  name: 'Kishi',
  cycleLength: 28,
  foodPreference: 'Regular',
  goals: ['Reduce Cravings', 'Improve Energy'],
  allergies: '',
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      hasCompletedOnboarding: false,
      updateProfile: (updates: Partial<UserProfile>) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      completeOnboarding: (newProfile: UserProfile) =>
        set({
          profile: newProfile,
          hasCompletedOnboarding: true,
        }),
    }),
    {
      name: 'cyclecrave-user-profile',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : { getItem: () => null, setItem: () => {}, removeItem: () => {} } as any
      ),
    }
  )
);

export interface AppState {
  currentPhase: string | null;
  currentDate: string;
  theme: 'light' | 'dark';
  setCurrentPhase: (phase: string) => void;
  setCurrentDate: (date: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPhase: 'luteal',
      currentDate: new Date().toISOString().split('T')[0],
      theme: 'light',
      setCurrentPhase: (phase: string) => set({ currentPhase: phase }),
      setCurrentDate: (date: string) => set({ currentDate: date }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
    }),
    {
      name: 'cyclecrave-app',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : { getItem: () => null, setItem: () => {}, removeItem: () => {} } as any
      ),
    }
  )
);
