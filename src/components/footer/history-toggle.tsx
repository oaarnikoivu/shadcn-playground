import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Redo2, Undo2 } from "lucide-react";

const actions = ["Undo", "Redo"] as const;

export default function HistoryToggle() {
  return (
    <div className="flex items-center">
      <TooltipProvider>
        {actions.map((action) => (
          <Tooltip key={action}>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                {action === "Undo" ? (
                  <Undo2 className="size-4" />
                ) : (
                  <Redo2 className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{action}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
