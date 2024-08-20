import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "@/types/theme.ts";

type ThemeStoreState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
);

export default useThemeStore;
