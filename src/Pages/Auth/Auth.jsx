import React, { useState } from "react";
import { useLocation, Outlet,Link } from "react-router-dom";
// import { motion } from "framer-motion";

const Auth = () => {
  const location = useLocation();
  // const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg ">
        {/* <motion.div
          key={isRegistering ? "register" : "login"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {isRegistering ? <Register /> : <Login />}
        </motion.div> */}

        {/* <div>
          {isRegistering ? <Register /> : <Login />}
        </div> */}

<Outlet />

        <p className="mt-4 text-center text-gray-700 dark:text-gray-200">
        {location.pathname === "/auth/register" ? "Already have an account?" : "Don't have an account?"}
          <Link
            to={location.pathname === "/auth/register" ? "/auth/login" : "/auth/register"}
            className="ml-2 text-blue-500 dark:text-blue-400 hover:underline"
          >
            {location.pathname === "/auth/register" ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;