import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container") && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
        {import.meta.env.VITE_APP_NAME}
        </Link>
        <button className={`md:hidden z-50 relative`} onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
          {menuOpen ? <X className={`w-6 h-6 `} /> : <Menu className="w-6 h-6" />}
        </button>
        <div className={`menu-container fixed top-0 right-0 h-full w-60 bg-gray-900 transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:static md:w-auto md:flex md:space-x-4 md:translate-x-0` }>
          <div className={`flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${menuOpen ? "p-6 mt-6" : "p-0"}`}>
            {/* {!user ? (
              // Links shown when user is not logged in
              <>
                <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
                <Link to="/signup" className="hover:text-blue-400 transition">Sign Up</Link>
              </>
            ) : (
              // Links shown when user is logged in
              <>
                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
                <Link to="/logout" className="hover:text-red-400 transition">Logout</Link>
              </>
            )} */}

            <>
                <Link to="/auth/login" className="hover:text-blue-400 transition">Login</Link>
                <Link to="/auth/register" className="hover:text-blue-400 transition">Sign Up</Link>
                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
                <Link to="/auth/logout" className="hover:text-red-400 transition">Logout</Link>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
