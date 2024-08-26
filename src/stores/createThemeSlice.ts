import { StateCreator } from "zustand";
import { Theme } from "@/types/theme.ts";

export type ThemeSlice = {
  theme: Theme;
  themeActions: {
    updateTheme: (theme: Theme) => void;
  };
};

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set,
) => ({
  theme: "light",
  themeActions: {
    updateTheme: (theme) => set({ theme }),
  },
});
