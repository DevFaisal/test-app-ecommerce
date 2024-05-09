import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
function App() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-semibold">Welcome to the E-commerce website</h1>
      </div>
    </div>
  );
}

export default App;
