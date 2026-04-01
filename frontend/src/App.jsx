import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./screens/Registration";
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registration />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;