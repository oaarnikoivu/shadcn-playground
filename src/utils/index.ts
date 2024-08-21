import { PlaygroundUIComponent } from "@/types/component.ts";
import { Box } from "@air/react-drag-to-select";

export function createBoundingBox(components: PlaygroundUIComponent[]) {
  let minLeft = Infinity;
  let minTop = Infinity;
  let maxRight = -Infinity;
  let maxBottom = -Infinity;

  components.forEach((c) => {
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
}

export function alignCenterHorizontal(
  boundingBox: Box,
  components: PlaygroundUIComponent[],
) {
  const bboxCenterY = boundingBox.top + boundingBox.height / 2;

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    const componentElement = el.getBoundingClientRect();
    const componentHeight = componentElement.height;
    const componentCenterY = componentElement.top + componentHeight / 2;

    const deltaY = bboxCenterY - componentCenterY;

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        y: c.coordinates.y + deltaY,
      },
    };
  });
}

export function alignCenterVertical(
  boundingBox: Box,
  components: PlaygroundUIComponent[],
) {
  const bboxCenterX = boundingBox.left + boundingBox.width / 2;

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    const componentElement = el.getBoundingClientRect();
    const componentWidth = componentElement.width;
    const componentCenterX = componentElement.left + componentWidth / 2;

    const deltaX = bboxCenterX - componentCenterX;

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        x: c.coordinates.x + deltaX,
      },
    };
  });
}
