import useComponentStore from "@/stores/component.store";
import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from "@air/react-drag-to-select";
import { useState } from "react";
import { PlaygroundUIComponent } from "@/types/component.ts";

export default function DragSelection() {
  const { components, updateComponents, setBoundingBox } = useComponentStore();

  const [selectionBox, setSelectionBox] = useState<Box | null>(null);

  const { DragSelection } = useSelectionContainer({
    shouldStartSelecting: (target) => {
      if (target instanceof HTMLElement) {
        return target.id === "canvas";
      }
      return false;
    },
    onSelectionChange: (box) => {
      const scrollAwareBox: Box = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX,
      };
      setSelectionBox(scrollAwareBox);
    },
    onSelectionEnd: () => {
      if (!selectionBox) return;

      const componentsInSelection = components.filter((c) => {
        const el = document.getElementById(c.id);
        if (el) {
          const box = el.getBoundingClientRect();
          return boxesIntersect(box, selectionBox);
        }
      });

      if (componentsInSelection.length) {
        updateComponents(
          componentsInSelection.map((component) => {
            return {
              ...component,
              selected: true,
            };
          }),
        );
        setBoundingBox(createBoundingBox(componentsInSelection));
      }
    },
  });

  return <DragSelection />;
}

function createBoundingBox(components: PlaygroundUIComponent[]) {
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
