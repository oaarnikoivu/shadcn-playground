import { PlaygroundUIComponent } from "@/types/component";
import { Box } from "@air/react-drag-to-select";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ComponentStoreState = {
  components: PlaygroundUIComponent[];
  boundingBox: Box | null;
  setBoundingBox: (box: Box | null) => void;
  getSelectedComponents: () => PlaygroundUIComponent[];
  addComponent: (component: PlaygroundUIComponent) => void;
  removeComponent: (component: PlaygroundUIComponent) => void;
  updateComponent: (component: PlaygroundUIComponent) => void;
  updateComponents: (components: PlaygroundUIComponent[]) => void;
  selectComponents: (ids: string[]) => void;
  clearCanvas: () => void;
};

export const useComponentStore = create<ComponentStoreState>()(
  persist(
    (set, get) => ({
      components: [],
      boundingBox: null,
      setBoundingBox: (box: Box | null) => set({ boundingBox: box }),
      getSelectedComponents: () =>
        get().components.filter((component) => component.selected),
      addComponent: (component: PlaygroundUIComponent) =>
        set((state) => ({
          components: [...state.components, component],
        })),
      removeComponent: (component: PlaygroundUIComponent) =>
        set((state) => ({
          components: state.components.filter((c) => c.id !== component.id),
        })),
      updateComponent: (component: PlaygroundUIComponent) =>
        set((state) => ({
          components: state.components.map((c) =>
            c.id === component.id ? { ...c, ...component } : c,
          ),
        })),
      updateComponents: (updatedComponents: PlaygroundUIComponent[]) =>
        set((state) => ({
          components: state.components.map((component) => {
            const update = updatedComponents.find((c) => c.id === component.id);
            return update ? { ...component, ...update } : component;
          }),
        })),
      selectComponents: (ids: string[]) =>
        set((state) => ({
          components: state.components.map((component) =>
            ids.includes(component.id)
              ? { ...component, selected: true }
              : component,
          ),
        })),
      clearCanvas: () => set({ components: [] }),
    }),
    {
      name: "component-storage",
    },
  ),
);

export default useComponentStore;
