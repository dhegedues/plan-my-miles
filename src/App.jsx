import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="app h-full">
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "",
          element: <Landing />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "login",
          element: <LogIn />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
