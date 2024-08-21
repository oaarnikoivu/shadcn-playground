import { PlaygroundUIComponent } from "@/types/component";
import { Box } from "@air/react-drag-to-select";
import { StateCreator } from "zustand";

export type ComponentSlice = {
  components: PlaygroundUIComponent[];
  boundingBox: Box | null;
  setBoundingBox: (box: Box | null) => void;
  getSelectedComponents: () => PlaygroundUIComponent[];
  addComponent: (component: PlaygroundUIComponent) => void;
  copyComponents: (components: PlaygroundUIComponent[]) => void;
  removeComponent: (component: PlaygroundUIComponent) => void;
  removeComponents: (components: PlaygroundUIComponent[]) => void;
  updateComponent: (component: PlaygroundUIComponent) => void;
  updateComponents: (components: PlaygroundUIComponent[]) => void;
  selectComponents: (ids: string[]) => void;
  clearCanvas: () => void;
};

export const createComponentSlice: StateCreator<
  ComponentSlice,
  [],
  [],
  ComponentSlice
> = (set, get) => ({
  components: [],
  boundingBox: null,
  setBoundingBox: (box: Box | null) => set({ boundingBox: box }),
  getSelectedComponents: () =>
    get().components.filter((component) => component.selected),
  addComponent: (component: PlaygroundUIComponent) =>
    set((state) => ({
      components: [...state.components, component],
    })),
  copyComponents: (components: PlaygroundUIComponent[]) =>
    set((state) => ({
      components: [
        ...state.components,
        ...components.map((component) => ({
          ...component,
          id: crypto.randomUUID(),
          coordinates: {
            x: component.coordinates.x + 10,
            y: component.coordinates.y + 10,
          },
        })),
      ],
      boundingBox: null,
    })),
  removeComponent: (component: PlaygroundUIComponent) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== component.id),
    })),
  removeComponents: (components: PlaygroundUIComponent[]) =>
    set((state) => ({
      components: state.components.filter(
        (c) => !components.map((c) => c.id).includes(c.id),
      ),
      boundingBox: null,
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
  clearCanvas: () => set({ components: [], boundingBox: null }),
});
