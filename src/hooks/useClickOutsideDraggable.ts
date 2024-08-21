import { useEffect } from "react";
import useStore from "@/stores";
import { PlaygroundUIComponent } from "@/types/component.ts";

export default function useClickOutsideDraggable(
  component: PlaygroundUIComponent,
) {
  const updateComponent = useStore((state) => state.updateComponent);
  const setBoundingBox = useStore((state) => state.setBoundingBox);

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
        updateComponent({ ...component, selected: false });
        setBoundingBox(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [component, setBoundingBox, updateComponent]);
}
