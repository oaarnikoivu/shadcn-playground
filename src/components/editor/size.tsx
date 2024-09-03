import { Input } from "@/components/ui/input.tsx";
import { useComponentActions, useSelectedByType } from "@/stores";
import React, { useMemo } from "react";
import Section from "@/components/editor/section.tsx";
import { PlaygroundUIComponent } from "@/types/component";

export default function Size() {
  const componentsToUpdate = useSelectedByType("input");
  const { updateComponents } = useComponentActions();

  const width = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentWidth = componentsToUpdate[0].properties.width ?? "";

    if (componentsToUpdate.length > 1) {
      const allWidthsAreEqual = componentsToUpdate.every(
        (c) => c.properties.width === firstComponentWidth,
      );
      return allWidthsAreEqual ? firstComponentWidth : "";
    }

    return firstComponentWidth;
  }, [componentsToUpdate]);

  const height = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentHeight = componentsToUpdate[0].properties.height ?? "";

    if (componentsToUpdate.length > 1) {
      const allHeightsAreEqual = componentsToUpdate.every(
        (c) => c.properties.height === firstComponentHeight,
      );
      return allHeightsAreEqual ? firstComponentHeight : "";
    }

    return firstComponentHeight;
  }, [componentsToUpdate]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value as unknown as number;

    updateComponents(
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              width: newWidth,
            },
          };
          return acc;
        },
        {} as Record<string, PlaygroundUIComponent>,
      ),
    );
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value as unknown as number;

    updateComponents(
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              height: newHeight,
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
      <Section title="Width (px)">
        <Input type="number" value={width} onChange={handleWidthChange} />
      </Section>
      <Section title="Height (px)">
        <Input type="number" value={height} onChange={handleHeightChange} />
      </Section>
    </>
  );
}
