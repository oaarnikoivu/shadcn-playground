import { useComponentActions, useSelected } from "@/stores";

export default function useDelete() {
  const selectedComponents = useSelected();
  const { removeComponents } = useComponentActions();

  const remove = () => {
    removeComponents(selectedComponents.map((component) => component.id));
  };

  return remove;
}
