import { Button } from "@/components/ui/button.tsx";
import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import useComponentStore from "@/stores/component.store.ts";

export default function Footer() {
  const selectedComponents = useComponentStore((state) =>
    state.getSelectedComponents(),
  );

  return (
    <footer className="flex items-center justify-between w-screen px-4 fixed h-header bottom-0">
      <div />
      {selectedComponents.length > 0 && (
        <Input id="prompt" className="w-[40%]" placeholder="Prompt..." />
      )}
      <Button variant="secondary" size="icon">
        <HelpCircle className="size-4" />
      </Button>
    </footer>
  );
}
