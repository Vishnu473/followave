import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCheckAuth } from "../../Hooks/useCheckAuth.js";
import { api } from "../../Services/ApiService.js";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout, clearError } from "../../Hooks/Redux/Slices/userSlice.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleLogout = async () => {
    try {
      const response = await api.post("/users/logout", {}, { withCredentials: true });

      if (response && response.status === 200) {
        dispatch(logout());
        dispatch(clearError());

        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate("/auth/login",{replace:true});
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
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          {import.meta.env.VITE_APP_NAME}
        </Link>

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
          className={`menu-container fixed top-0 right-0 h-full w-60 bg-gray-900 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:static md:w-auto md:flex md:space-x-4 md:translate-x-0`}
        >
          <div className={`flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${menuOpen ? "p-6 mt-6" : "p-0"}`}>
            {!user ? (
              <>
                <Link to="/auth/login" className="hover:text-blue-400 transition">
                  Login
                </Link>
                <Link to="/auth/register" className="hover:text-blue-400 transition">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-blue-400 transition">
                  Dashboard
                </Link>
                <Link to="/profile" className="hover:text-blue-400 transition">
                  Profile
                </Link>
                <button onClick={handleLogout} className="hover:text-red-400 transition">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;