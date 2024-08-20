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
  const bboxDeltaY = bboxCenterY - boundingBox.top;

  return components.map((c) => {
    const el = document.getElementById(c.id);
    if (!el) return c;

    const componentElement = el.getBoundingClientRect();
    const componentTop = componentElement.top;
    const componentHeight = componentElement.height;
    const componentCenterY = componentTop + componentHeight / 2;

    const isAboveCenter = componentCenterY < bboxCenterY;
    const componentDeltaY = componentCenterY - componentTop;

    return {
      ...c,
      coordinates: {
        ...c.coordinates,
        y: isAboveCenter
          ? c.coordinates.y + bboxDeltaY - componentDeltaY
          : c.coordinates.y - bboxDeltaY + componentDeltaY,
      },
    };
  });
}
