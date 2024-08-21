import { StateCreator } from "zustand";
import { Theme } from "@/types/theme.ts";

export type ThemeSlice = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set,
) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
});
