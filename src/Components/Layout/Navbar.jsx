import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCheckAuth } from "../../Hooks/useCheckAuth.js";
import { api } from "../../Services/ApiService.js";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout, clearError } from "../../Hooks/Redux/slices/userSlice.js";

const Navbar = ({toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useCheckAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container") && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      console.log("Closing Menu");
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await api.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );

      if (response && response.status === 200) {
        dispatch(logout());
        dispatch(clearError());

        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate("/auth/login", { replace: true });
          // window.location.reload();
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <nav className="bg-white text-black dark:bg-gray-900 dark:text-white py-4 shadow-lg border-b-2 border-gray-300 dark:border-gray-600 z-50">
  <div className="container flex items-center">
    
    <div className="flex items-center gap-4 ml-5">
      <button className="hidden md:block" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>
      <NavLink
        to="/"
        className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-blue-500 dark:text-blue-400"
      >
        {import.meta.env.VITE_APP_NAME}
      </NavLink>
    </div>

    
    <div className="ml-auto flex items-center mr-4">
      
      <button
        className="md:hidden z-50 relative"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`menu-container fixed top-0 right-0 h-full w-60 transform ${
          menuOpen
            ? "translate-x-0 bg-gray-200 dark:bg-gray-600"
            : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:static md:w-auto md:flex md:space-x-4 md:translate-x-0`}
      >
        <div
          className={`flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${
            menuOpen ? "p-6 mt-6" : "p-0"
          }`}
        >
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 dark:text-blue-300 border-b-1 border-b-blue-500 dark:border-b-blue-300`
                    : `hover:text-blue-400 dark:hover:text-blue-300 transition`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 dark:text-blue-300 border-b-1 border-b-blue-500 dark:border-b-blue-300`
                    : `hover:text-blue-400 dark:hover:text-blue-300 transition`
                }
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
