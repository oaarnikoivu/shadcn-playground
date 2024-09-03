import { PlaygroundUIComponent } from "@/types/component";

export default function groupByGroups(components: PlaygroundUIComponent[]) {
  return components.reduce<Record<string, PlaygroundUIComponent[]>>(
    (acc, c) => {
      if (!c.groupId) return acc;
      if (!acc[c.groupId]) {
        acc[c.groupId] = [];
      }
      acc[c.groupId].push(c);
      return acc;
    },
    {},
  );
}
