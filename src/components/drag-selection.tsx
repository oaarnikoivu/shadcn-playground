import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from "@air/react-drag-to-select";
import { useState } from "react";
import { useComponentActions, useComponents } from "@/stores";

export default function DragSelection() {
  const components = useComponents();
  const { selectComponents } = useComponentActions();

  const [selectionBox, setSelectionBox] = useState<Box | null>(null);

  const { DragSelection } = useSelectionContainer({
    shouldStartSelecting: (target) => {
      if (target instanceof HTMLElement) {
        return target.id === "canvas" || target.id === "infinite-canvas";
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
        selectComponents(componentsInSelection.map((c) => c.id));
      }
    },
  });

  return <DragSelection />;
}
