import { PlaygroundUIComponent } from "@/types/component.ts";

export function horizontalSpacing(
  amount: number,
  components: PlaygroundUIComponent[],
) {
  let previousX = null;

  // sort components by x coordinate
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
    let newX = prevComponentRect.right + amount;
    if (previousX) {
      newX = previousX + prevComponentRect.width + amount;
    }
    previousX = newX;
    sortedComponents[i].coordinates.x = newX;
  }

  return sortedComponents;
}
