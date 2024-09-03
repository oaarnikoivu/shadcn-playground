import { useComponentActions, useComponents } from "@/stores";
import { PlaygroundUIComponent } from "@/types/component";
import { useEffect } from "react";

export default function usePaste(componentsInMemory: PlaygroundUIComponent[]) {
  const components = useComponents();
  const { addComponents, copyComponents } = useComponentActions();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "v") {
        event.preventDefault();
        const componentsToCopy: string[] = [];
        const componentsToAdd: PlaygroundUIComponent[] = [];
        componentsInMemory.forEach((component) => {
          const foundComponent = components.find((c) => c.id === component.id);
          if (foundComponent) {
            componentsToCopy.push(component.id);
          } else {
            componentsToAdd.push(component);
          }
        });
        if (componentsToCopy.length > 0) {
          copyComponents(componentsToCopy);
        }

        if (componentsToAdd.length > 0) {
          addComponents(componentsToAdd);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addComponents, components, componentsInMemory, copyComponents]);
}
