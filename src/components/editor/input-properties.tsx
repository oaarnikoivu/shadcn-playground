import Size from "@/components/editor/size.tsx";
import { Input } from "@/components/ui/input.tsx";
import useStore from "@/stores";
import { InputProperties as TInputProperties } from "@/types/component.ts";
import React, { useEffect, useState } from "react";
import Section from "@/components/editor/section.tsx";

export default function InputProperties() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.type === "input");
  const updateComponents = useStore((state) => state.updateComponents);

  const [placeholder, setPlaceholder] = useState<string | undefined>("");

  useEffect(() => {
    if (componentsToUpdate.length === 1) {
      setPlaceholder(
        (componentsToUpdate[0].properties as TInputProperties).placeholder,
      );
    }
  }, [componentsToUpdate]);

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPlaceholder(value);

    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          placeholder: value,
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
