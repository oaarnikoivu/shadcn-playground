import { PlaygroundUIComponent } from "@/types/component";
import isGroup from "@/utils/isGroup";
import { StateCreator } from "zustand";

export type ComponentSlice = {
  components: PlaygroundUIComponent[];
  componentActions: {
    addComponents: (components: PlaygroundUIComponent[]) => void;
    updateComponents: (data: Record<string, PlaygroundUIComponent>) => void;
    removeComponents: (ids: string[]) => void;
    selectComponents: (ids: string[], select: boolean) => void;
    copyComponents: (ids: string[]) => void;
    groupComponents: (ids: string[]) => void;
    updateCoordinates: (ids: string[], deltaX: number, deltaY: number) => void;
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
    addComponents: (components) =>
      set({ components: [...get().components, ...components] }),
    updateComponents: (data) => {
      set({
        components: get().components.map((c) => (data[c.id] ? data[c.id] : c)),
      });
    },
    removeComponents: (ids: string[]) =>
      set({
        components: get().components.filter((c) => !ids.includes(c.id)),
      }),
    selectComponents: (ids: string[], select: boolean) =>
      set((state) => ({
        components: state.components.map((c) =>
          ids.includes(c.id) ? { ...c, selected: select } : c,
        ),
      })),
    copyComponents: (ids: string[]) => {
      const components = get().components;
      const selectedComponents = components.filter((c) => ids.includes(c.id));

      const groupId = crypto.randomUUID();

      const newComponents = selectedComponents.map((component) => ({
        ...component,
        id: crypto.randomUUID(),
        groupId: component.groupId ? groupId : undefined,
        coordinates: {
          x: component.coordinates.x + 10,
          y: component.coordinates.y + 10,
        },
        selected: true,
      }));

      const updatedComponents = components.map((component) =>
        ids.includes(component.id)
          ? { ...component, selected: false }
          : component,
      );

      set({
        components: [...updatedComponents, ...newComponents],
      });
    },
    groupComponents: (ids: string[]) => {
      const components = get().components;
      const selectedComponents = components.filter((c) => ids.includes(c.id));

      const newGroupId = isGroup(selectedComponents)
        ? undefined
        : crypto.randomUUID();

      set((state) => ({
        components: state.components.map((c) =>
          ids.includes(c.id) ? { ...c, groupId: newGroupId } : c,
        ),
      }));
    },
    updateCoordinates: (ids: string[], deltaX: number, deltaY: number) => {
      set((state) => ({
        components: state.components.map((c) =>
          ids.includes(c.id)
            ? {
                ...c,
                coordinates: {
                  x: c.coordinates.x + deltaX,
                  y: c.coordinates.y + deltaY,
                },
              }
            : c,
        ),
      }));
    },
    clearComponents: () => set({ components: [] }),
  },
});
