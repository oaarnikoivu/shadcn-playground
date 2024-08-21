import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import ButtonProperties from "@/components/editor/button-properties.tsx";
import useStore from "@/stores";

export default function Editor() {
  const selectedComponents = useStore((state) => state.getSelectedComponents());

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
