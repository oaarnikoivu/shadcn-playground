import { PlaygroundUIComponent } from "@/types/component.ts";

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
