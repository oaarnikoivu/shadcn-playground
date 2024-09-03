import { useComponentActions, useSelectedByType } from "@/stores";
import {
  PlaygroundUIComponent,
  AvatarProperties as TAvatarProperties,
} from "@/types/component";
import { useMemo } from "react";
import { Input } from "../ui/input";
import Section from "./section";

export default function AvatarProperties() {
  const componentsToUpdate = useSelectedByType("avatar");
  const { updateComponents } = useComponentActions();

  const source = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentSource = (
      componentsToUpdate[0].properties as TAvatarProperties
    ).source;

    if (componentsToUpdate.length > 1) {
      const isSameSource = componentsToUpdate.every(
        (c) =>
          (c.properties as TAvatarProperties).source === firstComponentSource,
      );
      return isSameSource ? firstComponentSource : undefined;
    }

    return firstComponentSource;
  }, [componentsToUpdate]);

  const fallback = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentFallback = (
      componentsToUpdate[0].properties as TAvatarProperties
    ).fallback;

    if (componentsToUpdate.length > 1) {
      const isSameFallback = componentsToUpdate.every(
        (c) =>
          (c.properties as TAvatarProperties).fallback ===
          firstComponentFallback,
      );
      return isSameFallback ? firstComponentFallback : undefined;
    }

    return firstComponentFallback;
  }, [componentsToUpdate]);

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateComponents(
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              source: event.target.value,
            },
          };
          return acc;
        },
        {} as Record<string, PlaygroundUIComponent>,
      ),
    );
  };

  const handleFallbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateComponents(
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              fallback: event.target.value,
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
      <Section title="Source">
        <Input value={source} onChange={handleSourceChange} />
      </Section>
      <Section title="Fallback">
        <Input value={fallback} onChange={handleFallbackChange} />
      </Section>
    </>
  );
}
