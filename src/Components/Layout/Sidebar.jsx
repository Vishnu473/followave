import { Bell, Home, Plus, Search, Settings, User } from "lucide-react";
import React from "react";
import { NavLink} from "react-router-dom";
import { useCheckAuth } from "../../Hooks/useCheckAuth";

const Sidebar = ({ isOpen }) => {
  const { user, isAuthenticated } = useCheckAuth();

  return (
    <>
      {isAuthenticated && (
        <>
          <div
            className={`hidden md:flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 h-screen border-r-2 border-r-gray-200 dark:border-r-gray-600 p-4 ${
              isOpen ? "w-52" : "w-20"
            }`}
          >
            <nav className="flex flex-col space-y-2">
              {[
                { name: "Home", icon: <Home />, path: "/dashboard" },
                { name: "Search", path: "/add-post-form", icon: <Search /> },
                { name: "New", path:"/add-post", icon: <Plus /> },
                {
                  name: "Settings",
                  path: "/account-settings",
                  icon: <Settings />,
                },
                {
                  name: "Profile",
                  path: "/profile",
                  icon: (
                    <img
                      src={
                        user?.data?.profilePic || "assets/default_profile.webp"
                      }
                      alt={user?.username}
                      className="w-8 h-8 object-cover rounded-full bg-gray-200 dark:bg-gray-500"
                    />
                  ),
                },
              ].map((item) =>
                 (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-blue-500 dark:bg-blue-500 text-gray-100"
                          : "hover:bg-gray-300 dark:hover:bg-gray-700"
                      } flex items-center ${
                        !isOpen ? "justify-center" : ""
                      }  p-2 rounded-md`
                    }
                  >
                    {item.icon}
                    {isOpen && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                )
              )}
            </nav>
          </div>

          <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white flex justify-around p-3 shadow-lg">
            {[
              { name: "Home", icon: <Home />, path: "/dashboard" },
              { name: "Search", icon: <Search />, path: "/add-post-form" },
              { name: "New", path:"/add-post", icon: <Plus /> },
              {
                name: "Settings",
                path: "/account-settings",
                icon: <Settings />,
              },
              {
                name: "Profile",
                path: "/profile",
                icon: (
                  <img
                    src={
                      user?.data?.profilePic || "assets/default_profile.webp"
                    }
                    alt={user?.username}
                    className="w-8 h-8 object-cover rounded-full bg-gray-200 dark:bg-gray-500"
                  />
                ),
              },
            ].map((item) =>
              (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `${
                    isActive
                      ? " text-gray-100 bg-blue-500"
                      : "hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-gray-100 text-gray-800"
                  } p-2 flex items-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl rounded-md
            `}
                >
                  {item.icon}
                </NavLink>
              )
            )}
          </div>
        </>
      )}

    </>
  );
};

export default Sidebar;
