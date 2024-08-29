import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Copy, Group, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { useComponentActions, useSelected } from "@/stores";
import Section from "@/components/editor/section.tsx";

const ACTIONS = ["copy", "group", "delete"] as const;

export default function Actions() {
  const selectedComponents = useSelected();
  const { copyComponent, removeComponent, groupComponents } =
    useComponentActions();

  const displayActions =
    selectedComponents.length > 1
      ? ACTIONS
      : ACTIONS.filter((a) => a !== "group");

  const handleCopy = () => {
    selectedComponents.forEach((component) => copyComponent(component.id));
  };

  const handleGroup = () =>
    groupComponents(selectedComponents.map((component) => component.id));

  const handleDelete = () => {
    selectedComponents.forEach((component) => removeComponent(component.id));
  };

  return (
    <Section title="Actions">
      <ToggleGroup type="single" className="justify-start">
        <TooltipProvider>
          {displayActions.map((action) => (
            <Tooltip key={action}>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value={action}
                  aria-label={action}
                  onClick={
                    action === "copy"
                      ? handleCopy
                      : action == "group"
                        ? handleGroup
                        : handleDelete
                  }
                >
                  {action === "copy" ? (
                    <Copy className="size-4" />
                  ) : action === "group" ? (
                    <Group className="size-4" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent className="capitalize">{action}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </ToggleGroup>
    </Section>
  );
}
