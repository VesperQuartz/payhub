import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InsertUser, SelectBusinessProfile } from "../database/schema";

type BusinessProfileState = {
  hasSetupProfile: boolean;
  profile: SelectBusinessProfile | null;
  setProfile: (profile: SelectBusinessProfile) => void;
  resetProfile: () => void;
};

type UserStore = {
  payload: InsertUser | undefined;
  setUserInfo: (payload: InsertUser) => void;
  clearUserInfo: () => void;
};

export const useUserInfoStore = create<UserStore>()(
  persist(
    (set) => ({
      payload: undefined,
      setUserInfo: (payload) => set({ payload }),
      clearUserInfo: () => set({ payload: undefined }),
    }),
    {
      name: "user-info-store",
    },
  ),
);

export const useBusinessProfileStore = create<BusinessProfileState>()(
  persist(
    (set) => ({
      hasSetupProfile: false,
      profile: null,
      setProfile: (profile) => set({ profile, hasSetupProfile: true }),
      resetProfile: () => set({ profile: null, hasSetupProfile: false }),
    }),
    {
      name: "payhub-profile-storage",
    },
  ),
);
