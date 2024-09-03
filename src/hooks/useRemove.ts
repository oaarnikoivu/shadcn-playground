import { useComponentActions, useSelected } from "@/stores";

export default function useDelete() {
  const selectedComponents = useSelected();
  const { removeComponent } = useComponentActions();

  const remove = () => {
    selectedComponents.forEach((component) => removeComponent(component.id));
  };

  return remove;
}
