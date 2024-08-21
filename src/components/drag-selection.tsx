import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from "@air/react-drag-to-select";
import { useState } from "react";
import useStore from "@/stores";
import createBoundingBox from "@/utils/createBoundingBox.ts";

export default function DragSelection() {
  const components = useStore((state) => state.components);
  const updateComponents = useStore((state) => state.updateComponents);
  const setBoundingBox = useStore((state) => state.setBoundingBox);

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
