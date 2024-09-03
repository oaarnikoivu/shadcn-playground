import { useComponentActions, useComponents } from "@/stores";
import { PlaygroundUIComponent } from "@/types/component";
import { useEffect } from "react";

export default function usePaste(componentsInMemory: PlaygroundUIComponent[]) {
  const components = useComponents();
  const { addComponent, copyComponent } = useComponentActions();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "v") {
        event.preventDefault();
        componentsInMemory.forEach((component) => {
          const foundComponent = components.find((c) => c.id === component.id);
          if (foundComponent) {
            copyComponent(component.id);
          } else {
            addComponent(component);
          }
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addComponent, components, componentsInMemory, copyComponent]);
}
