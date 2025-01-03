import useCursorStyle from "@/hooks/useCursorStyle";
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
  const cursorStyle = useCursorStyle();

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
        let componentsToSelect = componentsInSelection.map((c) => c.id);

        const groupIds = [
          ...new Set(componentsInSelection.map((c) => c.groupId)),
        ].filter((id) => !!id);

        if (groupIds.length > 0) {
          const groupedComponents = components.filter(
            (c) =>
              groupIds.includes(c.groupId) &&
              !componentsToSelect.includes(c.id),
          );
          componentsToSelect = [
            ...componentsInSelection,
            ...groupedComponents,
          ].map((c) => c.id);
        }

        selectComponents(componentsToSelect, true);
      }

      setSelectionBox(null);
    },
  });

  if (cursorType !== "cursor" || ["grab", "grabbing"].includes(cursorStyle))
    return null;

  return <DragSelection />;
}
