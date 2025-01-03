import { useEffect } from "react";
import { useComponentActions } from "@/stores";
import { PlaygroundUIComponent } from "@/types/component.ts";

export default function useClickOutsideDraggable(
  component: PlaygroundUIComponent,
) {
  const { selectComponents } = useComponentActions();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isMenuOpen = !!document.getElementById("menu");
      const isInsideEditor = target.closest("#editor");

      if (
        target.id !== component.id &&
        target.id !== "bbox" &&
        target.id !== "menu" &&
        target.id !== "prompt" &&
        !isMenuOpen &&
        !isInsideEditor &&
        component?.selected
      ) {
        selectComponents([component.id], false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [component, selectComponents]);
}
