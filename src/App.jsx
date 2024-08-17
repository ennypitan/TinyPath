import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import UrlProvider from "./context";
import { RequiredAuth } from "./components/RequiredAuth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: (
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>
          // <Dashboard />
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequiredAuth>
            <Link />
          </RequiredAuth>
          // <Link />
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <UrlProvider>
        <RouterProvider router={router} />
      </UrlProvider>
    </div>
  );
}

export default App;
