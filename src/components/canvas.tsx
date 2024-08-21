import Draggable from "@/components/draggable.tsx";
import useStore from "@/stores";

export default function Canvas() {
  const components = useStore((state) => state.components);

  return (
    <main id="canvas" className="w-screen h-[calc(100vh-88px)] relative">
      {components.map((component) => (
        <Draggable key={component.id} component={component} />
      ))}
    </main>
  );
}
