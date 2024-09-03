import Size from "@/components/editor/size.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useComponentActions, useSelectedByType } from "@/stores";
import {
  PlaygroundUIComponent,
  InputProperties as TInputProperties,
} from "@/types/component.ts";
import React, { useMemo } from "react";
import Section from "@/components/editor/section.tsx";

export default function InputProperties() {
  const componentsToUpdate = useSelectedByType("input");
  const { updateComponents } = useComponentActions();

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
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              placeholder: newPlaceholder,
            },
          };
          return acc;
        },
        {} as Record<string, PlaygroundUIComponent>,
      ),
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
