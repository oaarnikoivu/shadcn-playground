import { useEffect, useState } from "react";
import { useSelected } from "@/stores";
import { PlaygroundUIComponent } from "@/types/component";

export default function useCopy() {
  const selectedComponents = useSelected();

  const [copiedComponents, setCopiedComponents] = useState<
    PlaygroundUIComponent[]
  >([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "c") {
        event.preventDefault();
        setCopiedComponents([...selectedComponents]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return {
    copiedComponents,
    setCopiedComponents,
  };
}
