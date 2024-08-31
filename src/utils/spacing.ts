import { PlaygroundUIComponent } from "@/types/component.ts";

export function horizontalSpacing(
  amount: number,
  components: PlaygroundUIComponent[],
) {
  const sortedComponents = components.sort(
    (a, b) => a.coordinates.x - b.coordinates.x,
  );

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
