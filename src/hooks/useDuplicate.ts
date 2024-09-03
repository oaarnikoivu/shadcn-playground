import { useComponentActions, useSelected } from "@/stores";
import { useCallback, useEffect } from "react";

export default function useDuplicate() {
  const selectedComponents = useSelected();
  const { copyComponents } = useComponentActions();

  const duplicate = useCallback(() => {
    copyComponents(selectedComponents.map((c) => c.id));
  }, [copyComponents, selectedComponents]);

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
