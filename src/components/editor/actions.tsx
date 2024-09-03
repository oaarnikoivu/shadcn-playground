import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Copy, Group, Trash2, Ungroup } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { useSelected } from "@/stores";
import Section from "@/components/editor/section.tsx";
import useDuplicate from "@/hooks/useDuplicate";
import useGroup from "@/hooks/useGroup";
import useRemove from "@/hooks/useRemove";

export default function Actions() {
  const selectedComponents = useSelected();

  const duplicate = useDuplicate();
  const group = useGroup();
  const remove = useRemove();

  const groupId = selectedComponents[0]?.groupId;
  const allHaveSameGroupId =
    !!groupId && selectedComponents.every((c) => c.groupId === groupId);

  const actions = {
    copy: {
      displayName: "Duplicate",
      icon: Copy,
      tooltip: "Duplicate - Ctrl + D",
      action: duplicate,
    },
    group: {
      displayName: "Group",
      icon: allHaveSameGroupId ? Ungroup : Group,
      tooltip: allHaveSameGroupId ? "Ungroup - Ctrl + G" : "Group - Ctrl + G",
      action: group,
    },
    delete: {
      displayName: "Delete",
      icon: Trash2,
      tooltip: "Delete",
      action: remove,
    },
  };

  if (selectedComponents.length === 1) {
    delete (actions as Partial<typeof actions>).group;
  }

  return (
    <Section title="Actions">
      <ToggleGroup type="single" className="justify-start">
        <TooltipProvider>
          {Object.entries(actions).map(([key, action]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value={action.displayName}
                  aria-label={action.displayName}
                  onClick={action.action}
                >
                  <action.icon className="size-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent className="capitalize">
                {action.tooltip}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </ToggleGroup>
    </Section>
  );
}
