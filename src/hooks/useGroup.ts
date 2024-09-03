import { useComponentActions, useSelected } from "@/stores";
import { useCallback, useEffect } from "react";

export default function useGroup() {
  const selectedComponents = useSelected();
  const { groupComponents } = useComponentActions();

  const group = useCallback(
    () => groupComponents(selectedComponents.map((component) => component.id)),
    [groupComponents, selectedComponents],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "g") {
        event.preventDefault();
        group();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [group]);

  return group;
}
