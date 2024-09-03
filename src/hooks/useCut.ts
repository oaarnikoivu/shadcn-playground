import { useComponentActions, useSelected } from "@/stores";
import { PlaygroundUIComponent } from "@/types/component";
import { useEffect, useState } from "react";

export default function useCut() {
  const selectedComponents = useSelected();
  const { removeComponents } = useComponentActions();

  const [cutComponents, setCutComponents] = useState<PlaygroundUIComponent[]>(
    [],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "x") {
        event.preventDefault();
        setCutComponents([...selectedComponents]);
        removeComponents(selectedComponents.map((component) => component.id));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [removeComponents, selectedComponents]);

  return {
    cutComponents,
    setCutComponents,
  };
}
