import { PlaygroundUIComponent, Properties } from "@/types/component";
import { StateCreator } from "zustand";

export type ComponentSlice = {
  components: PlaygroundUIComponent[];
  gridView: boolean;
  cursorType: "cursor" | "grab";
  componentActions: {
    addComponent: (component: PlaygroundUIComponent) => void;
    removeComponent: (id: string) => void;
    selectComponent: (id: string) => void;
    selectComponents: (ids: string[]) => void;
    unselectComponent: (id: string) => void;
    copyComponent: (id: string) => void;
    updateCoordinates: (
      id: string,
      coordinates: { x: number; y: number },
    ) => void;
    updateProperties: (id: string, properties: Properties) => void;
    updateGridView: (gridView: boolean) => void;
    updateCursorType: (cursorType: "cursor" | "grab") => void;
    clearComponents: () => void;
  };
};

export const createComponentSlice: StateCreator<
  ComponentSlice,
  [],
  [],
  ComponentSlice
> = (set, get) => ({
  components: [],
  gridView: false,
  cursorType: "cursor",
  componentActions: {
    addComponent: (component) =>
      set({ components: [...get().components, component] }),
    removeComponent: (id: string) =>
      set({ components: get().components.filter((c) => c.id !== id) }),
    selectComponent: (id: string) =>
      set((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, selected: true } : { ...c, selected: false },
        ),
      })),
    selectComponents: (ids: string[]) =>
      set((state) => ({
        components: state.components.map((c) => ({
          ...c,
          selected: ids.includes(c.id),
        })),
      })),
    unselectComponent: (id: string) => {
      set({
        components: [
          ...get().components.map((c) =>
            c.id === id ? { ...c, selected: false } : c,
          ),
        ],
      });
    },
    copyComponent: (id: string) => {
      const component = get().components.find((c) => c.id === id);
      if (component) {
        set({
          components: [
            ...get().components,
            { ...component, id: crypto.randomUUID() },
          ],
        });
      }
    },
    updateCoordinates: (id: string, coordinates: { x: number; y: number }) =>
      set((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, coordinates } : c,
        ),
      })),
    updateProperties: (id: string, properties: Properties) => {
      set({
        components: get().components.map((c) =>
          c.id === id ? { ...c, properties } : c,
        ),
      });
    },
    updateGridView: (gridView: boolean) => set({ gridView }),
    updateCursorType: (cursorType: "cursor" | "grab") => set({ cursorType }),
    clearComponents: () => set({ components: [] }),
  },
});
