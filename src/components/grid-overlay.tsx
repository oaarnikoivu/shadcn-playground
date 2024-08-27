type GridOverlayProps = {
  gridSize: number;
};

export default function GridOverlay({ gridSize }: GridOverlayProps) {
  const gridStyle = {
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundImage: `linear-gradient(to right, rgba(204, 204, 204, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(204, 204, 204, 0.3) 1px, transparent 1px)`,
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={gridStyle} />
  );
}
