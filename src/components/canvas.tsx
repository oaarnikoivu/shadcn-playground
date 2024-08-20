import useComponentStore from "@/stores/component.store.ts";
import Draggable from "@/components/draggable.tsx";

export default function Canvas() {
  const components = useComponentStore((state) => state.components);

  return (
    <main id="canvas" className="w-screen h-[calc(100vh-88px)] relative">
      {components.map((component) => (
        <Draggable key={component.id} component={component} />
      ))}
    </main>
  );
}
