import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import useComponentStore from "@/stores/component.store.ts";
import ButtonProperties from "@/components/editor/button-properties.tsx";

export default function Editor() {
  const selectedComponents = useComponentStore((state) =>
    state.getSelectedComponents(),
  );

  return (
    <Popover open={selectedComponents.length > 0}>
      <PopoverContent
        id="editor"
        className="w-[280px] absolute left-4 top-20"
        asChild
      >
        <div className="flex flex-col gap-2">
          <ButtonProperties />
        </div>
      </PopoverContent>
    </Popover>
  );
}
