import { PlaygroundUIComponent } from "@/types/component.ts";
import createBoundingBox from "@/utils/createBoundingBox.ts";

export function alignCenterHorizontal(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
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

export function alignCenterVertical(components: PlaygroundUIComponent[]) {
  const boundingBox = createBoundingBox(components);
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
