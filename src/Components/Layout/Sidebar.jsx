import { Bell, Home, Plus, Search, Settings, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <>
      <div
        className={`hidden md:flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 h-screen border-r-2 border-r-gray-200 dark:border-r-gray-600 p-4 ${
          isOpen ? "w-52" : "w-20"
        }`}
      >
        <nav className="flex flex-col space-y-2">
          {[
            { name: "New", path: "/dashboard", icon: <Plus /> },
            { name: "Search", path: "/search", icon: <Search /> },
            { name: "Notifications", path: "/notifications", icon: <Bell /> },
            { name: "Settings", path: "/account-settings", icon: <Settings /> },
          ].map((item) => (
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
          ))}
        </nav>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white flex justify-around p-3 shadow-lg">
        {[
          { name: "Home", icon: <Home />, path: "/dashboard" },
          { name: "Search", icon: <Search />, path: "/search" },
          { name: "Notifications", icon: <Bell />, path: "/notifications" },
          { name: "Profile", icon: <User />, path: "/profile" },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `${
              isActive
                ? "bg-blue-500 dark:bg-blue-500 text-gray-100"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            } p-2 flex flex-col items-center text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl rounded-md
            `}
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
