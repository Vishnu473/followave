import { Bell, Menu, Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCheckAuth } from "../../Hooks/useCheckAuth.js";
import { useTheme } from "../../Context/Theme.jsx";

const Navbar = ({ toggleSidebar }) => {
  const { user, isAuthenticated } = useCheckAuth();

  const { theme, setTheme } = useTheme();

  const changeTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <nav className="bg-white text-black dark:bg-gray-900 dark:text-white py-4 shadow-lg border-b-2 border-gray-300 dark:border-gray-600 z-50">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4 ml-5">
          {isAuthenticated && (
            <button className="hidden md:block" onClick={toggleSidebar}>
              <Menu className="w-6 h-6" />
            </button>
          )}
          <NavLink
            to={isAuthenticated ? "/dashboard" : "/home"}
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-blue-500 dark:text-blue-400"
          >
            {import.meta.env.VITE_APP_NAME}
          </NavLink>
        </div>

        <div
          className={`flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4`}
        >
          {!isAuthenticated ? (
            <div className="flex items-center gap-4 mr-2">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 dark:text-blue-300 border-b-1 border-b-blue-500 dark:border-b-blue-300`
                    : `hover:text-blue-400 dark:hover:text-blue-300 transition`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 dark:text-blue-300 border-b-1 border-b-blue-500 dark:border-b-blue-300`
                    : `hover:text-blue-400 dark:hover:text-blue-300 transition`
                }
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4 mr-2">
              <button
                onClick={changeTheme}
                className="text-black dark:text-white"
              >
                {theme === "light" ? <Moon /> : <Sun />}
              </button>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 dark:text-blue-300 border-b-1 border-b-blue-500 dark:border-b-blue-300`
                    : `hover:text-blue-400 dark:hover:text-blue-300 transition`
                }
              >
                <Bell />
              </NavLink>
              {/* <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? ` border-2 rounded-full border-blue-500 dark:border-blue-300`
                    : " border-gray-700 dark:border-gray-300 border-2 rounded-full"
                }
              >
                <img
                  src={user?.data?.profilePic || "assets/default_profile.webp"}
                  alt={user?.username}
                  className="w-8 h-8 object-cover rounded-full bg-gray-200 dark:bg-gray-500"
                />
              </NavLink> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
