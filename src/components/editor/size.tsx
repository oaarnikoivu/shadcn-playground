import { Input } from "@/components/ui/input.tsx";
import useStore from "@/stores";
import React, { useMemo } from "react";
import Section from "@/components/editor/section.tsx";

export default function Size() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.type === "input");
  const updateComponents = useStore((state) => state.updateComponents);

  const width = useMemo(() => {
    if (componentsToUpdate.length > 1) {
      const firstComponentWidth = componentsToUpdate[0].properties.width;
      const allWidthsAreEqual = componentsToUpdate.every(
        (c) => c.properties.width === firstComponentWidth,
      );
      return allWidthsAreEqual ? firstComponentWidth : "";
    }
    return componentsToUpdate[0].properties.width;
  }, [componentsToUpdate]);

  const height = useMemo(() => {
    if (componentsToUpdate.length > 1) {
      const firstComponentHeight = componentsToUpdate[0].properties.height;
      const allHeightsAreEqual = componentsToUpdate.every(
        (c) => c.properties.height === firstComponentHeight,
      );
      return allHeightsAreEqual ? firstComponentHeight : "";
    }
    return componentsToUpdate[0].properties.height;
  }, [componentsToUpdate]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value as unknown as number;

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
