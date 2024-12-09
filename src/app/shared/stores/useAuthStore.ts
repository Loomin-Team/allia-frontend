import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../models/User";

type AuthStore = {
  token?: string;
  user?: User;
  isHydrated: boolean; // Nuevo estado para indicar la hidratación
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  hydrate: () => void; // Método para marcar la hidratación
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: undefined,
      user: undefined,
      isHydrated: false, // Inicialmente no hidratado

      login: (token: string, user: User) => {
        set(() => ({ token, user }));
      },

      logout: () => set(() => ({ token: undefined, user: undefined })),

      isLoggedIn: () => !!get().token,

      hydrate: () => set({ isHydrated: true }), // Define el método hydrate
    }),
    {
      name: "user", // Clave para el almacenamiento persistente
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrate(); // Llama al método hydrate al rehidratar
        }
      },
    }
  )
);
