import { create } from "zustand";
import { persist } from "zustand/middleware";

export const storeName = "auth";

export const useAuth = create(
  persist(
    (set) => ({
      authToken: null,
      user: { name: null, email: null },
      setAuthToken: ({ authToken }) => set({ authToken }),
      setUser: (user) => set({ user }),
    }),
    {
      name: storeName, // name of the item in the storage (must be unique)
    }
  )
);
