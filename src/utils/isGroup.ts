import { PlaygroundUIComponent } from "@/types/component";

export default function isGroup(components: PlaygroundUIComponent[]) {
  const groupId = components[0]?.groupId;
  return !!groupId && components.every((c) => c.groupId === groupId);
}
