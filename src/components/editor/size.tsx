import { Input } from "@/components/ui/input.tsx";
import useStore from "@/stores";
import React, { useState } from "react";
import Section from "@/components/editor/section.tsx";

export default function Size() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.type === "input");
  const updateComponents = useStore((state) => state.updateComponents);

  const [width, setWidth] = useState(
    componentsToUpdate.length === 1
      ? componentsToUpdate[0].properties.width
      : undefined,
  );

  const [height, setHeight] = useState(
    componentsToUpdate.length === 1
      ? componentsToUpdate[0].properties.height
      : undefined,
  );

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value as unknown as number;
    setWidth(newWidth);

    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          width: newWidth,
        },
      })),
    );
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value as unknown as number;
    setHeight(newHeight);

    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          height: newHeight,
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
