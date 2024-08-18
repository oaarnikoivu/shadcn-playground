import BoundingBox from "./components/bounding-box";
import DragSelection from "./components/drag-selection";
import Draggable from "./components/draggable";
import Header from "./components/header";
import useComponentStore from "./stores/component.store";

function App() {
  const { components } = useComponentStore();

  return (
    <>
      <Header />
      <main id="canvas" className="w-screen h-[calc(100vh-80px)] relative">
        <DragSelection />
        {components.map((component) => (
          <Draggable key={component.id} component={component} />
        ))}
      </main>
      <BoundingBox />
    </>
  );
}

export default App;
