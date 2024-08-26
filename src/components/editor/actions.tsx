import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Copy, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { useComponentActions, useSelected } from "@/stores";
import Section from "@/components/editor/section.tsx";

const ACTIONS = ["copy", "delete"] as const;

export default function Actions() {
  const selectedComponents = useSelected();
  const { copyComponent, removeComponent } = useComponentActions();

  const handleCopy = () => {
    selectedComponents.forEach((component) => copyComponent(component.id));
  };

  const handleDelete = () => {
    selectedComponents.forEach((component) => removeComponent(component.id));
  };

  return (
    <Section title="Actions">
      <ToggleGroup type="single" className="justify-start">
        <TooltipProvider>
          {ACTIONS.map((action) => (
            <Tooltip key={action}>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value={action}
                  aria-label={action}
                  onClick={action === "copy" ? handleCopy : handleDelete}
                >
                  {action === "copy" ? (
                    <Copy className="size-4" />
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
