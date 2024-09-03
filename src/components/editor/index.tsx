import Actions from "@/components/editor/actions.tsx";
import Align from "@/components/editor/align.tsx";
import ButtonProperties from "@/components/editor/button-properties.tsx";
import InputProperties from "@/components/editor/input-properties.tsx";
import Spacing from "@/components/editor/spacing.tsx";
import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import { useSelected } from "@/stores";
import AvatarProperties from "./avatar-properties";

export default function Editor() {
  const selectedComponents = useSelected();

  const uniqueComponentTypes = Array.from(
    new Set(selectedComponents.map((c) => c.type)),
  );

  return (
    <Popover open={selectedComponents.length > 0}>
      <PopoverContent
        id="editor"
        className="w-[280px] max-h-[calc(100vh-152px)] overflow-y-auto absolute left-4 top-20"
        onOpenAutoFocus={(e) => e.preventDefault()}
        asChild
      >
        <div className="flex flex-col gap-2">
          {uniqueComponentTypes.includes("button") && <ButtonProperties />}
          {uniqueComponentTypes.includes("input") && <InputProperties />}
          {uniqueComponentTypes.includes("avatar") && <AvatarProperties />}
          <Align />
          <Spacing />
          <Actions />
        </div>
      </PopoverContent>
    </Popover>
  );
}
