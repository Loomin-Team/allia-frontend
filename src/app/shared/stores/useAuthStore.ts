import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../models/User";

type AuthStore = {
  token?: string;
  user?: User;
  isHydrated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  hydrate: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: undefined,
      user: undefined,
      isHydrated: false,

      login: (token: string, user: User) => {
        set(() => ({ token, user }));
      },

      logout: () => set(() => ({ token: undefined, user: undefined })),

      isLoggedIn: () => !!get().token,

      hydrate: () => set({ isHydrated: true }),
    }),
    {
      name: "user",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrate();
        }
      },
    }
  )
);
