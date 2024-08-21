import { Input } from "@/components/ui/input.tsx";
import useStore from "@/stores";
import React from "react";
import Section from "@/components/editor/section.tsx";

export default function Size() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.type === "input");
  const updateComponents = useStore((state) => state.updateComponents);

  const width =
    componentsToUpdate.length === 1
      ? componentsToUpdate[0].properties.width
      : "";

  const height =
    componentsToUpdate.length === 1
      ? componentsToUpdate[0].properties.height
      : "";

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          width: e.currentTarget.value as unknown as number,
        },
      })),
    );
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          height: e.currentTarget.value as unknown as number,
        },
      })),
    );
  };

  return (
    <>
      <Section title="Width (px)">
        <Input type="number" value={width} onChange={handleWidthChange} />
      </Section>
      <Section title="Height (px)">
        <Input type="number" value={height} onChange={handleHeightChange} />
      </Section>
    </>
  );
}
