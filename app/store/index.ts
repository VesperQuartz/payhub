import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  InsertUser,
  SelectBusinessProfile,
  SelectProduct,
} from "../database/schema";

type PaymentInfoState = {
  business:
    | {
        name: string;
        address: `0x${string}`;
      }
    | undefined;
  product: SelectProduct | undefined;
  setBusiness: (business: { name: string; address: `0x${string}` }) => void;
  setProduct: (product: SelectProduct) => void;
  reset: () => void;
};

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
      name: "payhub-profile",
    },
  ),
);

export const usePaymentInfoStore = create<PaymentInfoState>()(
  persist(
    (set) => ({
      business: undefined,
      product: undefined,
      setBusiness: (business) => set({ business }),
      setProduct: (product) => set({ product }),
      reset: () => set({ business: undefined, product: undefined }),
    }),
    {
      name: "payment-info-store",
    },
  ),
);
