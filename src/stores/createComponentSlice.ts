import { PlaygroundUIComponent, Properties } from "@/types/component";
import { StateCreator } from "zustand";

export type ComponentSlice = {
  components: PlaygroundUIComponent[];
  componentActions: {
    addComponent: (component: PlaygroundUIComponent) => void;
    removeComponent: (id: string) => void;
    selectComponent: (id: string) => void;
    selectComponents: (ids: string[]) => void;
    unselectComponent: (id: string) => void;
    copyComponent: (id: string) => void;
    groupComponents: (ids: string[]) => void;
    updateCoordinates: (
      id: string,
      coordinates: { x: number; y: number },
    ) => void;
    updateProperties: (id: string, properties: Properties) => void;
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
            ...get().components.map((c) =>
              c.id === id ? { ...c, selected: false } : c,
            ),
            {
              ...component,
              id: crypto.randomUUID(),
              coordinates: {
                x: component.coordinates.x + 10,
                y: component.coordinates.y + 10,
              },
              selected: true,
            },
          ],
        });
      }
    },
    groupComponents: (ids: string[]) => {
      const components = get().components;
      const selectedComponents = components.filter((c) => ids.includes(c.id));
      const allHaveSameGroupId = selectedComponents.every(
        (c) => c.groupId && c.groupId === selectedComponents[0].groupId,
      );

      const newGroupId = allHaveSameGroupId ? undefined : crypto.randomUUID();

      set((state) => ({
        components: state.components.map((c) =>
          ids.includes(c.id) ? { ...c, groupId: newGroupId } : c,
        ),
      }));
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
    clearComponents: () => set({ components: [] }),
  },
});
