import Size from "@/components/editor/size.tsx";
import { Input } from "@/components/ui/input.tsx";
import useStore from "@/stores";
import { InputProperties as TInputProperties } from "@/types/component.ts";
import React, { useMemo } from "react";
import Section from "@/components/editor/section.tsx";

export default function InputProperties() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.type === "input");
  const updateComponents = useStore((state) => state.updateComponents);

  const placeholder = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentPlaceholder =
      (componentsToUpdate[0].properties as TInputProperties).placeholder ?? "";

    if (componentsToUpdate.length > 1) {
      const isSamePlaceholder = componentsToUpdate.every(
        (c) =>
          (c.properties as TInputProperties).placeholder ===
          firstComponentPlaceholder,
      );
      return isSamePlaceholder ? firstComponentPlaceholder : "";
    }

    return firstComponentPlaceholder;
  }, [componentsToUpdate]);

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlaceholder = e.target.value;

    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          placeholder: newPlaceholder,
        },
      })),
    );
  };

  return (
    <>
      <Size />
      <Section title="Placeholder">
        <Input value={placeholder} onChange={handlePlaceholderChange} />
      </Section>
    </>
  );
}
