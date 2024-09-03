import { useComponentActions, useSelected } from "@/stores";
import { useCallback, useEffect } from "react";

export default function useDuplicate() {
  const selectedComponents = useSelected();
  const { copyComponent } = useComponentActions();

  const duplicate = useCallback(() => {
    selectedComponents.forEach((component) => copyComponent(component.id));
  }, [copyComponent, selectedComponents]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        duplicate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [duplicate]);

  return duplicate;
}
