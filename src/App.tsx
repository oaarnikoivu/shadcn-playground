import Draggable from "./components/draggable";
import Header from "./components/header";
import useComponentStore from "./stores/component.store";

function App() {
  const { components } = useComponentStore();

  return (
    <>
      <Header />
      <main className="w-screen h-[calc(100vh-80px)]">
        {components.map((component) => (
          <Draggable key={component.id} component={component} />
        ))}
      </main>
    </>
  );
}

export default App;
