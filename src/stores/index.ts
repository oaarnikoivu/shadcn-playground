import { create } from "zustand";
import {
  ComponentSlice,
  createComponentSlice,
} from "@/stores/createComponentSlice.ts";
import { createThemeSlice, ThemeSlice } from "@/stores/createThemeSlice.ts";
import { persist } from "zustand/middleware";
import { SUPPORTED_COMPONENTS } from "@/constants.ts";
import { temporal } from "zundo";

export const useStore = create<ComponentSlice & ThemeSlice>()(
  temporal(
    persist(
      (...a) => ({
        ...createComponentSlice(...a),
        ...createThemeSlice(...a),
      }),
      {
        name: "app-store",
        partialize: (state) => ({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          components: state.components.map(({ selected, ...rest }) => rest),
          theme: state.theme,
        }),
      },
    ),
    {
      partialize: (state) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        components: state.components.map(({ selected, ...rest }) => rest),
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

export const useGridView = () => useStore((state) => state.gridView);

export const useCursorType = () => useStore((state) => state.cursorType);

export const useComponentActions = () =>
  useStore((state) => state.componentActions);

export const useStoreTheme = () => useStore((state) => state.theme);

export const useThemeActions = () => useStore((state) => state.themeActions);
