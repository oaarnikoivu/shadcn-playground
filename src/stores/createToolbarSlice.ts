import { StateCreator } from "zustand";

type Cursor = "cursor" | "grab";

export type ToolbarSlice = {
  enableGridView: boolean;
  cursor: "cursor" | "grab";
  toolbarActions: {
    toggleGridView: () => void;
    updateCursor: (cursor: Cursor) => void;
  };
};

export const createToolbarSlice: StateCreator<
  ToolbarSlice,
  [],
  [],
  ToolbarSlice
> = (set) => ({
  enableGridView: false,
  cursor: "cursor",
  toolbarActions: {
    toggleGridView: () =>
      set((state) => ({ enableGridView: !state.enableGridView })),
    updateCursor: (cursor) => set({ cursor }),
  },
});
