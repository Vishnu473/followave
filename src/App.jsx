import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import RootLayout from "./Pages/Layout/RootLayout";
import Dashboard from "./Pages/Main/Dashboard";
import Auth from "./Pages/Auth/Auth";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Profile from "./Pages/Features/Profile";
import NotFound from "./Components/Shared/NotFound";
import ProtectedLayout from "./Components/Layout/ProtectedLayout";
import Search from "./Pages/Features/Search";
import Home from "./Pages/Main/Home";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedLayout needLogIn={false}>
              <Home />
            </ProtectedLayout>
          ),
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
          path: "search/profile/:profileId",
          element: <Profile />,
        },
        {
          path: "search",
          element: <Search />,
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
