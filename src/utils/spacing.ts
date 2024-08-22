import { PlaygroundUIComponent } from "@/types/component.ts";

export function horizontalSpacing(
  amount: number,
  components: PlaygroundUIComponent[],
) {
  const sortedComponents = [...components].sort(
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

export function horizontalSpacingContainerWidth(
  components: PlaygroundUIComponent[],
  spacing: number,
) {
  let totalWidth = 0;

  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    const componentElement = document.getElementById(component.id);

    if (!componentElement) {
      console.error(`Failed to get bounding rect for component at index ${i}`);
      return;
    }

    const componentRect = componentElement.getBoundingClientRect();
    totalWidth += componentRect.width;
    if (i < components.length - 1) {
      totalWidth += spacing;
    }
  }

  return totalWidth;
}

export function verticalSpacingContainerHeight(
  components: PlaygroundUIComponent[],
  spacing: number,
) {
  let totalHeight = 0;

  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    const componentElement = document.getElementById(component.id);

    if (!componentElement) {
      console.error(`Failed to get bounding rect for component at index ${i}`);
      return;
    }

    const componentRect = componentElement.getBoundingClientRect();
    totalHeight += componentRect.height;
    if (i < components.length - 1) {
      totalHeight += spacing;
    }
  }

  return totalHeight;
}
