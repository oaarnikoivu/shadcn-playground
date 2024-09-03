import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Copy, Group, Trash2, Ungroup } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { useComponentActions, useSelected } from "@/stores";
import Section from "@/components/editor/section.tsx";
import { useCallback, useEffect } from "react";

export default function Actions() {
  const selectedComponents = useSelected();
  const { copyComponent, removeComponent, groupComponents } =
    useComponentActions();

  const groupId = selectedComponents[0]?.groupId;
  const allHaveSameGroupId =
    !!groupId && selectedComponents.every((c) => c.groupId === groupId);

  const handleCopy = useCallback(() => {
    selectedComponents.forEach((component) => copyComponent(component.id));
  }, [copyComponent, selectedComponents]);

  const handleGroup = useCallback(
    () => groupComponents(selectedComponents.map((component) => component.id)),
    [groupComponents, selectedComponents]
  );

  const handleDelete = () => {
    selectedComponents.forEach((component) => removeComponent(component.id));
  };

  const actions = {
    copy: {
      displayName: "Duplicate",
      icon: Copy,
      tooltip: "Duplicate - Ctrl + D",
      action: handleCopy,
    },
    group: {
      displayName: "Group",
      icon: allHaveSameGroupId ? Ungroup : Group,
      tooltip: allHaveSameGroupId ? "Ungroup - Ctrl + G" : "Group - Ctrl + G",
      action: handleGroup,
    },
    delete: {
      displayName: "Delete",
      icon: Trash2,
      tooltip: "Delete",
      action: handleDelete,
    },
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        handleCopy();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCopy]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "g") {
        event.preventDefault();
        handleGroup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGroup]);

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
