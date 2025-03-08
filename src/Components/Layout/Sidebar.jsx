import { Bell, Home, Search, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <>
      <div
        className={`hidden md:flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white h-screen p-4 transition-all duration-300 ${
          isOpen ? "w-48" : "w-20"
        }`}
      >
        <nav className="flex flex-col space-y-2">
          {[
            { name: "Home", path: "/", icon: <Home /> },
            { name: "Search", path: "/", icon: <Search /> },
            { name: "Notifications", path: "/", icon: <Bell /> },
            { name: "Profile", path: "/", icon: <User /> },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center ${isOpen ? "" : "justify-center" }  p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md`}
            >
              {item.icon}
              {isOpen && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white flex justify-around p-3 shadow-lg">
        {[
          { name: "Home", icon: <Home />, path: "/" },
          { name: "Search", icon: <Search />, path: "/search" },
          { name: "Notifications", icon: <Bell />, path: "/notifications" },
          { name: "Profile", icon: <User />, path: "/profile" },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="p-2 flex flex-col items-center text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md"
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
