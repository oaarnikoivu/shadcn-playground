import { Input } from "@/components/ui/input.tsx";
import useStore from "@/stores";
import React, { useEffect, useState } from "react";
import Section from "@/components/editor/section.tsx";

export default function Size() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.type === "input");
  const updateComponents = useStore((state) => state.updateComponents);

  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (componentsToUpdate.length === 1) {
      setWidth(componentsToUpdate[0].properties.width);
      setHeight(componentsToUpdate[0].properties.height);
    }
  }, [componentsToUpdate]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as unknown as number;
    setWidth(value);

    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          width: value,
        },
      })),
    );
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as unknown as number;
    setHeight(value);

    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          height: height,
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
