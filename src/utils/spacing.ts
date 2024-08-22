import { PlaygroundUIComponent } from "@/types/component.ts";

export function horizontalSpacing(
  amount: number,
  components: PlaygroundUIComponent[],
) {
  let previousX = null;

  for (let i = 1; i < components.length; i++) {
    const prevComponent = components[i - 1];
    const prevComponentElement = document.getElementById(prevComponent.id);

    if (!prevComponentElement) {
      console.error(
        `Failed to get bounding rect for component at index ${i - 1}`,
      );
      return components;
    }

    const prevComponentRect = prevComponentElement.getBoundingClientRect();
    let newX = prevComponentRect.right + amount;
    if (previousX) {
      newX = previousX + prevComponentRect.width + amount;
    }
    previousX = newX;
    components[i].coordinates.x = newX;
  }

  return components;
}
