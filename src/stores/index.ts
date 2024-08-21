import { create } from "zustand";
import {
  ComponentSlice,
  createComponentSlice,
} from "@/stores/createComponentSlice.ts";
import { createThemeSlice, ThemeSlice } from "@/stores/createThemeSlice.ts";
import { persist } from "zustand/middleware";

const useStore = create<ComponentSlice & ThemeSlice>()(
  persist(
    (...a) => ({
      ...createComponentSlice(...a),
      ...createThemeSlice(...a),
    }),
    {
      name: "app-store",
    },
  ),
);

export default useStore;
