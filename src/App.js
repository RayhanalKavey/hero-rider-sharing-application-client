import logo from "./logo.svg";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Toaster />
    </div>
  );
}

export default App;
