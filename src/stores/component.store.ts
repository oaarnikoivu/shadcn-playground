import { PlaygroundUIComponent } from "@/types/component";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ComponentStoreState = {
  components: PlaygroundUIComponent[];
  addComponent: (component: PlaygroundUIComponent) => void;
  removeComponent: (component: PlaygroundUIComponent) => void;
  updateComponent: (component: PlaygroundUIComponent) => void;
  clearCanvas: () => void;
};

export const useComponentStore = create<ComponentStoreState>()(
  persist(
    (set) => ({
      components: [],
      addComponent: (payload: PlaygroundUIComponent) =>
        set((state) => ({
          components: [...state.components, payload],
        })),
      removeComponent: (payload: PlaygroundUIComponent) =>
        set((state) => ({
          components: state.components.filter(
            (component) => component.id !== payload.id
          ),
        })),
      updateComponent: (payload: PlaygroundUIComponent) =>
        set((state) => ({
          components: state.components.map((component) =>
            component.id === payload.id
              ? { ...component, ...payload }
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
