import useComponentStore from "@/stores/component.store";
import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from "@air/react-drag-to-select";
import { useState } from "react";
import { createBoundingBox } from "@/utils";

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
