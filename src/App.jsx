import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./Pages/Common/RootLayout";
import Dashboard from "./Pages/Home/Dashboard";
import Auth from "./Pages/Auth/Auth";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Profile from "./Pages/Common/Profile";
import NotFound from "./Components/Layout/NotFound";
import ProtectedLayout from "./Components/ProtectedLayout";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "auth",
          element: <Auth />,
          children: [
            {
              path: "login",
              element: (
                <ProtectedLayout needLogIn={false}>
                  <Login />
                </ProtectedLayout>
              ),
            },
            {
              path: "register",
              element: (
                <ProtectedLayout needLogIn={false}>
                  <Register />
                </ProtectedLayout>
              ),
            },
            {
              path: "logout",
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  { basename: "/followave/" }
);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
