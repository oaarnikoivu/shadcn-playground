import { PlaygroundUIComponent } from "@/types/component";
import { Box } from "@air/react-drag-to-select";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ComponentStoreState = {
  components: PlaygroundUIComponent[];
  getSelectedComponents: () => PlaygroundUIComponent[];
  getBoundingBox: () => Box | null;
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
      getSelectedComponents: () =>
        get().components.filter((component) => component.selected),
      getBoundingBox: () => {
        let minLeft = Infinity;
        let minTop = Infinity;
        let maxRight = -Infinity;
        let maxBottom = -Infinity;

        const { getSelectedComponents } = get();

        if (getSelectedComponents().length <= 1) {
          return null;
        }

        getSelectedComponents().forEach((c) => {
          const el = document.getElementById(c.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.left < minLeft) minLeft = rect.left;
            if (rect.top < minTop) minTop = rect.top;
            if (rect.right > maxRight) maxRight = rect.right;
            if (rect.bottom > maxBottom) maxBottom = rect.bottom;
          }
        });

        return {
          left: minLeft,
          top: minTop,
          width: maxRight - minLeft,
          height: maxBottom - minTop,
        };
      },
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
            c.id === component.id ? { ...c, ...component } : c
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
              : component
          ),
        })),
      clearCanvas: () => set({ components: [] }),
    }),
    {
      name: "component-storage",
    }
  )
);

export default useComponentStore;
