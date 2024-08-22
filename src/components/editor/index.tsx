import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import ButtonProperties from "@/components/editor/button-properties.tsx";
import useStore from "@/stores";
import Value from "@/components/editor/value.tsx";
import Align from "@/components/editor/align.tsx";
import Actions from "@/components/editor/actions.tsx";
import InputProperties from "@/components/editor/input-properties.tsx";
import Spacing from "@/components/editor/spacing.tsx";

export default function Editor() {
  const selectedComponents = useStore((state) => state.getSelectedComponents());

  const uniqueComponentTypes = Array.from(
    new Set(selectedComponents.map((c) => c.type)),
  );

  return (
    <Popover open={selectedComponents.length > 0}>
      <PopoverContent
        id="editor"
        className="w-[280px] absolute left-4 top-20"
        onOpenAutoFocus={(e) => e.preventDefault()}
        asChild
      >
        <div className="flex flex-col gap-2">
          <Value />
          {uniqueComponentTypes.includes("button") && <ButtonProperties />}
          {uniqueComponentTypes.includes("input") && <InputProperties />}
          <Align />
          <Spacing />
          <Actions />
        </div>
      </PopoverContent>
    </Popover>
  );
}
