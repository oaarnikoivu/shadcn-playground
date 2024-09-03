import { PlaygroundUIComponent } from "@/types/component.ts";
import groupByGroups from "./groupByGroups";

export function horizontalSpacing(
  amount: number,
  components: PlaygroundUIComponent[],
) {
  const sortedComponents = components.sort(
    (a, b) => a.coordinates.x - b.coordinates.x,
  );

  const groupedComponents = groupByGroups(sortedComponents);

  if (Object.keys(groupedComponents).length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(groupedComponents).forEach(([_, components], index) => {
      if (index === 0) return;

      const previousKey = Object.keys(groupedComponents)[index - 1];
      const prevGroup = groupedComponents[previousKey];
      const prevGroupLastElement = document.getElementById(
        prevGroup[prevGroup.length - 1].id,
      );

      if (!prevGroupLastElement) {
        console.error(
          `Failed to get bounding rect for component at index ${index - 1}`,
        );
        return;
      }

      const prevGroupLastComponentRect =
        prevGroupLastElement.getBoundingClientRect();

      components[0].coordinates.x = prevGroupLastComponentRect.right + amount;

      for (let i = 1; i < components.length; i++) {
        const prevComponent = components[i - 1];
        const prevComponentElement = document.getElementById(prevComponent.id);

        if (!prevComponentElement) {
          console.error(
            `Failed to get bounding rect for component at index ${i - 1}`,
          );
          return;
        }

        const currentComponent = components[i];
        const currentComponentElement = document.getElementById(
          currentComponent.id,
        );

        if (!currentComponentElement) {
          console.error(
            `Failed to get bounding rect for component at index ${i}`,
          );
          return;
        }

        const currentComponentRect =
          currentComponentElement.getBoundingClientRect();
        const prevComponentRect = prevComponentElement.getBoundingClientRect();
        const gap = currentComponentRect.left - prevComponentRect.right;

        components[i].coordinates.x =
          prevComponent.coordinates.x + prevComponentRect.width + gap;
      }
    });

    return Object.values(groupedComponents).flat();
  }

  for (let i = 1; i < sortedComponents.length; i++) {
    const prevComponent = sortedComponents[i - 1];
    const prevComponentElement = document.getElementById(prevComponent.id);

    if (!prevComponentElement) {
      console.error(
        `Failed to get bounding rect for component at index ${i - 1}`,
      );
      return sortedComponents;
    }

    const prevComponentRect = prevComponentElement.getBoundingClientRect();

    sortedComponents[i].coordinates.x =
      prevComponent.coordinates.x + prevComponentRect.width + amount;
  }

  return sortedComponents;
}

export function verticalSpacing(
  amount: number,
  components: PlaygroundUIComponent[],
) {
  const sortedComponents = components.sort(
    (a, b) => a.coordinates.y - b.coordinates.y,
  );

  const groupedComponents = groupByGroups(sortedComponents);

  if (Object.keys(groupedComponents).length > 0) {
    Object.entries(groupedComponents).forEach(([_, components], index) => {
      if (index === 0) return;

      const previousKey = Object.keys(groupedComponents)[index - 1];
      const prevGroup = groupedComponents[previousKey];
      const prevGroupLastElement = document.getElementById(
        prevGroup[prevGroup.length - 1].id,
      );

      if (!prevGroupLastElement) {
        console.error(
          `Failed to get bounding rect for component at index ${index - 1}`,
        );
        return;
      }

      const prevGroupLastComponentRect =
        prevGroupLastElement.getBoundingClientRect();

      components[0].coordinates.y = prevGroupLastComponentRect.bottom + amount;

      for (let i = 1; i < components.length; i++) {
        const prevComponent = components[i - 1];
        const prevComponentElement = document.getElementById(prevComponent.id);

        if (!prevComponentElement) {
          console.error(
            `Failed to get bounding rect for component at index ${i - 1}`,
          );
          return;
        }

        const currentComponent = components[i];
        const currentComponentElement = document.getElementById(
          currentComponent.id,
        );

        if (!currentComponentElement) {
          console.error(
            `Failed to get bounding rect for component at index ${i}`,
          );
          return;
        }

        const currentComponentRect =
          currentComponentElement.getBoundingClientRect();
        const prevComponentRect = prevComponentElement.getBoundingClientRect();
        const gap = currentComponentRect.top - prevComponentRect.bottom;

        components[i].coordinates.y =
          prevComponent.coordinates.y + prevComponentRect.height + gap;
      }
    });

    return Object.values(groupedComponents).flat();
  }

  for (let i = 1; i < sortedComponents.length; i++) {
    const prevComponent = sortedComponents[i - 1];
    const prevComponentElement = document.getElementById(prevComponent.id);

    if (!prevComponentElement) {
      console.error(
        `Failed to get bounding rect for component at index ${i - 1}`,
      );
      return sortedComponents;
    }

    const prevComponentRect = prevComponentElement.getBoundingClientRect();

    sortedComponents[i].coordinates.y =
      prevComponent.coordinates.y + prevComponentRect.height + amount;
  }

  return sortedComponents;
}
