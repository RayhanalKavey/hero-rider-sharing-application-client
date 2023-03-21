import logo from "./logo.svg";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routers/routers";

function App() {
  // For checking if the firebase configured properly
  // console.log(process.env);
  // console.log(document.documentElement);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
