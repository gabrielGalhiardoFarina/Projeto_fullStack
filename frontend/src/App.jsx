import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Registration from "./screens/Registration";
import Login from "./screens/Login";
import Home from "./screens/Home";
import './App.css';

import { ProtectedRoute } from "./components/protected_route/ProtectedRoute.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />
    },
    {
      path: "/register",
      element: <Registration />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      )
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;