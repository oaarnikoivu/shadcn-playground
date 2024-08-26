import { create } from "zustand";
import {
  ComponentSlice,
  createComponentSlice,
} from "@/stores/createComponentSlice.ts";
import { createThemeSlice, ThemeSlice } from "@/stores/createThemeSlice.ts";
import { persist } from "zustand/middleware";
import { SUPPORTED_COMPONENTS } from "@/constants.ts";

export const useStore = create<ComponentSlice & ThemeSlice>()(
  persist(
    (...a) => ({
      ...createComponentSlice(...a),
      ...createThemeSlice(...a),
    }),
    {
      name: "app-store",
      partialize: (state) => ({
        components: state.components,
        theme: state.theme,
      }),
    },
  ),
);

export const useComponents = () => useStore((state) => state.components);

export const useSelected = () =>
  useStore((state) => state.components.filter((c) => c.selected));

export const useSelectedByType = (
  type: (typeof SUPPORTED_COMPONENTS)[number],
) => useSelected().filter((c) => c.type === type);

export const useComponentActions = () =>
  useStore((state) => state.componentActions);

export const useStoreTheme = () => useStore((state) => state.theme);

export const useThemeActions = () => useStore((state) => state.themeActions);
