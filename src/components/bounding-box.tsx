import useComponentStore from "@/stores/component.store";

export default function BoundingBox() {
  const boundingBox = useComponentStore((state) => state.getBoundingBox());

  if (!boundingBox) return null;

  return (
    <div
      className="-z-10 rounded-md border-primary border border-dashed"
      style={{
        position: "absolute",
        left: `${boundingBox.left - 20}px`,
        top: `${boundingBox.top - 20}px`,
        height: `${boundingBox.height + 40}px`,
        width: `${boundingBox.width + 40}px`,
      }}
    />
  );
}
