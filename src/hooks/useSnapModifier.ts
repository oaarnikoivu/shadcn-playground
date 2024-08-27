import { useMemo } from "react";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { useGridView } from "@/stores";

export default function useSnapModifier(gridSize: number = 20) {
  const gridView = useGridView();

  return useMemo(() => {
    if (gridView) {
      return [createSnapModifier(gridSize)];
    } else {
      return [];
    }
  }, [gridView]);
}
