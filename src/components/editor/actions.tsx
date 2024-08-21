import { Label } from "@/components/ui/label.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Copy, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import useStore from "@/stores";

const ACTIONS = ["copy", "delete"] as const;

export default function Actions() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.selected);
  const copyComponents = useStore((state) => state.copyComponents);
  const removeComponents = useStore((state) => state.removeComponents);

  const handleCopy = () => copyComponents(componentsToUpdate);

  const handleDelete = () => removeComponents(componentsToUpdate);

  return (
    <div className="space-y-1">
      <Label className="font-semibold">Actions</Label>
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
    </div>
  );
}
