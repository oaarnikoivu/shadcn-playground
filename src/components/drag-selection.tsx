import { useComponentActions, useComponents, useCursorType } from "@/stores";
import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from "@air/react-drag-to-select";
import { useState } from "react";

export default function DragSelection() {
  const components = useComponents();
  const cursorType = useCursorType();
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
        const selectedComponentIds = componentsInSelection.map((c) => c.id);
        const groupIds = [
          ...new Set(componentsInSelection.map((c) => c.groupId)),
        ];
        const groupedComponents = components.filter(
          (c) =>
            groupIds.includes(c.groupId) &&
            !selectedComponentIds.includes(c.id),
        );
        const componentsToSelect = [
          ...componentsInSelection,
          ...groupedComponents,
        ].map((c) => c.id);
        selectComponents(componentsToSelect);
      }
    },
  });

  if (cursorType !== "cursor") return null;

  return <DragSelection />;
}
